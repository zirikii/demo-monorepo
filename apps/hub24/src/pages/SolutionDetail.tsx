import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductCard } from "@/components/marketing/ProductCard";
import { Testimonial } from "@/components/marketing/Testimonial";
import { ButtonLink } from "@/components/ui/Button";
import { Card, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/data/products";
import { SOLUTIONS, solutionBySlug } from "@/data/solutions";

export default function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? solutionBySlug(slug) : undefined;

  if (!solution) {
    return <Navigate to="/solutions/advisers" replace />;
  }

  const products = solution.products
    .map((productSlug) => PRODUCTS.find((product) => product.slug === productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const otherSolutions = SOLUTIONS.filter((candidate) => candidate.slug !== solution.slug);

  return (
    <PageLayout title={`HUB24 for ${solution.audience}`}>
      <PageHero
        eyebrow={solution.eyebrow}
        title={solution.title}
        body={solution.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Who we help", to: "/solutions/advisers" },
          { label: solution.audience },
        ]}
        actions={
          <>
            <ButtonLink to="/contact-us#demo" variant="inverse">
              Talk to our team
            </ButtonLink>
            <ButtonLink
              to="/features-benefits"
              variant="ghost"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Platform features
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Outcomes"
          title={`What changes for ${solution.audience.toLowerCase()}`}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {solution.outcomes.map((outcome) => (
            <Card key={outcome.title} className="flex h-full flex-col gap-3">
              <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">
                {outcome.title}
              </h3>
              <p className="text-ink-soft">{outcome.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {solution.quote ? (
        <Section tone="tint">
          <div className="mx-auto max-w-3xl">
            <Testimonial
              body={solution.quote.body}
              name={solution.quote.name}
              role={solution.quote.role}
            />
          </div>
        </Section>
      ) : null}

      <Section tone={solution.quote ? "surface" : "tint"}>
        <SectionHeading eyebrow="Products" title="What you'd typically use" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Who we help" title="Explore other audiences" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {otherSolutions.map((other) => (
            <LinkCard key={other.slug} to={`/solutions/${other.slug}`} className="p-5">
              <span className="text-xs font-extrabold tracking-[0.14em] text-hub-teal-dark uppercase">
                HUB24 for
              </span>
              <p className="mt-1 font-extrabold text-ink-strong">{other.audience}</p>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
