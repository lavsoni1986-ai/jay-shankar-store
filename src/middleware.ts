// ============================================================
// Edge-Compatible Middleware — Jay Shankar Readymade Store
// Protects /admin/* routes with JWT Session Verification
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "@/lib/auth-secret";

const COOKIE_NAME = "js_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes (public website routes pass through immediately)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;

  const key = getJwtSecretKey();
  if (token && key) {
    try {
      const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
      if (typeof payload.userId === "string" && payload.userId.length > 0) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // If user is accessing /admin/login
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      // Already logged in -> redirect to /admin
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // For all other /admin/* routes, require authentication
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
