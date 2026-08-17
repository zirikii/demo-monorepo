import { readRaw, removeKey, writeRaw } from "./storage";

export type DemoPortal = "adviser" | "investor" | "manager";

export interface DemoUser {
  email: string;
  name: string;
  jobTitle: string;
  practice: string;
  portal: DemoPortal;
  landing: string;
}

interface DemoAccount extends DemoUser {
  passwordHint: string;
}

const SESSION_KEY = "hub24-demo-session";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "adviser@hub24.demo",
    passwordHint: "demo",
    name: "Alex Chen",
    jobTitle: "Senior Financial Adviser",
    practice: "Harbourline Wealth",
    portal: "adviser",
    landing: "/adviserhub",
  },
  {
    email: "investor@hub24.demo",
    passwordHint: "demo",
    name: "Priya Nair",
    jobTitle: "Advised client",
    practice: "Harbourline Wealth",
    portal: "investor",
    landing: "/investorhub",
  },
  {
    email: "manager@hub24.demo",
    passwordHint: "demo",
    name: "Tomás Rivera",
    jobTitle: "Portfolio Manager",
    practice: "Southridge Asset Management",
    portal: "manager",
    landing: "/managerhub",
  },
];

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
      jobTitle: parsed.jobTitle ?? "Adviser",
      practice: parsed.practice ?? "Harbourline Wealth",
      portal: parsed.portal ?? "adviser",
      landing: parsed.landing ?? "/adviserhub",
    };
  } catch {
    return null;
  }
}

export function readSession(): DemoUser | null {
  return decodeSession(readRaw(SESSION_KEY));
}

export function writeSession(user: DemoUser): void {
  writeRaw(SESSION_KEY, encodeSession(user));
}

export function clearSession(): void {
  removeKey(SESSION_KEY);
}

export function findAccount(email: string): DemoUser | null {
  const account = DEMO_ACCOUNTS.find(
    (candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (!account) return null;
  const { passwordHint: _passwordHint, ...user } = account;
  return user;
}

function inferPortal(email: string): DemoPortal {
  const value = email.toLowerCase();
  if (value.includes("investor") || value.includes("client")) return "investor";
  if (value.includes("manager")) return "manager";
  return "adviser";
}

function landingFor(portal: DemoPortal): string {
  if (portal === "investor") return "/investorhub";
  if (portal === "manager") return "/managerhub";
  return "/adviserhub";
}

/**
 * Demo login accepts any non-empty email/password. Seeded addresses keep their
 * named persona; everything else becomes a guest session on the matching portal.
 */
export function loginWithCredentials(email: string, password: string): DemoUser | null {
  if (!email.trim() || !password) return null;
  const existing = findAccount(email);
  if (existing) {
    writeSession(existing);
    return existing;
  }
  const portal = inferPortal(email);
  const user: DemoUser = {
    email: email.trim().toLowerCase(),
    name: email.split("@")[0]?.replace(/[._]/g, " ") || "Guest",
    jobTitle: portal === "investor" ? "Advised client" : "Financial professional",
    practice: "Harbourline Wealth",
    portal,
    landing: landingFor(portal),
  };
  writeSession(user);
  return user;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  practice: string;
  portal?: DemoPortal;
}

export function signUp({ name, email, password, practice, portal }: SignUpInput): DemoUser {
  if (!password) {
    throw new Error("Password is required");
  }
  const resolved = portal ?? inferPortal(email);
  const user: DemoUser = {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    jobTitle: resolved === "investor" ? "Advised client" : "Account owner",
    practice: practice.trim() || "My practice",
    portal: resolved,
    landing: landingFor(resolved),
  };
  writeSession(user);
  return user;
}
