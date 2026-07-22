import Link from "next/link";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { QuickLinkGrid } from "@/components/marketing/quick-link-grid";
import { PlanCard } from "@/components/marketing/plan-card";
import { OptusSportPromo } from "@/components/marketing/optus-sport-promo";
import { CoverageTeaser } from "@/components/marketing/coverage-teaser";
import { AppDownloadCta } from "@/components/marketing/app-download-cta";
import { WhyOptus } from "@/components/marketing/why-optus";
import { HelpfulThings } from "@/components/marketing/helpful-things";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export default async function HomePage() {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");
  const featured = plans.slice(0, 3);

  return (
    <>
      <HeroBanner />
      <QuickLinkGrid />

      <section className="bg-surface-subtle py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold text-optus-ink">SIM only plans</h2>
              <p className="mt-1 text-optus-ink/70">No lock-in contract. Data that rolls over.</p>
            </div>
            <Link href="/mobile-plans" className="text-sm font-semibold text-optus-teal hover:underline">
              Compare all plans →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <OptusSportPromo />
      <CoverageTeaser />
      <AppDownloadCta />
      <WhyOptus />
      <HelpfulThings />
    </>
  );
}
