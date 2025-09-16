import { API_ENDPOINTS } from "@/api";
import api from "../axios";

export type ChatType = "general" | "emotional_diary" | "area_of_life";
export type AreaOfLifeSubcategory =
  | "relationships"
  | "activeLife"
  | "personalCare"
  | "innerPath";

export interface SuggestedPrompt {
  _id?: string;
  chatType: ChatType;
  subcategory?: AreaOfLifeSubcategory;
  title: string;
  prompt: string;
  tags?: string[];
  isActive: boolean;
}

export const getSuggestedPrompts = async (params?: {
  chatType?: ChatType;
  subcategory?: AreaOfLifeSubcategory;
  isActive?: boolean;
}): Promise<SuggestedPrompt[]> => {
  const res = await api.get(API_ENDPOINTS.SUGGESTED_PROMPTS, { params });
  return res.data;
};

export const createSuggestedPrompt = async (
  data: Partial<SuggestedPrompt>
): Promise<SuggestedPrompt> => {
  const res = await api.post(API_ENDPOINTS.SUGGESTED_PROMPTS, data);
  return res.data;
};

export const updateSuggestedPrompt = async (
  id: string,
  data: Partial<SuggestedPrompt>
): Promise<SuggestedPrompt> => {
  const res = await api.put(`${API_ENDPOINTS.SUGGESTED_PROMPTS}/${id}`, data);
  return res.data;
};

export const deleteSuggestedPrompt = async (id: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.SUGGESTED_PROMPTS}/${id}`);
};
