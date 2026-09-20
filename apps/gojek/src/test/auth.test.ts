import { decodeSession, encodePassword, encodeSession, loginWithCredentials, signUp } from "@/lib/auth";

describe("auth", () => {
  it("round-trips a session token", () => {
    const token = encodeSession({
      email: "demo@gojek.io",
      name: "Aisha Rahman",
      role: "Backend engineer",
      hub: "Jakarta",
      team: "GoSend",
    });
    expect(decodeSession(token)?.email).toBe("demo@gojek.io");
  });

  it("encodes passwords with a gojek prefix", () => {
    expect(encodePassword("demo")).toBe(btoa("gojek:demo"));
  });

  it("logs in the seeded demo account with any password", () => {
    const user = loginWithCredentials("demo@gojek.io", "not-the-seed");
    expect(user.name).toBe("Aisha Rahman");
    expect(user.hub).toBe("Jakarta");
  });

  it("creates a session for an unknown email (demo mode)", () => {
    const user = loginWithCredentials("new@gojek.io", "hunter2");
    expect(user.email).toBe("new@gojek.io");
  });

  it("signs up and persists the profile fields", () => {
    const user = signUp({
      name: "Siti Rahma",
      email: "siti@gojek.io",
      password: "demo",
      hub: "Bangalore",
    });
    expect(user.name).toBe("Siti Rahma");
    expect(user.hub).toBe("Bangalore");
  });
});
