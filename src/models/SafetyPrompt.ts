import mongoose, { Schema, Document } from "mongoose";

export interface ISafetyPrompt extends Document {
  content: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SafetyPromptSchema = new Schema<ISafetyPrompt>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "safety_prompts",
  }
);

export default mongoose.models.SafetyPrompt ||
  mongoose.model<ISafetyPrompt>("SafetyPrompt", SafetyPromptSchema);
