import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Đã có lỗi xảy ra";
    return Promise.reject(new Error(message));
  }
);
