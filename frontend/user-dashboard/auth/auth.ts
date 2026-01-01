/* eslint-disable no-console */

/**
 * =========================================================
 * Auth types
 * =========================================================
 */

export type UserRole = 'user' | 'admin';

export interface AuthClaims {
  sub?: string;          // subject (email)
  role?: UserRole;       // backend-issued role
  exp?: number;          // expiry (epoch seconds)
  iat?: number;          // issued at
  iss?: string;
  aud?: string | string[];
  [k: string]: unknown;
}

/**
 * =========================================================
 * Constants
 * =========================================================
 */

const ACCESS_TOKEN_COOKIE = 'csacp_user_access_token';
const API_BASE_URL = 'http://localhost:8010';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:8010";
/**
 * =========================================================
 * Environment helpers
 * =========================================================
 */

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * =========================================================
 * JWT helpers (decode ONLY, never verify)
 * =========================================================
 */

function base64UrlDecode(input: string): string {
  const padded = input
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(input.length / 4) * 4, '=');

  if (typeof atob === 'function') {
    return atob(padded);
  }

  // Node / edge fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const B: any = (globalThis as any).Buffer;
  if (B?.from) return B.from(padded, 'base64').toString('utf-8');

  throw new Error('Base64 decoding not available');
}

export function decodeJwt(token: string): AuthClaims | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload) as AuthClaims;
  } catch {
    return null;
  }
}

function isExpired(claims: AuthClaims | null, skewSeconds = 30): boolean {
  if (!claims?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return claims.exp <= now + skewSeconds;
}

/**
 * =========================================================
 * Cookie helpers (browser only)
 * =========================================================
 */

function setCookie(name: string, value: string, days = 7): void {
  if (!isBrowser()) return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const c of cookies) {
    const [k, ...rest] = c.split('=');
    if (decodeURIComponent(k) === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

function clearCookie(name: string): void {
  if (!isBrowser()) return;
  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/**
 * =========================================================
 * Public Auth API
 * =========================================================
 */

/**
 * Login against API Gateway.
 * Backend verifies credentials and issues JWT.
 */
export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Invalid email or password');
  }

  const data = await res.json();
  if (!data?.access_token) {
    throw new Error('Invalid login response');
  }

  setAccessToken(data.access_token);
}

/**
 * Logout user (frontend only).
 */


export async function logout() {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8010"}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
  } catch {
    // ignore — even if network fails, treat as logged out
  }

  // Force navigation OUT of shell
  window.location.href = "/login";
}



/**
 * Store access token.
 */
export function setAccessToken(token: string): void {
  setCookie(ACCESS_TOKEN_COOKIE, token, 7);
}

/**
 * Retrieve raw JWT.
 */
export function getAccessToken(): string | null {
  return getCookie(ACCESS_TOKEN_COOKIE);
}

/**
 * Remove JWT.
 */
export function clearAccessToken(): void {
  clearCookie(ACCESS_TOKEN_COOKIE);
}

/**
 * Get decoded JWT claims (NO trust, informational only).
 */
export function getAuthClaims(): AuthClaims | null {
  const token = getAccessToken();
  if (!token) return null;
  return decodeJwt(token);
}

/**
 * Authentication check used by UserShell.
 */
export function isAuthenticated(): boolean {
  const claims = getAuthClaims();
  if (!claims) return false;
  return !isExpired(claims);
}

/**
 * Attach Authorization header to API requests.
 */
export function withAuthHeaders(init: RequestInit = {}): RequestInit {
  const token = getAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return { ...init, headers };
}




export async function register(
  email: string,
  password: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: email.trim(),
      password,
      role: "user",
    }),
  });

  if (!res.ok) {
    let msg = `Registration failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) msg = body.detail;
    } catch {}
    throw new Error(msg);
  }
}
