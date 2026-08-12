import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout>
      <section className="container-hero py-24 text-center sm:py-36">
        <p className="text-8xl font-semibold tracking-[-0.07em] text-violet">404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
          This page clocked off early.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          The page you requested isn&rsquo;t part of this Employment Hero demo.
        </p>
        <ButtonLink to="/" className="mt-8">
          Return home
        </ButtonLink>
      </section>
    </PageLayout>
  );
}
