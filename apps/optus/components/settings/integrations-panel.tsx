"use client";
import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import type { Integration } from "@/lib/types";
export function IntegrationsPanel({ integrations }: { integrations: Integration[] }) {
  const [rows, setRows] = useState(integrations);
  const [isPending, startTransition] = useTransition();
  function toggle(id: string, connected: boolean) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, connected } : row)));
    startTransition(async () => {
      await fetch("/api/settings/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, connected }),
      });
    });
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rows.map((integration) => (
        <Card key={integration.id} className="flex items-center justify-between gap-4 p-5">
          <div>
            <h2 className="font-black text-optus-ink">{integration.name}</h2>
            <p className="mt-1 text-sm text-optus-muted">{integration.description}</p>
          </div>
          <Switch
            checked={integration.connected}
            disabled={isPending}
            onCheckedChange={(checked) => toggle(integration.id, checked)}
            aria-label={`Toggle ${integration.name}`}
          />
        </Card>
      ))}
    </div>
  );
}
