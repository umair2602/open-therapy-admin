import mongoose, { Document, Schema } from "mongoose";

export interface BookDocument extends Document {
  category: string;
  title: string;
  description: string;
  imageURL?: string;
  pdfURL?: string;
  author: string;
  emotionalProfile?: string[]; // array of selected emotional codes
  directionTags?: string[]; // ✅ new field
  lifeAreas?: string[]; // ✅ new field
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<BookDocument>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String },
    pdfURL: { type: String },
    author: { type: String, required: true },
    emotionalProfile: [
      {
        type: String,
        enum: ["PE01", "PE02", "PE03", "PE04", "PE05", "PE06"],
      },
    ],
    directionTags: [
      {
        type: String,
        // ✅ you can define fixed enums later if you want (example shown below)
        // enum: ["D01", "D02", "D03", "D04"],
      },
    ],
    lifeAreas: [
      {
        type: String,
        // enum: ["L01", "L02", "L03", "L04", "L05"], // optional: define allowed codes
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Book ||
  mongoose.model<BookDocument>("Book", BookSchema, "books");
