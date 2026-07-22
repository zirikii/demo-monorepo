import { readJson, writeJson } from "@/lib/data/json-store";
import type { Integration, SettingsStore, TeamMember } from "@/lib/types";
export async function getSettings(): Promise<SettingsStore> {
  return readJson<SettingsStore>("settings.json");
}
export async function addTeamMember(member: TeamMember): Promise<SettingsStore> {
  const settings = await getSettings();
  const next = { ...settings, team: [member, ...settings.team] };
  await writeJson("settings.json", next);
  return next;
}
export async function updateIntegration(id: string, connected: boolean): Promise<Integration> {
  const settings = await getSettings();
  const integrations = settings.integrations.map((integration) =>
    integration.id === id ? { ...integration, connected } : integration,
  );
  const updated = integrations.find((integration) => integration.id === id);
  if (!updated) throw new Error(`Integration ${id} not found`);
  await writeJson("settings.json", { ...settings, integrations });
  return updated;
}
