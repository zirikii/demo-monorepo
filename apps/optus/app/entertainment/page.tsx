import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { EntertainmentTile } from "@/lib/types";
import { PageHero } from "@/components/marketing/page-hero";
import { Badge } from "@/components/ui/badge";
import { Trophy, Tv, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Entertainment",
  description: "Optus Sport, Optus SubHub and streaming bundles.",
};

const ICONS = {
  Sport: Trophy,
  Streaming: Tv,
  Bundle: Layers,
} as const;

export default async function EntertainmentPage() {
  const tiles = await readJson<EntertainmentTile[]>("entertainment.json");

  return (
    <>
      <PageHero
        eyebrow="Entertainment"
        title="Live sport and streaming, all in one place"
        description="Watch every Premier League match on Optus Sport and bundle your favourite streaming services with SubHub."
      />
      <section className="container py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => {
            const Icon = ICONS[tile.category];
            return (
              <article
                key={tile.id}
                className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-optus-yellow-light">
                    <Icon className="h-6 w-6 text-optus-ink" aria-hidden="true" />
                  </span>
                  <Badge>{tile.category}</Badge>
                </div>
                <h3 className="mt-4 text-lg font-bold text-optus-ink">{tile.name}</h3>
                <p className="mt-1 text-sm font-semibold text-optus-teal">{tile.price}</p>
                <p className="mt-2 flex-1 text-sm text-optus-ink-soft">{tile.blurb}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
