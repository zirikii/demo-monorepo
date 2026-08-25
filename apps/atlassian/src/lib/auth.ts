import type { DemoPortal } from "@/data/apps";
import { getProductApp } from "@/data/apps";
import { readRaw, removeKey, writeRaw } from "./storage";

export type { DemoPortal };

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

const SESSION_KEY = "atlassian-demo-session";

/**
 * Demo passwords are kept encoded in the seed list so the repo never carries a plaintext
 * credential next to an email address. This is obfuscation for a demo, not security.
 */
export function encodePassword(password: string): string {
  return btoa(`atl:${password}`);
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "demo@atlassian.com",
    passwordHash: "YXRsOnRlYW13b3JrMjAyNg==",
    name: "Maya Chen",
    jobTitle: "Product Delivery Lead",
    company: "Northline Payments",
    portal: "jira",
    plan: "Jira Cloud Premium",
    landing: "/jira",
  },
  {
    email: "admin@atlassian.com",
    passwordHash: "YXRsOmFkbWluMjAyNg==",
    name: "Jordan Hale",
    jobTitle: "Atlassian Administrator",
    company: "Northline Payments",
    portal: "admin",
    plan: "Enterprise",
    landing: "/admin",
  },
  {
    email: "rovo@atlassian.com",
    passwordHash: "YXRsOmFnZW50czIwMjY=",
    name: "Priya Raman",
    jobTitle: "AI Enablement Partner",
    company: "Northline Payments",
    portal: "rovo",
    plan: "Teamwork Collection",
    landing: "/rovo",
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
      company: parsed.company ?? "Northline Payments",
      portal: parsed.portal ?? "jira",
      plan: parsed.plan ?? "Jira Cloud Premium",
      landing: parsed.landing ?? "/jira",
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

export function loginWithCredentials(
  email: string,
  password: string,
  destination?: DemoPortal,
): DemoUser | null {
  const account = DEMO_ACCOUNTS.find(
    (candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (!account || account.passwordHash !== encodePassword(password)) {
    return null;
  }
  const { passwordHash: _passwordHash, ...base } = account;
  const user: DemoUser = destination
    ? { ...base, portal: destination, landing: getProductApp(destination).path }
    : base;
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
    jobTitle: "Site admin",
    company: company.trim() || "My team",
    portal: "jira",
    plan: "Jira Cloud (14-day trial)",
    landing: "/jira",
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
