import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    // if (request.nextUrl.pathname.startsWith("/api")) {
    //   // console.log("Processing API request:", request.nextUrl.pathname);
    //   console.log("Authorization" + request.nextauth);
    // }

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (request.nextauth.token.role !== "admin")
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL));
    }
    if (
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/checkout") ||
      request.nextUrl.pathname.startsWith("/recent-activity")
    ) {
      if (request.nextauth.token)
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile",
    "/recent-activity",
    "/checkout/:path*",
  ],
};
