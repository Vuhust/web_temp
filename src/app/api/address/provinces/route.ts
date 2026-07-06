import { NextResponse } from "next/server";
import { addressProvinces } from "@/lib/address-data";

export async function GET() {
  return NextResponse.json({ success: true, data: addressProvinces });
}
