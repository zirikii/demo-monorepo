import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AskAssistantCard } from "@/components/help/AskAssistantCard";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { findCategory } from "@/data/help";
import { findTopic } from "@/features/assistant/flows";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "../NotFound";

export function HelpCategoryPage() {
  const { category: slug } = useParams();
  const category = findCategory(slug);
  useDocumentTitle(category?.title ?? "Help & Support");
  if (!category) return <NotFoundPage />;
  const topic = findTopic(category.assistantTopic);

  return (
    <PageLayout>
      <PageHero crumbs={[{ label: "Help & Support", to: "/help" }, { label: category.title }]} title={category.title} intro={category.description} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-line-soft rounded-agl-lg border border-line-soft">
            {category.articles.map((article) => (
              <li key={article.slug}>
                <Link to={`/help/${category.slug}/${article.slug}`} className="flex items-center gap-4 p-5 hover:bg-agl-sky">
                  <span className="flex-1">
                    <span className="block font-extrabold text-ink">{article.title}</span>
                    <span className="block text-sm text-ink-soft">{article.summary}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 text-agl-blue" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          {topic && <AskAssistantCard step={topic.entry} label={topic.label} />}
        </div>
      </Section>
    </PageLayout>
  );
}
