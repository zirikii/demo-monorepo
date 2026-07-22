/** @vitest-environment node */
import { describe, expect, it } from "vitest";
import { decodeSession, encodeSession } from "@/lib/auth/session";

describe("session", () => {
  it("round-trips an Optus demo session", async () => { process.env.DEMO_AUTH_SECRET = "test-secret"; const user = { id: "u-1", email: "admin@optus-demo.au", name: "Olivia Taylor" }; const token = await encodeSession(user); await expect(decodeSession(token)).resolves.toEqual(user); });
  it("rejects tampered tokens", async () => { process.env.DEMO_AUTH_SECRET = "test-secret"; const token = await encodeSession({ id: "u-1", email: "admin@optus-demo.au", name: "Olivia" }); await expect(decodeSession(`${token}x`)).resolves.toBeNull(); });
});
