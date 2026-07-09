import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  useDocumentTitle("Page Not Found");

  return (
    <PageLayout>
      <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="text-7xl font-extrabold text-paytm-navy">404</p>
        <h1 className="mt-4 text-xl font-bold text-ink">This page took a wrong turn</h1>
        <p className="mt-2 max-w-md text-sm text-ink-soft">
          The link may be old or mistyped. Head back home, or jump straight into recharges and bill
          payments.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
          <Link to="/bill-payments">
            <Button variant="outline">All Bill Payments</Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
