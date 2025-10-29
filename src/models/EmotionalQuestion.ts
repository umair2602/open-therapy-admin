import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for Option subdocument
export interface IOption {
  id: string;
  text: string;
}

// Option with profile tags (e.g., ['PE02','PE06'])
export interface IOptionWithTags extends IOption {
  profileTags?: string[];
}

// Interface for EmotionalQuestion document
export interface IEmotionalQuestion {
  id: number; // Changed from questionId to match hardcoded questions
  category: string;
  question: string;
  // each option may include profile tag ids like ['PE02','PE06']
  options: IOptionWithTags[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for EmotionalQuestion document with Mongoose methods
//@ts-ignore
export interface IEmotionalQuestionDocument extends IEmotionalQuestion, Document {
  _id: mongoose.Types.ObjectId;
}

// Option Schema
const OptionSchema = new Schema<IOptionWithTags>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    profileTags: { type: [String], default: [] },
  },
  { _id: false } // Disable _id for subdocuments
);

// EmotionalQuestion Schema
const EmotionalQuestionSchema = new Schema<IEmotionalQuestionDocument>(
  {
    id: { type: Number, required: true, unique: true }, // Now matches the interface
    category: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [OptionSchema], default: [] },
  },
  { 
    timestamps: true, 
    collection: "emotional_questions" 
  }
);

// Export the model with proper typing
const EmotionalQuestion: Model<IEmotionalQuestionDocument> = 
  mongoose.models.EmotionalQuestion || 
  mongoose.model<IEmotionalQuestionDocument>(
    "EmotionalQuestion", 
    EmotionalQuestionSchema, 
    "emotional_questions"
  );

export default EmotionalQuestion;