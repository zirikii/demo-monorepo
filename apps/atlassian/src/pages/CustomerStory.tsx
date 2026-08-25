import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductTile } from "@/components/marketing/ProductTile";
import { getProduct } from "@/data/products";
import { getStory } from "@/data/stories";

export default function CustomerStoryPage() {
  const { slug = "" } = useParams();
  const story = getStory(slug);
  if (!story) return <Navigate to="/customers" replace />;

  const products = story.products
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <PageLayout title={story.company}>
      <PageHero
        eyebrow={`${story.industry} · ${story.region}`}
        title={story.company}
        body={story.summary}
        crumbs={[{ label: "Customers", to: "/customers" }, { label: story.company }]}
      />
      <Section>
        <blockquote className="max-w-3xl text-2xl font-semibold tracking-tight text-ink-strong">
          “{story.quote}”
        </blockquote>
        <p className="mt-4 text-sm font-bold text-ink-soft">
          {story.quoteAuthor}, {story.quoteRole}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {story.results.map((result) => (
            <li key={result.label} className="rounded-atl-lg bg-atl-tint p-6">
              <p className="text-3xl font-extrabold text-atl-blue">{result.value}</p>
              <p className="mt-1 text-sm text-ink-soft">{result.label}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex max-w-3xl flex-col gap-4">
          {story.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>
      <Section tone="tint">
        <h2 className="text-2xl font-extrabold">Apps they use</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductTile key={product.slug} product={product} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
