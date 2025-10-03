import mongoose, { Document, Schema } from "mongoose";

export interface DailyToolItem {
  name: string;
  desc?: string;
  audioUrl?: string; // Stored URL under /uploads or external
}

export interface DailyToolCategoryDocument extends Document {
  title: string;
  icon?: string; // optional icon key/name used by RN app
  tools: DailyToolItem[];
}

const DailyToolItemSchema = new Schema<DailyToolItem>({
  name: { type: String, required: true },
  desc: { type: String },
  audioUrl: { type: String },
});

const DailyToolCategorySchema = new Schema<DailyToolCategoryDocument>(
  {
    title: { type: String, required: true },
    icon: { type: String },
    tools: { type: [DailyToolItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.DailyToolCategory ||
  mongoose.model<DailyToolCategoryDocument>(
    "DailyToolCategory",
    DailyToolCategorySchema,
    "daily_tool_categories"
  );
