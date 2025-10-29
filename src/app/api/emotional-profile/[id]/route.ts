import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import EmotionalQuestion from "@/models/EmotionalQuestion";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    await dbConnect();
    const doc = await EmotionalQuestion.findOne({ id }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const body = await req.json();
    // support legacy payloads that use `questionId` instead of `id`
    if ((body.id === undefined || body.id === null) && body.questionId !== undefined) {
      const num = typeof body.questionId === 'string' ? Number(body.questionId) : body.questionId;
      body.id = Number.isFinite(num) ? Number(num) : body.questionId;
    }
    await dbConnect();
    const updated = await EmotionalQuestion.findOneAndUpdate({ id }, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    await dbConnect();
    const deleted = await EmotionalQuestion.findOneAndDelete({ id });
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}