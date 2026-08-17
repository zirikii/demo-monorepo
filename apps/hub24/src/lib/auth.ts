import { readRaw, removeKey, writeRaw } from "./storage";

export type DemoPortal = "investor" | "adviser" | "manager";

export interface DemoUser {
  email: string;
  name: string;
  jobTitle: string;
  organisation: string;
  portal: DemoPortal;
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
  return btoa(`h24:${password}`);
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "investor@hub24.com.au",
    passwordHash: encodePassword("invest2026"),
    name: "Margaret Whitlam",
    jobTitle: "Advised client",
    organisation: "Kembla Advice Partners",
    portal: "investor",
    landing: "/investorhub",
  },
  {
    email: "adviser@hub24.com.au",
    passwordHash: encodePassword("advice2026"),
    name: "Daniel Okonjo",
    jobTitle: "Senior Financial Adviser",
    organisation: "Kembla Advice Partners",
    portal: "adviser",
    landing: "/adviserhub",
  },
  {
    email: "manager@hub24.com.au",
    passwordHash: encodePassword("manager2026"),
    name: "Ruth Callaghan",
    jobTitle: "Head of Distribution",
    organisation: "Tallowood Asset Management",
    portal: "manager",
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
      jobTitle: parsed.jobTitle ?? "Advised client",
      organisation: parsed.organisation ?? "Kembla Advice Partners",
      portal: parsed.portal ?? "investor",
      landing: parsed.landing ?? "/investorhub",
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
