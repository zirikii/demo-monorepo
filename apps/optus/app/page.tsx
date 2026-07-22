import { BusinessPlans } from "@/components/marketing/business-plans";
import { Faq } from "@/components/marketing/faq";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingHero } from "@/components/marketing/hero";
export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <MarketingHero />
        <FeatureGrid />
        <section id="insights" className="bg-optus-teal-dark py-16 text-white">
          <div className="container grid gap-8 md:grid-cols-[0.8fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">
                Insight Plus inspired
              </p>
              <h2 className="mt-2 text-4xl font-black">
                Billing and inbound call intelligence for business teams.
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/75">
              Track unbilled usage, allocate costs to departments, monitor inbound calling peaks,
              and subscribe teams to CSV-ready report drops. Everything here is simulated with local
              seed data.
            </p>
          </div>
        </section>
        <BusinessPlans />
        <Faq />
      </main>
      <MarketingFooter />
    </>
  );
}
