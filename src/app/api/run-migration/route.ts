import { NextResponse } from "next/server";
import mongoose from "mongoose";
import EmotionalCategory from "@/models/EmotionalCategory";

const DIRECTION_TAGS = [
  "calm_down",
  "breathe",
  "anchor_present",
  "grounding",
  "self_compassion",
];

function getRandomTags() {
  const shuffled = [...DIRECTION_TAGS].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
  return shuffled.slice(0, count);
}

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    const categories = await EmotionalCategory.find();
    let updatedCount = 0;

    for (const category of categories) {
      let modified = false;

      for (const emotion of category.emotions) {
        if (!emotion.directionTags || emotion.directionTags.length === 0) {
          emotion.directionTags = getRandomTags();
          modified = true;
        }
      }

      if (modified) {
        await category.save();
        updatedCount++;
      }
    }

    await mongoose.disconnect();

    return NextResponse.json({
      success: true,
      updatedCount,
      message: `Updated ${updatedCount} emotional categories.`,
    });
  } catch (err: any) {
    console.error("❌ Migration failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
