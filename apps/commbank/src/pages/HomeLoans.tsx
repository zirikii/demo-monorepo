import { Link } from "react-router-dom";
import { Award, Clock, LifeBuoy, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { faqs } from "@/data/faqs";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const whyChoose = [
  {
    icon: Award,
    title: "Helping you into your first home sooner",
    body: "Awarded Canstar's Bank of the Year for First Home Buyers and Digital Banking in 2025, with flexible home loan features to suit your needs.",
  },
  {
    icon: Clock,
    title: "Fast conditional approval",
    body: "Eligible customers receive conditional approval in as little as 10 minutes when they apply online.",
  },
  {
    icon: LifeBuoy,
    title: "Support at every step",
    body: "Access expert guides, calculators, and help with government grants and schemes — all designed to make your journey easier.",
  },
  {
    icon: Sparkles,
    title: "Unlock a personalised rate",
    body: "Apply online or book an appointment and see if you're eligible for a lower interest rate, plus local market and property insights.",
  },
];

const journeys = [
  {
    to: "/support/contact-us",
    title: "Book time with a lender instantly",
    body: "Get the most from your application and book time with a Home Lending Specialist at a time and place that suits you.",
  },
  {
    to: "/tools-and-calculators#borrowing-power",
    title: "Apply for a home loan or pre-approval",
    body: "Start your application online and, if eligible, receive conditional approval in minutes.",
  },
];

const supportCards = [
  {
    to: "/home-loans/types",
    title: "Low deposit options",
    body: "Saving a 20% deposit can be difficult. There are low deposit options that could help you reach home ownership sooner.",
  },
  {
    to: "/home-loans/rates",
    title: "Home loan offers",
    body: "Take a look at our current offers that could help with your new, existing or next property.",
  },
  {
    to: "/newsroom",
    title: "Home loan guides & tips",
    body: "Information, guides and tools to help you along the path of the Australian property dream.",
  },
  {
    to: "/support?category=Home%20loans",
    title: "Home loan support & FAQs",
    body: "See what options are available to home loan customers needing financial assistance.",
  },
];

const lifeStagePaths = [
  { id: "first-home", label: "Buying your first home" },
  { id: "next-home", label: "Buying your next home" },
  { id: "refinance", label: "Refinancing your home" },
  { id: "investing", label: "Investing in property" },
  { id: "renovating", label: "Renovating your home" },
  { id: "building", label: "Building your home" },
  { id: "selling", label: "Selling a property" },
  { id: "business-owners", label: "Home loans for business owners" },
];

export function HomeLoansPage() {
  useDocumentTitle("Home loans, interest rates, calculators & offers");
  const loans = getProductsByCategory("Home loans").filter((product) =>
    ["digi-home-loan", "standard-variable-rate", "simple-home-loan"].includes(product.slug),
  );

  const additional = [
    {
      id: "borrowing",
      title: "Borrowing options & add-ons",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>Property share</li>
          <li>Lenders&rsquo; Mortgage Insurance</li>
          <li>Guarantor support</li>
          <li>Bridging finance</li>
          <li>Interest offset</li>
        </ul>
      ),
    },
    {
      id: "faqs",
      title: "FAQs",
      content: (
        <ul className="space-y-3">
          {faqs
            .filter((faq) => faq.category === "Home loans")
            .map((faq) => (
              <li key={faq.id}>
                <p className="font-bold text-ink">{faq.question}</p>
                <p className="mt-1">{faq.answer}</p>
              </li>
            ))}
        </ul>
      ),
    },
    {
      id: "guides",
      title: "Property guides",
      content: (
        <ul className="list-inside list-disc space-y-1">
          {lifeStagePaths.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Home loans" }]} />

      <section className="bg-cba-yellow py-12 sm:py-16">
        <div className="container-cba grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider text-ink/70">Home loans</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink sm:text-[44px]">
              Earn up to 300,000 Qantas Points
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/85">
              Enjoy our low variable rate, unlimited additional repayments and the option to link
              one offset account with a CommBank Digi Home Loan. Limited time offer — apply online
              by 30 September 2026 and settle by 31 December 2026.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/products/digi-home-loan" variant="dark" size="lg">
                Get started
              </ButtonLink>
              <ButtonLink to="#refinance" variant="secondary" size="lg">
                Refinance online
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-cba-lg bg-ink p-8 text-surface shadow-cba-lift">
            <p className="text-[13px] font-bold uppercase tracking-wider text-surface/60">
              Digi Home Loan
            </p>
            <p className="mt-2 text-5xl font-extrabold text-cba-yellow">5.89% p.a.</p>
            <p className="mt-1 text-[15px] text-surface/80">
              variable rate, owner occupied, Principal &amp; Interest
            </p>
            <p className="mt-4 text-[13px] text-surface/60">6.01% p.a. comparison rate</p>
            <Link
              to="/tools-and-calculators#repayments"
              className="focus-cba mt-6 inline-block rounded-full bg-cba-yellow px-5 py-2.5 text-sm font-bold text-ink"
            >
              Calculate repayments
            </Link>
          </div>
        </div>
      </section>

      <Section title="Why choose CommBank?">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item) => (
            <li key={item.title} className="rounded-cba-lg border border-line-soft p-6">
              <item.icon aria-hidden="true" className="h-7 w-7 text-ink" />
              <h3 className="mt-4 text-[17px] font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="tint"
        title="Choose a home loan that's right for you"
        intro="Compare our most popular home loans, then apply online or book time with a Home Lending Specialist."
      >
        <ProductGrid products={loans} />
        <Link
          to="/home-loans/types"
          className="focus-cba mt-6 inline-block text-[15px] font-bold text-ink underline underline-offset-4"
        >
          See all home loan types
        </Link>
      </Section>

      <Section id="refinance" title="Start your home buying journey with us today">
        <div className="grid gap-6 md:grid-cols-2">
          {journeys.map((journey) => (
            <LinkCard key={journey.to} to={journey.to} title={journey.title} body={journey.body} />
          ))}
        </div>
      </Section>

      <Section id="first-home" tone="tint" title="Explore different life stages">
        <ul className="flex flex-wrap gap-3">
          {lifeStagePaths.map((item) => (
            <li key={item.id} id={item.id} className="scroll-mt-28">
              <Link
                to="/home-loans/types"
                className="focus-cba inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink hover:bg-surface-deep"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="investing" title="Support at every step">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportCards.map((card) => (
            <LinkCard key={card.to + card.title} to={card.to} title={card.title} body={card.body} />
          ))}
        </div>
      </Section>

      <Section tone="tint" title="Additional information">
        <Accordion items={additional} />
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "To be eligible for the Qantas Points offer the loan application must be for a new CommBank Digi Home Loan submitted between 1 September 2025 and 30 September 2026 inclusive, with a minimum loan amount of $300,000 and an LVR of 80% or less.",
          "100,000 Qantas Points for loans between $300,000 and $499,999; 200,000 points for loans between $500,000 and $999,999; 300,000 points for loans of $1,000,000 or more.",
          "Wealth Package benefits apply to eligible home loans or lines of credit. A non-refundable annual fee of $395 is payable in advance.",
          "Comparison rate calculated on a $150,000 secured loan over a 25 year term. WARNING: a comparison rate is true only for the examples given and may not include all fees and charges.",
          "Awarded Bank of the Year — First Home Buyers by Canstar in July 2025, and Bank of the Year — Digital Banking for 2025 by Canstar in May 2025.",
          "Calculations are estimates provided as a guide only and are not a loan approval.",
        ]}
      />
    </PageLayout>
  );
}
