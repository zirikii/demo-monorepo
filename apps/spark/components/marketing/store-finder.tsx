"use client";

import { useMemo, useState } from "react";
import type { Store } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function StoreFinder({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q),
    );
  }, [query, stores]);

  return (
    <div>
      <label htmlFor="store-search" className="text-sm font-semibold text-spark-ink">
        Search by city or store
      </label>
      <input
        id="store-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Auckland, Queenstown, Airport…"
        className="mt-2 h-11 w-full max-w-md rounded-md border border-line px-3"
      />
      <p className="mt-3 text-sm text-spark-ink/60">{filtered.length} stores</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((store) => (
          <li key={store.id} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-bold text-spark-ink">{store.name}</h2>
              {store.airport ? <Badge>Airport</Badge> : null}
            </div>
            <p className="mt-2 text-sm text-spark-ink/80">{store.address}</p>
            <p className="mt-1 text-sm text-spark-ink/60">{store.city}</p>
            <p className="mt-3 text-xs text-spark-ink/60">{store.hours}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
