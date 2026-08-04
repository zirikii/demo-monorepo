export type DemoUser = {
  clientNumber: string;
  name: string;
  email: string;
  yelloTier: "Base" | "Plus" | "Gold" | "Diamond";
  customerSince: string;
};

const SESSION_KEY = "commbank-demo-session";

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
    if (!parsed.clientNumber || !parsed.name) return null;
    return {
      clientNumber: parsed.clientNumber,
      name: parsed.name,
      email: parsed.email ?? "demo@example.com",
      yelloTier: parsed.yelloTier ?? "Gold",
      customerSince: parsed.customerSince ?? "2016-04-18",
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

const DEMO_CLIENT_NUMBER = "12345678";

export function loginWithCredentials(clientNumber: string, _password: string): DemoUser {
  const trimmed = clientNumber.trim() || DEMO_CLIENT_NUMBER;
  const user: DemoUser = {
    clientNumber: trimmed,
    name: "Alex Nguyen",
    email: "alex.nguyen@example.com",
    yelloTier: "Gold",
    customerSince: "2016-04-18",
  };
  writeSession(user);
  return user;
}

export function registerCustomer(name: string, email: string): DemoUser {
  const user: DemoUser = {
    clientNumber: DEMO_CLIENT_NUMBER,
    name: name.trim() || "New Customer",
    email: email.trim().toLowerCase() || "new.customer@example.com",
    yelloTier: "Base",
    customerSince: new Date().toISOString().slice(0, 10),
  };
  writeSession(user);
  return user;
}
