import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  selectedIds: string[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelected: (productId: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  removeItems: (productIds: string[]) => void;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  getTotal: (productIds?: string[]) => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedIds: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              selectedIds: state.selectedIds.includes(product.id)
                ? state.selectedIds
                : [...state.selectedIds, product.id],
            };
          }
          return {
            items: [...state.items, { product, quantity }],
            selectedIds: [...state.selectedIds, product.id],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
          selectedIds: state.selectedIds.filter((id) => id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      toggleSelected: (productId) => {
        set((state) => ({
          selectedIds: state.selectedIds.includes(productId)
            ? state.selectedIds.filter((id) => id !== productId)
            : [...state.selectedIds, productId],
        }));
      },
      selectAll: () => {
        set((state) => ({
          selectedIds: state.items.map((i) => i.product.id),
        }));
      },
      deselectAll: () => set({ selectedIds: [] }),
      removeItems: (productIds) => {
        set((state) => ({
          items: state.items.filter((i) => !productIds.includes(i.product.id)),
          selectedIds: state.selectedIds.filter((id) => !productIds.includes(id)),
        }));
      },
      clearCart: () => set({ items: [], selectedIds: [] }),
      getSelectedItems: () => {
        const { items, selectedIds } = get();
        return items.filter((i) => selectedIds.includes(i.product.id));
      },
      getTotal: (productIds) => {
        const { items, selectedIds } = get();
        const ids = productIds ?? selectedIds;
        return items
          .filter((i) => ids.includes(i.product.id))
          .reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "kilig-cart", version: 1, migrate: (persisted) => {
      const state = persisted as { items?: CartItem[]; selectedIds?: string[] };
      if (state.items?.length && !state.selectedIds?.length) {
        return {
          ...state,
          selectedIds: state.items.map((i) => i.product.id),
        };
      }
      return persisted;
    } }
  )
);
