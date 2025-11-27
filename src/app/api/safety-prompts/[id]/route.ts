import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import SafetyPrompt from "@/models/SafetyPrompt";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const prompt = await SafetyPrompt.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!prompt) {
      return NextResponse.json(
        { error: "Safety prompt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error updating safety prompt:", error);
    return NextResponse.json(
      { error: "Failed to update safety prompt" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const prompt = await SafetyPrompt.findByIdAndDelete(params.id);

    if (!prompt) {
      return NextResponse.json(
        { error: "Safety prompt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Safety prompt deleted" });
  } catch (error) {
    console.error("Error deleting safety prompt:", error);
    return NextResponse.json(
      { error: "Failed to delete safety prompt" },
      { status: 500 }
    );
  }
}
