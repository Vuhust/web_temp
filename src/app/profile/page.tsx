"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { authService } from "@/services/auth.service";
import { Loading } from "@/components/common/Loading";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { formatPrice, formatDate } from "@/lib/formatter";
import { useAuthStore } from "@/store/auth";
import { User, Package, LogIn } from "lucide-react";
import Image from "next/image";

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ xác nhận", color: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
  shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Đã huỷ", color: "bg-red-100 text-red-700" },
};

export default function ProfilePage() {
  const { user, token, setAuth, logout } = useAuthStore();
  const [email, setEmail] = useState("demo@kiligcharm.vn");
  const [password, setPassword] = useState("123456");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
    enabled: !!token,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const data = await authService.login(email, password);
      setAuth(data.user, data.token);
    } catch {
      setLoginError("Email hoặc mật khẩu không đúng");
    } finally {
      setLoggingIn(false);
    }
  };

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <div className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-primary-500" />
            <h1 className="mt-4 text-2xl font-bold text-slate-900">Đăng nhập</h1>
            <p className="mt-2 text-sm text-slate-500">Đăng nhập để xem đơn hàng của bạn</p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <Button type="submit" loading={loggingIn} className="w-full">
              Đăng nhập
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-400">
            Demo: demo@kiligcharm.vn / 123456
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100">
            <User className="h-7 w-7 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          Đăng xuất
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <Package className="h-5 w-5" /> Đơn hàng của tôi
        </h2>

        {isLoading ? (
          <Loading className="py-12" />
        ) : !orders?.length ? (
          <p className="mt-6 text-slate-500">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => {
              const status = statusLabels[order.status];
              return (
                <div
                  key={order.id}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                          <Image src={item.productImage} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                        <span className="flex-1 text-sm text-slate-700 truncate">{item.productName}</span>
                        <span className="text-sm text-slate-500">x{item.quantity}</span>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-500">
                      Giao đến: {order.address.fullName}, {order.address.street}, {order.address.wardName}
                    </p>
                    <span className="font-bold text-primary-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
