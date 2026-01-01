import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ACCESS_COOKIE = "csacp_admin_access_token";

const PUBLIC_ROUTES = [
  "/login",
];

// Protect admin panel
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // allow admin login page
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const hasAdminToken = req.cookies.has(ADMIN_ACCESS_COOKIE);

  // Not logged in → send to admin login
  if (!hasAdminToken) {
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
