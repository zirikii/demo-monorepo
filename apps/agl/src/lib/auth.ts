export type DemoUser = {
  customerNumber: string;
  firstName: string;
  lastName: string;
  email: string;
};

const SESSION_KEY = "agl-demo-session";

export const DEMO_USER: DemoUser = {
  customerNumber: "7004 218 663",
  firstName: "Alex",
  lastName: "Nguyen",
  email: "alex.nguyen@example.com",
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
    if (!parsed.customerNumber || !parsed.firstName || !parsed.email) return null;
    return {
      customerNumber: parsed.customerNumber,
      firstName: parsed.firstName,
      lastName: parsed.lastName ?? "",
      email: parsed.email,
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

export function loginWithCredentials(email: string, _password: string): DemoUser {
  const trimmed = email.trim().toLowerCase();
  const user: DemoUser = { ...DEMO_USER, email: trimmed || DEMO_USER.email };
  writeSession(user);
  return user;
}
