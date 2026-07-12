import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { catalogue, rewardBenefits } from "@/data/rewards";
import { formatPoints } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function RewardsPage() {
  useDocumentTitle("Changi Rewards");
  return (
    <PageLayout>
      <PageHero
        title="Changi Rewards"
        subtitle="Earn when you dine, shop, and park — redeem for vouchers, experiences, and more."
        crumbs={[{ label: "Changi Rewards" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rewardBenefits.map((b) => (
            <article key={b.title} className="rounded-2xl border border-line bg-sand p-5">
              <h2 className="text-base font-black text-ink-deep">{b.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{b.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black text-ink-deep">Catalogue highlights</h2>
          <Link to="/signup"><Button variant="purple">Join Changi Rewards</Button></Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {catalogue.map((item) => (
            <article key={item.id} className="rounded-xl border border-line bg-card p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">{item.category}</p>
              <h3 className="mt-1 font-black text-ink-deep">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              <p className="mt-3 text-sm font-bold text-purple">{formatPoints(item.points)} pts</p>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
