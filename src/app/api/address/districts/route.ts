import { NextResponse } from "next/server";

/** @deprecated Vietnam uses 2-level admin (province → ward) since 2025. */
export async function GET() {
  return NextResponse.json({ success: true, data: [] });
}
