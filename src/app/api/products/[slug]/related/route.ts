import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, products } from "@/lib/mock-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return NextResponse.json({ success: true, data: related });
}
