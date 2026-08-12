import { Navigate, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductGrid } from "@/components/marketing/ProductGrid";
import { TestimonialWall } from "@/components/marketing/TestimonialWall";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureRows } from "@/components/marketing/FeatureRows";
import { getProduct, products } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);

  useDocumentTitle(product?.name ?? "Products");

  if (!product) return <Navigate to="/products" replace />;

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={product.category}
        title={product.heroHeadline}
        blurb={product.heroBlurb}
        tone="purple"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: product.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink to="/request-a-demo" variant="inverse">
            Request a demo
          </ButtonLink>
          <ButtonLink
            to="/start-free"
            variant="ghost"
            className="border border-white/40 text-white hover:bg-white/10"
          >
            Start free
          </ButtonLink>
          <span className="text-sm text-white/70">{product.planFrom}</span>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Why teams use it" title={product.tagline} blurb={product.summary} />
            <ul className="mt-8 space-y-4">
              {product.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-eh-md border border-eh-line bg-white px-5 py-4 text-sm leading-relaxed text-eh-ink-soft"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-eh-xl bg-eh-purple-wash p-8">
            <p className="font-display text-5xl font-bold text-eh-purple">{product.stat.value}</p>
            <p className="mt-2 text-sm text-eh-ink-soft">{product.stat.label}</p>
            <hr className="my-6 border-eh-line" />
            <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
              Included in
            </p>
            <p className="mt-2 text-sm font-semibold text-eh-ink">{product.planFrom}</p>
            <ButtonLink to="/pricing" variant="secondary" size="sm" className="mt-5 w-full">
              Compare plans
            </ButtonLink>
          </aside>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Modules" title={`What is inside ${product.name}`} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {product.modules.map((module) => (
            <Card key={module.name}>
              <Badge tone="purple">{product.category}</Badge>
              <CardTitle className="mt-3">{module.name}</CardTitle>
              <CardBody>{module.description}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How it works" title="Three steps, then it runs itself" />
        <div className="mt-12">
          <FeatureRows
            rows={[
              {
                eyebrow: "Set up",
                title: "Connect the records you already have",
                body: "Import employees, pay rates and leave balances from a spreadsheet or another platform. Nothing is retyped.",
                points: product.modules.slice(0, 3).map((module) => module.name),
              },
              {
                eyebrow: "Run it",
                title: product.tagline,
                body: product.summary,
                points: product.bullets.slice(0, 3),
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="wash">
        <SectionHeading eyebrow="Customers" title="Teams already running on it" align="center" />
        <TestimonialWall limit={2} />
      </Section>

      <Section>
        <SectionHeading eyebrow="Explore" title="The rest of the platform" />
        <ProductGrid items={related} />
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
