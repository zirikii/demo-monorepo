import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { getResource } from "@/data/resources";
import { formatLongDate, readingTime } from "@/lib/format";

export default function ResourceDetailPage() {
  const { slug = "" } = useParams();
  const resource = getResource(slug);
  if (!resource) return <Navigate to="/resources" replace />;

  return (
    <PageLayout title={resource.title}>
      <PageHero
        eyebrow={resource.type}
        title={resource.title}
        body={`${formatLongDate(resource.publishedOn)} · ${readingTime(resource.body.join(" "))}`}
        crumbs={[
          { label: "Resources", to: "/resources" },
          { label: resource.title },
        ]}
      />
      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <p className="text-lg text-ink-soft">{resource.excerpt}</p>
          {resource.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
