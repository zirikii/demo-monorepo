import { Link, useParams } from "react-router-dom";
import { AskAssistantCard } from "@/components/help/AskAssistantCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageLayout } from "@/components/layout/PageLayout";
import { findArticle } from "@/data/help";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "../NotFound";

export function HelpArticlePage() {
  const { category: categorySlug, article: articleSlug } = useParams();
  const found = findArticle(categorySlug, articleSlug);
  useDocumentTitle(found?.article.title ?? "Help & Support");
  if (!found) return <NotFoundPage />;
  const { category, article } = found;
  const related = category.articles.filter((a) => a.slug !== article.slug).slice(0, 4);

  return (
    <PageLayout>
      <div className="container-agl py-8">
        <Breadcrumb items={[{ label: "Help & Support", to: "/help" }, { label: category.title, to: `/help/${category.slug}` }, { label: article.title }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          <article>
            <h1 className="text-4xl font-extrabold tracking-tight text-agl-blue-dark">{article.title}</h1>
            <p className="mt-3 text-lg text-ink-soft">{article.summary}</p>
            {article.sections.map((section) => (
              <section key={section.heading} className="mt-8">
                <h2 className="text-2xl font-extrabold text-ink">{section.heading}</h2>
                {section.body && <p className="mt-2 leading-relaxed text-ink-soft">{section.body}</p>}
                {section.steps && (
                  <ol className="mt-3 space-y-2">
                    {section.steps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-agl-sky text-sm font-extrabold text-agl-blue-dark">
                          {i + 1}
                        </span>
                        <span className="pt-0.5 text-ink">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}
          </article>
          <div className="space-y-6">
            {article.assistantStep && <AskAssistantCard step={article.assistantStep} label={article.title} />}
            {related.length > 0 && (
              <nav aria-label="Related articles" className="rounded-agl-lg border border-line-soft p-5">
                <h2 className="font-extrabold text-ink">Related articles</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link to={`/help/${category.slug}/${a.slug}`} className="font-bold text-agl-blue hover:underline">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
