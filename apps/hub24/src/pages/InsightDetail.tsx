import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { InsightCard } from "@/components/marketing/InsightCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSIGHTS, insightBySlug } from "@/data/insights";
import { longDate, readingTime } from "@/lib/format";

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const insight = slug ? insightBySlug(slug) : undefined;

  if (!insight) {
    return <Navigate to="/insights" replace />;
  }

  const related = INSIGHTS.filter(
    (candidate) => candidate.slug !== insight.slug && candidate.category === insight.category,
  ).slice(0, 3);

  return (
    <PageLayout title={insight.title}>
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        body={insight.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Insights", to: "/insights" },
          { label: insight.category },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-start">
          <article className="flex flex-col gap-5">
            {insight.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="flex flex-col gap-6 rounded-hub-lg border border-line bg-surface-tint p-6">
            <div className="flex items-center gap-3">
              <Avatar name={insight.author} tone="teal" />
              <span className="flex flex-col">
                <span className="font-bold text-ink-strong">{insight.author}</span>
                <span className="text-sm text-ink-faint">{insight.role}</span>
              </span>
            </div>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Published</dt>
                <dd className="font-semibold text-ink-strong">{longDate(insight.date)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Reading time</dt>
                <dd className="font-semibold text-ink-strong">{readingTime(insight.words)}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="tint">
          <SectionHeading
            eyebrow="More like this"
            title={`More ${insight.category.toLowerCase()}`}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </PageLayout>
  );
}
