import dbConnect from "@/lib/db/mongodb";
import AdminUser from "@/models/AdminUser";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, hasRole } from "@/lib/auth";

// GET - List all admin users (super_admin only)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only super_admin can list admin users
    if (!hasRole(decoded.role, "super_admin")) {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    const adminUsers = await AdminUser.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      users: adminUsers,
    });
  } catch (error) {
    console.error("Get admin users error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new admin user (super_admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only super_admin can create admin users
    if (!hasRole(decoded.role, "super_admin")) {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    const { username, email, password, role } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ["super_admin", "admin", "moderator"];
    const userRole = role || "admin";
    if (!validRoles.includes(userRole)) {
      return NextResponse.json(
        {
          message:
            "Invalid role. Must be one of: super_admin, admin, moderator",
        },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await AdminUser.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await AdminUser.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Create new admin user (password will be hashed by pre-save hook)
    const newAdminUser = new AdminUser({
      username,
      email,
      password,
      role: userRole,
      isActive: true,
    });

    await newAdminUser.save();

    // Return user without password
    const userResponse = await AdminUser.findById(newAdminUser._id).select(
      "-password"
    );

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create admin user error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { message: `${field} already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
