import { BASE_API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { UserId, token } = body;

  if (!UserId || !token) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const formBody = new URLSearchParams({
    UserId,
    token,
  });

  try {
    const url = `${BASE_API_URL}/car/getByUserId.do`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token,
      },
      body: formBody.toString(),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
