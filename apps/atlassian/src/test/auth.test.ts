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
  email: "demo@atlassian.com",
  name: "Maya Chen",
  jobTitle: "Product Delivery Lead",
  company: "Northline Payments",
  portal: "jira",
  plan: "Jira Cloud Premium",
  landing: "/jira",
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
    expect(decodeSession(token)).toMatchObject({ portal: "jira", landing: "/jira" });
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
    expect(findAccount("  DEMO@Atlassian.com ")?.name).toBe("Maya Chen");
  });

  it("returns null for an unknown address", () => {
    expect(findAccount("nobody@example.com")).toBeNull();
  });

  it("never leaks the stored password hash", () => {
    expect(findAccount("demo@atlassian.com")).not.toHaveProperty("passwordHash");
  });
});

describe("credentials", () => {
  it("signs in the seeded demo account", () => {
    const user = loginWithCredentials("demo@atlassian.com", "teamwork2026");
    expect(user).toEqual(USER);
    expect(readSession()).toEqual(USER);
  });

  it("returns null for the wrong password", () => {
    expect(loginWithCredentials("demo@atlassian.com", "wrong-password")).toBeNull();
    expect(readSession()).toBeNull();
  });

  it("lands admin and rovo accounts on their portals", () => {
    expect(loginWithCredentials("admin@atlassian.com", "admin2026")?.landing).toBe("/admin");
    expect(loginWithCredentials("rovo@atlassian.com", "agents2026")?.landing).toBe("/rovo");
  });

  it("can land the demo account on a chosen product portal", () => {
    expect(loginWithCredentials("demo@atlassian.com", "teamwork2026", "confluence")?.landing).toBe(
      "/confluence",
    );
  });
});

describe("sign up", () => {
  it("creates a session for a new team", () => {
    const user = signUp({
      name: "Alex Nguyen",
      email: "Alex@Northline.demo",
      password: "teamwork2026",
      company: "Northline Payments",
    });

    expect(user.email).toBe("alex@northline.demo");
    expect(user.landing).toBe("/jira");
    expect(readSession()).toEqual(user);
  });

  it("falls back to a placeholder team name", () => {
    const user = signUp({ name: "Jo Blogs", email: "jo@blogs.demo", password: "secret1", company: "  " });
    expect(user.company).toBe("My team");
  });
});
