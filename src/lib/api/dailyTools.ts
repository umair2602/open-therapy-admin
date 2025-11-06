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
  // 1) Ask server for a pre-signed S3 upload URL to avoid large request bodies on Vercel
  const signRes = await api.post(`${API_ENDPOINTS.DAILY_TOOLS}/sign-upload`, {
    fileName: file.name,
    fileType: file.type || "audio/mpeg",
  });

  const { uploadUrl, publicUrl } = signRes.data as {
    uploadUrl: string;
    publicUrl: string;
  };

  // 2) Upload file directly to S3 using the signed URL
  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "audio/mpeg",
    },
    body: file,
  });

  if (!putRes.ok) {
    const text = await putRes.text().catch(() => "");
    throw new Error(`Failed to upload audio to storage: ${putRes.status} ${text}`);
  }

  // 3) Return the public URL to be stored in DB
  return publicUrl;
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
