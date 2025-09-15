import dbConnect from "@/lib/db/mongodb";
import CrisisPrompt from "@/models/CrisisPrompt";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const prompts = await CrisisPrompt.find({});
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error("GET crisis prompts error:", error);
    return NextResponse.json(
      { message: "Error fetching crisis prompts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const doc = await CrisisPrompt.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("POST crisis prompt error:", error);
    return NextResponse.json(
      { message: "Error creating crisis prompt" },
      { status: 500 }
    );
  }
}
