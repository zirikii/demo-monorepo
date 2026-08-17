import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  DEMO_ACCOUNTS,
  encodePassword,
  encodeSession,
  findAccount,
  loginWithCredentials,
  readSession,
  writeSession,
  type DemoUser,
} from "@/lib/auth";

const USER: DemoUser = {
  email: "investor@hub24.com.au",
  name: "Margaret Whitlam",
  jobTitle: "Advised client",
  organisation: "Kembla Advice Partners",
  portal: "investor",
  landing: "/investorhub",
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("session encoding", () => {
  it("round-trips a user through the token", () => {
    expect(decodeSession(encodeSession(USER))).toEqual(USER);
  });

  it("returns null for a missing or malformed token", () => {
    expect(decodeSession(null)).toBeNull();
    expect(decodeSession("not-base64")).toBeNull();
    expect(decodeSession(btoa("{}"))).toBeNull();
  });

  it("persists and clears the session", () => {
    writeSession(USER);
    expect(readSession()).toEqual(USER);
    clearSession();
    expect(readSession()).toBeNull();
  });
});

describe("credentials", () => {
  it("accepts each seeded account with its own password", () => {
    const passwords: Record<string, string> = {
      "investor@hub24.com.au": "invest2026",
      "adviser@hub24.com.au": "advice2026",
      "manager@hub24.com.au": "manager2026",
    };

    for (const account of DEMO_ACCOUNTS) {
      const password = passwords[account.email];
      expect(password, `no password fixture for ${account.email}`).toBeDefined();
      expect(loginWithCredentials(account.email, password!)?.portal).toBe(account.portal);
    }
  });

  it("rejects the wrong password", () => {
    expect(loginWithCredentials("investor@hub24.com.au", "wrong")).toBeNull();
    expect(readSession()).toBeNull();
  });

  it("rejects an unknown email", () => {
    expect(loginWithCredentials("nobody@example.com", "invest2026")).toBeNull();
  });

  it("matches emails case-insensitively and ignores surrounding whitespace", () => {
    expect(loginWithCredentials("  INVESTOR@hub24.com.au ", "invest2026")).not.toBeNull();
  });

  it("never exposes the stored password hash on the session user", () => {
    const session = loginWithCredentials("adviser@hub24.com.au", "advice2026");
    expect(session).not.toBeNull();
    expect(session as unknown as Record<string, unknown>).not.toHaveProperty("passwordHash");
  });

  it("stores passwords encoded rather than in plain text", () => {
    for (const account of DEMO_ACCOUNTS) {
      expect(account.passwordHash).not.toContain("2026");
      expect(account.passwordHash.startsWith(encodePassword("").slice(0, 4))).toBe(true);
    }
  });
});

describe("findAccount", () => {
  it("returns the user without a password hash", () => {
    const account = findAccount("adviser@hub24.com.au");
    expect(account?.name).toBe("Daniel Okonjo");
    expect(account).not.toHaveProperty("passwordHash");
  });

  it("returns null for an unknown email", () => {
    expect(findAccount("nobody@example.com")).toBeNull();
  });
});
