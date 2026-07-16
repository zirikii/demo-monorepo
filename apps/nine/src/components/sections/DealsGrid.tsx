import { Tag } from "lucide-react";
import { deals } from "@/data/deals";
import { Badge } from "../ui/Badge";

export function DealsGrid() {
  return (
    <section className="rounded-xl border border-line bg-card p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-black tracking-tight text-ink">
        <span className="h-5 w-1.5 rounded-full bg-shopping" />
        Today&apos;s top deals
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <article key={deal.id} className="flex flex-col rounded-lg border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-ink">{deal.retailer}</span>
              <Badge tone="neutral">{deal.category}</Badge>
            </div>
            <p className="mt-1.5 flex-1 text-sm text-ink-soft">{deal.title}</p>
            <p className="mt-2 text-lg font-black text-shopping">{deal.discount}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded border border-dashed border-shopping/60 px-2 py-1 font-mono text-xs font-bold text-shopping">
                <Tag className="h-3 w-3" aria-hidden="true" />
                {deal.code}
              </span>
              <span className="text-[11px] text-ink-faint">
                Ends {new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short" }).format(new Date(deal.expires))}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
