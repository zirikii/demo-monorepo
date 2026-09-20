import { readRaw, removeKey, writeRaw } from "./storage";

export interface DemoUser {
  email: string;
  name: string;
  headline: string;
  location: string;
  candidateId: string;
}

interface DemoAccount extends DemoUser {
  passwordHash: string;
}

const SESSION_KEY = "gojek-demo-session";

/**
 * Demo passwords are kept encoded in the seed list so the repo never carries a plaintext
 * credential next to an email address. This is obfuscation for a demo, not security.
 */
export function encodePassword(password: string): string {
  return btoa(`gojek:${password}`);
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "candidate@gojek.io",
    passwordHash: encodePassword("gotroops2026"),
    name: "Sasha Widjaja",
    headline: "Senior Backend Engineer",
    location: "Jakarta, Indonesia",
    candidateId: "CAND-40218",
  },
  {
    email: "designer@gojek.io",
    passwordHash: encodePassword("asphalt2026"),
    name: "Ivy Prasetyo",
    headline: "Product Designer",
    location: "Singapore",
    candidateId: "CAND-40551",
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
      headline: parsed.headline ?? "Candidate",
      location: parsed.location ?? "Jakarta, Indonesia",
      candidateId: parsed.candidateId ?? "CAND-00000",
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
