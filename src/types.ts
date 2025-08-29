export interface Emotion {
  name: string;
}

export interface EmotionalCategory {
  _id?: string;
  name: string;
  color: string;
  secondary_color: string;
  description: string | null;
  emotions: Emotion[];
}