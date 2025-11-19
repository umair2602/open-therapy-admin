import dbConnect from "@/lib/db/mongodb";
import AdminUser from "@/models/AdminUser";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

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