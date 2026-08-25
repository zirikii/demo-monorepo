import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductTile } from "@/components/marketing/ProductTile";
import { ButtonLink } from "@/components/ui/Button";
import { getProduct } from "@/data/products";
import { getSolution } from "@/data/solutions";

export default function SolutionDetailPage() {
  const { slug = "" } = useParams();
  const solution = getSolution(slug);
  if (!solution) return <Navigate to="/solutions" replace />;

  const products = solution.productSlugs
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <PageLayout title={solution.name}>
      <PageHero
        eyebrow={solution.audience}
        title={solution.headline}
        body={solution.intro}
        crumbs={[{ label: "Solutions", to: "/solutions" }, { label: solution.name }]}
        actions={<ButtonLink to="/try">Get started</ButtonLink>}
      />
      <Section>
        <div className="rounded-atl-lg bg-atl-tint p-8">
          <p className="text-4xl font-extrabold text-atl-blue">{solution.stat.value}</p>
          <p className="mt-2 text-ink-soft">{solution.stat.label}</p>
        </div>
        <ul className="mt-8 flex flex-col gap-3">
          {solution.outcomes.map((outcome) => (
            <li key={outcome} className="text-ink-soft">
              · {outcome}
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="tint">
        <h2 className="text-2xl font-extrabold">Apps these teams use</h2>
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
