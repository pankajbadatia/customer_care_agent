/* eslint-disable no-console */

export type UserRole = 'user';

export interface AuthClaims {
  sub?: string;          // user id
  email?: string;
  roles?: UserRole[];    // ["user"]
  exp?: number;          // epoch seconds
  iat?: number;
  iss?: string;
  aud?: string | string[];
  [k: string]: unknown;
}

const ACCESS_TOKEN_COOKIE = 'csacp_user_access_token';

/**
 * Environment safety
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Decode base64url JWT payload (NO signature verification)
 * Signature verification must happen on backend
 */
function base64UrlDecode(input: string): string {
  const padded = input
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(input.length / 4) * 4, '=');

  if (typeof atob === 'function') {
    return atob(padded);
  }

  // Fallback for environments with Buffer
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

export function isExpired(claims: AuthClaims | null, skewSeconds = 30): boolean {
  if (!claims?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return claims.exp <= now + skewSeconds;
}

/**
 * Cookie helpers (browser only)
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
 * Public API
 */
export function setAccessToken(token: string): void {
  setCookie(ACCESS_TOKEN_COOKIE, token, 7);
}

export function getAccessToken(): string | null {
  return getCookie(ACCESS_TOKEN_COOKIE);
}

export function clearAccessToken(): void {
  clearCookie(ACCESS_TOKEN_COOKIE);
}

export function getAuthClaims(): AuthClaims | null {
  const token = getAccessToken();
  if (!token) return null;
  return decodeJwt(token);
}

export function isAuthenticated(): boolean {
  const claims = getAuthClaims();
  if (!claims) return false;
  return !isExpired(claims);
}

/**
 * User dashboards do NOT enforce roles beyond "authenticated user"
 */
export function requireUser(): void {
  if (!isAuthenticated()) {
    const err = new Error('User authentication required');
    console.warn(err.message);
    throw err;
  }
}

/**
 * Attach Authorization header for API calls
 */
export function withAuthHeaders(init: RequestInit = {}): RequestInit {
  const token = getAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return { ...init, headers };
}
