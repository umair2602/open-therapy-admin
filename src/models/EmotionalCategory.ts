import mongoose, { Schema, Document } from "mongoose";

export interface Emotion {
  name: string;
  prompt?: string;
  points?: number;
}

export interface EmotionalCategoryDocument extends Document {
  name: string;
  color: string;
  secondary_color?: string;
  description?: string;
  prompt?: string;
  type: "healthy" | "unhealthy";
  emotions: Emotion[];
}

const EmotionSchema = new Schema<Emotion>({
  name: { type: String, required: true },
  prompt: { type: String, required: false },
  points: {
    type: Number,
    required: false,
    validate: {
      validator: function (value: number) {
        return value === undefined || Number.isInteger(value);
      },
      message: "points must be an integer",
    },
  },
});

const EmotionalCategorySchema = new Schema<EmotionalCategoryDocument>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    secondary_color: { type: String },
    description: { type: String },
    prompt: { type: String },
    type: { type: String, enum: ["healthy", "unhealthy"], required: true },
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
