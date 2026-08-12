import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { news, webinars } from "@/data/company";
import { formatDate, formatLongDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NewsroomPage() {
  useDocumentTitle("Newsroom");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Newsroom"
        title="Announcements and coverage."
        blurb="Product releases, company milestones and what the press had to say about them."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Newsroom" }]}
      />

      <Section>
        <ul className="space-y-4">
          {news.map((item) => (
            <li
              key={item.slug}
              className="rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="neutral">{item.outlet}</Badge>
                <span className="text-xs text-eh-ink-faint">{formatLongDate(item.date)}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-eh-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{item.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Media enquiries"
        blurb="Our media centre has logos, brand guidelines and executive biographies."
        primaryLabel="Open the media centre"
        primaryTo="/media-centre"
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </SiteLayout>
  );
}

export function WebinarsPage() {
  useDocumentTitle("Webinars");

  const upcoming = webinars.filter((webinar) => !webinar.onDemand);
  const onDemand = webinars.filter((webinar) => webinar.onDemand);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Webinars"
        title="Watch and learn."
        blurb="Working sessions run by the people who build and support the platform. No slides about digital transformation."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Webinars" }]}
      />

      <Section>
        <SectionHeading eyebrow="Coming up" title="Register for a live session" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {upcoming.map((webinar) => (
            <Card key={webinar.slug} className="flex flex-col">
              <Badge tone="purple">Live · {formatDate(webinar.date)}</Badge>
              <CardTitle className="mt-4">{webinar.title}</CardTitle>
              <CardBody className="flex-1">{webinar.blurb}</CardBody>
              <p className="mt-4 text-xs text-eh-ink-faint">
                {webinar.presenter}, {webinar.presenterRole} · {webinar.minutes} minutes
              </p>
              <ButtonLink to="/contact" size="sm" className="mt-5 w-fit">
                Register
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="On demand" title="Watch any time" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {onDemand.map((webinar) => (
            <Card key={webinar.slug} className="flex flex-col">
              <Badge tone="neutral">On demand · {webinar.minutes} min</Badge>
              <CardTitle className="mt-4">{webinar.title}</CardTitle>
              <CardBody className="flex-1">{webinar.blurb}</CardBody>
              <p className="mt-4 text-xs text-eh-ink-faint">
                {webinar.presenter}, {webinar.presenterRole}
              </p>
            </Card>
          ))}
        </div>
        <Link
          to="/resources"
          className="focus-eh mt-8 inline-block text-sm font-semibold text-eh-purple hover:underline"
        >
          Browse all resources →
        </Link>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
