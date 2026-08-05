import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ComparisonTable } from "@/components/products/ComparisonTable";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomeLoanTypesPage() {
  useDocumentTitle("Types of home loans");
  const all = getProductsByCategory("Home loans");
  const variable = all.filter((product) =>
    ["digi-home-loan", "standard-variable-rate", "simple-home-loan"].includes(product.slug),
  );
  const fixed = all.filter((product) => product.slug === "fixed-rate-home-loan");
  const packages = all.filter((product) => product.slug === "wealth-package");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Home loans", to: "/home-loans" }, { label: "Types of home loans" }]}
      />
      <PageHero
        eyebrow="Home loans"
        title="Types of home loans"
        intro="Variable, fixed or a split of both. Compare the features of each so you can decide what matters most — a lower rate, offset accounts, or repayment certainty."
      >
        <ButtonLink to="/home-loans/rates" variant="dark">
          See interest rates
        </ButtonLink>
        <ButtonLink to="/tools-and-calculators#repayments" variant="secondary">
          Repayments calculator
        </ButtonLink>
      </PageHero>

      <Section
        title="Variable rate home loans"
        intro="With a variable rate loan your interest rate can move up or down. If rates go up, your repayments do as well. If rates go down, your repayments may fall too."
      >
        <ProductGrid products={variable} />
      </Section>

      <Section
        tone="tint"
        title="Fixed rate home loans"
        intro="The main advantage of a fixed rate home loan is certainty. You can lock in your interest rate for a period — typically between one and five years — and plan ahead knowing your repayments will stay the same."
      >
        <ProductGrid products={fixed} />
      </Section>

      <Section
        title="Packages and lines of credit"
        intro="The Wealth Package bundles interest rate discounts with a fee waiver on one eligible credit card."
      >
        <ProductGrid products={packages} />
      </Section>

      <Section tone="tint" title="Compare all home loans">
        <ComparisonTable products={all} caption="Comparison of CommBank home loans" />
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "You can link one Everyday Offset account to each eligible Digi Home Loan and up to two Everyday Offset accounts to each eligible Simple Home Loan. An offset feature fee applies.",
          "Multiple offsets are only available with eligible Standard Variable Rate home loans.",
          "At the end of the fixed rate period the interest rate converts to the applicable Standard Variable Rate for your loan purpose and repayment type, less any package discount specified in your loan contract.",
          "The maximum Interest Only payment period over the life of a loan is 15 years for Investment Home Loans and 5 years for Owner Occupied Home Loans.",
        ]}
      />
    </PageLayout>
  );
}
