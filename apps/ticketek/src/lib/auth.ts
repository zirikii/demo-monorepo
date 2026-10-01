import { SEED_FAN } from "@/data/fan";

export type DemoUser = {
  firstName: string;
  lastName: string;
  email: string;
};

const SESSION_KEY = "ticketek-demo-session";

export const DEMO_USER: DemoUser = {
  firstName: SEED_FAN.firstName,
  lastName: SEED_FAN.lastName,
  email: SEED_FAN.email,
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
    if (!parsed.firstName || !parsed.email) return null;
    return { firstName: parsed.firstName, lastName: parsed.lastName ?? "", email: parsed.email };
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

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** "sam.lee@…" → Sam Lee, so a custom email still gets a personal greeting. */
export function nameFromEmail(email: string): { firstName: string; lastName: string } | null {
  const parts = (email.split("@")[0] ?? "").split(/[._-]+/).filter((p) => /^[a-z]+$/.test(p));
  const [first, ...rest] = parts;
  if (!first) return null;
  return { firstName: titleCase(first), lastName: rest.map(titleCase).join(" ") };
}

export function loginWithCredentials(email: string, _password: string): DemoUser {
  const trimmed = email.trim().toLowerCase();
  const name = trimmed && trimmed !== DEMO_USER.email ? nameFromEmail(trimmed) : null;
  const user: DemoUser = { ...DEMO_USER, ...name, email: trimmed || DEMO_USER.email };
  writeSession(user);
  return user;
}

export function signUp(details: DemoUser): DemoUser {
  const user = { ...details, email: details.email.trim().toLowerCase() };
  writeSession(user);
  return user;
}

/** Only same-app paths, so ?next= can't bounce the fan to another site. */
export function safeNext(next: string | null, fallback = "/account"): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}
