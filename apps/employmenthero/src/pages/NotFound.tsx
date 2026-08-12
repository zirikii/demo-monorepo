import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";

const SUGGESTIONS = [
  { to: "/products", label: "Products", body: "Hiring, HR, payroll and benefits" },
  { to: "/pricing", label: "Pricing", body: "Plans, add-ons and what's included" },
  { to: "/resources", label: "Resource hub", body: "Guides, templates and award updates" },
  { to: "/support", label: "Service centre", body: "Help articles and support channels" },
];

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      <Section tone="white" className="py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="text-6xl font-extrabold tracking-tight text-eh-purple">404</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-strong md:text-4xl">
            We couldn&apos;t find that page
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-ink-soft">
            The link may be out of date, or the page may have moved. Here are a few places people go
            instead.
          </p>
          <ButtonLink to="/" size="lg">
            Back to home
          </ButtonLink>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {SUGGESTIONS.map((item) => (
            <LinkCard key={item.to} to={item.to} className="flex flex-col gap-1">
              <span className="text-lg font-extrabold tracking-tight text-ink-strong">
                {item.label}
              </span>
              <span className="text-sm text-ink-soft">{item.body}</span>
            </LinkCard>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
