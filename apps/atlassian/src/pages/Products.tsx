import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { AppMark } from "@/components/brand/AppMark";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductMock } from "@/components/marketing/ProductMock";
import { ProductTile } from "@/components/marketing/ProductTile";
import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS, getProduct } from "@/data/products";
import { ButtonLink } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const RECOMMENDED_SLUGS = ["confluence", "rovo", "jira-service-management"] as const;

export default function ProductsPage() {
  const jira = getProduct("jira");
  const recommended = RECOMMENDED_SLUGS.map((slug) => getProduct(slug)).filter(
    (product): product is NonNullable<typeof product> => Boolean(product),
  );

  return (
    <PageLayout title="Explore Atlassian products">
      <PageHero
        eyebrow="Products"
        title="Explore Atlassian products"
        body="For every team, from startup to enterprise. Recommended apps to kickstart productivity — plus collections that bundle agents with the work."
        crumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
        actions={
          <>
            <ButtonLink to="/software/jira">Get started with Jira</ButtonLink>
            <ButtonLink to="/software/jira/pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </>
        }
      />

      {jira ? (
        <Section tone="tint">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-bold tracking-[0.14em] text-atl-blue uppercase">
                Featured app · Jira
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Great outcomes start with Jira
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{jira.heroBody}</p>
              <div>
                <ButtonLink to="/software/jira">Explore Jira</ButtonLink>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <AppMark slug="jira" size={48} />
              <ProductMock slug="jira" />
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <h2 className="text-2xl font-extrabold tracking-tight">Recommended</h2>
        <p className="mt-2 text-ink-soft">Top apps to kickstart your productivity.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommended.map((product) => (
            <ProductTile key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <h2 className="text-2xl font-extrabold tracking-tight">Collections</h2>
        <p className="mt-2 text-ink-soft">
          Curated Atlassian apps and AI agents to help every team work better together.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <li key={collection.slug}>
              <Link
                to={`/collections/${collection.slug}`}
                className="focus-atl flex h-full flex-col gap-3 rounded-atl-lg border border-line bg-white p-6 hover:border-atl-blue"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {collection.productSlugs.map((slug) => (
                    <AppMark key={slug} slug={slug} size={28} />
                  ))}
                </div>
                <p className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
                  {collection.name} Collection
                </p>
                <h3 className="text-xl font-extrabold">{collection.headline}</h3>
                <p className="text-sm text-ink-soft">{collection.includes.join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-extrabold tracking-tight">All products</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductTile key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
