import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import SafetyPrompt from "@/models/SafetyPrompt";

export async function GET() {
  try {
    await dbConnect();
    const prompts = await SafetyPrompt.find({}).sort({ createdAt: -1 });
    return NextResponse.json(prompts);
  } catch (error) {
    console.error("Error fetching safety prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch safety prompts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const prompt = await SafetyPrompt.create(body);
    return NextResponse.json(prompt, { status: 201 });
  } catch (error) {
    console.error("Error creating safety prompt:", error);
    return NextResponse.json(
      { error: "Failed to create safety prompt" },
      { status: 500 }
    );
  }
}
