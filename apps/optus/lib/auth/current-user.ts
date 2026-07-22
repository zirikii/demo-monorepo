import { cookies } from "next/headers";
import { decodeSession } from "@/lib/auth/session";
import { SESSION_COOKIE } from "@/lib/constants";

export async function getCurrentUser() {
  const jar = await cookies();
  return decodeSession(jar.get(SESSION_COOKIE)?.value);
}
