import { SignJWT, jwtVerify } from "jose";
import type { SessionUser } from "@/lib/types";
const ISSUER = "optus-business-hub-demo";
const AUDIENCE = "optus-enterprise-customer";
function getSecretKey(): Uint8Array {
  return Buffer.from(process.env.DEMO_AUTH_SECRET ?? "change-me", "utf8");
}
export async function encodeSession(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}
export async function decodeSession(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    if (!payload.sub || typeof payload.email !== "string" || typeof payload.name !== "string")
      return null;
    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}
