import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USER_ACCESS_COOKIE = "csacp_user_access_token";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
];

// Protect all routes except public ones
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow static & Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // allow public pages
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const hasUserToken = req.cookies.has(USER_ACCESS_COOKIE);

  // Not logged in → redirect BEFORE page loads
  if (!hasUserToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api).*)",
  ],
};
