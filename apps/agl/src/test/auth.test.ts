import { describe, expect, it } from "vitest";
import { DEMO_USER, clearSession, decodeSession, encodeSession, loginWithCredentials, readSession } from "@/lib/auth";

describe("mock auth", () => {
  it("round-trips a session", () => {
    expect(decodeSession(encodeSession(DEMO_USER))).toEqual(DEMO_USER);
  });

  it("rejects junk tokens", () => {
    expect(decodeSession("not-base64!")).toBeNull();
    expect(decodeSession(btoa("{}"))).toBeNull();
    expect(decodeSession(null)).toBeNull();
  });

  it("accepts any credentials and persists the session", () => {
    const user = loginWithCredentials("  Someone@Example.com ", "anything");
    expect(user.email).toBe("someone@example.com");
    expect(readSession()).toEqual(user);
    clearSession();
    expect(readSession()).toBeNull();
  });
});
