"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/formatter";
import { CATEGORY_LABELS } from "@/lib/constants";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/common/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-600 backdrop-blur-sm">
            {product.code}
          </span>
          {product.freeShipping && (
            <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-2 py-1 text-[10px] font-bold text-white">
              Free ship
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-medium text-primary-500">
          {CATEGORY_LABELS[product.category]}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-slate-500">{product.material}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-primary-600 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Trang sức nữ Việt Nam từ 2021
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            <span className="gradient-text">KILIG CHARM</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 sm:text-2xl">
            Find Your Story In Every Gleam
          </p>
          <p className="mt-6 text-base text-slate-500 leading-relaxed">
            Khám phá bộ sưu tập trang sức đính đá năng lượng Moonstone, Opal, Rose Quartz
            và bạc S925, S999 cao cấp — miễn phí giao hàng toàn quốc.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/products" className="btn-primary">
              Khám phá bộ sưu tập
            </Link>
            <Link href="/products?category=necklace" className="btn-secondary">
              Dây chuyền nổi bật
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
