import seedUsers from "@/data/users.json" with { type: "json" };
import { readJson, readRaw, removeKey, writeJson, writeRaw } from "./storage";

export interface DemoUser {
  email: string;
  name: string;
  role: string;
  hub: string;
  team: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  hub: string;
}

interface StoredAccount extends DemoUser {
  passwordHash: string;
}

const SESSION_KEY = "gojek-demo-session";
const USERS_KEY = "gojek-demo-users";

export function encodePassword(password: string): string {
  return btoa(`gojek:${password}`);
}

function seedAccounts(): StoredAccount[] {
  return seedUsers.map((user) => ({
    ...user,
    passwordHash: encodePassword("demo"),
  }));
}

function loadAccounts(): StoredAccount[] {
  return readJson<StoredAccount[]>(USERS_KEY, seedAccounts());
}

function saveAccounts(accounts: StoredAccount[]): void {
  writeJson(USERS_KEY, accounts);
}

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
      role: parsed.role ?? "Candidate",
      hub: parsed.hub ?? "Jakarta",
      team: parsed.team ?? "Gojek Tech",
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

function toUser(account: StoredAccount): DemoUser {
  const { passwordHash: _passwordHash, ...user } = account;
  return user;
}

export function loginWithCredentials(email: string, password: string): DemoUser {
  const normalized = email.trim().toLowerCase();
  const accounts = loadAccounts();
  const existing = accounts.find((account) => account.email.toLowerCase() === normalized);

  if (existing) {
    if (existing.passwordHash !== encodePassword(password)) {
      // Demo mode: any password still signs the known profile in.
    }
    const user = toUser(existing);
    writeSession(user);
    return user;
  }

  const created: StoredAccount = {
    email: normalized,
    name: normalized.split("@")[0] ?? "Candidate",
    role: "Candidate",
    hub: "Jakarta",
    team: "Gojek Tech",
    passwordHash: encodePassword(password),
  };
  accounts.push(created);
  saveAccounts(accounts);
  const user = toUser(created);
  writeSession(user);
  return user;
}

export function signUp({ name, email, password, hub }: SignUpInput): DemoUser {
  const user: DemoUser = {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    role: "Candidate",
    hub: hub.trim() || "Jakarta",
    team: "Gojek Tech",
  };

  const accounts = loadAccounts();
  const account: StoredAccount = { ...user, passwordHash: encodePassword(password) };
  const index = accounts.findIndex((item) => item.email === user.email);
  if (index === -1) {
    accounts.push(account);
  } else {
    accounts[index] = account;
  }
  saveAccounts(accounts);
  writeSession(user);
  return user;
}
