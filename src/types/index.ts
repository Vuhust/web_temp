export type ProductCategory = "necklace" | "bracelet" | "ring" | "earring";

export interface Product {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  material: string;
  size?: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  tags: string[];
  inStock: boolean;
  freeShipping: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  nameVi: string;
  slug: string;
  emoji: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Province {
  code: string;
  name: string;
  type?: string;
}

export interface District {
  code: string;
  name: string;
  provinceCode: string;
}

export interface Ward {
  code: string;
  name: string;
  provinceCode: string;
  type?: string;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  provinceCode: string;
  provinceName: string;
  districtCode?: string;
  districtName?: string;
  wardCode: string;
  wardName: string;
  street: string;
  note?: string;
  lat?: number;
  lng?: number;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  address: Address;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  paymentMethod: "cod" | "bank_transfer";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
