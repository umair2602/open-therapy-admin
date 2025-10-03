import dbConnect from "@/lib/db/mongodb";
import DailyToolCategory from "@/models/DailyTool";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const doc = await DailyToolCategory.findById(id);
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("GET daily tool by id error:", error);
    return NextResponse.json(
      { message: "Error fetching daily tool" },
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
    const doc = await DailyToolCategory.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("PUT daily tool error:", error);
    return NextResponse.json(
      { message: "Error updating daily tool" },
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
    await DailyToolCategory.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE daily tool error:", error);
    return NextResponse.json(
      { message: "Error deleting daily tool" },
      { status: 500 }
    );
  }
}
