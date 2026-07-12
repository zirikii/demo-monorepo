const SETTINGS_KEY = "changi-demo-settings";

export type DemoSettings = {
  emailAlerts: boolean;
  pushAlerts: boolean;
  marketing: boolean;
  language: string;
};

export const defaultSettings: DemoSettings = {
  emailAlerts: true,
  pushAlerts: true,
  marketing: false,
  language: "en-AU",
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
