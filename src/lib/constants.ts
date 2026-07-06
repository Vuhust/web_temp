import type { ProductCategory } from "@/types";

export const APP_NAME = "KILIG CHARM";
export const APP_TAGLINE = "Find Your Story In Every Gleam";
export const APP_DESCRIPTION =
  "Thương hiệu trang sức nữ Việt Nam với các mẫu trang sức đính đá năng lượng như Moonstone, Labradorite, Opal, Rose Quartz.";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  necklace: "Dây chuyền",
  bracelet: "Vòng tay",
  ring: "Nhẫn",
  earring: "Khuyên tai",
};

export const SHIPPING_FEE = 0;
export const FREE_SHIPPING_TEXT = "Miễn phí giao hàng toàn quốc";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  shopee: "https://shopee.vn",
};

export const BRAND_INFO = {
  established: 2021,
  location: "Hà Nội, Việt Nam",
  warranty: [
    "Đổi size không giới hạn, chỉ trả thêm phí vận chuyển",
    "Hỗ trợ đổi trả trong 30 ngày kể từ khi nhận sản phẩm",
    "Bảo hành hoàn tiền trọn đời cho lỗi từ nhà sản xuất",
  ],
  packaging: [
    "Đóng gói trong hộp rút KILIG CHARM",
    "Bảo quản trong túi zip",
    "Tặng kèm khăn lau bạc và 1 lá tarot ngẫu nhiên",
  ],
};

export const API_BASE_URL = "/api";
