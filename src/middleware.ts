import { NextRequest, NextResponse } from "next/server";
import { verifyToken, canAccessRoute } from "@/lib/auth";

// Protected page routes (prefix match)
const protectedRoutes = [
  "/dashboard",
  "/users",
  "/settings",
  "/ai-management",
  "/analytics",
  "/content",
  "/crisis-prompts",
  "/emotional-categories",
  "/bloom-global-prompt",
  "/prompts",
  "/suggested-prompts",
  "/life-area-prompt",
  "/emotional-profile",
  "/books",
  "/daily-tools",
  "/plans",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin_token")?.value;
  const referer = request.headers.get("referer") ?? "N/A";

  const logLoginRedirect = (reason: string) => {
    console.log(
      `[Middleware] Redirecting to /login from ${pathname}. Reason: ${reason}. Referer: ${referer}`
    );
  };

  // Debug logging
  console.log("[Middleware] Path:", pathname);
  console.log("[Middleware] Has token:", !!adminToken);
  if (adminToken) {
    console.log("[Middleware] Token length:", adminToken.length);
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  console.log("[Middleware] isProtectedRoute:", isProtectedRoute);
  console.log("[Middleware] adminToken:", adminToken);

  // If it's a protected route, check authentication
  if (isProtectedRoute) {
    if (!adminToken) {
      logLoginRedirect("missing token");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify token and check role-based access
    const decoded = verifyToken(request);
    console.log("Decoded:", decoded);
    if (!decoded) {
      logLoginRedirect("token verification failed");
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("admin_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    console.log("[Middleware] Token verified, role:", decoded.role);

    // Check if user has access to this route based on role
    if (!canAccessRoute(decoded.role, pathname)) {
      console.log("[Middleware] Access denied for role:", decoded.role);
      // User doesn't have permission, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
