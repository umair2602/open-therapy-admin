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
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    // Normalize payload: coerce emotion.points to number if provided
    if (Array.isArray(body?.emotions)) {
      body.emotions = body.emotions.map((emotion: any) => ({
        ...emotion,
        points:
          emotion?.points === undefined ||
          emotion?.points === null ||
          emotion?.points === ""
            ? undefined
            : Number.parseInt(emotion.points as any, 10),
      }));
    }
    // Basic log for debugging
    console.log("Creating EmotionalCategory with body:", JSON.stringify(body));
    const category = await EmotionalCategory.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json(
      { message: "Error creating category" },
      { status: 500 }
    );
  }
}
