import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/Card";
import { FilterChips } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cardCategories, creditCards } from "@/data/cards";

export function CreditCardsPage() {
  useDocumentTitle("Credit cards");
  const [category, setCategory] = useState<string>("All");

  const visible = useMemo(
    () => creditCards.filter((card) => category === "All" || card.category === category),
    [category],
  );

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking", to: "/banking" }, { label: "Credit cards" }]} />
      <PageHero
        eyebrow="Credit cards"
        title="Find a credit card that fits how you spend"
        description="Compare interest-free, low rate, low fee and awards cards side by side, including the fee waivers that apply."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Compare credit cards" />
          <FilterChips
            className="mt-6"
            options={cardCategories}
            value={category}
            onChange={setCategory}
            ariaLabel="Filter credit cards by type"
          />
          <p className="mt-4 text-sm text-ink-soft" role="status">
            Showing <strong className="text-black">{visible.length}</strong> of {creditCards.length}{" "}
            cards
          </p>

          {visible.length === 0 ? (
            <EmptyState
              title="No cards in that category"
              description="Choose a different card type to see the available options."
            />
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((card) => (
                <ProductCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  tagline={card.tagline}
                  headline={card.purchaseRate}
                  headlineLabel="Interest rate on purchases"
                  features={card.features}
                  badge={card.badge}
                  ctaLabel="Apply now"
                  ctaTo="/register"
                  footnote={`Minimum credit limit ${card.minimumCreditLimit} · ${card.annualFee}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Fees & charges"
            title="Personal credit card standard fees and charges"
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Card
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Interest on purchases
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Annual or monthly fee
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Interest-free days
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Minimum limit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {creditCards.map((card) => (
                  <tr key={card.id}>
                    <th scope="row" className="px-5 py-3.5 font-semibold text-black">
                      {card.name}
                    </th>
                    <td className="px-5 py-3.5 text-ink-soft">{card.purchaseRate}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{card.annualFee}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{card.interestFreeDays}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{card.minimumCreditLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Credit cards are subject to credit approval. Interest rates on approval for the Low Rate
          card vary based on your individual credit risk score. All figures are demo content.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
