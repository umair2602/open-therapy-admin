import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import CrisisPrompt from "@/models/CrisisPrompt";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
