import { NextRequest, NextResponse } from "next/server";
import { reviews } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const productReviews = reviews.filter((r) => r.productId === slug);

  return NextResponse.json({ success: true, data: productReviews });
}
