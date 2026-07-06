import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      id: "user-1",
      name: "Nguyễn Văn A",
      email: "demo@kiligcharm.vn",
      phone: "0901234567",
    },
  });
}
