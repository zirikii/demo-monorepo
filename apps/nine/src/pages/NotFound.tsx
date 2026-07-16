import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { pillarOrder, pillars } from "@/data/pillars";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <PageLayout>
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-7xl font-black text-nine">404</p>
        <h1 className="mt-3 text-2xl font-black text-ink">We can&apos;t find that page</h1>
        <p className="mt-2 text-sm text-ink-soft">
          The story may have moved or the link may be broken. Try one of our sections instead.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>Back to homepage</Button>
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {pillarOrder.map((p) => (
            <Link
              key={p}
              to={pillars[p].to}
              className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-surface"
            >
              {pillars[p].label}
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
