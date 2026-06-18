import { NextResponse, type NextRequest } from "next/server";

import { isSupabaseConfigured, SESSION_COOKIE } from "@/lib/auth/config";
import { verifySession } from "@/lib/auth/dev-session";

// Public paths that never require authentication. Everything else is protected.
const PUBLIC_PATHS = ["/login", "/unauthorized", "/forbidden"];

function isPublic(pathname: string): boolean {
  if (pathname === "/") return true;
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let hasUser: boolean;
  let baseResponse: NextResponse;

  if (isSupabaseConfigured()) {
    const { updateSupabaseSession } = await import("@/lib/supabase/middleware");
    const result = await updateSupabaseSession(request);
    hasUser = result.hasUser;
    baseResponse = result.response;
  } else {
    const userId = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
    hasUser = Boolean(userId);
    baseResponse = NextResponse.next();
  }

  if (!hasUser && !isPublic(pathname)) {
    return redirectTo(request, "/login");
  }
  if (hasUser && pathname === "/login") {
    return redirectTo(request, "/dashboard");
  }

  return baseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
