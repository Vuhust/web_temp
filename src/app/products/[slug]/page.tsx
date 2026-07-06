"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { Loading } from "@/components/common/Loading";
import { Button } from "@/components/common/Button";
import { ProductCard } from "@/features/product/components/ProductCard";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatter";
import { CATEGORY_LABELS, FREE_SHIPPING_TEXT, BRAND_INFO } from "@/lib/constants";
import Image from "next/image";
import { ShoppingBag, Zap, Truck, Star, Package, Shield } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProduct(slug),
  });

  const { data: related } = useQuery({
    queryKey: ["related", slug],
    queryFn: () => productService.getRelatedProducts(slug),
    enabled: !!slug,
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", slug],
    queryFn: () => productService.getReviews(slug),
    enabled: !!slug,
  });

  if (isLoading) return <Loading className="py-32" text="Đang tải sản phẩm..." />;
  if (!product) return <div className="py-32 text-center text-slate-500">Không tìm thấy sản phẩm</div>;

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50">
            <Image
              src={product.images[activeImage] || product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-xl ring-2 transition-all ${
                    activeImage === i ? "ring-primary-500" : "ring-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            {product.code}
          </span>
          <p className="mt-3 text-sm font-medium text-primary-500">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-2 text-lg text-slate-500">{product.shortDescription}</p>

          <div className="mt-6 space-y-1">
            <p className="text-sm text-slate-500">
              Đơn giá: <span className="font-medium text-slate-700">{formatPrice(unitPrice)}</span>
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary-600">
                {formatPrice(totalPrice)}
              </span>
              {quantity > 1 && (
                <span className="text-sm text-slate-500">
                  ({formatPrice(unitPrice)} × {quantity})
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
            <p>✨ Chất liệu: {product.material}</p>
            {product.size && <p>✨ Size: {product.size}</p>}
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent-500" /> {FREE_SHIPPING_TEXT}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Số lượng:</span>
            <div className="flex items-center rounded-full border border-slate-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg font-medium text-slate-600 hover:bg-slate-50 rounded-l-full"
              >
                −
              </button>
              <span className="min-w-[2rem] px-4 py-2 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg font-medium text-slate-600 hover:bg-slate-50 rounded-r-full"
              >
                +
              </button>
            </div>
            <span className="text-sm font-semibold text-primary-600">
              = {formatPrice(totalPrice)}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => addItem(product, quantity)}
            >
              <ShoppingBag className="h-5 w-5" /> Thêm vào giỏ
            </Button>
            <Button size="lg" className="flex-1" onClick={handleBuyNow}>
              <Zap className="h-5 w-5" /> Mua ngay
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-600 leading-relaxed">{product.description}</p>
        </div>
      </div>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-primary-500" />
            <h3 className="font-semibold text-slate-900">Đóng gói</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {BRAND_INFO.packaging.map((item) => (
              <li key={item}>📦 {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-accent-500" />
            <h3 className="font-semibold text-slate-900">Bảo hành</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {BRAND_INFO.warranty.map((item) => (
              <li key={item}>💛 {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {reviews && reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Đánh giá</h2>
          <div className="mt-6 space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">{review.userName}</span>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related && related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Sản phẩm liên quan</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
