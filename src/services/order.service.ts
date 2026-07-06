import { api } from "./axios";
import type { ApiResponse, Order, Address } from "@/types";

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[];
  address: Omit<Address, "id">;
  paymentMethod: "cod" | "bank_transfer";
}

export const orderService = {
  createOrder: (payload: CreateOrderPayload) =>
    api.post<ApiResponse<Order>>("/orders", payload).then((r) => r.data.data),

  getOrders: () => api.get<ApiResponse<Order[]>>("/orders").then((r) => r.data.data),

  getOrder: (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`).then((r) => r.data.data),
};
