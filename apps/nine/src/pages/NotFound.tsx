import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout hideTicker>
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-nine-blue">404</p>
        <h1 className="mt-2 font-display text-4xl font-bold">We couldn&apos;t find that page</h1>
        <p className="mt-3 text-nine-muted">The story may have moved, or the link is outdated.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">Home</Button>
          <Button to="/search" variant="secondary">
            Search
          </Button>
        </div>
        <p className="mt-6 text-sm">
          <Link to="/sport" className="text-nine-blue">
            Sport
          </Link>{" "}
          ·{" "}
          <Link to="/news" className="text-nine-blue">
            News
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
