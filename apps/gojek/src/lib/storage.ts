const SETTINGS_KEY = "gojek-demo-settings";

export type DemoSettings = {
  promoEmails: boolean;
  pushAlerts: boolean;
  smsUpdates: boolean;
  language: string;
  currency: string;
};

export const defaultSettings: DemoSettings = {
  promoEmails: true,
  pushAlerts: true,
  smsUpdates: false,
  language: "en",
  currency: "IDR",
};

export function readSettings(): DemoSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...(JSON.parse(raw) as Partial<DemoSettings>) };
  } catch {
    return defaultSettings;
  }
}

export function writeSettings(settings: DemoSettings): void {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
