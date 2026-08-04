import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { NewsTeasers } from "@/components/marketing/NewsTeasers";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const basics = [
  {
    to: "/products/commsec-pocket",
    title: "Start small and stay regular",
    body: "Investing $50 a month into a diversified ETF is a common way to begin building a portfolio.",
  },
  {
    to: "/products/commsec-share-trading",
    title: "Understand the risk",
    body: "Share prices move. Diversifying across companies, sectors and asset classes helps manage that.",
  },
  {
    to: "/products/essential-super",
    title: "Don't forget super",
    body: "For most Australians, super is the largest investment they will ever hold. Consolidating can reduce fees.",
  },
];

export function InvestingAndSuperPage() {
  useDocumentTitle("Investing & Super");
  const all = getProductsByCategory("Investing & Super");
  const investing = all.filter((product) => product.slug !== "essential-super");
  const superProducts = all.filter((product) => product.slug === "essential-super");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Investing & Super" }]} />
      <PageHero
        eyebrow="Investing & Super"
        title="Build wealth over the long term"
        intro="Trade shares and ETFs with CommSec, start investing from $50 with CommSec Pocket, and see your super alongside your everyday banking."
      >
        <ButtonLink to="/products/commsec-share-trading" variant="dark">
          Explore CommSec
        </ButtonLink>
        <ButtonLink to="#consolidate" variant="secondary">
          Consolidate your super
        </ButtonLink>
      </PageHero>

      <Section id="etfs" title="Investing">
        <ProductGrid products={investing} />
      </Section>

      <Section id="consolidate" tone="tint" title="Superannuation">
        <ProductGrid products={superProducts} />
        <p id="retirement" className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          Consolidating multiple super accounts into one can reduce the fees and insurance premiums
          you pay across funds. Before you consolidate, check any insurance cover you would lose and
          whether exit fees apply.
        </p>
      </Section>

      <Section id="basics" title="Investing basics">
        <div className="grid gap-4 md:grid-cols-3">
          {basics.map((item) => (
            <LinkCard key={item.to + item.title} to={item.to} title={item.title} body={item.body} />
          ))}
        </div>
        <p id="margin" className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          Margin lending lets you borrow to invest, which magnifies both gains and losses. It is
          only suitable for experienced investors who can meet a margin call at short notice.
        </p>
      </Section>

      <NewsTeasers limit={3} />
      <HelpBlock />

      <Disclosures
        items={[
          "Investing involves risk. Past performance is not an indicator of future performance.",
          "CommSec products are provided by Commonwealth Securities Limited, a wholly owned but non-guaranteed subsidiary of Commonwealth Bank of Australia.",
          "Essential Super is issued by the fund trustee. Consider the Product Disclosure Statement and Target Market Determination before deciding.",
          "This demo does not provide financial advice and all figures shown are fictional.",
        ]}
      />
    </PageLayout>
  );
}
