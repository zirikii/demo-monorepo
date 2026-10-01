import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CheckList, CtaBand, PageHero, SectionHeading, Testimonials } from "@/components/marketing";
import { PRODUCTS, productBySlug } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { asset } from "@/lib/asset";
import { NotFoundPage } from "./NotFound";

export function PlatformPage() {
  useDocumentTitle("Platform");
  const groups = ["Distribution", "Revenue", "Guest experience"] as const;
  return (
    <>
      <PageHero
        eyebrow="The SiteMinder platform"
        title={
          <>
            One platform. <span className="sm-gradient-text">Every booking.</span>
          </>
        }
        body="Distribution, revenue and guest experience, connected by one source of truth for rates, availability and reservations."
        image="media/dynamic-commerce.webp"
      >
        <Link to="/get-started" className="btn-primary px-6 py-3">
          Try for free
        </Link>
        <Link to="/demo" className="btn-outline px-6 py-3">
          Get a demo
        </Link>
      </PageHero>
      {groups.map((group) => (
        <section key={group} className="container-sm py-14">
          <SectionHeading
            eyebrow={group}
            title={
              group === "Distribution"
                ? "Sell everywhere"
                : group === "Revenue"
                  ? "Earn more per room"
                  : "Make every stay better"
            }
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.group === group).map((p) => (
              <Link
                key={p.slug}
                to={`/platform/${p.slug}`}
                className="group card overflow-hidden transition-shadow hover:shadow-lift"
              >
                <img
                  src={asset(`brand/${p.image}`)}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/8] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold group-hover:text-royal">{p.name}</h3>
                  <p className="mt-2 text-ink-soft">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal">
                    Learn more <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const product = productBySlug(slug);
  useDocumentTitle(product?.name ?? "Platform");
  if (!product) return <NotFoundPage />;
  const related = PRODUCTS.filter(
    (p) => p.group === product.group && p.slug !== product.slug,
  ).slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={product.group}
        title={product.tagline}
        body={product.summary}
        image={product.image}
      >
        <Link to="/get-started" className="btn-primary px-6 py-3">
          Try for free
        </Link>
        <Link to="/demo" className="btn-outline px-6 py-3">
          Get a demo
        </Link>
      </PageHero>
      <section className="container-sm py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">{product.name}</p>
            <p className="mt-4 text-6xl font-bold text-heading">{product.stat.value}</p>
            <p className="mt-1 text-ink-soft">{product.stat.label}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {product.features.map((f) => (
              <div key={f.title} className="card p-6">
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-canvas py-16">
        <div className="container-sm grid items-center gap-10 md:grid-cols-2">
          <SectionHeading
            eyebrow="Why SiteMinder"
            title={`${product.name}, connected to everything else`}
            body="Every product shares the same rates, availability and guest data, so nothing falls out of sync."
          />
          <CheckList
            items={[
              "Set up by our onboarding team",
              "24/7 support from hotel experts",
              "No commission, ever",
              "Works with your PMS",
            ]}
          />
        </div>
      </section>
      <Testimonials />
      {related.length > 0 && (
        <section className="container-sm py-16">
          <SectionHeading title="Works well with" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to={`/platform/${p.slug}`} className="card p-6 hover:shadow-lift">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
