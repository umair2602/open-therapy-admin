import mongoose, { Document, Schema } from "mongoose";

export interface BookDocument extends Document {
  category: string;
  title: string;
  description: string;
  imageURL?: string;
  pdfURL?: string;
  author: string;
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
  },
  { timestamps: true }
);

export default mongoose.models.Book ||
  mongoose.model<BookDocument>("Book", BookSchema, "books");
