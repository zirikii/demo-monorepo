import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Avatar } from "@/components/ui/Avatar";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { findInsight, INSIGHTS } from "@/data/insights";
import { formatLongDate, readingTime } from "@/lib/format";

export default function InsightDetailPage() {
  const { slug = "" } = useParams();
  const insight = findInsight(slug);

  if (!insight) {
    return <Navigate to="/insights/" replace />;
  }

  const related = INSIGHTS.filter(
    (candidate) => candidate.slug !== insight.slug && candidate.category === insight.category,
  ).slice(0, 3);

  return (
    <PageLayout title={insight.title}>
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        body={insight.excerpt}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Insights", to: "/insights/" },
          { label: insight.title },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3">
              <Avatar name={insight.author} />
              <div>
                <p className="text-sm font-semibold text-ink-strong">{insight.author}</p>
                <p className="text-xs text-ink-faint">{insight.authorTitle}</p>
              </div>
            </div>
            <dl className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-faint">Published</dt>
                <dd className="text-right text-ink">{formatLongDate(insight.published)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-faint">Reading time</dt>
                <dd className="text-right text-ink">{readingTime(insight.body.join(" "))}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-faint">Topic</dt>
                <dd className="text-right text-ink">{insight.category}</dd>
              </div>
            </dl>
          </aside>

          <article className="flex max-w-2xl flex-col gap-5">
            {insight.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[1.05rem] leading-[1.75] text-ink">
                {paragraph}
              </p>
            ))}
            <p className="mt-4 rounded-h24 border-l-4 border-h24-teal bg-surface-tint p-5 text-sm text-ink-soft">
              This article is invented for a demonstration build. It is not financial product advice
              and does not reflect any published HUB24 view.
            </p>
          </article>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="tint">
          <SectionHeading eyebrow="More in this topic" title={insight.category} />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((candidate) => (
              <LinkCard
                key={candidate.slug}
                to={`/insights/${candidate.slug}/`}
                className="flex h-full flex-col gap-2"
              >
                <CardHeading>{candidate.title}</CardHeading>
                <CardBody>{candidate.excerpt}</CardBody>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Want this in your inbox?"
        body="In the real world you'd subscribe here. In this demo, the form is illustrative only."
      />
    </PageLayout>
  );
}
