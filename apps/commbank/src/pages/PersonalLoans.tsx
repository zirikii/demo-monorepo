import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { RateTable } from "@/components/ui/RateTable";
import { getProductsByCategory } from "@/data/products";
import { cardAndLoanRates } from "@/data/rates";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const reasons = [
  { title: "Consolidating debt", body: "Bring multiple balances into one fixed repayment." },
  {
    title: "Renovating",
    body: "Fund a kitchen, bathroom or extension without touching your home loan.",
  },
  { title: "Buying a car", body: "Secure the loan against the vehicle for a lower rate." },
  {
    title: "Home energy",
    body: "Discounted rates on eligible solar, battery and efficiency upgrades.",
  },
];

export function PersonalLoansPage() {
  useDocumentTitle("Personal loans & car loans");
  const loans = getProductsByCategory("Personal loans");
  const loanRates = cardAndLoanRates.filter((group) => group.id === "personal-loans");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Banking", to: "/banking" }, { label: "Personal loans & car loans" }]}
      />
      <PageHero
        eyebrow="Personal loans"
        title="Personal loans and car loans"
        intro="Borrow from $4,000 to $50,000 over one to seven years, with a personalised rate estimate that does not affect your credit score."
      >
        <ButtonLink to="#car" variant="dark">
          Car loans
        </ButtonLink>
        <ButtonLink to="/tools-and-calculators#repayments" variant="secondary">
          Estimate repayments
        </ButtonLink>
      </PageHero>

      <Section id="car" title="Our personal and car loans">
        <ProductGrid products={loans} />
      </Section>

      <Section tone="tint" title="What people borrow for">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <li key={reason.title} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <h3 className="text-[15px] font-bold text-ink">{reason.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{reason.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Current rates">
        <div className="space-y-10">
          {loanRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <HelpBlock />
      <Disclosures
        items={[
          "Comparison rates are calculated on a $30,000 unsecured loan over a 5 year term. WARNING: a comparison rate is true only for the examples given and may not include all fees and charges.",
          "Applications are subject to credit approval. Fees, charges, terms and conditions apply.",
          "Eligible CommBank Yello customers may receive cashback when they find and finance a car through CommBank.",
        ]}
      />
    </PageLayout>
  );
}
