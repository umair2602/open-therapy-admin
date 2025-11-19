import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const JWT_SECRET = "your-super-secret-jwt-key-change-in-production";

export interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}

/**
 * Verify JWT token from request cookies
 */
export function verifyToken(request: NextRequest): DecodedToken | null {
  const token = request.cookies.get("admin_token")?.value;

  console.log("[Auth] Verifying token:", token);
  console.log("[Auth] JWT_SECRET:", JWT_SECRET);

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== "object") {
      console.log("[Auth] Failed to decode token payload");
      return null;
    }

    const { userId, username, role } = decoded as Partial<DecodedToken>;

    if (!userId || !username || !role) {
      console.log("[Auth] Decoded token missing required fields");
      return null;
    }

    return { userId, username, role };
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has required role
 */
export function hasRole(
  userRole: string,
  requiredRole: string | string[]
): boolean {
  if (userRole === "super_admin") {
    return true; // Super admin has access to everything
  }

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }

  return userRole === requiredRole;
}

/**
 * Check if user can access a route based on their role
 */
export function canAccessRoute(userRole: string, route: string): boolean {
  // Super admin can access everything
  if (userRole === "super_admin") {
    return true;
  }

  const restrictedRoutes = ["/bloom-global-prompt"];

  const isRestrictedRoute = restrictedRoutes.some((restrictedRoute) =>
    route.startsWith(restrictedRoute)
  );

  if (isRestrictedRoute && userRole !== "super_admin") {
    return false;
  }

  return true;
}
