import mongoose from "mongoose";

const EmotionalProfileSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tag: { type: String, required: true },
  },
  { timestamps: true, collection: "emotional_profiles"  }
);

export default mongoose.models.EmotionalProfile || mongoose.model("EmotionalProfile", EmotionalProfileSchema, "emotional_profiles");
