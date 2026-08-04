export type DemoUser = {
  email: string;
  name: string;
  customerNumber: string;
};

const STORAGE_KEY = "commbank-demo-session";

export function encodeSession(user: DemoUser): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(user))));
}

export function decodeSession(token: string | null): DemoUser | null {
  if (!token) return null;
  try {
    const raw = decodeURIComponent(escape(atob(token)));
    const parsed = JSON.parse(raw) as DemoUser;
    if (!parsed.email || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readSession(): DemoUser | null {
  if (typeof window === "undefined") return null;
  return decodeSession(window.localStorage.getItem(STORAGE_KEY));
}

export function writeSession(user: DemoUser): void {
  window.localStorage.setItem(STORAGE_KEY, encodeSession(user));
}

export function clearSession(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function loginWithCredentials(email: string, _password: string, name?: string): DemoUser {
  const trimmed = email.trim().toLowerCase() || "admin@example.com";
  const user: DemoUser = {
    email: trimmed,
    name: name?.trim() || trimmed.split("@")[0] || "Demo Customer",
    customerNumber: "7621" + String(trimmed.length * 137).padStart(6, "0").slice(-6),
  };
  writeSession(user);
  return user;
}
