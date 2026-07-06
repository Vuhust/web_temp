import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = {
    id: "user-" + Date.now(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  return NextResponse.json({
    success: true,
    data: { user, token: "mock-jwt-token" },
  });
}
