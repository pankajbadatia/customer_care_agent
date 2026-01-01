/* eslint-disable no-console */

export type AdminRole = 'admin';

export interface AuthClaims {
  sub?: string;          // email (JWT subject)
  role?: AdminRole;      // must be "admin"
  exp?: number;
  iat?: number;
  [k: string]: unknown;
}

/**
 * Admin token cookie (separate from user dashboard)
 */
const ADMIN_ACCESS_TOKEN_COOKIE = 'csacp_admin_access_token';

/**
 * Env safety
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Base64URL decode JWT payload (NO signature verification)
 * Signature is verified on backend only.
 */
function base64UrlDecode(input: string): string {
  const padded = input
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(input.length / 4) * 4, '=');

  if (typeof atob === 'function') {
    return atob(padded);
  }

  // Node / SSR fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const B: any = (globalThis as any).Buffer;
  if (B?.from) return B.from(padded, 'base64').toString('utf-8');

  throw new Error('Base64 decoding not available');
}

/**
 * Decode JWT (payload only)
 */
export function decodeJwt(token: string): AuthClaims | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    return JSON.parse(base64UrlDecode(payload)) as AuthClaims;
  } catch {
    return null;
  }
}

export function isExpired(
  claims: AuthClaims | null,
  skewSeconds = 30
): boolean {
  if (!claims?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return claims.exp <= now + skewSeconds;
}

/**
 * Cookie helpers
 */
function setCookie(name: string, value: string, days = 1): void {
  if (!isBrowser()) return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const cookies = document.cookie?.split('; ') ?? [];
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
  document.cookie = `${encodeURIComponent(
    name
  )}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/**
 * Public API
 */
export function setAdminAccessToken(token: string): void {
  setCookie(ADMIN_ACCESS_TOKEN_COOKIE, token, 1);
}

export function getAdminAccessToken(): string | null {
  return getCookie(ADMIN_ACCESS_TOKEN_COOKIE);
}

export function clearAdminAccessToken(): void {
  clearCookie(ADMIN_ACCESS_TOKEN_COOKIE);
}

export function getAuthClaims(): AuthClaims | null {
  const token = getAdminAccessToken();
  if (!token) return null;
  return decodeJwt(token);
}

export function isAuthenticated(): boolean {
  const claims = getAuthClaims();
  if (!claims) return false;
  return !isExpired(claims);
}

/**
 * Admin-only role check
 */
export function hasRole(role: AdminRole): boolean {
  const claims = getAuthClaims();
  if (!claims?.role) return false;
  return claims.role === role;
}

/**
 * Logout helper
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
  } catch {}

  // Force exit admin panel
  window.location.href = "/login";
}




/**
 * Attach Authorization header for admin API calls
 */
export function withAdminAuthHeaders(
  init: RequestInit = {}
): RequestInit {
  const token = getAdminAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return { ...init, headers };
}
