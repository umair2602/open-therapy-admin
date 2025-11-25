import { API_ENDPOINTS } from "@/api";
import api from "../axios";

export interface User {
  _id: string; // MongoDB's _id field contains the UUID
  email?: string;
  phone?: string;
  username: string;
  accountType: string;
  gender: string;
  dob: string;
  emotionalTest?: Array<Record<string, any>>;
  profileScores: Record<string, any>;
  userConsent: boolean;
  plan?: Record<string, any>;
  disabled: boolean;
  google_sub?: string;
  apple_sub?: string;
  token_expires_at?: string;
  parent_email?: string;
  emergency_contact?: string;
  email_verified: boolean;
  // Free Trial - Nested Object (Optional)
  trial?: {
    is_active: boolean;
    status: string; // 'active', 'expired', 'never_started', 'converted'
    start_date: string;
    end_date: string;
  };
  created_at: string;
  updated_at?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get(API_ENDPOINTS.USERS);
  return res.data;
};

export const getUser = async (id: string): Promise<User> => {
  const res = await api.get(`${API_ENDPOINTS.USERS}/${id}`);
  return res.data;
};

// New functions using email/phone identifier
export const getUserByIdentifier = async (identifier: string): Promise<User> => {
  const res = await api.get(`${API_ENDPOINTS.USERS}/by-identifier/${identifier}`);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const res = await api.put(`${API_ENDPOINTS.USERS}/${id}`, data);
  return res.data;
};

export const updateUserByIdentifier = async (
  identifier: string,
  data: Partial<User>
): Promise<User> => {
  const res = await api.put(`${API_ENDPOINTS.USERS}/by-identifier/${identifier}`, data);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.USERS}/${id}`);
};

export const deleteUserByIdentifier = async (identifier: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.USERS}/by-identifier/${identifier}`);
};
