import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import type { ProductPage } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";

export function ProductPageView({ product }: { product: ProductPage }) {
  useDocumentTitle(product.title);

  const crumbs = [
    { label: "Home", to: "/" },
    { label: product.eyebrow, to: product.path.split("/").slice(0, 2).join("/") || "/" },
    { label: product.title },
  ];

  return (
    <PageLayout>
      <PageHero
        eyebrow={product.eyebrow}
        title={product.title}
        summary={product.summary}
        primaryCta={product.cta}
        secondaryCta={product.secondaryCta}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Breadcrumb items={crumbs} />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <section>
            <h2 className="text-xl font-bold text-ink">What you get</h2>
            <ul className="mt-4 space-y-3">
              {product.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-ink-soft">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cba-blue" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {product.faqs?.length ? (
              <div className="mt-10">
                <h2 className="mb-3 text-xl font-bold text-ink">Things you should know</h2>
                <Accordion items={product.faqs} />
              </div>
            ) : null}
          </section>
          <aside className="space-y-4">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-sm font-bold text-ink">Ready to continue?</p>
              <p className="mt-2 text-sm text-ink-soft">
                This is a demo pathway — no real application is submitted.
              </p>
              <Link
                to={product.cta.to}
                className="mt-4 inline-flex rounded-md bg-cba-yellow px-4 py-2.5 text-sm font-bold text-cba-black hover:bg-cba-yellow-deep"
              >
                {product.cta.label}
              </Link>
            </div>
            {product.related?.length ? (
              <div className="rounded-xl border border-line bg-card p-5">
                <p className="text-sm font-bold text-ink">Related</p>
                <ul className="mt-3 space-y-2">
                  {product.related.map((r) => (
                    <li key={r.to}>
                      <Link to={r.to} className="text-sm text-cba-blue hover:underline">
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
