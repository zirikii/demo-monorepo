import { describe, expect, it } from "vitest";
import { decodeSession, encodeSession, loginWithCredentials, type DemoUser } from "@/lib/auth";

describe("auth session helpers", () => {
  it("round-trips encode/decode", () => {
    const user: DemoUser = {
      email: "admin@example.com",
      name: "Admin",
      role: "Employer",
      company: "Harbour & Co",
    };
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("rejects tampered tokens", () => {
    expect(decodeSession("not-valid")).toBeNull();
  });

  it("accepts any credentials", () => {
    const user = loginWithCredentials("priya.nair@harbourco.example", "anything");
    expect(user.email).toBe("priya.nair@harbourco.example");
    expect(user.name).toContain("Priya");
  });
});
