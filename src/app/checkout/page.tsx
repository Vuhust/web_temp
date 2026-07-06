"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/store/cart";
import { orderService } from "@/services/order.service";
import { AddressForm } from "@/features/checkout/components/AddressForm";
import { formatPrice } from "@/lib/formatter";
import { Button } from "@/components/common/Button";
import { FREE_SHIPPING_TEXT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, CreditCard, Banknote } from "lucide-react";
import type { Address, Order } from "@/types";

export default function CheckoutPage() {
  const { items, selectedIds, getSelectedItems, getTotal, removeItems } = useCartStore();
  const checkoutItems = getSelectedItems();
  const total = getTotal();
  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [address, setAddress] = useState<Omit<Address, "id"> | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");
  const [order, setOrder] = useState<Order | null>(null);

  const createOrder = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (data) => {
      setOrder(data);
      removeItems(data.items.map((i) => i.productId));
      setStep("success");
    },
  });

  if (checkoutItems.length === 0 && step !== "success") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          {items.length === 0 ? "Giỏ hàng trống" : "Chưa chọn sản phẩm"}
        </h1>
        <p className="mt-2 text-slate-500">
          {items.length === 0
            ? "Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán."
            : "Vui lòng chọn ít nhất một sản phẩm trong giỏ hàng."}
        </p>
        <Link href={items.length === 0 ? "/products" : "/cart"} className="btn-primary mt-6 inline-flex">
          {items.length === 0 ? "Mua sắm ngay" : "Quay lại giỏ hàng"}
        </Link>
      </div>
    );
  }

  if (step === "success" && order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Đặt hàng thành công!</h1>
        <p className="mt-2 text-slate-500">Mã đơn hàng: <strong>{order.id}</strong></p>
        <p className="mt-4 text-sm text-slate-600">
          Cảm ơn bạn đã mua sắm tại KILIG CHARM. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/profile"><Button variant="outline">Xem đơn hàng</Button></Link>
          <Link href="/products"><Button>Tiếp tục mua sắm</Button></Link>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = (addr: Omit<Address, "id">) => {
    setAddress(addr);
    setStep("payment");
  };

  const handlePlaceOrder = () => {
    if (!address) return;
    createOrder.mutate({
      items: checkoutItems.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      address,
      paymentMethod,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Thanh toán</h1>

      <div className="mt-4 flex gap-4">
        {["address", "payment"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step === s || (s === "address" && step === "payment")
                  ? "bg-gradient-to-r from-primary-500 to-accent-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {s === "address" ? "Địa chỉ giao hàng" : "Thanh toán"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "address" && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">Thông tin giao hàng</h2>
              <p className="mt-1 text-sm text-slate-500">Nhập địa chỉ tại Việt Nam</p>
              <div className="mt-6">
                <AddressForm onSubmit={handleAddressSubmit} />
              </div>
            </div>
          )}

          {step === "payment" && address && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Địa chỉ giao hàng</h2>
                <p className="mt-3 text-sm text-slate-600">
                  {address.fullName} · {address.phone}<br />
                  {address.street}, {address.wardName}, {address.provinceName}
                </p>
                <button onClick={() => setStep("address")} className="mt-3 text-sm text-primary-600 hover:underline">
                  Thay đổi địa chỉ
                </button>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Phương thức thanh toán</h2>
                <div className="mt-4 space-y-3">
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                      paymentMethod === "cod" ? "border-primary-400 bg-primary-50" : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-primary-500"
                    />
                    <Banknote className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-sm text-slate-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                      paymentMethod === "bank_transfer" ? "border-primary-400 bg-primary-50" : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={() => setPaymentMethod("bank_transfer")}
                      className="accent-primary-500"
                    />
                    <CreditCard className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-slate-500">Chuyển khoản trước khi giao hàng</p>
                    </div>
                  </label>
                </div>

                <Button
                  className="mt-6 w-full"
                  size="lg"
                  loading={createOrder.isPending}
                  onClick={handlePlaceOrder}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 h-fit">
          <h2 className="text-lg font-semibold text-slate-900">Đơn hàng ({checkoutItems.length})</h2>
          <div className="mt-4 space-y-3">
            {checkoutItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">x{quantity}</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Tạm tính</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Vận chuyển</span>
              <span className="text-green-600">Miễn phí</span>
            </div>
            <p className="text-xs text-accent-600">{FREE_SHIPPING_TEXT}</p>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Tổng</span>
              <span className="text-primary-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
