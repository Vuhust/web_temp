"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/helpers";

const navLinks = [
  { href: "/products?category=necklace", label: "Dây chuyền" },
  { href: "/products?category=bracelet", label: "Vòng tay" },
  { href: "/products?category=ring", label: "Nhẫn" },
  { href: "/products?category=earring", label: "Khuyên tai" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/products"
            className="hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 sm:block"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/profile"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-slate-100 bg-white md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
