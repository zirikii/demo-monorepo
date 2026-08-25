import { DEFAULT_ADMIN_SETTINGS, type AdminSettings } from "@/data/admin";
import { readJson, writeJson } from "./storage";

const KEY = "atlassian-demo-admin";

export function readAdminSettings(): AdminSettings {
  return { ...DEFAULT_ADMIN_SETTINGS, ...readJson<Partial<AdminSettings>>(KEY, {}) };
}

export function writeAdminSettings(settings: AdminSettings): void {
  writeJson(KEY, settings);
}

export function updateAdminSetting<K extends keyof AdminSettings>(
  key: K,
  value: AdminSettings[K],
): AdminSettings {
  const next = { ...readAdminSettings(), [key]: value };
  writeAdminSettings(next);
  return next;
}
