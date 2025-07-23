import { BASE_API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, password, timeZoneSecond = 28800, lang = "zh_CN" } = body;

  if (!name || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const formBody = new URLSearchParams({
    name,
    password,
    timeZoneSecond: timeZoneSecond.toString(),
    lang,
  });

  try {
    const response = await fetch(`${BASE_API_URL}/user/login.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    if (!response.ok) {
      console.log(response, "Check");
      const text = await response.text();
      console.error("Proxy failed:", response.status, text);
      return NextResponse.json(
        { error: "Proxy failed", statusCode: response.status },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (err) {
    console.log("Proxy error:", err);
    return NextResponse.json(
      { error: "There was an error logging you in. Please try again later" },
      { status: 500 }
    );
  }
}
