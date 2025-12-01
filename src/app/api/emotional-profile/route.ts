import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import EmotionalQuestion from "@/models/EmotionalQuestion";

export async function GET() {
  try {
  await dbConnect();
  const docs = await EmotionalQuestion.find().sort({ id: 1 }).lean();
    return NextResponse.json(docs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // support legacy payloads that use `questionId` instead of `id`
    if ((body.id === undefined || body.id === null) && body.questionId !== undefined) {
      const num = typeof body.questionId === 'string' ? Number(body.questionId) : body.questionId;
      body.id = Number.isFinite(num) ? Number(num) : body.questionId;
    }
    await dbConnect();
    
    // If updating an existing question
    const existing = await EmotionalQuestion.findOne({ id: body.id });
    if (existing) {
      existing.set(body);
      await existing.save();
      return NextResponse.json(existing);
    }

    // Auto-increment ID for new questions
    if (!body.id || body.id === null || body.id === undefined) {
      const maxDoc = await EmotionalQuestion.findOne().sort({ id: -1 }).lean();
      body.id = maxDoc ? maxDoc.id + 1 : 1;
    }

    const created = await EmotionalQuestion.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
