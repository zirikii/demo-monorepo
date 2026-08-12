import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Building2, Check, Hotel, Stethoscope } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, SectionHeading } from "@/components/ui/Card";
import { marketingPages } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function MarketingPage() {
  const location = useLocation();
  const page = marketingPages.find((item) => item.path === location.pathname);
  useDocumentTitle(page?.eyebrow ?? "Employment Hero");

  if (!page) {
    return <IndustriesPage />;
  }

  return (
    <PageLayout>
      <section className="bg-violet-soft py-20 sm:py-28">
        <div className="container-hero text-center">
          <Badge tone="violet" className="bg-white/70">
            {page.eyebrow}
          </Badge>
          <h1 className="mx-auto mt-7 max-w-5xl text-6xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-ink-soft">{page.intro}</p>
          <ButtonLink
            to={location.pathname === "/careers" ? "/contact" : "/book-a-demo"}
            className="mt-9"
          >
            {location.pathname === "/careers" ? "Explore open roles" : "Book a demo"}
          </ButtonLink>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hero">
          <SectionHeading eyebrow="Why Employment Hero" title={page.accent} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {page.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className={`p-7 tone-${["violet", "coral", "green"][index]}`}
                >
                  <Icon aria-hidden="true" className="h-7 w-7" />
                  <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em]">
                    {feature.title}
                  </h2>
                  <p className="mt-4 leading-7 text-ink-soft">{feature.body}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-hero grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-7xl font-semibold tracking-[-0.065em] text-violet sm:text-8xl">
              {page.stat}
            </p>
            <p className="mt-4 max-w-sm text-lg leading-8 text-white/65">{page.statLabel}</p>
          </div>
          <div className="rounded-hero-xl bg-white/8 p-7 sm:p-10">
            <p className="eyebrow text-green">One connected workflow</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">
              From insight to action, without the handoffs.
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "Live people data",
                "Automated approvals",
                "Employee self-service",
                "Clear audit trails",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/75">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-green text-ink">
                    <Check aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
          Make employment easier from day one.
        </h2>
        <ButtonLink to="/book-a-demo" className="mt-8">
          Talk to an employment specialist
        </ButtonLink>
      </section>
    </PageLayout>
  );
}

export function IndustriesPage() {
  useDocumentTitle("Industries");
  const industries = [
    {
      title: "Healthcare",
      href: "/industries/healthcare",
      body: "Credential, roster and support every care team.",
      icon: Stethoscope,
      tone: "violet",
    },
    {
      title: "Hospitality",
      href: "/industries/hospitality",
      body: "Build better shifts across every busy venue.",
      icon: Hotel,
      tone: "coral",
    },
    {
      title: "Professional services",
      href: "/industries/professional-services",
      body: "Hire, grow and retain exceptional expertise.",
      icon: Building2,
      tone: "green",
    },
  ];

  return (
    <PageLayout>
      <section className="bg-green-soft py-20 sm:py-28">
        <div className="container-hero text-center">
          <p className="eyebrow">Solutions by industry</p>
          <h1 className="mx-auto mt-6 max-w-5xl text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Employment software that understands your world.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-ink-soft">
            Flexible workflows for industries where people, compliance and time all matter.
          </p>
        </div>
      </section>
      <section className="py-20 sm:py-28">
        <div className="container-hero grid gap-6 md:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.href}
                to={industry.href}
                className={`focus-hero group rounded-hero-xl p-8 tone-${industry.tone}`}
              >
                <Icon aria-hidden="true" className="h-9 w-9" />
                <h2 className="mt-16 text-3xl font-semibold tracking-[-0.04em]">
                  {industry.title}
                </h2>
                <p className="mt-4 leading-7 text-ink-soft">{industry.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                  Explore{" "}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
