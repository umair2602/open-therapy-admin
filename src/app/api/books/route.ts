import dbConnect from "@/lib/db/mongodb";
import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const books = await Book.find({});
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("GET books error:", error);
    return NextResponse.json(
      { message: "Error fetching books" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    // Optional: enforce that if pdfURL is provided, it looks like a URL
    if (body?.pdfURL && typeof body.pdfURL !== "string") {
      return NextResponse.json({ message: "Invalid pdfURL" }, { status: 400 });
    }
    const created = await Book.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST book error:", error);
    return NextResponse.json(
      { message: "Error creating book" },
      { status: 500 }
    );
  }
}
