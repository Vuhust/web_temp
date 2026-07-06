"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { ProductCard } from "./ProductCard";
import { Loading } from "@/components/common/Loading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductGridProps {
  category?: string;
  limit?: number;
  showViewAll?: boolean;
  title?: string;
}

export function ProductGrid({ category, limit, showViewAll, title }: ProductGridProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: () => productService.getProducts({ category, pageSize: limit || 12 }),
  });

  if (isLoading) return <Loading className="py-20" text="Đang tải sản phẩm..." />;

  const products = data?.data || [];

  return (
    <section className="py-16">
      {(title || showViewAll) && (
        <div className="mb-8 flex items-center justify-between">
          {title && <h2 className="text-2xl font-bold text-slate-900">{title}</h2>}
          {showViewAll && category && (
            <Link
              href={`/products?category=${category}`}
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
