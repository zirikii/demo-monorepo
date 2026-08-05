export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private-mode failures are non-fatal for a demo.
  }
}

export type DemoSettings = {
  statementsPaperless: boolean;
  spendAlerts: boolean;
  marketingEmails: boolean;
  callerCheck: boolean;
  netcodeSms: boolean;
};

export const defaultSettings: DemoSettings = {
  statementsPaperless: true,
  spendAlerts: true,
  marketingEmails: false,
  callerCheck: true,
  netcodeSms: true,
};

const SETTINGS_KEY = "commbank-demo-settings";

export function readSettings(): DemoSettings {
  return { ...defaultSettings, ...readJson<Partial<DemoSettings>>(SETTINGS_KEY, {}) };
}

export function writeSettings(settings: DemoSettings): void {
  writeJson(SETTINGS_KEY, settings);
}
