import dbConnect from "@/lib/db/mongodb";
import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const doc = await Book.findById(id);
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("GET book by id error:", error);
    return NextResponse.json(
      { message: "Error fetching book" },
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
    if (body?.pdfURL && typeof body.pdfURL !== "string") {
      return NextResponse.json({ message: "Invalid pdfURL" }, { status: 400 });
    }
    const updated = await Book.findByIdAndUpdate(id, body, { new: true });
    if (!updated)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT book error:", error);
    return NextResponse.json(
      { message: "Error updating book" },
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
    await Book.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE book error:", error);
    return NextResponse.json(
      { message: "Error deleting book" },
      { status: 500 }
    );
  }
}
