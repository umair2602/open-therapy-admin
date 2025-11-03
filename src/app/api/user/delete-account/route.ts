import dbConnect from "@/lib/db/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password, googleId, appleId, authProvider } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate auth provider
    if (!authProvider || !['email', 'google', 'apple'].includes(authProvider)) {
      return NextResponse.json(
        { message: "Valid authentication provider is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Verify authentication based on provider
    if (authProvider === 'email') {
      if (!password) {
        return NextResponse.json(
          { message: "Password is required for email authentication" },
          { status: 400 }
        );
      }
      
      if (!user.password) {
        return NextResponse.json(
          { message: "This account was not registered with email/password" },
          { status: 400 }
        );
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
    } else if (authProvider === 'google') {
      if (!googleId) {
        return NextResponse.json(
          { message: "Google ID is required" },
          { status: 400 }
        );
      }
      
      if (user.googleId !== googleId) {
        return NextResponse.json(
          { message: "Invalid Google authentication" },
          { status: 401 }
        );
      }

      if (!user.googleId) {
        return NextResponse.json(
          { message: "This account was not registered with Google" },
          { status: 400 }
        );
      }
    } else if (authProvider === 'apple') {
      if (!appleId) {
        return NextResponse.json(
          { message: "Apple ID is required" },
          { status: 400 }
        );
      }
      
      if (user.appleId !== appleId) {
        return NextResponse.json(
          { message: "Invalid Apple authentication" },
          { status: 401 }
        );
      }

      if (!user.appleId) {
        return NextResponse.json(
          { message: "This account was not registered with Apple" },
          { status: 400 }
        );
      }
    }

    // Delete the user account
    await User.findByIdAndDelete(user._id);

    return NextResponse.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

