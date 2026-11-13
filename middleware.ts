import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const session = request.cookies.get("dna_session");
  if (request.nextUrl.pathname.startsWith("/dashboard") && !session)
    return NextResponse.redirect(new URL("/login", request.url));
  if (
    (request.nextUrl.pathname.startsWith("/students") ||
      request.nextUrl.pathname.startsWith("/users") ||
      request.nextUrl.pathname.startsWith("/roles")) &&
    !session
  )
    return NextResponse.redirect(new URL("/login", request.url));
  if (request.nextUrl.pathname === "/login" && session)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/students/:path*",
    "/users/:path*",
    "/roles/:path*",
    "/login",
  ],
};
