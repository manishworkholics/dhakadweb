import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("usertoken")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/registrationform",
    "/matches",
    "/chat",
  ];

  // 🔐 Protected routes → login required
  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🚫 Login/Register page → already logged in
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/registrationform/:path*",
    "/matches/:path*",
    "/chat/:path*",
  ],
};
