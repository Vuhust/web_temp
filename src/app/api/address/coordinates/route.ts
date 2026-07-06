import { NextRequest, NextResponse } from "next/server";
import { getCoordinatesForWard } from "@/lib/address-data";

export async function GET(request: NextRequest) {
  const wardCode = request.nextUrl.searchParams.get("wardCode");
  const provinceCode = request.nextUrl.searchParams.get("provinceCode") || undefined;

  if (!wardCode) {
    return NextResponse.json(
      { success: false, message: "wardCode is required" },
      { status: 400 }
    );
  }

  const coords = getCoordinatesForWard(wardCode, provinceCode);
  return NextResponse.json({ success: true, data: coords });
}
