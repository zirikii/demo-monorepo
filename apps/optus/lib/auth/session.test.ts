/** @vitest-environment node */
import { describe, expect, it } from "vitest";
import { decodeSession, encodeSession } from "@/lib/auth/session";

describe("auth session", () => {
  it("round-trips a signed session token", async () => {
    const user = { id: "u-1", email: "admin@optus-demo.com.au", name: "Mia Demo" };
    const token = await encodeSession(user);
    const decoded = await decodeSession(token);
    expect(decoded).toEqual(user);
  });

  it("returns null for invalid or tampered tokens", async () => {
    expect(await decodeSession("not-a-jwt")).toBeNull();
    expect(await decodeSession(undefined)).toBeNull();
    const token = await encodeSession({ id: "u-2", email: "a@b.co", name: "Two" });
    expect(await decodeSession(`${token}tampered`)).toBeNull();
  });
});
