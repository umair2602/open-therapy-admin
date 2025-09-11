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
