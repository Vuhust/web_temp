import { NextRequest, NextResponse } from "next/server";
import { getWardsByProvince } from "@/lib/address-data";

export async function GET(request: NextRequest) {
  const provinceCode =
    request.nextUrl.searchParams.get("provinceCode") ||
    request.nextUrl.searchParams.get("districtCode");

  if (!provinceCode) {
    return NextResponse.json(
      { success: false, message: "provinceCode is required" },
      { status: 400 }
    );
  }

  const data = getWardsByProvince(provinceCode);
  return NextResponse.json({ success: true, data });
}
