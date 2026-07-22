// @vitest-environment node

import { describe, expect, it } from "vitest";
import { decodeSession, encodeSession } from "@/lib/auth/session";
describe("session token helpers", () => {
  it("round-trips a signed mock session", async () => {
    const token = await encodeSession({ id: "u_1", name: "Ari Santos", email: "ari@example.com" });
    await expect(decodeSession(token)).resolves.toEqual({
      id: "u_1",
      name: "Ari Santos",
      email: "ari@example.com",
    });
  });
  it("returns null for invalid tokens", async () => {
    await expect(decodeSession("not-a-token")).resolves.toBeNull();
  });
});
