export type PartnerType = "driver" | "merchant" | "consumer";

export type DemoUser = {
  email: string;
  name: string;
  partnerType: PartnerType;
  city: string;
  memberSince: string;
};

const STORAGE_KEY = "gojek-demo-session";

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

function titleCaseFromEmail(email: string): string {
  const handle = email.split("@")[0] ?? "partner";
  return handle
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function loginWithCredentials(
  email: string,
  _password: string,
  overrides?: Partial<DemoUser>,
): DemoUser {
  const cleanEmail = email.trim().toLowerCase() || "partner@example.com";
  const user: DemoUser = {
    email: cleanEmail,
    name: overrides?.name?.trim() || titleCaseFromEmail(cleanEmail) || "Gojek Partner",
    partnerType: overrides?.partnerType ?? "driver",
    city: overrides?.city ?? "Jakarta",
    memberSince: overrides?.memberSince ?? "2023-08-01",
  };
  writeSession(user);
  return user;
}
