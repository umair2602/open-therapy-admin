// lib/axios.ts
import { API_CONFIG } from "@/api";
import axios from "axios";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;