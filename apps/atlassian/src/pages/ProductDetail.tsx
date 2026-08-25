import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { AppMark } from "@/components/brand/AppMark";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductMock } from "@/components/marketing/ProductMock";
import { ProductTile } from "@/components/marketing/ProductTile";
import { ButtonLink } from "@/components/ui/Button";
import { appForProductSlug } from "@/data/apps";
import { getProduct } from "@/data/products";

const HERO_MOCK_SLUGS = new Set(["jira", "confluence", "loom", "jira-service-management"]);

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  if (!product) return <Navigate to="/software" replace />;

  const related = product.relatedSlugs
    .map((relatedSlug) => getProduct(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const showMock = HERO_MOCK_SLUGS.has(product.slug);
  const workspace = appForProductSlug(product.slug);

  return (
    <PageLayout title={product.name}>
      <PageHero
        tone="white"
        eyebrow={product.family}
        title={product.heroHeadline}
        body={product.heroBody}
        crumbs={[
          { label: "Products", to: "/software" },
          { label: product.name },
        ]}
        actions={
          <>
            <ButtonLink to="/try">Get started</ButtonLink>
            {workspace ? (
              <ButtonLink to={`/login?portal=${workspace.portal}`} variant="secondary">
                Open {product.name}
              </ButtonLink>
            ) : null}
            {product.slug === "jira" && !workspace ? (
              <ButtonLink to="/software/jira/pricing" variant="secondary">
                View pricing
              </ButtonLink>
            ) : null}
          </>
        }
        aside={
          showMock ? (
            <div className="flex flex-col gap-4">
              <AppMark slug={product.slug} size={48} />
              <ProductMock slug={product.slug} />
            </div>
          ) : (
            <AppMark slug={product.slug} size={56} />
          )
        }
      />

      <Section>
        {product.includes ? (
          product.slug === "confluence" ? (
            <ul className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {product.includes.map((item) => (
                <li
                  key={item}
                  className="rounded-atl-lg border border-line bg-white px-4 py-3 text-sm font-bold text-ink-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-8 text-sm font-semibold text-ink-faint">
              Includes {product.includes.join(" · ")}
            </p>
          )
        ) : null}
        <ul className="grid gap-6 md:grid-cols-3">
          {product.features.map((feature) => (
            <li key={feature.title} className="rounded-atl-lg border border-line p-6">
              <h2 className="text-xl font-extrabold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint">
        <ul className="grid gap-6 sm:grid-cols-2">
          {product.metrics.map((metric) => (
            <li key={metric.label} className="rounded-atl-lg bg-white p-6 shadow-atl">
              <p className="text-4xl font-extrabold text-atl-blue">{metric.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{metric.label}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-col gap-2">
          {product.bullets.map((bullet) => (
            <li key={bullet} className="text-ink-soft">
              · {bullet}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-extrabold">Questions teams ask</h2>
        <dl className="mt-6 flex flex-col gap-4">
          {product.faqs.map((faq) => (
            <div key={faq.question} className="rounded-atl-lg border border-line p-5">
              <dt className="font-extrabold">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {related.length ? (
        <Section tone="tint">
          <h2 className="text-2xl font-extrabold">Related apps</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <ProductTile key={item.slug} product={item} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={`Get your team on ${product.name}`}
        primaryLabel={`Start with ${product.name}`}
        primaryTo={workspace ? `/login?portal=${workspace.portal}` : "/try"}
      />
    </PageLayout>
  );
}
