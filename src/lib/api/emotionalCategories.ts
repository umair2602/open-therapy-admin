// lib/api/emotionalCategories.ts
import { API_ENDPOINTS } from "@/api";
import api from "@/lib/axios";

export interface Emotion {
  name: string;
}

export interface EmotionalCategory {
  id: string;
  name: string;
  color: string;
  secondary_color?: string;
  description?: string | null;
  emotions: Emotion[];
}

export const getCategories = async (token?: string): Promise<EmotionalCategory[]> => {
  const res = await api.get(API_ENDPOINTS.EMOTIONAL_CATEGORY, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const createCategory = async (
  data: Partial<EmotionalCategory>,
  token?: string,
): Promise<EmotionalCategory> => {
  const res = await api.post(API_ENDPOINTS.EMOTIONAL_CATEGORY, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const updateCategory = async (
  id: string,
  data: Partial<EmotionalCategory>,
  token?: string,
): Promise<EmotionalCategory> => {
  const res = await api.put(`${API_ENDPOINTS.EMOTIONAL_CATEGORY}/${id}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const deleteCategory = async (id: string, token?: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.EMOTIONAL_CATEGORY}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
