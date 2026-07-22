import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { Store } from "@/lib/types";
import { PageHero } from "@/components/marketing/page-hero";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Store finder",
  description: "Find an Optus store near you across Australia.",
};

export default async function StoresPage() {
  const stores = await readJson<Store[]>("stores.json");

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Find an Optus store"
        description="Drop in for help with a new plan, a device upgrade, or account support."
      />
      <section className="container py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <article
              key={store.id}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-optus-ink">{store.name}</h3>
                {store.flagship ? <Badge>Flagship</Badge> : null}
              </div>
              <p className="mt-1 text-sm font-semibold text-optus-teal">
                {store.suburb}, {store.state}
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm text-optus-ink-soft">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-optus-ink" aria-hidden="true" />
                {store.address}
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm text-optus-ink-soft">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-optus-ink" aria-hidden="true" />
                {store.hours}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
