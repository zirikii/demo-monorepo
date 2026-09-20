import { DEFAULT_INTEGRATIONS } from "@/data/integrations";
import type { IntegrationToggle } from "@/data/types";
import { readJson, writeJson } from "./storage";

const INTEGRATIONS_KEY = "gojek-demo-integrations";
const PROFILE_KEY = "gojek-demo-profile";

export interface ProfileDraft {
  name: string;
  role: string;
  hub: string;
  team: string;
  bio: string;
}

export function readIntegrations(): IntegrationToggle[] {
  return readJson<IntegrationToggle[]>(INTEGRATIONS_KEY, DEFAULT_INTEGRATIONS);
}

export function writeIntegrations(items: IntegrationToggle[]): void {
  writeJson(INTEGRATIONS_KEY, items);
}

export function toggleIntegration(id: string): IntegrationToggle[] {
  const next = readIntegrations().map((item) =>
    item.id === id ? { ...item, enabled: !item.enabled } : item,
  );
  writeIntegrations(next);
  return next;
}

export function readProfile(fallback: ProfileDraft): ProfileDraft {
  return readJson<ProfileDraft>(PROFILE_KEY, fallback);
}

export function writeProfile(profile: ProfileDraft): void {
  writeJson(PROFILE_KEY, profile);
}
