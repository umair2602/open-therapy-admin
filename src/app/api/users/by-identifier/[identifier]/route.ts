import dbConnect from "@/lib/db/mongodb";
import User, { type IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  await dbConnect();
  try {
    const { identifier } = await params;
    console.log("Looking for user with email/phone:", identifier);
    
    // Query by email OR phone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    })
      .select('-hashed_password -access_token -refresh_token -password_reset_otp -email_verification_otp')
      .lean<IUser>();
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    console.log("Found user:", user.username);
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("GET user error:", error);
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  await dbConnect();
  try {
    const { identifier } = await params;
    const body = await req.json();
    
    console.log("Updating user with email/phone:", identifier);
    
    // Remove sensitive fields that shouldn't be updated via this endpoint
    const { hashed_password, access_token, refresh_token, password_reset_otp, email_verification_otp, _id, id: userId, ...updateData } = body;
    
    // Add updated_at timestamp
    updateData.updated_at = new Date();
    
    console.log("Update data:", JSON.stringify(updateData, null, 2));
    
    // Query by email OR phone
    let user: IUser | null = null;
    user = await User.findOneAndUpdate(
        {
          $or: [
            { email: identifier },
            { phone: identifier }
          ]
        },
        { $set: updateData },
        { new: true, runValidators: true }
      )
        .select('-hashed_password -access_token -refresh_token -password_reset_otp -email_verification_otp')
        .lean<IUser>() as IUser | null;
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    console.log("User updated successfully:", user.username);
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("PUT user error:", error);
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  await dbConnect();
  try {
    const { identifier } = await params;
    console.log("Deleting user with email/phone:", identifier);
    
    // Query by email OR phone
    const user = await User.findOneAndDelete({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    }).lean<IUser>();
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    console.log("User deleted successfully:", user.username);
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE user error:", error);
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
