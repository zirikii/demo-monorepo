import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { popularSearches } from "@/data/nav";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <PageLayout>
      <PageHero
        eyebrow="404"
        title="We can't find that page"
        description="The page you're looking for may have moved, or the link may be out of date."
        tone="light"
        actions={
          <>
            <ButtonLink to="/" size="lg">
              Back to homepage
            </ButtonLink>
            <ButtonLink to="/support" variant="outline" size="lg">
              Help & support
            </ButtonLink>
          </>
        }
      />
      <section className="py-14">
        <div className="container-page">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            Popular searches
          </p>
          <ul className="flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <li key={item.to + item.label}>
                <Link
                  to={item.to}
                  className="focus-ring inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft hover:border-black hover:text-black"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
