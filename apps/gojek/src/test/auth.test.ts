import { describe, expect, it } from "vitest";
import {
  decodeSession,
  encodeSession,
  loginWithCredentials,
  type DemoUser,
} from "@/lib/auth";

const sample: DemoUser = {
  email: "dewi@gojek.io",
  name: "Dewi Lestari",
  partnerType: "merchant",
  city: "Bandung",
  memberSince: "2023-08-01",
};

describe("auth session", () => {
  it("round-trips a session through encode/decode", () => {
    const token = encodeSession(sample);
    expect(decodeSession(token)).toEqual(sample);
  });

  it("returns null for empty or tampered tokens", () => {
    expect(decodeSession(null)).toBeNull();
    expect(decodeSession("not-valid-base64!!")).toBeNull();
    expect(decodeSession(btoa("{}"))).toBeNull();
  });

  it("derives a name from the email when none is supplied", () => {
    const user = loginWithCredentials("john.doe@example.com", "whatever");
    expect(user.name).toBe("John Doe");
    expect(user.partnerType).toBe("driver");
  });

  it("applies overrides when provided", () => {
    const user = loginWithCredentials("x@y.com", "pw", {
      name: "Custom Name",
      partnerType: "merchant",
      city: "Singapore",
    });
    expect(user.name).toBe("Custom Name");
    expect(user.partnerType).toBe("merchant");
    expect(user.city).toBe("Singapore");
  });
});
