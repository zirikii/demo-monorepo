import { beforeEach, describe, expect, it } from "vitest";
import {
  DEMO_ACCOUNTS,
  clearSession,
  decodeSession,
  encodePassword,
  encodeSession,
  findAccount,
  loginWithCredentials,
  readSession,
  type DemoUser,
} from "@/lib/auth";

const USER: DemoUser = {
  email: "adviser@hub24.com.au",
  name: "Alicia Nguyen",
  jobTitle: "Senior Financial Adviser",
  practice: "Meridian Private Wealth",
  portal: "adviser",
  adviserCode: "ADV-40218",
  landing: "/adviserhub",
};

describe("demo session encoding", () => {
  beforeEach(() => {
    clearSession();
  });

  it("round-trips a session token", () => {
    expect(decodeSession(encodeSession(USER))).toEqual(USER);
  });

  it("rejects a tampered token", () => {
    expect(decodeSession("not-a-real-token")).toBeNull();
  });

  it("rejects a token missing required fields", () => {
    expect(decodeSession(btoa(JSON.stringify({ practice: "Nobody" })))).toBeNull();
  });

  it("returns null when no session is stored", () => {
    expect(readSession()).toBeNull();
  });
});

describe("demo credentials", () => {
  beforeEach(() => {
    clearSession();
  });

  it("stores no plaintext passwords in the seed accounts", () => {
    for (const account of DEMO_ACCOUNTS) {
      expect(account.passwordHash).not.toMatch(/2026$/);
      expect(account.passwordHash).toBe(
        encodePassword(atob(account.passwordHash).split(":")[1] ?? ""),
      );
    }
  });

  it("signs in a known adviser and persists the session", () => {
    const user = loginWithCredentials("adviser@hub24.com.au", "platform2026");
    expect(user?.name).toBe("Alicia Nguyen");
    expect(readSession()?.email).toBe("adviser@hub24.com.au");
  });

  it("is case-insensitive on email", () => {
    expect(loginWithCredentials("Adviser@HUB24.com.au", "platform2026")).not.toBeNull();
  });

  it("rejects the wrong password", () => {
    expect(loginWithCredentials("adviser@hub24.com.au", "wrong")).toBeNull();
    expect(readSession()).toBeNull();
  });

  it("rejects an unknown account", () => {
    expect(loginWithCredentials("nobody@example.com", "platform2026")).toBeNull();
  });

  it("finds an account without exposing its password hash", () => {
    const account = findAccount("investor@hub24.com.au");
    expect(account?.portal).toBe("investor");
    expect(account && "passwordHash" in account).toBe(false);
  });

  it("clears the session on logout", () => {
    loginWithCredentials("adviser@hub24.com.au", "platform2026");
    clearSession();
    expect(readSession()).toBeNull();
  });
});
