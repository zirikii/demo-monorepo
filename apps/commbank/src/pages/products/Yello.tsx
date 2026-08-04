import { Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { yelloStats, yelloSteps, yelloTiers } from "@/data/yello";
import { cn } from "@/lib/cn";

export function YelloPage() {
  useDocumentTitle("CommBank Yello");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "CommBank Yello" }]} />
      <PageHero
        eyebrow="CommBank Yello"
        title="Value that grows with your banking"
        description="Our customer recognition program provides relevant, tailored benefits and offers for eligible customers. To check your eligibility, tap CBA Yello in the latest version of the CommBank app."
        actions={
          <ButtonLink to="/netbank/yello" variant="secondary" size="lg">
            Open the Yello hub
          </ButtonLink>
        }
      />

      <section className="border-b border-line py-12">
        <div className="container-page">
          <dl className="grid gap-6 sm:grid-cols-3">
            {yelloStats.map((stat) => (
              <div key={stat.label} className="border-t-2 border-black pt-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold text-black">{stat.value}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="How CommBank Yello works"
            description="We check eligibility in the first week of each month, based on your activity last month. If you meet the criteria, you'll get access for the next 3 months."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {yelloSteps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-line bg-surface p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cba-yellow text-sm font-bold text-black">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm text-ink-soft">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tiers" className="scroll-mt-28 border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Tiers"
            title="Four tiers, each unlocking more"
            description="Each tier builds on the one before it. Eligibility is reviewed monthly based on your transactions and balances."
          />
          <div
            id="benefits"
            className="mt-10 grid scroll-mt-28 gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {yelloTiers.map((tier) => (
              <Card
                key={tier.id}
                as="article"
                className={cn("flex h-full flex-col border-t-4", tier.accent)}
              >
                <h3 className="text-lg font-bold text-black">{tier.name}</h3>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                  Eligibility
                </p>
                <ul className="mt-2 space-y-1.5">
                  {tier.criteria.map((item) => (
                    <li key={item} className="text-sm text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                  Benefits
                </p>
                <ul className="mt-2 flex-1 space-y-2.5">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="Start your journey with CommBank Yello"
            description="Explore our range of everyday transaction accounts to begin."
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/banking/bank-accounts">Discover everyday accounts</ButtonLink>
            <ButtonLink to="/netbank/yello" variant="outline">
              See your offers
            </ButtonLink>
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Tier criteria and benefits shown here are simplified demo content. In the real world,
          CommBank Yello benefits are subject to the CommBank Yello Terms and Conditions and the
          terms of each individual product or partner offer.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
