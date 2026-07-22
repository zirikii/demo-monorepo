"use client";

import { useEffect, useState } from "react";
import type { Integration } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

export default function IntegrationsSettingsPage() {
  const [items, setItems] = useState<Integration[]>([]);

  async function load() {
    const res = await fetch("/api/settings/integrations");
    setItems((await res.json()) as Integration[]);
  }

  useEffect(() => {
    void load();
  }, []);

  async function toggle(id: string, connected: boolean) {
    // Optimistic update, then persist.
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, connected } : i)));
    await fetch("/api/settings/integrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, connected }),
    });
    await load();
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white p-5"
        >
          <div>
            <p className="font-bold text-optus-ink">{item.name}</p>
            <p className="text-sm text-optus-ink/70">{item.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-optus-ink/60">
              {item.connected ? "On" : "Off"}
            </span>
            <Switch
              checked={item.connected}
              onCheckedChange={(v) => toggle(item.id, v)}
              aria-label={`Toggle ${item.name}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
