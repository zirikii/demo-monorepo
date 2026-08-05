import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ComparisonTable } from "@/components/products/ComparisonTable";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { RateTable } from "@/components/ui/RateTable";
import { faqs } from "@/data/faqs";
import { getProductsByCategory } from "@/data/products";
import { cardAndLoanRates } from "@/data/rates";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function CreditCardsPage() {
  useDocumentTitle("Credit cards");
  const cards = getProductsByCategory("Credit cards");
  const cardRates = cardAndLoanRates.filter((group) => group.id === "credit-cards");
  const cardFaqs = faqs
    .filter((faq) => faq.category === "Cards")
    .map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }));

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking", to: "/banking" }, { label: "Credit cards" }]} />
      <PageHero
        eyebrow="Credit cards"
        title="Find a credit card that fits how you spend"
        intro="Earn Awards points, keep your annual fee low, or pay a lower rate on balances you carry. Every card comes with Lock, Block, Limit in the CommBank app."
      >
        <ButtonLink to="#compare" variant="dark">
          Compare cards
        </ButtonLink>
        <ButtonLink to="/rates-and-fees" variant="secondary">
          Rates & fees
        </ButtonLink>
      </PageHero>

      <Section title="Our credit cards">
        <ProductGrid products={cards} />
      </Section>

      <Section id="compare" tone="tint" title="Compare credit cards">
        <ComparisonTable products={cards} caption="Comparison of CommBank credit cards" />
      </Section>

      <Section title="Credit card rates">
        <div className="space-y-10">
          {cardRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <Section
        tone="tint"
        title="Instant control in the CommBank app"
        intro="Lock your card, block transaction types, set your own spend limits, and see a digital card while your physical card is in the post."
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Lock", body: "Temporarily lock your card if you have misplaced it." },
            { title: "Block", body: "Block ATM cash, overseas or online transactions." },
            { title: "Limit", body: "Set your own daily spend and withdrawal limits." },
          ].map((item) => (
            <li key={item.title} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Credit card FAQs">
        <Accordion items={cardFaqs} />
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
