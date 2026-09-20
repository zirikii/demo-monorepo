import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  decodeSession,
  encodeSession,
  loginWithCredentials,
  readSession,
  type DemoUser,
} from "@/lib/auth";

const USER: DemoUser = {
  email: "candidate@gojek.io",
  name: "Sasha Widjaja",
  headline: "Senior Backend Engineer",
  location: "Jakarta, Indonesia",
  candidateId: "CAND-40218",
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("session encoding", () => {
  it("round-trips a session", () => {
    expect(decodeSession(encodeSession(USER))).toEqual(USER);
  });

  it("rejects a tampered token", () => {
    expect(decodeSession(`${encodeSession(USER)}tampered`)).toBeNull();
  });

  it("rejects a payload without the required fields", () => {
    expect(decodeSession(btoa(JSON.stringify({ headline: "Nobody" })))).toBeNull();
  });

  it("returns null for a missing token", () => {
    expect(decodeSession(null)).toBeNull();
  });
});

describe("loginWithCredentials", () => {
  it("accepts a seeded account and persists the session", () => {
    const session = loginWithCredentials("candidate@gojek.io", "gotroops2026");
    expect(session?.name).toBe("Sasha Widjaja");
    expect(readSession()?.email).toBe("candidate@gojek.io");
  });

  it("is case and whitespace tolerant on the email", () => {
    expect(loginWithCredentials("  Candidate@Gojek.IO ", "gotroops2026")).not.toBeNull();
  });

  it("rejects a wrong password", () => {
    expect(loginWithCredentials("candidate@gojek.io", "nope")).toBeNull();
    expect(readSession()).toBeNull();
  });

  it("rejects an unknown email", () => {
    expect(loginWithCredentials("stranger@example.com", "gotroops2026")).toBeNull();
  });

  it("never exposes the stored password hash on the session", () => {
    const session = loginWithCredentials("designer@gojek.io", "asphalt2026");
    expect(session).not.toBeNull();
    expect(session as unknown as Record<string, unknown>).not.toHaveProperty("passwordHash");
  });
});

describe("clearSession", () => {
  it("removes a stored session", () => {
    loginWithCredentials("candidate@gojek.io", "gotroops2026");
    clearSession();
    expect(readSession()).toBeNull();
  });
});
