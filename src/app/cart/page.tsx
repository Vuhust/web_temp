"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatter";
import { Button } from "@/components/common/Button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { FREE_SHIPPING_TEXT } from "@/lib/constants";

export default function CartPage() {
  const {
    items,
    selectedIds,
    updateQuantity,
    removeItem,
    toggleSelected,
    selectAll,
    deselectAll,
    getTotal,
    clearCart,
  } = useCartStore();
  const selectedTotal = getTotal();
  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-16 w-16 text-slate-300" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Giỏ hàng trống</h1>
        <p className="mt-2 text-slate-500">Hãy khám phá bộ sưu tập trang sức của chúng tôi!</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Giỏ hàng</h1>
      <p className="mt-1 text-slate-500">{items.length} sản phẩm</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={() => (allSelected ? deselectAll() : selectAll())}
              className="h-4 w-4 rounded accent-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">
              Chọn tất cả ({selectedIds.length}/{items.length})
            </span>
          </label>

          {items.map(({ product, quantity }) => {
            const isSelected = selectedIds.includes(product.id);
            return (
            <div
              key={product.id}
              className={`flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 transition-colors ${
                isSelected ? "ring-primary-200" : "ring-slate-100"
              }`}
            >
              <label className="flex shrink-0 cursor-pointer items-center self-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelected(product.id)}
                  className="h-4 w-4 rounded accent-primary-500"
                />
              </label>
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/products/${product.slug}`} className="font-semibold text-slate-900 hover:text-primary-600">
                    {product.name}
                  </Link>
                  <p className="text-sm text-slate-500">{product.code} · {product.material}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-slate-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-3 py-1 hover:bg-slate-50 rounded-l-full"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-3 py-1 hover:bg-slate-50 rounded-r-full"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-bold text-primary-600">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(product.id)}
                className="self-start rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
          })}
          <button onClick={clearCart} className="text-sm text-slate-500 hover:text-red-500">
            Xóa tất cả
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 h-fit sticky top-24">
          <h2 className="text-lg font-semibold text-slate-900">Tóm tắt đơn hàng</h2>
          <p className="mt-1 text-sm text-slate-500">
            {selectedIds.length > 0
              ? `${selectedIds.length} sản phẩm được chọn`
              : "Chọn sản phẩm để thanh toán"}
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Tạm tính</span>
              <span className="font-medium">{formatPrice(selectedTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Phí vận chuyển</span>
              <span className="font-medium text-green-600">Miễn phí</span>
            </div>
            <p className="text-xs text-accent-600">{FREE_SHIPPING_TEXT}</p>
            <div className="border-t border-slate-100 pt-3 flex justify-between">
              <span className="font-semibold text-slate-900">Tổng cộng</span>
              <span className="text-xl font-bold text-primary-600">{formatPrice(selectedTotal)}</span>
            </div>
          </div>
          {selectedIds.length === 0 ? (
            <Button className="w-full" size="lg" disabled>
              Tiến hành thanh toán
            </Button>
          ) : (
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full" size="lg">
                Tiến hành thanh toán
              </Button>
            </Link>
          )}
          <Link href="/products" className="block mt-3 text-center text-sm text-slate-500 hover:text-primary-600">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
