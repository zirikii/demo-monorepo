import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { getCustomer } from "@/data/customers";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "./NotFound";

export function CustomerDetailPage() {
  const { slug = "" } = useParams();
  const story = getCustomer(slug);
  useDocumentTitle(story?.company ?? "Customer");
  if (!story) return <NotFoundPage />;
  return (
    <PageLayout>
      <PageHero eyebrow={story.industry} title={story.headline} description={story.company} />
      <Section>
        <div className="container-eh max-w-3xl">
          <blockquote className="rounded-eh-lg border border-line bg-surface-soft p-8 text-xl leading-relaxed text-ink">
            “{story.quote}”
            <footer className="mt-4 text-sm font-semibold text-ink-soft">{story.person}, {story.role}</footer>
          </blockquote>
          <p className="mt-8 text-lg font-bold text-eh-purple">{story.metric}</p>
        </div>
      </Section>
    </PageLayout>
  );
}
