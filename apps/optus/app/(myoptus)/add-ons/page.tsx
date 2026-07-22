"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { AddOn } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export default function AddOnsPage() {
  const [items, setItems] = useState<AddOn[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  async function load() { const res = await fetch("/api/add-ons"); setItems((await res.json()) as AddOn[]); }
  useEffect(() => { void load(); }, []);
  async function setActive(id: string, active: boolean) {
    setPendingId(id); setMessage(null);
    const res = await fetch("/api/add-ons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, active }) });
    setPendingId(null);
    if (!res.ok) { setMessage("Add-on update failed"); return; }
    setMessage(active ? "Add-on activated (demo)." : "Add-on removed (demo).");
    await load();
  }
  return <div><h2 className="text-2xl font-black text-optus-ink">Add-ons</h2><p className="mt-1 text-sm text-optus-ink/70">Manage roaming, entertainment, data and calling extras.</p><ul className="mt-8 grid gap-4 md:grid-cols-2">{items.map((item) => <li key={item.id} className="rounded-lg border border-line bg-white p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase text-optus-teal-dark">{item.category}</p><h3 className="mt-1 text-lg font-black text-optus-ink">{item.name}</h3></div><p className="text-lg font-black text-optus-teal-dark">{formatAud(item.price)}</p></div><p className="mt-3 text-sm text-optus-ink/70">{item.description}</p>{item.purchasedAt ? <p className="mt-3 text-xs text-optus-ink/60">Activated {formatShortDate(item.purchasedAt)}</p> : null}<Button type="button" variant={item.active ? "secondary" : "primary"} className="mt-5 w-full" disabled={pendingId === item.id} onClick={() => setActive(item.id, !item.active)}>{pendingId === item.id ? "Saving..." : item.active ? "Remove add-on" : "Activate add-on"}</Button></li>)}</ul>{message ? <p className="mt-4 text-sm font-semibold text-optus-teal-dark">{message}</p> : null}</div>;
}
