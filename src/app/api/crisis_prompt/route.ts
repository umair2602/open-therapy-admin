import dbConnect from "@/lib/db/mongodb";
import CrisisPrompt from "@/models/CrisisPrompt";
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
    const prompts = await CrisisPrompt.find({});
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error("GET crisis prompts error:", error);
    return NextResponse.json(
      { message: "Error fetching crisis prompts" },
      { status: 500 }
    );
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
    const doc = await CrisisPrompt.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("POST crisis prompt error:", error);
    return NextResponse.json(
      { message: "Error creating crisis prompt" },
      { status: 500 }
    );
  }
}
