import mongoose, { Document, Schema } from "mongoose";

export interface BookDocument extends Document {
  category: string;
  title: string;
  description: string;
  content?: string; // ✅ new rich text content field (HTML string)
  imageURL?: string;
  pdfURL?: string;
  author: string;
  emotionalProfile?: string[];
  directionTags?: string[];
  lifeAreas?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<BookDocument>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String }, // ✅ stores HTML from Tiptap
    imageURL: { type: String },
    pdfURL: { type: String },
    author: { type: String, required: true },
    emotionalProfile: [
      {
        type: String,
        enum: ["PE01", "PE02", "PE03", "PE04", "PE05", "PE06"],
      },
    ],
    directionTags: [{ type: String }],
    lifeAreas: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Book ||
  mongoose.model<BookDocument>("Book", BookSchema, "books");