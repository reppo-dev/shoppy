import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    pathname.startsWith("/customer") || pathname.startsWith("/admin");

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const token = request.cookies.get("jwt")?.value;

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
