import mongoose, { Schema, Document } from "mongoose";

export interface ICrisisPromptContentVariants {
  micro: string;
  standard: string;
  full: string;
}

export interface ICrisisPromptRiskSigns {
  "pt-BR": string[];
  en: string[];
  es: string[];
}

export interface ICrisisPromptSignalWords {
  "pt-BR": string[];
  en: string[];
  es: string[];
}

export interface ICrisisPromptContent {
  description: string;
  base_message: string;
  variants: ICrisisPromptContentVariants;
  risk_signs: ICrisisPromptRiskSigns;
  slang_variations?: string[];
  exceptions?: string[];
  signal_words?: ICrisisPromptSignalWords;
  emojis?: string[];
  slangs_pt?: string[];
  variations_pt?: string[];
}

export interface ICrisisPrompt extends Document {
  id: string;
  slug: string;
  type: string; // e.g., "crisis"
  title: string;
  category: string;
  level: string; // e.g., "alto", "moderado"
  jurisdiction: string; // e.g., "BR"
  do_not_do: string[];
  do: string[];
  content: ICrisisPromptContent;
  createdAt?: Date;
  updatedAt?: Date;
}

const CrisisPromptContentVariantsSchema =
  new Schema<ICrisisPromptContentVariants>(
    {
      micro: { type: String, required: true },
      standard: { type: String, required: true },
      full: { type: String, required: true },
    },
    { _id: false }
  );

const CrisisPromptContentSchema = new Schema<ICrisisPromptContent>(
  {
    description: { type: String, required: true },
    base_message: { type: String, required: true },
    variants: { type: CrisisPromptContentVariantsSchema, required: true },
    risk_signs: {
      type: new Schema<ICrisisPromptRiskSigns>(
        {
          "pt-BR": { type: [String], default: [] },
          en: { type: [String], default: [] },
          es: { type: [String], default: [] },
        },
        { _id: false }
      ),
      required: true,
    },
    slang_variations: { type: [String], default: [] },
    exceptions: { type: [String], default: [] },
    signal_words: new Schema<ICrisisPromptSignalWords>(
      {
        "pt-BR": { type: [String], default: [] },
        en: { type: [String], default: [] },
        es: { type: [String], default: [] },
      },
      { _id: false }
    ),
    emojis: { type: [String], default: [] },
    slangs_pt: { type: [String], default: [] },
    variations_pt: { type: [String], default: [] },
  },
  { _id: false }
);

const CrisisPromptSchema = new Schema<ICrisisPrompt>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, index: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    jurisdiction: { type: String, required: true },
    do_not_do: { type: [String], default: [] },
    do: { type: [String], default: [] },
    content: { type: CrisisPromptContentSchema, required: true },
  },
  { timestamps: true, collection: "crisis_prompts" }
);

export default mongoose.models.CrisisPrompt ||
  mongoose.model<ICrisisPrompt>("CrisisPrompt", CrisisPromptSchema);
