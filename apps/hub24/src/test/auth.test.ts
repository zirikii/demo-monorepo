import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  encodeSession,
  findAccount,
  loginWithCredentials,
  readSession,
  signUp,
  writeSession,
  type DemoUser,
} from "@/lib/auth";

const USER: DemoUser = {
  email: "adviser@hub24.demo",
  name: "Alex Chen",
  jobTitle: "Senior Financial Adviser",
  practice: "Harbourline Wealth",
  portal: "adviser",
  landing: "/adviserhub",
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("session encoding", () => {
  it("round-trips a user through the token", () => {
    expect(decodeSession(encodeSession(USER))).toEqual(USER);
  });

  it("survives non-ASCII names", () => {
    const user = { ...USER, name: "Amelia Sørensen", practice: "Café Ninety-Six" };
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("returns null for a missing or malformed token", () => {
    expect(decodeSession(null)).toBeNull();
    expect(decodeSession("not-base64!!")).toBeNull();
    expect(decodeSession(btoa(JSON.stringify({ name: "No email" })))).toBeNull();
  });

  it("fills defaults for a partial payload", () => {
    const token = btoa(JSON.stringify({ email: "a@b.com", name: "A B" }));
    expect(decodeSession(token)).toMatchObject({ portal: "adviser", landing: "/adviserhub" });
  });
});

describe("session storage", () => {
  it("writes and reads the current session", () => {
    writeSession(USER);
    expect(readSession()).toEqual(USER);
  });

  it("clears the session", () => {
    writeSession(USER);
    clearSession();
    expect(readSession()).toBeNull();
  });
});

describe("account lookup and login", () => {
  it("finds a seeded account regardless of case or padding", () => {
    expect(findAccount("  ADVISER@Hub24.demo ")?.name).toBe("Alex Chen");
  });

  it("accepts any credentials and infers InvestorHUB from the email", () => {
    const user = loginWithCredentials("client.priya@example.com", "anything");
    expect(user?.portal).toBe("investor");
    expect(user?.landing).toBe("/investorhub");
    expect(readSession()?.email).toBe("client.priya@example.com");
  });

  it("rejects an empty password", () => {
    expect(loginWithCredentials("adviser@hub24.demo", "")).toBeNull();
  });
});

describe("sign up", () => {
  it("creates a session for a new practice", () => {
    const user = signUp({
      name: "Morgan Blake",
      email: "Morgan@Harbourline.demo",
      password: "demo",
      practice: "Harbourline Wealth",
    });

    expect(user.email).toBe("morgan@harbourline.demo");
    expect(user.landing).toBe("/adviserhub");
    expect(readSession()).toEqual(user);
  });
});
