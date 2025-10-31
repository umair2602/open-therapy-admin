// models/Resource.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ResourceDocument extends Document {
  name: string;
  type: "manual" | "privacy" | "other";
  fileUrl: string;
  mimeType: string;
  size: number;
  uploadedBy?: mongoose.Types.ObjectId; // optional: admin user ID
  isActive: boolean;
  metadata?: Record<string, any>; // flexible: e.g. version, tags
}

const ResourceSchema = new Schema<ResourceDocument>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["manual", "privacy", "other"],
    },
    fileUrl: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Ensure only one active manual/privacy at a time
ResourceSchema.index({ type: 1, isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });
ResourceSchema.index({ isActive: 1 });

export default mongoose.models.Resource ||
  mongoose.model<ResourceDocument>("Resource", ResourceSchema, "resources");