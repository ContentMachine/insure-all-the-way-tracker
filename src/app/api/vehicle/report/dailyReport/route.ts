import { BASE_API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, carId, startTime, endTime } = body;

  if (!carId || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const formBody = new URLSearchParams({
    token,
    carId,
    startTime,
    endTime,
  });

  try {
    const response = await fetch(`${BASE_API_URL}/report/queryDailyReport.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      {
        error:
          "There was an error getting vehicle daily report. Please try again later",
      },
      { status: 500 }
    );
  }
}
