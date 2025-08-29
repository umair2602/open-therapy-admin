import { API_ENDPOINTS } from "@/api";
import { EmotionalCategory } from "@/types";
import api from "../axios";

export const getCategories = async (): Promise<EmotionalCategory[]> => {
  const res = await api.get(API_ENDPOINTS.EMOTIONAL_CATEGORY);
  return res.data;
};

export const createCategory = async (
  data: Partial<EmotionalCategory>
): Promise<EmotionalCategory> => {
  const res = await api.post(API_ENDPOINTS.EMOTIONAL_CATEGORY, data);
  return res.data;
};

export const updateCategory = async (
  id: any,
  data: Partial<EmotionalCategory>
): Promise<EmotionalCategory> => {
  const res = await api.put(`${API_ENDPOINTS.EMOTIONAL_CATEGORY}/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: any): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.EMOTIONAL_CATEGORY}/${id}`);
};
