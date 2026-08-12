import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { getProduct, products } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "./NotFound";

export function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  useDocumentTitle(product?.name ?? "Product");
  if (!product) return <NotFoundPage />;
  return (
    <PageLayout>
      <PageHero eyebrow="Product" title={product.name} description={product.tagline} tone="purple" actions={<ButtonLink to="/request-demo" variant="white">Request a demo</ButtonLink>} />
      <Section>
        <div className="container-eh grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-relaxed text-ink-soft">{product.summary}</p>
            <ul className="mt-6 space-y-3">
              {product.bullets.map((b) => (
                <li key={b} className="rounded-eh-md border border-line bg-surface-soft px-4 py-3 text-sm text-ink">{b}</li>
              ))}
            </ul>
          </div>
          <aside className="rounded-eh-lg border border-line bg-white p-6 shadow-eh">
            <h2 className="font-bold">Related products</h2>
            <ul className="mt-4 space-y-2">
              {products.filter((p) => p.slug !== product.slug).slice(0, 4).map((p) => (
                <li key={p.slug}><Link className="text-sm font-semibold text-eh-purple underline-offset-4 hover:underline" to={`/products/${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </PageLayout>
  );
}
