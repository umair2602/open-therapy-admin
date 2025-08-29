import mongoose, { Schema, Document } from "mongoose";

export interface Emotion {
  name: string;
}

export interface EmotionalCategoryDocument extends Document {
  name: string;
  color: string;
  secondary_color?: string;
  description?: string;
  emotions: Emotion[];
}

const EmotionSchema = new Schema<Emotion>({
  name: { type: String, required: true },
});

const EmotionalCategorySchema = new Schema<EmotionalCategoryDocument>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    secondary_color: { type: String },
    description: { type: String },
    emotions: { type: [EmotionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.EmotionalCategory ||
  mongoose.model<EmotionalCategoryDocument>(
    "EmotionalCategory",
    EmotionalCategorySchema,
    "emotional_categories" // 👈 force same collection name as Beanie
  );
