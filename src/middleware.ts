import { NextRequest, NextResponse } from "next/server";

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
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin_token")?.value;

  console.log("Token", adminToken);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !adminToken) {
    return NextResponse.redirect(new URL("/login", request.url));
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
