import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import CrisisPrompt from "@/models/CrisisPrompt";
import { verifyToken, hasRole } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
  const { id } = await params;
  try {
    const doc = await CrisisPrompt.findById(id);
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("GET crisis prompt error:", error);
    return NextResponse.json(
      { message: "Error fetching crisis prompt" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
  const { id } = await params;
  try {
    const body = await req.json();
    const doc = await CrisisPrompt.findByIdAndUpdate(id, body, { new: true });
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("PUT crisis prompt error:", error);
    return NextResponse.json(
      { message: "Error updating crisis prompt" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
  const { id } = await params;
  try {
    const doc = await CrisisPrompt.findByIdAndDelete(id);
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE crisis prompt error:", error);
    return NextResponse.json(
      { message: "Error deleting crisis prompt" },
      { status: 500 }
    );
  }
}
