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
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/profile", "/recent-activity"],
};
