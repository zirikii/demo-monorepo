import { Navigate, useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureList } from "@/components/marketing/FeatureList";
import { ProductCard } from "@/components/marketing/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatTile } from "@/components/ui/StatTile";
import { categoryById, findProduct, productsByCategory } from "@/data/products";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? findProduct(slug) : undefined;

  if (!product) return <Navigate to="/products" replace />;

  const category = categoryById(product.category);
  const siblings = productsByCategory(product.category)
    .filter((entry) => entry.slug !== product.slug)
    .slice(0, 4);

  return (
    <PageLayout title={product.name}>
      <section className="bg-night text-white">
        <div className="container-go-wide flex flex-col gap-8 py-14 sm:py-16 lg:py-20">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Products", to: "/products" },
              { label: product.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="animate-go-rise flex flex-col gap-5">
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold tracking-wide uppercase"
                style={{
                  backgroundColor: `color-mix(in srgb, ${category?.accent ?? "#00aa13"} 22%, transparent)`,
                  color: "white",
                }}
              >
                {category?.name}
              </span>
              <h1 className="display-go text-4xl sm:text-5xl lg:text-6xl">{product.name}</h1>
              <p className="max-w-2xl text-lg text-white/70">{product.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Badge tone="inverse">Launched {product.since}</Badge>
              {product.markets.map((market) => (
                <Badge key={market} tone="inverse">
                  {market}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section width="wide">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-8">
            <p className="text-lg leading-relaxed text-ink-soft">{product.summary}</p>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                What customers get
              </h2>
              <FeatureList items={product.highlights} />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                What the engineering looks like
              </h2>
              <FeatureList items={product.engineering} />
            </div>
          </div>

          <div className="grid h-fit gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {product.stats.map((stat) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </Section>

      {siblings.length > 0 ? (
        <Section tone="tint" width="wide">
          <SectionHeading
            eyebrow="Same family"
            title={`More in ${category?.name ?? "this family"}`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((sibling) => (
              <ProductCard key={sibling.slug} product={sibling} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </PageLayout>
  );
}
