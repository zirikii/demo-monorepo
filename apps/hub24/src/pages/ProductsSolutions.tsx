import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductCard } from "@/components/marketing/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { PRODUCT_CATEGORY_LABELS, PRODUCTS } from "@/data/products";
import type { ProductCategory } from "@/data/types";

const FILTERS = ["All", ...Object.values(PRODUCT_CATEGORY_LABELS)];

function categoryFor(label: string): ProductCategory | null {
  const entry = Object.entries(PRODUCT_CATEGORY_LABELS).find(([, value]) => value === label);
  return entry ? (entry[0] as ProductCategory) : null;
}

export default function ProductsSolutionsPage() {
  const [filter, setFilter] = useState("All");
  const category = categoryFor(filter);
  const products = category
    ? PRODUCTS.filter((product) => product.category === category)
    : PRODUCTS;

  return (
    <PageLayout title="Products & solutions">
      <PageHero
        eyebrow="Products &amp; solutions"
        title="Everything we build, in one place"
        body="The HUB24 Platform, wealth accounting through Class and NowInfinity, client engagement through myprosperity, and data services through HUBconnect."
        crumbs={[{ label: "Home", to: "/" }, { label: "Products & solutions" }]}
        actions={
          <>
            <ButtonLink to="/features-benefits" variant="inverse">
              Platform features &amp; benefits
            </ButtonLink>
            <ButtonLink
              to="/product-documents"
              variant="ghost"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Product documents
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Browse"
          title="Choose a product"
          body="Every product below is part of the HUB24 Group. Select a category to narrow the list."
        />
        <Tabs
          className="mt-8"
          label="Filter products by category"
          tabs={FILTERS}
          active={filter}
          onChange={setFilter}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        {products.length === 0 ? (
          <EmptyState
            title="No products in this category"
            body="Try another category, or browse the full product list."
          />
        ) : null}
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="How it fits together"
          title="Platform, accounting and engagement on the same data"
          body="Advisers integrate platform data into Class for reporting, and use myprosperity to give clients a holistic view of their financial lives. HUBconnect moves the data between them."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            {
              step: "01",
              title: "Advise",
              body: "Model the strategy, estimate the tax impact and open the account online.",
            },
            {
              step: "02",
              title: "Invest",
              body: "Implement through managed portfolios, funds, listed securities and term deposits.",
            },
            {
              step: "03",
              title: "Administer",
              body: "Platform administration feeds Class daily, so accounting stays current.",
            },
            {
              step: "04",
              title: "Engage",
              body: "Present the client's whole position through Engage and myprosperity.",
            },
          ].map((item) => (
            <li
              key={item.step}
              className="rounded-hub-lg border border-line bg-white p-6 shadow-hub"
            >
              <span className="text-sm font-extrabold tracking-[0.16em] text-hub-teal-dark">
                {item.step}
              </span>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink-strong">
                {item.title}
              </h3>
              <p className="mt-2 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
