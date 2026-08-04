export type DemoUser = {
  clientNumber: string;
  email: string;
  name: string;
  yelloTier: "CommBank Yello" | "Yello Plus" | "Yello Gold" | "Yello Diamond";
  customerSince: string;
};

const STORAGE_KEY = "commbank-demo-session";

export const demoCredentials = {
  clientNumber: "12345678",
  password: "demo",
  email: "demo@commbank.example",
};

export function encodeSession(user: DemoUser): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(user))));
}

export function decodeSession(token: string | null): DemoUser | null {
  if (!token) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(token)))) as DemoUser;
    if (!parsed.clientNumber || !parsed.name) return null;
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

/**
 * Demo mode: any client number and password are accepted. Nothing is verified —
 * the session is a plain base64 blob so the whole flow works offline.
 */
export function logonWithCredentials(clientNumber: string, _password: string): DemoUser {
  const trimmed = clientNumber.trim() || demoCredentials.clientNumber;
  const user: DemoUser = {
    clientNumber: trimmed,
    email: demoCredentials.email,
    name: "Alex Mitchell",
    yelloTier: "Yello Gold",
    customerSince: "2013-06-04",
  };
  writeSession(user);
  return user;
}
