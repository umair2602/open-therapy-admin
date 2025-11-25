import dbConnect from "@/lib/db/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({})
      .select('')
      .lean(); // Convert to plain JavaScript objects
    console.log('users', users[83])
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}
