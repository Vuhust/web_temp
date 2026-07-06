import Link from "next/link";
import { APP_NAME, APP_TAGLINE, BRAND_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold gradient-text">{APP_NAME}</h3>
            <p className="mt-3 text-sm text-slate-600">{APP_TAGLINE}</p>
            <p className="mt-4 text-sm text-slate-500">
              Kilig là thương hiệu Việt ra mắt năm {BRAND_INFO.established}, hiện đang có 2 mảng
              kinh doanh chính là Quà tặng (KiligGifts) và Trang sức nữ (KiligCharm).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Danh mục</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="/products?category=necklace" className="hover:text-primary-600">Dây chuyền</Link></li>
              <li><Link href="/products?category=bracelet" className="hover:text-primary-600">Vòng tay</Link></li>
              <li><Link href="/products?category=ring" className="hover:text-primary-600">Nhẫn</Link></li>
              <li><Link href="/products?category=earring" className="hover:text-primary-600">Khuyên tai</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Liên hệ</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>📍 {BRAND_INFO.location}</li>
              <li>🛒 Shopee, Tiktokshop, Facebook, Instagram</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href={SOCIAL_LINKS.facebook} className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:shadow-md transition-shadow">
                Facebook
              </a>
              <a href={SOCIAL_LINKS.instagram} className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:shadow-md transition-shadow">
                Instagram
              </a>
              <a href={SOCIAL_LINKS.tiktok} className="rounded-full bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <Share2 className="h-5 w-5 text-slate-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>Established in {BRAND_INFO.established} — A Jewelry Vietnam Brand</p>
          <p className="mt-1">Tên thương hiệu đã đăng ký bản quyền: KILIG</p>
        </div>
      </div>
    </footer>
  );
}
