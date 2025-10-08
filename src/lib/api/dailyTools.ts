import { API_ENDPOINTS } from "@/api";
import { DailyToolCategory } from "@/types";
import api from "../axios";

export const getDailyTools = async (): Promise<DailyToolCategory[]> => {
  const res = await api.get(API_ENDPOINTS.DAILY_TOOLS);
  return res.data;
};

export const createDailyToolCategory = async (
  data: Partial<DailyToolCategory>
): Promise<DailyToolCategory> => {
  const res = await api.post(API_ENDPOINTS.DAILY_TOOLS, data);
  return res.data;
};

export const updateDailyToolCategory = async (
  id: string,
  data: Partial<DailyToolCategory>
): Promise<DailyToolCategory> => {
  const res = await api.put(`${API_ENDPOINTS.DAILY_TOOLS}/${id}`, data);
  return res.data;
};

export const deleteDailyToolCategory = async (id: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.DAILY_TOOLS}/${id}`);
};

export const uploadDailyToolAudio = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(`${API_ENDPOINTS.DAILY_TOOLS}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url as string;
};

export const uploadDailyToolIcon = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(
    `${API_ENDPOINTS.DAILY_TOOLS}/upload-icon`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data.url as string;
};
