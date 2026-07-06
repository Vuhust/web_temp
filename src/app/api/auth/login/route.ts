import { NextRequest, NextResponse } from "next/server";

const MOCK_USER = {
  id: "user-1",
  name: "Nguyễn Văn A",
  email: "demo@kiligcharm.vn",
  phone: "0901234567",
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (email && password) {
    return NextResponse.json({
      success: true,
      data: { user: { ...MOCK_USER, email }, token: "mock-jwt-token" },
    });
  }

  return NextResponse.json(
    { success: false, message: "Email hoặc mật khẩu không đúng" },
    { status: 401 }
  );
}

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_USER });
}
