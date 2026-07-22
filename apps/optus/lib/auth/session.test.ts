/** @vitest-environment node */
import { describe, expect, it } from "vitest";
import { decodeSession, encodeSession } from "@/lib/auth/session";

describe("session tokens", () => {
  it("round-trips encode/decode", async () => {
    const user = { id: "u-1", email: "admin@optus-demo.au", name: "Demo Admin" };
    const token = await encodeSession(user);
    const decoded = await decodeSession(token);
    expect(decoded).toEqual(user);
  });

  it("returns null for garbage tokens", async () => {
    expect(await decodeSession("not-a-jwt")).toBeNull();
  });
});
