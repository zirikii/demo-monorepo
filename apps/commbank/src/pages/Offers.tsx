import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { yelloOffers } from "@/data/offers";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";

export function OffersPage() {
  useDocumentTitle("Offers");
  return (
    <PageLayout>
      <PageHero eyebrow="CommBank Yello" title="Offers" summary="Sample cashback and partner offers for the demo." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">{yelloOffers.map((o) => (<article key={o.id} className="rounded-xl border border-line bg-card p-5 shadow-sm"><Badge>{o.category}</Badge><h2 className="mt-3 text-lg font-bold text-ink">{o.brand}</h2><p className="mt-1 text-sm text-ink-soft">{o.title}</p><p className="mt-3 text-2xl font-extrabold text-cba-black">{o.cashback}</p><p className="mt-2 text-xs text-ink-faint">Expires {formatDate(o.expires)}</p></article>))}</div>
    </PageLayout>
  );
}
