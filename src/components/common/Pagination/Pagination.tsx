"use client";

import { cn } from "@/lib/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            "h-10 w-10 rounded-full text-sm font-medium transition-colors",
            p === page
              ? "bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
