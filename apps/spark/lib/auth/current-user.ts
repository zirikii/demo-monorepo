import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants";
import { decodeSession } from "@/lib/auth/session";
import type { SessionUser } from "@/lib/types";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  return decodeSession(jar.get(SESSION_COOKIE)?.value);
}
