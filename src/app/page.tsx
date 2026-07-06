import { HeroSection } from "@/features/product/components/ProductCard";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { BRAND_INFO } from "@/lib/constants";
import { Sparkles, Shield, Truck, Gift } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Truck,
    title: "Miễn phí giao hàng",
    desc: "Giao hàng toàn quốc, đóng gói cẩn thận",
  },
  {
    icon: Shield,
    title: "Bảo hành trọn đời",
    desc: "Hoàn tiền cho lỗi từ nhà sản xuất",
  },
  {
    icon: Gift,
    title: "Quà tặng kèm",
    desc: "Khăn lau bạc + lá tarot ngẫu nhiên",
  },
  {
    icon: Sparkles,
    title: "Đá năng lượng",
    desc: "Moonstone, Opal, Rose Quartz cao cấp",
  },
];

const categories = [
  { id: "necklace", emoji: "💫", label: "Dây chuyền" },
  { id: "bracelet", emoji: "✨", label: "Vòng tay" },
  { id: "ring", emoji: "💍", label: "Nhẫn" },
  { id: "earring", emoji: "💎", label: "Khuyên tai" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-primary-600">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductGrid category="necklace" limit={4} title="Dây chuyền 💫" showViewAll />
        <ProductGrid category="bracelet" limit={4} title="Vòng tay ✨" showViewAll />
        <ProductGrid category="ring" limit={4} title="Nhẫn 💍" showViewAll />
        <ProductGrid category="earring" limit={4} title="Khuyên tai 💎" showViewAll />
      </div>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-accent-100">
                  <f.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Giới thiệu về thương hiệu</h2>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Kilig là thương hiệu Việt ra mắt năm {BRAND_INFO.established}, hiện đang có 2 mảng
            kinh doanh chính là Quà tặng (KiligGifts) và Trang sức nữ (KiligCharm). Thương hiệu
            Trang sức nữ KiligCharm ra mắt với các mẫu trang sức đính đá năng lượng và được giới
            trẻ rất đón nhận.
          </p>
          <ul className="mt-8 space-y-3 text-left text-sm text-slate-600">
            {BRAND_INFO.warranty.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary-500">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
