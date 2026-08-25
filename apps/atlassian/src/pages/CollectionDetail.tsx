import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { AppMark } from "@/components/brand/AppMark";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductTile } from "@/components/marketing/ProductTile";
import { ButtonLink } from "@/components/ui/Button";
import { getCollection } from "@/data/collections";
import { getProduct } from "@/data/products";

export default function CollectionDetailPage() {
  const { slug = "" } = useParams();
  const collection = getCollection(slug);
  if (!collection) return <Navigate to="/software" replace />;

  const products = collection.productSlugs
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <PageLayout title={`${collection.name} Collection`}>
      <PageHero
        eyebrow={`${collection.name} Collection`}
        title={collection.headline}
        body={collection.body}
        crumbs={[{ label: "Products", to: "/software" }, { label: collection.name }]}
        actions={<ButtonLink to="/try">Get started</ButtonLink>}
        aside={
          <div className="flex flex-wrap items-center gap-3">
            {collection.productSlugs.map((productSlug) => (
              <AppMark key={productSlug} slug={productSlug} size={44} />
            ))}
          </div>
        }
      />
      <Section>
        <p className="text-sm font-semibold text-ink-faint">
          Includes {collection.includes.join(" · ")}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <ProductTile key={product.slug} product={product} />
          ))}
        </div>
      </Section>
      <CtaBand title={`Unlock the ${collection.name} Collection`} />
    </PageLayout>
  );
}
