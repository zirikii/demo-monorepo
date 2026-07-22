/** @vitest-environment node */
import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.DEMO_AUTH_SECRET = "test-secret";
});

describe("auth session", () => {
  it("round-trips a signed session token", async () => {
    const { decodeSession, encodeSession } = await import("@/lib/auth/session");
    const user = { id: "u-1", email: "admin@optus-demo.au", name: "Alex Demo" };
    const token = await encodeSession(user);
    const decoded = await decodeSession(token);
    expect(decoded).toEqual(user);
  });

  it("returns null for invalid or missing tokens", async () => {
    const { decodeSession } = await import("@/lib/auth/session");
    expect(await decodeSession("not-a-jwt")).toBeNull();
    expect(await decodeSession(undefined)).toBeNull();
  });

  it("rejects a tampered token", async () => {
    const { decodeSession, encodeSession } = await import("@/lib/auth/session");
    const token = await encodeSession({ id: "u-2", email: "a@b.au", name: "Sam" });
    const tampered = `${token.slice(0, -3)}abc`;
    expect(await decodeSession(tampered)).toBeNull();
  });
});
