import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      <Section tone="navy" className="min-h-[50vh]">
        <div className="flex flex-col items-start gap-5">
          <span className="text-xs font-extrabold tracking-[0.18em] text-hub-teal-soft uppercase">
            Error 404
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            We couldn&rsquo;t find that page
          </h1>
          <p className="max-w-xl text-lg text-white/80">
            The page may have moved. Try the products and solutions overview, or head back to the
            homepage.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/" variant="inverse" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink
              to="/products-solutions"
              variant="ghost"
              size="lg"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Products &amp; solutions
            </ButtonLink>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
