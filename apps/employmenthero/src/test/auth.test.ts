import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  encodeSession,
  findAccount,
  readSession,
  signUp,
  writeSession,
  type DemoUser,
} from "@/lib/auth";

const USER: DemoUser = {
  email: "demo@employmenthero.com",
  name: "Priya Raman",
  jobTitle: "People & Culture Lead",
  company: "Harbourline Hospitality Group",
  portal: "employer",
  plan: "Employment Unlimited",
  landing: "/platform",
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("session encoding", () => {
  it("round-trips a user through the token", () => {
    expect(decodeSession(encodeSession(USER))).toEqual(USER);
  });

  it("survives non-ASCII names", () => {
    const user = { ...USER, name: "Amelia Sørensen", company: "Café Ninety-Six" };
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("returns null for a missing or malformed token", () => {
    expect(decodeSession(null)).toBeNull();
    expect(decodeSession("not-base64!!")).toBeNull();
    expect(decodeSession(btoa(JSON.stringify({ name: "No email" })))).toBeNull();
  });

  it("fills defaults for a partial payload", () => {
    const token = btoa(JSON.stringify({ email: "a@b.com", name: "A B" }));
    expect(decodeSession(token)).toMatchObject({ portal: "employer", landing: "/platform" });
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

describe("account lookup", () => {
  it("finds a seeded account regardless of case or padding", () => {
    expect(findAccount("  DEMO@EmploymentHero.com ")?.name).toBe("Priya Raman");
  });

  it("returns null for an unknown address", () => {
    expect(findAccount("nobody@example.com")).toBeNull();
  });

  it("never leaks the stored password hash", () => {
    expect(findAccount("demo@employmenthero.com")).not.toHaveProperty("passwordHash");
  });
});

describe("sign up", () => {
  it("creates a session for a new business", () => {
    const user = signUp({
      name: "Alex Nguyen",
      email: "Alex@Harbourline.demo",
      password: "heroes2026",
      company: "Harbourline Hospitality Group",
    });

    expect(user.email).toBe("alex@harbourline.demo");
    expect(user.landing).toBe("/platform");
    expect(readSession()).toEqual(user);
  });

  it("falls back to a placeholder business name", () => {
    const user = signUp({ name: "Jo Blogs", email: "jo@blogs.demo", password: "secret1", company: "  " });
    expect(user.company).toBe("My business");
  });
});
