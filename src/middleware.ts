import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isLoggedIn = Boolean(token);
  const url = request.nextUrl;

  if (!isLoggedIn && url.pathname.startsWith("/client")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && url.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    isLoggedIn &&
    (url.pathname.startsWith("/saved") ||
      url.pathname.startsWith("/applied")) &&
    role !== "USER"
  ) {
    return NextResponse.redirect(new URL("/vacancies", request.url));
  }

  if (isLoggedIn && url.pathname.startsWith("/hr") && role !== "HR") {
    return NextResponse.redirect(new URL("/vacancies", request.url));
  }

  if (isLoggedIn && url.pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/organization", request.url));
  }

  if (
    isLoggedIn &&
    url.pathname.startsWith("/organization") &&
    role !== "ORGANIZATION"
  ) {
    return NextResponse.redirect(new URL("/OrgAdmin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
