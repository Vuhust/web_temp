import { NextRequest, NextResponse } from "next/server";
import { addOrder, getOrders, products } from "@/lib/mock-data";
import { SHIPPING_FEE } from "@/lib/constants";
import type { Order } from "@/types";
import { generateId } from "@/lib/helpers";

export async function GET() {
  return NextResponse.json({ success: true, data: getOrders() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, address, paymentMethod } = body;

  if (!items?.length || !address) {
    return NextResponse.json(
      { success: false, message: "Thiếu thông tin đơn hàng" },
      { status: 400 }
    );
  }

  const orderItems = items.map(
    (item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    }
  );

  const subtotal = orderItems.reduce(
    (sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity,
    0
  );

  const order: Order = {
    id: `ORD-${generateId()}`,
    items: orderItems,
    address,
    subtotal,
    shippingFee: SHIPPING_FEE,
    total: subtotal + SHIPPING_FEE,
    status: "pending",
    paymentMethod: paymentMethod || "cod",
    createdAt: new Date().toISOString(),
  };

  addOrder(order);

  return NextResponse.json({ success: true, data: order });
}
