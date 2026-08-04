import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { getProduct, getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "./NotFound";

const categoryPaths: Record<string, string> = {
  "Bank accounts": "/bank-accounts",
  "Credit cards": "/credit-cards",
  "Home loans": "/home-loans",
  "Personal loans": "/personal-loans",
  Insurance: "/insurance",
  "Investing & Super": "/investing-and-super",
  Business: "/business",
};

export function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  useDocumentTitle(product?.name ?? "Product not found");

  if (!product) return <NotFoundPage />;

  const related = getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: product.category, to: categoryPaths[product.category] ?? "/" },
          { label: product.name },
        ]}
      />

      <section className="bg-cba-yellow py-12 sm:py-16">
        <div className="container-cba grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider text-ink/70">
              {product.tagline}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink sm:text-[42px]">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/85">
              {product.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/login" variant="dark" size="lg">
                {product.ctaLabel}
              </ButtonLink>
              <ButtonLink to="/support/contact-us" variant="secondary" size="lg">
                Book an appointment
              </ButtonLink>
            </div>
          </div>

          {product.headline ? (
            <div className="rounded-cba-lg bg-ink p-8 text-surface shadow-cba-lift">
              <p className="text-5xl font-extrabold text-cba-yellow">{product.headline.value}</p>
              <p className="mt-2 text-[15px] text-surface/80">{product.headline.label}</p>
              <p className="mt-6 border-t border-surface/20 pt-4 text-[13px] leading-relaxed text-surface/60">
                Best for: {product.bestFor}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <Section title="Features and benefits">
        <ul className="grid gap-3 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 rounded-cba-lg border border-line-soft p-5 text-[15px] leading-relaxed text-ink-soft"
            >
              <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-positive" />
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" title="Rates and fees">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-ink">Rates</h3>
            <dl className="mt-3 divide-y divide-line-soft rounded-cba-lg bg-surface px-5 shadow-cba">
              {product.rates.map((rate) => (
                <div key={rate.label} className="flex items-start justify-between gap-4 py-4">
                  <dt className="text-[15px] text-ink-soft">
                    {rate.label}
                    {rate.note ? (
                      <span className="block text-[13px] text-ink-faint">{rate.note}</span>
                    ) : null}
                  </dt>
                  <dd className="shrink-0 text-[15px] font-bold text-ink">{rate.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink">Fees</h3>
            <dl className="mt-3 divide-y divide-line-soft rounded-cba-lg bg-surface px-5 shadow-cba">
              {product.fees.map((fee) => (
                <div key={fee.label} className="flex items-start justify-between gap-4 py-4">
                  <dt className="text-[15px] text-ink-soft">
                    {fee.label}
                    {fee.note ? (
                      <span className="block text-[13px] text-ink-faint">{fee.note}</span>
                    ) : null}
                  </dt>
                  <dd className="shrink-0 text-[15px] font-bold text-ink">{fee.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <Link
          to="/rates-and-fees"
          className="focus-cba mt-6 inline-block text-[15px] font-bold text-ink underline underline-offset-4"
        >
          See all rates &amp; fees
        </Link>
      </Section>

      {related.length > 0 ? (
        <Section title={`Other ${product.category.toLowerCase()}`}>
          <ProductGrid products={related} />
        </Section>
      ) : null}

      <HelpBlock />
      <Disclosures items={product.disclosures} />
    </PageLayout>
  );
}
