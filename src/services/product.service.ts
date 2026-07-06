import { api } from "./axios";
import type { ApiResponse, PaginatedResponse, Product, Category, Review } from "@/types";

export const productService = {
  getCategories: () =>
    api.get<ApiResponse<Category[]>>("/categories").then((r) => r.data.data),

  getProducts: (params?: { category?: string; page?: number; pageSize?: number; search?: string }) =>
    api
      .get<ApiResponse<PaginatedResponse<Product>>>("/products", { params })
      .then((r) => r.data.data),

  getProduct: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/${slug}`).then((r) => r.data.data),

  getRelatedProducts: (slug: string) =>
    api
      .get<ApiResponse<Product[]>>(`/products/${slug}/related`)
      .then((r) => r.data.data),

  getReviews: (productId: string) =>
    api
      .get<ApiResponse<Review[]>>(`/products/${productId}/reviews`)
      .then((r) => r.data.data),
};
