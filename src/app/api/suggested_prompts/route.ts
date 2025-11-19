import dbConnect from "@/lib/db/mongodb";
import SuggestedPrompt from "@/models/SuggestedPrompt";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, hasRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
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
    const { searchParams } = new URL(req.url);
    const chatType = searchParams.get("chatType");
    const subcategory = searchParams.get("subcategory");
    const isActive = searchParams.get("isActive");

    const filter: any = {};
    if (chatType) filter.chatType = chatType;
    if (subcategory) filter.subcategory = subcategory;
    if (isActive != null) filter.isActive = isActive === "true";

    const prompts = await SuggestedPrompt.find(filter).sort({ updatedAt: -1 });
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error("GET suggested prompts error:", error);
    return NextResponse.json(
      { message: "Error fetching suggested prompts" },
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
    const doc = await SuggestedPrompt.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("POST suggested prompt error:", error);
    return NextResponse.json(
      { message: "Error creating suggested prompt" },
      { status: 500 }
    );
  }
}
