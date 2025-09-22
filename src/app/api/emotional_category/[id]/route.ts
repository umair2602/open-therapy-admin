import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import EmotionalCategory from "@/models/EmotionalCategory";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params; // ✅ must await

  try {
    const category = await EmotionalCategory.findById(id);
    if (!category) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("GET category error:", error);
    return NextResponse.json(
      { message: "Error fetching category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params; // ✅ must await

  try {
    console.log("Id is", id);
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
    // Ensure validation runs on update
    const category = await EmotionalCategory.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("PUT category error:", error);
    return NextResponse.json(
      { message: "Error updating category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params; // ✅ must await

  try {
    const category = await EmotionalCategory.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE category error:", error);
    return NextResponse.json(
      { message: "Error deleting category" },
      { status: 500 }
    );
  }
}
