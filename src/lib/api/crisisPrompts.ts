import { API_ENDPOINTS } from "@/api";
import { CrisisPrompt } from "@/types";
import api from "../axios";

export const getCrisisPrompts = async (): Promise<CrisisPrompt[]> => {
  const res = await api.get(API_ENDPOINTS.CRISIS_PROMPT);
  return res.data;
};

export const createCrisisPrompt = async (
  data: Partial<CrisisPrompt>
): Promise<CrisisPrompt> => {
  const res = await api.post(API_ENDPOINTS.CRISIS_PROMPT, data);
  return res.data;
};

export const updateCrisisPrompt = async (
  id: string,
  data: Partial<CrisisPrompt>
): Promise<CrisisPrompt> => {
  const res = await api.put(`${API_ENDPOINTS.CRISIS_PROMPT}/${id}`, data);
  return res.data;
};

export const deleteCrisisPrompt = async (id: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.CRISIS_PROMPT}/${id}`);
};
