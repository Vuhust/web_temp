"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { ProductCard } from "@/features/product/components/ProductCard";
import { Loading } from "@/components/common/Loading";
import { Pagination } from "@/components/common/Pagination";
import { CATEGORY_LABELS } from "@/lib/constants";
import { useState, Suspense } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import type { ProductCategory } from "@/types";

const categories: { id: ProductCategory | ""; label: string }[] = [
  { id: "", label: "Tất cả" },
  { id: "necklace", label: "Dây chuyền" },
  { id: "bracelet", label: "Vòng tay" },
  { id: "ring", label: "Nhẫn" },
  { id: "earring", label: "Khuyên tai" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const [category, setCategory] = useState(categoryParam);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery({
    queryKey: ["products", category, page, debouncedSearch],
    queryFn: () =>
      productService.getProducts({
        category: category || undefined,
        page,
        pageSize: 12,
        search: debouncedSearch || undefined,
      }),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {category ? CATEGORY_LABELS[category as ProductCategory] : "Tất cả sản phẩm"}
        </h1>
        <p className="mt-2 text-slate-500">
          Khám phá bộ sưu tập trang sức KILIG CHARM
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === cat.id
                  ? "bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-md"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-primary-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 sm:w-64"
          />
        </div>
      </div>

      {isLoading ? (
        <Loading className="py-20" text="Đang tải sản phẩm..." />
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {data && data.data.length === 0 && (
            <p className="py-20 text-center text-slate-500">Không tìm thấy sản phẩm nào.</p>
          )}

          {data && data.totalPages > 1 && (
            <div className="mt-12">
              <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading className="py-20" />}>
      <ProductsContent />
    </Suspense>
  );
}
