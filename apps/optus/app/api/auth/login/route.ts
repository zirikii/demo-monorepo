import { NextResponse } from "next/server";
import { encodeSession } from "@/lib/auth/session";
import { SESSION_COOKIE } from "@/lib/constants";
export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email ?? process.env.DEMO_ADMIN_EMAIL ?? "admin@example.com";
  const token = await encodeSession({ id: "demo-admin", name: "Demo Admin", email });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
