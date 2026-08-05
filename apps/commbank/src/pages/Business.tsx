import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { faqs } from "@/data/faqs";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type Need = "accept-payments" | "manage-cash" | "borrow" | "grow-online";

const recommendations: Record<Need, { title: string; body: string; to: string }> = {
  "accept-payments": {
    title: "Smart Terminal",
    body: "Take card, digital wallet and QR payments with next business day settlement into your CommBank account.",
    to: "/products/smart-terminal",
  },
  "manage-cash": {
    title: "Business Transaction Account",
    body: "Unlimited free electronic transactions with accounting software feeds and a Business Debit Mastercard.",
    to: "/products/business-transaction-account",
  },
  borrow: {
    title: "Business Loan",
    body: "Secured and unsecured lending from $10,000 with fixed or variable rates and flexible terms.",
    to: "/products/business-loan",
  },
  "grow-online": {
    title: "eCommerce payments",
    body: "Accept online payments with hosted checkout, recurring billing and fraud screening built in.",
    to: "/products/smart-terminal",
  },
};

export function BusinessPage() {
  useDocumentTitle("Business banking");
  const [need, setNeed] = useState<Need>("accept-payments");
  const businessProducts = getProductsByCategory("Business");
  const recommendation = recommendations[need];

  const businessFaqs = faqs
    .filter((faq) => faq.category === "Business")
    .map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }));

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Business" }]} />
      <PageHero
        eyebrow="Business"
        title="Banking that helps your business thrive"
        intro="Business accounts and cards, EFTPOS and eCommerce, and finance to help you take the next step — all managed in CommBiz or the CommBank app."
      >
        <ButtonLink to="#selector" variant="dark">
          Find the right product
        </ButtonLink>
        <ButtonLink to="/support?category=Business" variant="secondary">
          Business support
        </ButtonLink>
      </PageHero>

      <Section id="savings" title="Business products">
        <ProductGrid products={businessProducts} />
      </Section>

      <Section
        id="selector"
        tone="tint"
        title="Business product selector"
        intro="Tell us what you need most right now and we'll point you to a starting place."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SelectField
            label="What does your business need?"
            value={need}
            onChange={(event) => setNeed(event.target.value as Need)}
          >
            <option value="accept-payments">Accept payments in person</option>
            <option value="manage-cash">Manage cash flow day to day</option>
            <option value="borrow">Borrow to grow or buy equipment</option>
            <option value="grow-online">Sell online</option>
          </SelectField>

          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <p className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">
              Suggested product
            </p>
            <h3 data-testid="selector-result" className="mt-1 text-xl font-extrabold text-ink">
              {recommendation.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{recommendation.body}</p>
            <ButtonLink to={recommendation.to} size="sm" className="mt-4">
              Learn more
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section id="ecommerce" title="Payments and platforms">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: "cards",
              title: "Business credit cards",
              body: "Set individual card limits and reconcile spend automatically.",
            },
            {
              id: "overdraft",
              title: "Business overdraft",
              body: "A safety net for uneven cash flow, with interest only on what you use.",
            },
            {
              id: "asset-finance",
              title: "Equipment & vehicle finance",
              body: "Fund vehicles, machinery and fit-outs without tying up working capital.",
            },
            {
              id: "commbiz",
              title: "CommBiz",
              body: "Multi-user access, approval workflows, bulk payments and reporting.",
            },
          ].map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-cba-lg border border-line-soft p-6"
            >
              <h3 className="text-[15px] font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint" title="Business FAQs">
        <Accordion items={businessFaqs} />
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "Applications for business finance are subject to the bank's credit approval and lending criteria. Fees and charges apply.",
          "Settlement times for merchant payments may vary on weekends and public holidays.",
          "CommBank Yello for Business is available to eligible sole proprietors and single director corporate entities.",
        ]}
      />
    </PageLayout>
  );
}
