// models/FAQ.ts
import mongoose, { Document, Schema } from "mongoose";

export interface FAQDocument extends Document {
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  displayOrder: number;
}

const FAQSchema = new Schema<FAQDocument>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['General', 'Therapy', 'Platform', 'Billing', 'Privacy'],
      default: 'General'
    },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Index for faster queries
FAQSchema.index({ category: 1, displayOrder: 1 });
FAQSchema.index({ isActive: 1 });

export default mongoose.models.FAQ ||
  mongoose.model<FAQDocument>("FAQ", FAQSchema, "faqs");