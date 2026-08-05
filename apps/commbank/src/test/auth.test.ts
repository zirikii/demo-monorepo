import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  encodeSession,
  loginWithCredentials,
  readSession,
  registerCustomer,
  type DemoUser,
} from "@/lib/auth";

const user: DemoUser = {
  clientNumber: "12345678",
  name: "Alex Nguyen",
  email: "alex.nguyen@example.com",
  yelloTier: "Gold",
  customerSince: "2016-04-18",
};

describe("demo session encoding", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("round-trips a session token", () => {
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("survives non-ASCII names", () => {
    const accented = { ...user, name: "Renée Nguyễn" };
    expect(decodeSession(encodeSession(accented))?.name).toBe("Renée Nguyễn");
  });

  it("rejects a tampered token", () => {
    expect(decodeSession("not-a-real-token")).toBeNull();
  });

  it("rejects a token missing required fields", () => {
    const partial = btoa(JSON.stringify({ email: "someone@example.com" }));
    expect(decodeSession(partial)).toBeNull();
  });

  it("returns null for an empty token", () => {
    expect(decodeSession(null)).toBeNull();
  });
});

describe("mock login", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("accepts any credentials and persists a session", () => {
    const session = loginWithCredentials("99887766", "anything");
    expect(session.clientNumber).toBe("99887766");
    expect(readSession()).toEqual(session);
  });

  it("falls back to the demo client number when blank", () => {
    expect(loginWithCredentials("  ", "").clientNumber).toBe("12345678");
  });

  it("registers a new customer at the Base tier", () => {
    const session = registerCustomer("Jordan Blake", "JORDAN@Example.com ");
    expect(session.name).toBe("Jordan Blake");
    expect(session.email).toBe("jordan@example.com");
    expect(session.yelloTier).toBe("Base");
  });

  it("clears the session on log off", () => {
    loginWithCredentials("12345678", "demo");
    clearSession();
    expect(readSession()).toBeNull();
  });
});
