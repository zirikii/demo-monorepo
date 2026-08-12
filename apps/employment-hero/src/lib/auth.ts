export type DemoUser = {
  email: string;
  name: string;
  role: "Employer" | "Employee" | "Payroll";
  company: string;
};

const SESSION_KEY = "employment-hero-demo-session";

export function encodeSession(user: DemoUser): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(user))));
}

export function decodeSession(token: string | null): DemoUser | null {
  if (!token) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(token)))) as Partial<DemoUser>;
    if (!parsed.email || !parsed.name) return null;
    return {
      email: parsed.email,
      name: parsed.name,
      role: parsed.role ?? "Employer",
      company: parsed.company ?? "Harbour & Co",
    };
  } catch {
    return null;
  }
}

export function readSession(): DemoUser | null {
  if (typeof window === "undefined") return null;
  return decodeSession(window.localStorage.getItem(SESSION_KEY));
}

export function writeSession(user: DemoUser): void {
  window.localStorage.setItem(SESSION_KEY, encodeSession(user));
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
}

export function loginWithCredentials(email: string, _password: string, role: DemoUser["role"] = "Employer"): DemoUser {
  const trimmed = email.trim().toLowerCase() || "admin@example.com";
  const name = trimmed.split("@")[0]?.replace(/[._]/g, " ") ?? "Demo User";
  const user: DemoUser = {
    email: trimmed,
    name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
    role,
    company: "Harbour & Co",
  };
  writeSession(user);
  return user;
}

export function registerUser(name: string, email: string): DemoUser {
  const user: DemoUser = {
    email: email.trim().toLowerCase() || "new.user@example.com",
    name: name.trim() || "New User",
    role: "Employer",
    company: "Harbour & Co",
  };
  writeSession(user);
  return user;
}
