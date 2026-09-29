import { AglRays } from "@/components/brand/AglRays";
import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout>
      <div className="container-agl flex flex-col items-center py-24 text-center">
        <AglRays className="h-24 w-24" />
        <h1 className="mt-6 text-4xl font-extrabold text-agl-blue-dark">We can’t find that page</h1>
        <p className="mt-2 text-ink-soft">It may have moved, or the link might be out of date.</p>
        <div className="mt-6 flex gap-3">
          <ButtonLink to="/">Go to home</ButtonLink>
          <ButtonLink to="/help" variant="secondary">
            Help & Support
          </ButtonLink>
        </div>
      </div>
    </PageLayout>
  );
}
