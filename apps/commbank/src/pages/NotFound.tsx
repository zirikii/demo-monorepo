import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-3 text-ink-soft">That page isn’t in this CommBank demo.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-cba-yellow px-4 py-2 font-bold text-cba-black">
          Back to home
        </Link>
      </div>
    </PageLayout>
  );
}
