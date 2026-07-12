import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout>
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-start justify-center px-4 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple">404</p>
        <h1 className="mt-2 text-3xl font-black text-ink-deep">This gate is closed</h1>
        <p className="mt-3 text-sm text-ink-soft">
          The page you requested isn&apos;t on this demo map. Head home or check flight information instead.
        </p>
        <div className="mt-6 flex gap-2">
          <Link to="/">
            <Button variant="purple">Back to home</Button>
          </Link>
          <Link to="/fly/flights">
            <Button variant="secondary">Flight information</Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
