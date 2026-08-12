import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Newspaper, Video } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/marketing/ArticleCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getArticlesByAudience, getLatestArticles } from "@/data/articles";
import type { Article } from "@/data/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const hubs = [
  {
    id: "businesses",
    label: "Businesses",
    blurb: "Compliance, hiring and people operations for the person who runs them.",
  },
  {
    id: "employees",
    label: "Employees",
    blurb: "Payslips, leave and benefits, explained without the jargon.",
  },
  {
    id: "job-seekers",
    label: "Job seekers",
    blurb: "Interview preparation, salary research and how to read an offer.",
  },
  {
    id: "partners",
    label: "Partners",
    blurb: "Migration playbooks and practice resources for accountants and bookkeepers.",
  },
];

const contentTypes = [
  { icon: FileText, label: "Guides and playbooks", to: "/resources/businesses" },
  { icon: BookOpen, label: "Blogs and articles", to: "/blog" },
  { icon: Video, label: "Webinars", to: "/webinars" },
  { icon: Newspaper, label: "Newsroom", to: "/news" },
];

export function ResourcesPage() {
  useDocumentTitle("Resources");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title="Your guide to navigating employment."
        blurb="Whether you run a business, work in one, or are looking for your next role, start with the hub that matches you."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {hubs.map((hub) => (
            <Link
              key={hub.id}
              to={`/resources/${hub.id}`}
              className="focus-eh group flex flex-col rounded-eh-lg border border-eh-line bg-white p-7 transition hover:-translate-y-1 hover:border-eh-purple hover:shadow-eh-lift"
            >
              <h2 className="font-display text-xl font-bold text-eh-ink group-hover:text-eh-purple">
                {hub.label}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-eh-ink-soft">{hub.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-eh-purple">
                Open hub
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Content types" title="However you prefer to learn" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contentTypes.map((type) => (
            <Link
              key={type.label}
              to={type.to}
              className="focus-eh flex items-center gap-4 rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-eh-purple-tint text-eh-purple">
                <type.icon size={19} />
              </span>
              <span className="font-semibold text-eh-ink">{type.label}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Latest" title="Recently published" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {getLatestArticles(3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function ResourceHubPage() {
  const { audience = "" } = useParams();
  const hub = hubs.find((item) => item.id === audience);

  useDocumentTitle(hub ? `${hub.label} resources` : "Resources");

  if (!hub) return <Navigate to="/resources" replace />;

  const items = getArticlesByAudience(hub.id as Article["audience"]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title={`${hub.label} resources`}
        blurb={hub.blurb}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: hub.label },
        ]}
      />

      <Section>
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing here yet"
            body="This hub is still being written. In the meantime, the blog covers most of the same ground."
          />
        )}
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
