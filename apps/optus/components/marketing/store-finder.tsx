"use client";

import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import type { Store } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export function StoreFinder({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) =>
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    );
  }, [query, stores]);

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-md border border-line bg-white px-3"
        role="search"
      >
        <Search className="h-5 w-5 text-optus-ink/50" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, state or store"
          aria-label="Search stores"
          className="h-12 flex-1 bg-transparent outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          title="No stores match your search"
          description="Try a different city or state, like Sydney or VIC."
        />
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((store) => (
            <li key={store.id} className="rounded-lg border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-optus-teal" aria-hidden="true" />
                  <h3 className="font-bold text-optus-ink">{store.name}</h3>
                </div>
                {store.flagship ? (
                  <Badge className="bg-optus-yellow text-optus-ink">Flagship</Badge>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-optus-ink/70">{store.address}</p>
              <p className="mt-1 text-xs text-optus-ink/60">{store.hours}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
