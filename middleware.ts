import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/users",
  "/content",
  "/emotional-categories",
  "/bloom-global-prompt",
  "/ai-management",
  "/analytics",
  "/settings",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    // loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", req.url);
    // loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next|api/auth/login|api/auth/logout|api/public|favicon.ico|assets|public).*)",
  ],
};
