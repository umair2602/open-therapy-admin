import dbConnect from "@/lib/db/mongodb";
import EmotionalCategory from "@/models/EmotionalCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const categories = await EmotionalCategory.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json({ message: "Error fetching categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const category = await EmotionalCategory.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json({ message: "Error creating category" }, { status: 500 });
  }
}