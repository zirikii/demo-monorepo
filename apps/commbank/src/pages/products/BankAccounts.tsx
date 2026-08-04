import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { everydayAccounts } from "@/data/accounts";

const debitCardFeatures = [
  {
    id: "debit-mastercard",
    title: "Debit Mastercard",
    content:
      "Spend your own money anywhere Mastercard is accepted, in store, online and overseas. Add it to Apple Pay, Google Pay or Samsung Pay and tap to pay from your phone or watch.",
  },
  {
    id: "world-debit-mastercard",
    title: "World Debit Mastercard",
    content:
      "Available on eligible accounts, with no CommBank international transaction fee on purchases and included overseas medical cover when you activate.",
  },
  {
    id: "card-controls",
    title: "Lock, Block, Alert",
    content:
      "Temporarily lock your card, block transaction types like overseas or online purchases, and get real-time alerts — all from the CommBank app.",
  },
];

export function BankAccountsPage() {
  useDocumentTitle("Bank accounts");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking", to: "/banking" }, { label: "Bank accounts" }]} />
      <PageHero
        eyebrow="Bank accounts"
        title="Everyday accounts for your day-to-day banking"
        description="Compare our transaction accounts, see how the monthly fee waivers work, and open an account online in under 5 minutes."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="Compare everyday accounts"
            description="All accounts include a Debit Mastercard, digital wallets and access to NetBank and the CommBank app."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {everydayAccounts.map((account) => (
              <ProductCard
                key={account.id}
                id={account.id}
                name={account.name}
                tagline={account.tagline}
                headline={account.headlineRate}
                headlineLabel={account.headlineLabel ?? account.monthlyFee}
                features={account.features}
                badge={account.badge}
                ctaLabel="Open an account"
                ctaTo="/register"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="youth" className="scroll-mt-28 border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Fees and rates at a glance" title="What each account costs" />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Account
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Monthly account fee
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Interest rate
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Other
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {everydayAccounts.map((account) => (
                  <tr key={account.id}>
                    <th scope="row" className="px-5 py-3.5 font-semibold text-black">
                      {account.name}
                    </th>
                    {account.highlights.map((highlight) => (
                      <td key={highlight.label} className="px-5 py-3.5 text-ink-soft">
                        {highlight.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="debit-cards" className="scroll-mt-28 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cards"
            title="The cards that come with your account"
            description="Every everyday account comes with a card you can use in store, online and overseas."
          />
          <Accordion className="mt-8" items={debitCardFeatures} />
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Monthly account fee waivers depend on deposits, age and other eligibility criteria. All
          fees and rates shown are demo content.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
