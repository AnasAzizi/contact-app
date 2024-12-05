import { NextResponse } from "next/server";

export function middleware(request) {
  const userRole = request.cookies.get('userRole').value;

  const allowedRoles = ["Owner", "Admin"];

  if (allowedRoles.includes(userRole)) {
    return NextResponse.next(); 
  }

  return NextResponse.redirect(new URL("/home/home-page", request.url));
}

export const config = {
  matcher: [
    "/contacts/edit/:path*",
    "/user/edit/:path*",         
    "/contacts/create-new",    
    "/users/invite-new-user",     
  ],
};
