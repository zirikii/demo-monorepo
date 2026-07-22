import { BusinessPlans } from "@/components/marketing/business-plans";
import { Faq } from "@/components/marketing/faq";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
export default function PricingPage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <section className="bg-optus-page py-16">
          <div className="container max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-optus-teal">
              Demo pricing
            </p>
            <h1 className="mt-3 text-5xl font-black text-optus-ink">
              Choose a fictional Optus business hub package.
            </h1>
            <p className="mt-4 text-lg text-optus-muted">
              All tiers are free because this is a local UI demo with no real Optus account,
              billing, or service connection.
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
