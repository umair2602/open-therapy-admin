export interface Emotion {
  name: string;
  prompt?: string;
}

export interface EmotionalCategory {
  _id?: string;
  name: string;
  color: string;
  secondary_color: string;
  description: string | null;
  prompt?: string;
  emotions: Emotion[];
}

// Re-export Bloom Global Prompt types
export * from "./types/BloomGlobalPrompt";

// Crisis Prompt types
export interface CrisisPromptContentVariants {
  micro: string;
  standard: string;
  full: string;
}

export interface CrisisPromptContent {
  description: string;
  base_message: string;
  variants: CrisisPromptContentVariants;
  risk_signs: { "pt-BR": string[]; en: string[]; es: string[] };
  slang_variations?: string[];
  exceptions?: string[];
  signal_words?: { "pt-BR": string[]; en: string[]; es: string[] };
  emojis?: string[];
  slangs_pt?: string[];
  variations_pt?: string[];
}

export interface CrisisPrompt {
  _id?: string;
  id: string;
  slug: string;
  type: string;
  title: string;
  category: string;
  level: string;
  jurisdiction: string;
  do_not_do: string[];
  do: string[];
  content: CrisisPromptContent;
}
