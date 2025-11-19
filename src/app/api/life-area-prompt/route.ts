import dbConnect from "@/lib/db/mongodb";
import LifeAreaPromptSchema from "@/models/LifeAreaPrompt";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, hasRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Check authentication and role
  const decoded = verifyToken(request);
  if (!decoded) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only super_admin can access prompt routes
  if (!hasRole(decoded.role, "super_admin")) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }
  await dbConnect();
  try {
    const categories = await LifeAreaPromptSchema.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json({ message: "Error fetching categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Check authentication and role
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only super_admin can access prompt routes
  if (!hasRole(decoded.role, "super_admin")) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  await dbConnect();
  try {
    const body = await req.json();
    const category = await LifeAreaPromptSchema.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json({ message: "Error creating category" }, { status: 500 });
  }
}