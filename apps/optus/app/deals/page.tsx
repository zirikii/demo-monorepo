import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { Deal } from "@/lib/types";
import { formatShortDate } from "@/lib/utils/format";
import { PageHero } from "@/components/marketing/page-hero";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Deals",
  description: "Current Optus deals across mobile, internet, devices and entertainment.",
};

export default async function DealsPage() {
  const deals = await readJson<Deal[]>("deals.json");

  return (
    <>
      <PageHero
        eyebrow="Deals"
        title="Offers worth saying yes to"
        description="Limited-time deals across mobile, internet, devices and entertainment."
      />
      <section className="container py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm"
            >
              <Badge className="w-fit">{deal.category}</Badge>
              <h3 className="mt-3 text-lg font-bold text-optus-ink">{deal.title}</h3>
              <p className="mt-2 flex-1 text-sm text-optus-ink-soft">{deal.blurb}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-optus-ink-soft">
                Ends {formatShortDate(deal.ends)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
