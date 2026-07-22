"use client";

import { useEffect, useState } from "react";
import type { Integration } from "@/lib/types";
import { SettingsTabs } from "@/components/myoptus/settings-tabs";
import { Switch } from "@/components/ui/switch";

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  async function load() {
    const res = await fetch("/api/settings/integrations");
    if (res.ok) {
      setIntegrations((await res.json()) as Integration[]);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function toggle(id: string, connected: boolean) {
    setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, connected } : i)));
    await fetch("/api/settings/integrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, connected }),
    });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-optus-ink">Settings</h2>
      <SettingsTabs />
      <h3 className="text-lg font-bold text-optus-ink">Integrations</h3>
      <ul className="divide-y divide-line rounded-lg border border-line bg-white">
        {integrations.map((integration) => (
          <li key={integration.id} className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-semibold text-optus-ink">{integration.name}</p>
              <p className="text-sm text-optus-ink-soft">{integration.description}</p>
            </div>
            <Switch
              checked={integration.connected}
              onCheckedChange={(v) => toggle(integration.id, v)}
              aria-label={`${integration.connected ? "Disconnect" : "Connect"} ${integration.name}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
