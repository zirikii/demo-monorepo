export type DemoProfile = {
  clientNumber: string;
  name: string;
  initials: string;
  lastLogin: string;
};

export const SESSION_KEY = "commbank-demo-session";

export const DEMO_PROFILE: DemoProfile = {
  clientNumber: "12345678",
  name: "Alex Morgan",
  initials: "AM",
  lastLogin: "4 August 2026 at 4:42 pm",
};

export function encodeSession(profile: DemoProfile): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(profile))));
}

export function decodeSession(token: string | null): DemoProfile | null {
  if (!token) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(token)))) as Partial<DemoProfile>;
    if (!parsed.clientNumber || !parsed.name || !parsed.initials || !parsed.lastLogin) return null;
    return parsed as DemoProfile;
  } catch {
    return null;
  }
}

export function readSession(): DemoProfile | null {
  if (typeof window === "undefined") return null;
  return decodeSession(window.localStorage.getItem(SESSION_KEY));
}

export function login(clientNumber: string, password: string): DemoProfile {
  if (!clientNumber.trim() || !password) throw new Error("Enter a client number and password.");
  const profile = { ...DEMO_PROFILE, clientNumber: clientNumber.trim() };
  window.localStorage.setItem(SESSION_KEY, encodeSession(profile));
  return profile;
}

export function logout(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
