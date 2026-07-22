"use client";

import { useEffect, useState } from "react";
import type { AddOn, AddOnPurchase } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

export default function AddOnsPage() {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [purchases, setPurchases] = useState<AddOnPurchase[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/add-ons");
    const data = (await res.json()) as { addOns: AddOn[]; purchases: AddOnPurchase[] };
    setAddOns(data.addOns);
    setPurchases(data.purchases);
  }

  useEffect(() => {
    void load();
  }, []);

  async function toggle(id: string, enabled: boolean) {
    const res = await fetch("/api/add-ons", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, enabled }),
    });
    if (!res.ok) {
      setMessage("Could not update add-on");
      return;
    }
    setMessage(enabled ? "Add-on enabled" : "Add-on disabled");
    await load();
  }

  async function purchase(id: string) {
    const res = await fetch("/api/add-ons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      setMessage("Could not purchase add-on");
      return;
    }
    setMessage("Add-on purchased (demo)");
    await load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Add-ons</h2>
        <p className="mt-1 text-sm text-optus-ink/70">
          Boost data, enable Endless Data, or grab an Unlimited Data Day.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addOns.map((item) => (
          <div key={item.id} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-optus-ink">{item.name}</h3>
                <p className="mt-1 text-sm text-optus-ink/70">{item.description}</p>
                <p className="mt-2 text-sm font-semibold text-optus-teal">
                  {item.price === 0 ? "Included" : formatAud(item.price)}
                </p>
              </div>
              <button
                type="button"
                aria-pressed={item.enabled}
                onClick={() => toggle(item.id, !item.enabled)}
                className={`relative h-7 w-12 rounded-full transition ${
                  item.enabled ? "bg-optus-teal" : "bg-line-strong"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition ${
                    item.enabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            {item.price > 0 ? (
              <Button
                type="button"
                size="sm"
                className="mt-4"
                onClick={() => purchase(item.id)}
              >
                Buy once
              </Button>
            ) : null}
          </div>
        ))}
      </div>

      {message ? <p className="text-sm font-semibold text-optus-teal">{message}</p> : null}

      <div>
        <h3 className="text-lg font-bold">Recent purchases</h3>
        <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-white">
          {purchases.map((p) => (
            <li key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-optus-ink/60">
                  {formatShortDate(p.createdAt)} · {p.note}
                </p>
              </div>
              <p className="font-semibold">{formatAud(p.amount)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
