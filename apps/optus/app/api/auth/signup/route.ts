import { NextResponse } from "next/server";
import { encodeSession } from "@/lib/auth/session";
import { SESSION_COOKIE } from "@/lib/constants";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { SessionUser } from "@/lib/types";
type StoredUser = SessionUser & { company: string };
export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; email?: string; company?: string };
  const user: StoredUser = {
    id: `user-${Date.now()}`,
    name: body.name ?? "Demo User",
    email: body.email ?? "demo@example.com",
    company: body.company ?? "Demo Company",
  };
  const users = await readJson<StoredUser[]>("users.json");
  await writeJson("users.json", [user, ...users]);
  const token = await encodeSession(user);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
