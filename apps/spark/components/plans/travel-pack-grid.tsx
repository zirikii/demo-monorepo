"use client";

import { useState } from "react";
import type { TravelPack } from "@/lib/types";
import { TravelPackCard } from "@/components/plans/travel-pack-card";

export function TravelPackGrid({ packs }: { packs: TravelPack[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {packs.map((pack) => (
          <TravelPackCard key={pack.id} pack={pack} onSelect={setSelected} />
        ))}
      </div>
      {selected ? (
        <p className="mt-6 rounded-md bg-spark-purple-light px-4 py-3 text-sm text-spark-purple" role="status">
          Demo only — Travel Packs are in-store on the real Spark site. Selected: <strong>{selected}</strong>
        </p>
      ) : null}
    </div>
  );
}
