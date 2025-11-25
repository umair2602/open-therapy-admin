import dbConnect from "@/lib/db/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId, UUID } from "bson";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    console.log("\n=== GET USER DIAGNOSTIC ===");
    console.log("Received ID:", id);
    console.log("ID type:", typeof id);
    
    let user = null;
    
    // TEST 1: Try with string _id directly
    console.log("\n--- TEST 1: Query with STRING _id ---");
    try {
      user = await User.findOne({ _id: id })
        .select('-hashed_password -access_token -refresh_token -password_reset_otp -email_verification_otp')
        .lean();
      
      if (user) {
        console.log("✅ SUCCESS! Found user with STRING _id");
        console.log("Username:", user.username);
      } else {
        console.log("❌ User NOT FOUND with string _id");
      }
    } catch (error: any) {
      console.log("❌ String query ERROR:", error.message);
    }
    
    // TEST 2: If not found, try with BSON UUID
    if (!user) {
      console.log("\n--- TEST 2: Query with BSON UUID ---");
      try {
        const bsonId = new UUID(id);
        console.log("BSON UUID created:", bsonId.toString());
        console.log("BSON UUID type:", typeof bsonId);
        
        user = await User.findOne({ _id: bsonId })
          .select('-hashed_password -access_token -refresh_token -password_reset_otp -email_verification_otp')
          .lean();
        
        if (user) {
          console.log("✅ SUCCESS! Found user with BSON UUID");
          console.log("Username:", user.username);
        } else {
          console.log("❌ User NOT FOUND with BSON UUID");
        }
      } catch (error: any) {
        console.log("❌ BSON UUID query ERROR:", error.message);
      }
    }
    
    console.log("=== END GET DIAGNOSTIC ===\n");
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
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
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    
    console.log("\n=== PUT USER DEBUG ===");
    console.log("Received ID:", id);
    
    // Remove sensitive fields that shouldn't be updated via this endpoint
    const { hashed_password, access_token, refresh_token, password_reset_otp, email_verification_otp, _id, id: userId, ...updateData } = body;
    
    // Add updated_at timestamp
    updateData.updated_at = new Date();
    
    console.log("Update data:", JSON.stringify(updateData, null, 2));
    
    let user = null;
    
    // TEST 1: Try with string _id (most likely to work)
    console.log("\n--- Trying STRING query ---");
    try {
      const user = await User.findOne({ _id: id });
      // user = await User.findOneAndUpdate(
      //   { _id: id },
      //   { $set: updateData },
      //   { new: true, runValidators: true }
      // )
      //   .select('-hashed_password -access_token -refresh_token -password_reset_otp -email_verification_otp')
      //   .lean();
      
      if (user) {
        console.log("✓ SUCCESS with string _id");
      } else {
        console.log("✗ User not found with string _id");
      }
    } catch (error: any) {
      console.log("✗ String query error:", error.message);
    }
    
    // TEST 2: If string didn't work, try BSON UUID
    if (!user) {
      console.log("\n--- Trying BSON UUID query ---");
      try {
        const bsonId = new UUID(id);
        const user = await User.findOne({ _id: bsonId });
        // user = await User.findOneAndUpdate(
        //   { _id: bsonId },
        //   { $set: updateData },
        //   { new: true, runValidators: true }
        // )
        //   .select('-hashed_password -access_token -refresh_token -password_reset_otp -email_verification_otp')
        //   .lean();
        
        if (user) {
          console.log("✓ SUCCESS with BSON UUID");
        } else {
          console.log("✗ User not found with BSON UUID");
        }
      } catch (error: any) {
        console.log("✗ BSON UUID query error:", error.message);
      }
    }
    
    console.log("=== END DEBUG ===\n");
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    console.log("Deleting user with _id:", id);
    
    // Convert string UUID to BSON UUID for querying
    const bsonId = new UUID(id);
    
    // Query by _id field where UUID is stored as Binary
    const user = await User.findOneAndDelete({ _id: bsonId }).lean();
    
    console.log("Deleted user:", user);
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE user error:", error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}
