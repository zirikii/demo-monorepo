"use client";

import { useEffect, useState } from "react";
import type { Integration } from "@/lib/types";

export default function IntegrationsSettingsPage() {
  const [items, setItems] = useState<Integration[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/settings/integrations");
    setItems((await res.json()) as Integration[]);
  }

  useEffect(() => {
    void load();
  }, []);

  async function toggle(id: string, connected: boolean) {
    const res = await fetch("/api/settings/integrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, connected }),
    });
    if (!res.ok) {
      setMessage("Update failed");
      return;
    }
    setMessage(connected ? "Connected" : "Disconnected");
    await load();
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Integrations</h2>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 rounded-lg border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-spark-ink">{item.name}</p>
              <p className="mt-1 text-sm text-spark-ink/70">{item.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={item.connected}
              onClick={() => toggle(item.id, !item.connected)}
              className={`relative h-8 w-14 rounded-full transition ${item.connected ? "bg-spark-purple" : "bg-line-strong"}`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${item.connected ? "left-7" : "left-1"}`}
              />
            </button>
          </li>
        ))}
      </ul>
      {message ? <p className="mt-4 text-sm text-spark-purple">{message}</p> : null}
    </div>
  );
}
