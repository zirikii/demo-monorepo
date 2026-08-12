import { readRaw, removeKey, writeRaw } from "./storage";

export type DemoPortal = "employer" | "employee" | "partner";

export interface DemoUser {
  email: string;
  name: string;
  jobTitle: string;
  company: string;
  portal: DemoPortal;
  plan: string;
  landing: string;
}

interface DemoAccount extends DemoUser {
  passwordHash: string;
}

const SESSION_KEY = "employmenthero-demo-session";

/**
 * Demo passwords are kept encoded in the seed list so the repo never carries a plaintext
 * credential next to an email address. This is obfuscation for a demo, not security.
 */
export function encodePassword(password: string): string {
  return btoa(`eh:${password}`);
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "demo@employmenthero.com",
    passwordHash: "ZWg6aGVyb2VzMjAyNg==",
    name: "Priya Raman",
    jobTitle: "People & Culture Lead",
    company: "Harbourline Hospitality Group",
    portal: "employer",
    plan: "Employment Unlimited",
    landing: "/platform",
  },
  {
    email: "employee@employmenthero.com",
    passwordHash: "ZWg6dGVhbWhlcm8=",
    name: "Sam Okafor",
    jobTitle: "Venue Supervisor",
    company: "Harbourline Hospitality Group",
    portal: "employee",
    plan: "Employment Hero Work",
    landing: "/platform",
  },
  {
    email: "partner@employmenthero.com",
    passwordHash: "ZWg6cGFydG5lcjIwMjY=",
    name: "Nadia Fischer",
    jobTitle: "Client Services Director",
    company: "Ledgerline Advisory",
    portal: "partner",
    plan: "Partner Network",
    landing: "/platform",
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
      jobTitle: parsed.jobTitle ?? "Team member",
      company: parsed.company ?? "Harbourline Hospitality Group",
      portal: parsed.portal ?? "employer",
      plan: parsed.plan ?? "Employment Unlimited",
      landing: parsed.landing ?? "/platform",
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

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  company: string;
}

export function signUp({ name, email, password, company }: SignUpInput): DemoUser {
  const user: DemoUser = {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    jobTitle: "Account owner",
    company: company.trim() || "My business",
    portal: "employer",
    plan: "HR Engage (14-day trial)",
    landing: "/platform",
  };

  const existing = DEMO_ACCOUNTS.findIndex((account) => account.email === user.email);
  const account: DemoAccount = { ...user, passwordHash: encodePassword(password) };
  if (existing === -1) {
    DEMO_ACCOUNTS.push(account);
  } else {
    DEMO_ACCOUNTS[existing] = account;
  }

  writeSession(user);
  return user;
}
