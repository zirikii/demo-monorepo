import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout>
      <section className="container-eh py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-eh-purple">404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-ink-soft">That URL is not part of this Employment Hero demo.</p>
        <ButtonLink to="/" className="mt-8">Back to home</ButtonLink>
      </section>
    </PageLayout>
  );
}
