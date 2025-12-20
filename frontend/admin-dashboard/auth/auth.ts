/* eslint-disable no-console */

export type UserRole = 'admin' | 'user';

export interface AuthClaims {
  sub?: string;              // user id
  email?: string;
  roles?: UserRole[];        // ["admin"]
  exp?: number;              // epoch seconds
  iat?: number;              // epoch seconds
  iss?: string;
  aud?: string | string[];
  [k: string]: unknown;
}

const ACCESS_TOKEN_COOKIE = 'csacp_access_token';

/**
 * Environment-safe check
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Minimal base64url decode for JWT payloads.
 * Note: This does NOT verify the signature; verification should happen on backend.
 */
function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
    .padEnd(Math.ceil(input.length / 4) * 4, '=');

  if (typeof atob === 'function') {
    // Browser
    return atob(padded);
  }

  // Fallback (non-browser) — best-effort for environments that provide Buffer
  // (If Buffer isn't available, caller should not use this server-side.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const B: any = (globalThis as any).Buffer;
  if (B?.from) return B.from(padded, 'base64').toString('utf-8');

  throw new Error('base64 decode not available in this environment');
}

export function decodeJwt(token: string): AuthClaims | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const json = base64UrlDecode(parts[1]);
    return JSON.parse(json) as AuthClaims;
  } catch {
    return null;
  }
}

export function isExpired(claims: AuthClaims | null, skewSeconds = 30): boolean {
  if (!claims?.exp) return false; // treat as non-expiring if no exp
  const now = Math.floor(Date.now() / 1000);
  return claims.exp <= (now + skewSeconds);
}

/**
 * Cookie helpers (browser-only)
 */
function setCookie(name: string, value: string, days = 7): void {
  if (!isBrowser()) return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
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

export function hasRole(role: UserRole): boolean {
  const claims = getAuthClaims();
  const roles = (claims?.roles ?? []) as UserRole[];
  return roles.includes(role);
}

export function requireAdmin(): void {
  if (!isAuthenticated() || !hasRole('admin')) {
    const err = new Error('Admin access required');
    // Helpful for debugging but safe in production
    console.warn(err.message);
    throw err;
  }
}

/**
 * Optional helper for API calls from the admin UI.
 * Adds Authorization header when token exists.
 */
export function withAuthHeaders(init: RequestInit = {}): RequestInit {
  const token = getAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return { ...init, headers };
}
