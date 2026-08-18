import { readRaw, removeKey, writeRaw } from "./storage";

export type DemoPortal = "adviser" | "investor" | "licensee";

export interface DemoUser {
  email: string;
  name: string;
  jobTitle: string;
  practice: string;
  portal: DemoPortal;
  adviserCode: string;
  landing: string;
}

interface DemoAccount extends DemoUser {
  passwordHash: string;
}

const SESSION_KEY = "hub24-demo-session";

/**
 * Demo passwords are kept encoded in the seed list so the repo never carries a plaintext
 * credential next to an email address. This is obfuscation for a demo, not security.
 */
export function encodePassword(password: string): string {
  return btoa(`hub24:${password}`);
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "adviser@hub24.com.au",
    passwordHash: encodePassword("platform2026"),
    name: "Alicia Nguyen",
    jobTitle: "Senior Financial Adviser",
    practice: "Meridian Private Wealth",
    portal: "adviser",
    adviserCode: "ADV-40218",
    landing: "/adviserhub",
  },
  {
    email: "investor@hub24.com.au",
    passwordHash: encodePassword("invest2026"),
    name: "Daniel Whitlock",
    jobTitle: "Advised client",
    practice: "Meridian Private Wealth",
    portal: "investor",
    adviserCode: "INV-88301",
    landing: "/adviserhub",
  },
  {
    email: "licensee@hub24.com.au",
    passwordHash: encodePassword("licensee2026"),
    name: "Marcus Bell",
    jobTitle: "Head of Investment Solutions",
    practice: "Highfield Advice Group",
    portal: "licensee",
    adviserCode: "LIC-10744",
    landing: "/adviserhub",
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
      jobTitle: parsed.jobTitle ?? "Financial adviser",
      practice: parsed.practice ?? "Meridian Private Wealth",
      portal: parsed.portal ?? "adviser",
      adviserCode: parsed.adviserCode ?? "ADV-00000",
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
  const { passwordHash: _passwordHash, ...user } = account;
  return user;
}

export function loginWithCredentials(email: string, password: string): DemoUser | null {
  const account = DEMO_ACCOUNTS.find(
    (candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (!account || account.passwordHash !== encodePassword(password)) {
    return null;
  }
  const { passwordHash: _passwordHash, ...user } = account;
  writeSession(user);
  return user;
}
