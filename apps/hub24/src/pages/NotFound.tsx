import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";

const SUGGESTIONS = [
  { to: "/features-benefits/", title: "Platform features & benefits", body: "The full capability set." },
  { to: "/products-solutions/", title: "Products & solutions", body: "Every HUB24 product in one list." },
  { to: "/insights/", title: "Insights", body: "Commentary from our team and advice experts." },
  { to: "/shareholder-centre/overview/", title: "Shareholder Centre", body: "ASX:HUB results and announcements." },
];

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      <Section className="py-24">
        <div className="flex max-w-2xl flex-col gap-5">
          <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
            404
          </span>
          <h1 className="font-display text-4xl font-semibold text-ink-strong md:text-5xl">
            We couldn&apos;t find that page
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft">
            The link may be out of date, or the page may have moved. Try one of the sections below,
            or search the site.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink to="/search" variant="secondary" size="lg">
              Search
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SUGGESTIONS.map((suggestion) => (
            <LinkCard key={suggestion.to} to={suggestion.to} className="flex flex-col gap-2">
              <CardHeading className="text-base">{suggestion.title}</CardHeading>
              <CardBody className="text-sm">{suggestion.body}</CardBody>
            </LinkCard>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
