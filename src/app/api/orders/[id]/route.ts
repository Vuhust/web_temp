import { NextRequest, NextResponse } from "next/server";
import { getOrders } from "@/lib/mock-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = getOrders().find((o) => o.id === id);

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Không tìm thấy đơn hàng" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: order });
}
