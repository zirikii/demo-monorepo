import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductMockup } from "@/components/marketing/ProductMockup";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, SectionHeading } from "@/components/ui/Card";
import { products } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ProductsPage() {
  useDocumentTitle("Employment OS products");

  return (
    <PageLayout>
      <section className="bg-violet-soft py-20 sm:py-28">
        <div className="container-hero text-center">
          <Badge tone="violet" className="bg-white/70">
            Employment OS
          </Badge>
          <h1 className="mx-auto mt-7 max-w-5xl text-6xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
            Everything employment, in one system.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-ink-soft">
            Hire, manage, pay and support your people with data that flows and intelligent tools
            that understand the full journey.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <ButtonLink to="/book-a-demo">Book a demo</ButtonLink>
            <ButtonLink to="/pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hero grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className={`focus-hero group rounded-hero-xl p-7 tone-${product.tone}`}
              >
                <Icon aria-hidden="true" className="h-8 w-8" />
                <p className="mt-12 text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">
                  {product.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{product.title}</h2>
                <p className="mt-4 leading-7 text-ink-soft">{product.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                  Learn more{" "}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  useDocumentTitle(product?.title ?? "Product");

  if (!product) {
    return (
      <PageLayout>
        <section className="container-hero py-28 text-center">
          <h1 className="text-5xl font-semibold">Product not found</h1>
          <ButtonLink to="/products" className="mt-8">
            Explore all products
          </ButtonLink>
        </section>
      </PageLayout>
    );
  }

  const Icon = product.icon;
  return (
    <PageLayout>
      <section className={`tone-${product.tone}`}>
        <div className="container-hero grid min-h-[650px] items-center gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge tone={product.tone}>{product.eyebrow}</Badge>
            <h1 className="mt-7 text-6xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
              {product.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-ink-soft">{product.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/book-a-demo">Book a demo</ButtonLink>
              <ButtonLink to="/pricing" variant="secondary">
                View plans
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-hero-xl bg-white/55 p-5 sm:p-8">
            <div className="rounded-hero-lg bg-white p-7 shadow-product">
              <div className="flex items-center gap-4">
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl tone-${product.tone}`}
                >
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-sm text-ink-faint">Acme Digital</p>
                  <p className="text-xl font-bold">{product.title}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {product.features.map((feature, index) => (
                  <div key={feature} className="rounded-2xl border border-line p-4">
                    <p className="text-2xl font-bold">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-5 text-sm font-semibold">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-28 rounded-2xl bg-neutral-soft p-5">
                <div className="h-2 w-4/5 rounded-full bg-violet" />
                <div className="mt-3 h-2 w-3/5 rounded-full bg-coral" />
                <div className="mt-3 h-2 w-2/5 rounded-full bg-green" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hero grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Connected by design"
            title="Make every step feel effortless."
            body={product.detail}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {product.features.map((feature) => (
              <Card key={feature} className="p-6">
                <Check aria-hidden="true" className="h-6 w-6 text-positive" />
                <h2 className="mt-8 text-xl font-bold">{feature}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Clear workflows, useful context and less repetitive admin for everyone involved.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-hero grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-violet">Part of Employment OS</p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.055em]">
              Better alone. Brilliant together.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              Connect {product.title.toLowerCase()} with every employee record, pay run and people
              workflow.
            </p>
            <ButtonLink to="/products/employment-os" variant="violet" className="mt-8">
              Explore Employment OS
            </ButtonLink>
          </div>
          <ProductMockup />
        </div>
      </section>

      <section className="py-20 text-center sm:py-28">
        <Sparkles aria-hidden="true" className="mx-auto h-9 w-9 text-violet-deep" />
        <h2 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
          See {product.title.toLowerCase()} in action.
        </h2>
        <ButtonLink to="/book-a-demo" className="mt-8">
          Book a personalised demo
        </ButtonLink>
      </section>
    </PageLayout>
  );
}
