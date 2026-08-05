import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container-cba max-w-2xl text-center">
          <p className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">Error 404</p>
          <h1 className="mt-3 text-4xl font-extrabold text-ink">We can&rsquo;t find that page</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            The page may have moved, or the address might have a typo. Try searching, or head back
            to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/" size="lg">
              Go to the homepage
            </ButtonLink>
            <ButtonLink to="/support" variant="secondary" size="lg">
              Search support
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
