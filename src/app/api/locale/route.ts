import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { locale } = await req.json();
    if (!locale || !["en", "pt"].includes(locale)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
