const SETTINGS_KEY = "nine-demo-settings";

export type DemoSettings = {
  breakingAlerts: boolean;
  morningBriefing: boolean;
  sportScores: boolean;
  personalised: boolean;
  edition: string;
};

export const defaultSettings: DemoSettings = {
  breakingAlerts: true,
  morningBriefing: true,
  sportScores: false,
  personalised: true,
  edition: "National",
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
