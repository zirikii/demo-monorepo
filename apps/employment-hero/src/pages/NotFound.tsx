import { SiteLayout } from "@/components/layout/SiteLayout";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <SiteLayout>
      <section className="container-eh py-28 text-center">
        <p className="font-display text-7xl font-bold text-eh-purple">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-eh-ink">
          We could not find that page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-eh-ink-soft">
          The link may be out of date, or the page may have moved. Try the platform overview or
          search for what you were after.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/">Back to home</ButtonLink>
          <ButtonLink to="/products" variant="secondary">
            See all products
          </ButtonLink>
        </div>
      </section>
    </SiteLayout>
  );
}
