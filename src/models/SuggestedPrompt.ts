import mongoose, { Schema, Document } from "mongoose";

export type ChatType = "general" | "emotional_diary" | "area_of_life";

export type AreaOfLifeSubcategory =
  | "relationships"
  | "activeLife"
  | "personalCare"
  | "innerPath";

export interface SuggestedPromptDocument extends Document {
  chatType: ChatType;
  subcategory?: AreaOfLifeSubcategory; // required when chatType = area_of_life
  title: string; // short label for the prompt
  prompt: string; // the actual prompt text
  tags?: string[]; // optional tags for filtering/searching
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const SuggestedPromptSchema = new Schema<SuggestedPromptDocument>(
  {
    chatType: {
      type: String,
      required: true,
      enum: ["general", "emotional_diary", "area_of_life"],
      index: true,
    },
    subcategory: {
      type: String,
      enum: ["relationships", "activeLife", "personalCare", "innerPath"],
      index: true,
    },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "suggested_prompts" }
);

// Ensure subcategory is required when chatType is area_of_life
SuggestedPromptSchema.pre("validate", function (next) {
  //@ts-ignore
  if (this.chatType === "area_of_life" && !this.subcategory) {
    //@ts-ignore
    this.invalidate(
      "subcategory",
      "subcategory is required for area_of_life chatType"
    );
  }
  next();
});

export default mongoose.models.SuggestedPrompt ||
  mongoose.model<SuggestedPromptDocument>(
    "SuggestedPrompt",
    SuggestedPromptSchema
  );
