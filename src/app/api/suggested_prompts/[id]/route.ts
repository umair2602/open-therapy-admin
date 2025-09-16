import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import SuggestedPrompt from "@/models/SuggestedPrompt";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    const doc = await SuggestedPrompt.findById(id);
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("GET suggested prompt error:", error);
    return NextResponse.json(
      { message: "Error fetching suggested prompt" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await req.json();
    const doc = await SuggestedPrompt.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("PUT suggested prompt error:", error);
    return NextResponse.json(
      { message: "Error updating suggested prompt" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    const doc = await SuggestedPrompt.findByIdAndDelete(id);
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE suggested prompt error:", error);
    return NextResponse.json(
      { message: "Error deleting suggested prompt" },
      { status: 500 }
    );
  }
}
