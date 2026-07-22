import { NextResponse } from "next/server";
import { z } from "zod";
import { encodeSession } from "@/lib/auth/session";
import { SESSION_COOKIE } from "@/lib/constants";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { UserRecord } from "@/lib/types";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid signup payload" }, { status: 400 });
  }

  const users = await readJson<UserRecord[]>("users.json");
  if (users.some((u) => u.email.toLowerCase() === body.data.email.toLowerCase())) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const user: UserRecord = {
    id: `u-${Date.now()}`,
    name: body.data.name,
    email: body.data.email,
    password: body.data.password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeJson("users.json", users);

  const token = await encodeSession({ id: user.id, email: user.email, name: user.name });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
