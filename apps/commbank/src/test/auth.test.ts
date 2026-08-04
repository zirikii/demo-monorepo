import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  encodeSession,
  logonWithCredentials,
  readSession,
  type DemoUser,
} from "@/lib/auth";

const user: DemoUser = {
  clientNumber: "12345678",
  email: "demo@commbank.example",
  name: "Alex Mitchell",
  yelloTier: "Yello Gold",
  customerSince: "2013-06-04",
};

describe("session encoding", () => {
  beforeEach(() => window.localStorage.clear());

  it("round-trips a session", () => {
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("rejects a tampered token", () => {
    const token = encodeSession(user);
    expect(decodeSession(`${token}tampered`)).toBeNull();
  });

  it("rejects a token missing required fields", () => {
    const partial = btoa(JSON.stringify({ email: "someone@example.com" }));
    expect(decodeSession(partial)).toBeNull();
  });

  it("returns null for an absent token", () => {
    expect(decodeSession(null)).toBeNull();
  });
});

describe("logon", () => {
  beforeEach(() => window.localStorage.clear());

  it("accepts any credentials and persists the session", () => {
    const result = logonWithCredentials("99887766", "anything");
    expect(result.clientNumber).toBe("99887766");
    expect(readSession()?.clientNumber).toBe("99887766");
  });

  it("falls back to the demo client number when none is given", () => {
    expect(logonWithCredentials("  ", "").clientNumber).toBe("12345678");
  });

  it("clears the session on log off", () => {
    logonWithCredentials("12345678", "demo");
    clearSession();
    expect(readSession()).toBeNull();
  });
});
