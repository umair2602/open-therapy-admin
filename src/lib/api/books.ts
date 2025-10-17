import { API_ENDPOINTS } from "@/api";
import api from "../axios";

export interface Book {
  _id?: string;
  category: string;
  title: string;
  description: string;
  imageURL?: string;
  pdfURL?: string;
  author: string;
  emotionalProfile?: string[];
  directionTags?: string[];
  lifeAreas?: string[]; 
}

export const getBooks = async (): Promise<Book[]> => {
  const res = await api.get(API_ENDPOINTS.BOOKS);
  return res.data;
};

export const createBook = async (data: Partial<Book>): Promise<Book> => {
  const res = await api.post(API_ENDPOINTS.BOOKS, data);
  return res.data;
};

export const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const res = await api.put(`${API_ENDPOINTS.BOOKS}/${id}`, data);
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.BOOKS}/${id}`);
};

export const uploadBookImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(`${API_ENDPOINTS.BOOKS}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url as string;
};

export const uploadBookPdf = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(`${API_ENDPOINTS.BOOKS}/upload-pdf`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url as string;
};
