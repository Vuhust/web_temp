import { api } from "./axios";
import type { ApiResponse, User } from "@/types";

export const authService = {
  login: (email: string, password: string) =>
    api
      .post<ApiResponse<{ user: User; token: string }>>("/auth/login", { email, password })
      .then((r) => r.data.data),

  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api
      .post<ApiResponse<{ user: User; token: string }>>("/auth/register", data)
      .then((r) => r.data.data),

  getProfile: () => api.get<ApiResponse<User>>("/auth/me").then((r) => r.data.data),
};
