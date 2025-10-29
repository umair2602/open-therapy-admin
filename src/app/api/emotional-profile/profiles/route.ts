import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import EmotionalProfile from "@/models/EmotionalProfile";

export async function GET() {
  try {
    await dbConnect();
    const docs = await EmotionalProfile.find().sort({ createdAt: 1 }).lean();
    return NextResponse.json(docs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const existing = await EmotionalProfile.findOne({ id: body.id });
    if (existing) {
      existing.set(body);
      await existing.save();
      return NextResponse.json(existing);
    }
    const created = await EmotionalProfile.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
