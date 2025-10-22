// app/api/admin/profile/route.ts
import dbConnect from "@/lib/db/mongodb";
import AdminUser from "@/models/AdminUser";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Helper function to verify token
function verifyToken(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
      role: string;
    };
  } catch (error) {
    return null;
  }
}

// GET - Get current admin profile
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const adminUser = await AdminUser.findById(decoded.userId).select('-password');
    
    if (!adminUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        isActive: adminUser.isActive,
        lastLogin: adminUser.lastLogin,
        createdAt: adminUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update admin profile
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { username, email } = await request.json();

    if (!username || !email) {
      return NextResponse.json(
        { message: "Username and email are required" },
        { status: 400 }
      );
    }

    // Check if username is already taken by another user
    const existingUser = await AdminUser.findOne({
      username,
      _id: { $ne: decoded.userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const existingEmail = await AdminUser.findOne({
      email,
      _id: { $ne: decoded.userId },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Update user
    const adminUser = await AdminUser.findByIdAndUpdate(
      decoded.userId,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!adminUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Generate new token with updated username
    const token = jwt.sign(
      {
        userId: adminUser._id,
        username: adminUser.username,
        role: adminUser.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const res = NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
      },
    });

    // Update cookie with new token
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ==========================================
// app/api/admin/change-password/route.ts

export async function PUT_CHANGE_PASSWORD(request: NextRequest) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Find admin user
    const adminUser = await AdminUser.findById(decoded.userId);
    
    if (!adminUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await adminUser.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Update password (pre-save hook will hash it)
    adminUser.password = newPassword;
    await adminUser.save();

    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}