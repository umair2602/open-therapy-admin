import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import EmotionalProfile from "@/models/EmotionalProfile";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await dbConnect();
    const doc = await EmotionalProfile.findOne({ id }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    await dbConnect();
    const updated = await EmotionalProfile.findOneAndUpdate({ id }, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await dbConnect();
    const deleted = await EmotionalProfile.findOneAndDelete({ id });
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
