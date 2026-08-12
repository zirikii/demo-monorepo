import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  encodeSession,
  loginWithCredentials,
  readSession,
  startFreeAccount,
  type DemoUser,
} from "@/lib/auth";

const user: DemoUser = {
  name: "Ava Thompson",
  email: "ava.thompson@brightpath.com.au",
  company: "Brightpath Group",
  role: "People & Culture Lead",
  plan: "HR Engage",
  memberSince: "2022-03-14",
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
    const session = loginWithCredentials("someone@example.com", "anything-at-all");
    expect(session.email).toBe("someone@example.com");
    expect(readSession()).toEqual(session);
  });

  it("lower-cases the email it was given", () => {
    expect(loginWithCredentials("  Ava.Thompson@Brightpath.com.AU ", "").email).toBe(
      "ava.thompson@brightpath.com.au",
    );
  });

  it("falls back to the demo account when the email is blank", () => {
    expect(loginWithCredentials("   ", "").email).toBe("ava.thompson@brightpath.com.au");
  });

  it("clears the session on log out", () => {
    loginWithCredentials("ava.thompson@brightpath.com.au", "demo1234");
    clearSession();
    expect(readSession()).toBeNull();
  });
});

describe("start free sign up", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("creates an account owner on the entry plan", () => {
    const session = startFreeAccount("Jordan Blake", "JORDAN@Example.com ", "Northwind Pty Ltd");
    expect(session.name).toBe("Jordan Blake");
    expect(session.email).toBe("jordan@example.com");
    expect(session.company).toBe("Northwind Pty Ltd");
    expect(session.role).toBe("Account owner");
    expect(session.plan).toBe("HR Essentials");
  });

  it("persists the new session so the platform can read it", () => {
    const session = startFreeAccount("Jordan Blake", "jordan@example.com", "Northwind Pty Ltd");
    expect(readSession()).toEqual(session);
  });
});
