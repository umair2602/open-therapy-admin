import dbConnect from "@/lib/db/mongodb";
import AdminUser from "@/models/AdminUser";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, hasRole } from "@/lib/auth";

// PUT - Update admin user (super_admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only super_admin can update admin users
    if (!hasRole(decoded.role, "super_admin")) {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { username, email, role, isActive } = await request.json();

    // Validate role if provided
    if (role) {
      const validRoles = ["super_admin", "admin", "moderator"];
      if (!validRoles.includes(role)) {
        return NextResponse.json(
          {
            message:
              "Invalid role. Must be one of: super_admin, admin, moderator",
          },
          { status: 400 }
        );
      }
    }

    // Check if username already exists (excluding current user)
    if (username) {
      const existingUsername = await AdminUser.findOne({
        username,
        _id: { $ne: id },
      });
      if (existingUsername) {
        return NextResponse.json(
          { message: "Username already exists" },
          { status: 400 }
        );
      }
    }

    // Check if email already exists (excluding current user)
    if (email) {
      const existingEmail = await AdminUser.findOne({
        email,
        _id: { $ne: id },
      });
      if (existingEmail) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }
    }

    // Update admin user
    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedAdmin = await AdminUser.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return NextResponse.json(
        { message: "Admin user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Admin user updated successfully",
      user: updatedAdmin,
    });
  } catch (error: any) {
    console.error("Update admin user error:", error);

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

// DELETE - Delete admin user (super_admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only super_admin can delete admin users
    if (!hasRole(decoded.role, "super_admin")) {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Prevent self-deletion
    if (decoded.userId === id) {
      return NextResponse.json(
        { message: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete admin user
    const deletedAdmin = await AdminUser.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return NextResponse.json(
        { message: "Admin user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
