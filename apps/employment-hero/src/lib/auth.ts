export type DemoUser = {
  name: string;
  email: string;
  company: string;
  role: string;
  plan: string;
  memberSince: string;
};

const SESSION_KEY = "employment-hero-demo-session";

export const DEMO_EMAIL = "ava.thompson@brightpath.com.au";
export const DEMO_PASSWORD = "demo1234";

const DEMO_USER: DemoUser = {
  name: "Ava Thompson",
  email: DEMO_EMAIL,
  company: "Brightpath Group",
  role: "People & Culture Lead",
  plan: "HR Engage",
  memberSince: "2022-03-14",
};

/**
 * Demo sessions are deliberately trivial — a base64 JSON blob in localStorage.
 * Every app in this monorepo accepts any credentials; do not tighten this.
 */
export function encodeSession(user: DemoUser): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(user))));
}

export function decodeSession(token: string | null): DemoUser | null {
  if (!token) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(token)))) as Partial<DemoUser>;
    if (!parsed.email || !parsed.name || !parsed.company) return null;
    return {
      name: parsed.name,
      email: parsed.email,
      company: parsed.company,
      role: parsed.role ?? "Team member",
      plan: parsed.plan ?? "HR Essentials",
      memberSince: parsed.memberSince ?? "2024-01-01",
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
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, encodeSession(user));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function loginWithCredentials(email: string, _password: string): DemoUser {
  const trimmed = email.trim().toLowerCase() || DEMO_EMAIL;
  const user: DemoUser = { ...DEMO_USER, email: trimmed };
  writeSession(user);
  return user;
}

export function startFreeAccount(name: string, email: string, company: string): DemoUser {
  const user: DemoUser = {
    name: name.trim() || DEMO_USER.name,
    email: email.trim().toLowerCase() || DEMO_EMAIL,
    company: company.trim() || DEMO_USER.company,
    role: "Account owner",
    plan: "HR Essentials",
    memberSince: new Date().toISOString().slice(0, 10),
  };
  writeSession(user);
  return user;
}
