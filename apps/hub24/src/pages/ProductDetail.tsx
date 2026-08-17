import { Navigate, useParams } from "react-router-dom";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DOCUMENTS } from "@/data/documents";
import { productBySlug } from "@/data/products";

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = productBySlug(slug);
  if (!product) return <Navigate to="/features-benefits" replace />;

  const docs = DOCUMENTS.filter((doc) => product.documents.includes(doc.id));

  return (
    <PageLayout title={product.name}>
      <PageHero
        eyebrow={product.eyebrow}
        title={product.name}
        body={product.summary}
        actions={
          <>
            <ButtonLink to="/resources/documents">Product documents</ButtonLink>
            <ButtonLink to="/contact" variant="inverse">
              Talk to a BDM
            </ButtonLink>
          </>
        }
      />
      <Section>
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{product.body}</p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {product.highlights.map((item) => (
            <li key={item} className="rounded-hub border border-line bg-surface-tint px-4 py-3 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="tint">
        <SectionHeading title="Investment menus on this product" />
        <div className="flex flex-wrap gap-2">
          {product.menus.map((menu) => (
            <Badge key={menu} tone="teal">
              {menu}
            </Badge>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading title="Related documents" />
        <ul className="divide-y divide-line border-y border-line">
          {docs.map((doc) => (
            <li key={doc.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{doc.title}</p>
                <p className="text-sm text-ink-faint">{doc.type}</p>
              </div>
              <ButtonLink to="/resources/documents" variant="ghost" size="sm">
                View
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
