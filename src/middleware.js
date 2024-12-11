import { NextResponse } from "next/server";

export function middleware(request) {
  const userRole = request.cookies.get("userRole")?.value;
  const token = request.cookies.get("jwtToken")?.value;
  const pathname = new URL(request.url).pathname;

  const protectedPaths = [
    "/contacts/edit/:path*",
    "/user/edit/:path*",
    "/contacts/create-new",
    "/users/invite-new-user",
    "/home/activities",
    "/company-profile/company-profile-edit",
  ];

  // if (token===undefined) {
  //   return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  // }

  if (
    protectedPaths.some((protectedPath) =>pathname.startsWith(protectedPath)) &&
    userRole === "User"
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/company-profile/company-profile-edit",
    "/contacts/:path*",
    "/users/:path*",
    "/home/:path*",
  ],
};
