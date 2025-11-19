import dbConnect from "@/lib/db/mongodb";
import AdminUser from "@/models/AdminUser";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find admin user
    const adminUser = await AdminUser.findOne({ username, isActive: true });
    if (!adminUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await adminUser.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    adminUser.lastLogin = new Date();
    await adminUser.save();

    // Generate JWT token
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
      message: "Login successful",
      user: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
      },
      token: token,
    });

    // Set httpOnly cookie
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
