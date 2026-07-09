import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { Badge } from "../components/ui/Badge";
import { offers, offerCategories, type OfferCategory } from "../data/offers";
import { formatDate } from "../lib/format";
import { cn } from "../lib/cn";

export function OffersPage() {
  useDocumentTitle("Offers & Cashback");
  const [filter, setFilter] = useState<OfferCategory | "All">("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visible = filter === "All" ? offers : offers.filter((o) => o.category === filter);

  const copy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard may be unavailable (permissions/insecure context); still show feedback.
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1500);
  };

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            Offers &amp; <span className="text-paytm-cyan">cashback</span>
          </>
        }
        subtitle="Fresh promo codes across recharges, travel, movies, and UPI — applied automatically at checkout. All offers here are demo content."
      />

      <section aria-label="Offers" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div role="group" aria-label="Filter offers" className="flex flex-wrap gap-2">
          {(["All", ...offerCategories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold transition-colors",
                filter === cat
                  ? "border-paytm-cyan bg-paytm-cyan text-white"
                  : "border-hairline bg-card text-ink-soft hover:border-paytm-cyan/60",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((offer) => (
            <li key={offer.id} className="flex flex-col rounded-2xl bg-card p-5 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="cyan">{offer.category}</Badge>
                <span className="text-[10px] text-ink-faint">valid till {formatDate(offer.expires)}</span>
              </div>
              <h2 className="mt-3 text-sm font-bold leading-snug text-ink">{offer.title}</h2>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-soft">{offer.detail}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <code className="rounded-lg border border-dashed border-paytm-cyan/60 bg-paytm-sky/50 px-3 py-1.5 text-xs font-extrabold tracking-wider text-paytm-navy">
                  {offer.code}
                </code>
                <button
                  type="button"
                  onClick={() => copy(offer.id, offer.code)}
                  className="flex items-center gap-1.5 text-xs font-bold text-paytm-cyan hover:underline"
                >
                  {copiedId === offer.id ? (
                    <>
                      <Check aria-hidden="true" className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="h-3.5 w-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
