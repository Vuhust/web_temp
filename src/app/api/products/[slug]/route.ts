import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, products, reviews } from "@/lib/mock-data";

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

  return NextResponse.json({ success: true, data: product });
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
