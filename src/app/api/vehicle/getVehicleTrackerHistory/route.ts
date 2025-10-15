import { BASE_API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, carId, startTime, endTime, filter } = body;

  if (!carId || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const formBody = new URLSearchParams({
    token,
    carId,
    startTime,
    endTime,
    filter,
  });

  try {
    const response = await fetch(`${BASE_API_URL}/position/queryHistory.do`, {
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
