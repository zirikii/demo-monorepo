import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { AppPromo } from "@/components/marketing/AppPromo";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { LifeStages } from "@/components/marketing/LifeStages";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { faqs } from "@/data/faqs";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const tools = [
  {
    to: "/rates-and-fees",
    title: "Rates & fees",
    body: "Current interest rates and fees across everyday accounts, savings, cards and lending.",
  },
  {
    to: "/tools-and-calculators",
    title: "Tools & calculators",
    body: "Work out repayments, borrowing power, savings projections and foreign exchange.",
  },
  {
    to: "/support",
    title: "Product support & FAQs",
    body: "Search our most frequently asked questions or connect with a specialist.",
  },
  {
    to: "/locate-us",
    title: "Locate us",
    body: "Find a branch, ATM or business centre near you and see what services are available.",
  },
];

export function BankingPage() {
  useDocumentTitle("Banking");
  const accounts = getProductsByCategory("Bank accounts");
  const cards = getProductsByCategory("Credit cards").slice(0, 3);

  const bankingFaqs = faqs
    .filter((faq) => faq.category === "Bank accounts")
    .map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }));

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking" }]} />
      <PageHero
        eyebrow="Banking"
        title="Everyday banking that works the way you do"
        intro="Transaction accounts, savings, cards and digital tools, all managed from the CommBank app or NetBank."
      >
        <ButtonLink to="/bank-accounts" variant="dark">
          Compare bank accounts
        </ButtonLink>
        <ButtonLink to="/digital-banking" variant="secondary">
          Explore digital banking
        </ButtonLink>
      </PageHero>

      <Section
        title="Bank and savings accounts"
        intro="A transaction account is designed for everyday use — receiving your pay, making purchases and paying bills. A savings account helps you set money aside and earn interest on your balance."
      >
        <ProductGrid products={accounts} />
      </Section>

      <Section tone="tint" title="Credit cards" intro="Rewards, low fee and low rate options.">
        <ProductGrid products={cards} />
        <Link
          to="/credit-cards"
          className="focus-cba mt-6 inline-block text-[15px] font-bold text-ink underline underline-offset-4"
        >
          See all credit cards
        </Link>
      </Section>

      <Section title="Banking tools, guidance & support">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <LinkCard key={tool.to} to={tool.to} title={tool.title} body={tool.body} />
          ))}
        </div>
      </Section>

      <AppPromo />
      <LifeStages />

      <Section tone="tint" title="Frequently asked questions">
        <Accordion items={bankingFaqs} />
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
