import { BASE_API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { carId, mapType, token } = body;

  if (!carId || !mapType || !token) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const formBody = new URLSearchParams({
    carId,
    mapType,
    token,
  });

  try {
    const response = await fetch(`${BASE_API_URL}/car/getCarAndStatus.do`, {
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
