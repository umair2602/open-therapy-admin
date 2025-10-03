import dbConnect from "@/lib/db/mongodb";
import DailyToolCategory from "@/models/DailyTool";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const docs = await DailyToolCategory.find({});
    return NextResponse.json(docs, { status: 200 });
  } catch (error) {
    console.error("GET daily tools error:", error);
    return NextResponse.json(
      { message: "Error fetching daily tools" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const doc = await DailyToolCategory.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("POST daily tools error:", error);
    return NextResponse.json(
      { message: "Error creating daily tool category" },
      { status: 500 }
    );
  }
}
