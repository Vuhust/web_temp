"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { orderService } from "@/services/order.service";
import { Loading } from "@/components/common/Loading";
import { formatPrice, formatDate } from "@/lib/formatter";
import { products as allProducts } from "@/lib/mock-data";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const { data: productData, isLoading: productsLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productService.getProducts({ pageSize: 100 }),
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: orderService.getOrders,
  });

  if (productsLoading || ordersLoading) {
    return <Loading className="py-32" text="Đang tải..." />;
  }

  const totalRevenue = orders?.reduce((sum, o) => sum + o.total, 0) || 0;

  const stats = [
    { label: "Sản phẩm", value: allProducts.length, icon: ShoppingBag, color: "from-primary-500 to-primary-600" },
    { label: "Đơn hàng", value: orders?.length || 0, icon: Package, color: "from-accent-500 to-accent-600" },
    { label: "Doanh thu", value: formatPrice(totalRevenue), icon: TrendingUp, color: "from-green-500 to-green-600" },
    { label: "Khách hàng", value: "Demo", icon: Users, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
      <p className="mt-1 text-slate-500">Quản lý cửa hàng KILIG CHARM</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className={`inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Sản phẩm</h2>
          <div className="mt-4 max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="pb-3">Mã</th>
                  <th className="pb-3">Tên</th>
                  <th className="pb-3 text-right">Giá</th>
                </tr>
              </thead>
              <tbody>
                {productData?.data.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50">
                    <td className="py-3 font-medium text-primary-600">{p.code}</td>
                    <td className="py-3 text-slate-700 truncate max-w-[200px]">{p.name}</td>
                    <td className="py-3 text-right font-medium">{formatPrice(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Đơn hàng gần đây</h2>
          {!orders?.length ? (
            <p className="mt-4 text-sm text-slate-500">Chưa có đơn hàng.</p>
          ) : (
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-900">{order.id}</span>
                    <span className="font-bold text-primary-600">{formatPrice(order.total)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {order.address.fullName} · {formatDate(order.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
