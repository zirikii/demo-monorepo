import { useMemo, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { outlets } from "@/data/outlets";
import { cn } from "@/lib/cn";

export function DineShopPage() {
  useDocumentTitle("Dine & Shop");
  const [tab, setTab] = useState<"Dining" | "Shopping">("Dining");
  const rows = useMemo(() => outlets.filter((o) => o.category === tab), [tab]);

  return (
    <PageLayout>
      <PageHero
        title="Dine & Shop"
        subtitle="Homegrown favourites, global brands, GST-absorbed shopping, and Changi Pay."
        crumbs={[{ label: "Dine & Shop" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 inline-flex rounded-lg bg-surface p-1">
          {(["Dining", "Shopping"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-bold",
                tab === t ? "bg-purple text-white" : "text-ink-soft",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((o) => (
            <article key={o.id} className="rounded-xl border border-line bg-card p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">{o.subcategory}</p>
              <h2 className="mt-1 text-base font-black text-ink-deep">{o.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">
                {o.terminal} · {o.hours}
              </p>
              {o.highlight ? <p className="mt-2 text-sm font-bold text-purple">{o.highlight}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
