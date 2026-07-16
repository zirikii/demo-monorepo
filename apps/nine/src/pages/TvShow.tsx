import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { getShow } from "@/data/shows";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "@/pages/NotFound";

export function TvShowPage() {
  const { showSlug = "" } = useParams();
  const show = getShow(showSlug);
  useDocumentTitle(show?.title ?? "TV show");

  if (!show) return <NotFoundPage />;

  return (
    <PageLayout>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-nine-blue">
        <Link to="/tv" className="text-nine-muted no-underline hover:text-nine-blue">
          TV
        </Link>
        <span className="mx-2 text-nine-line">/</span>
        {show.title}
      </p>
      <div
        className="mt-4 flex min-h-48 flex-col justify-end rounded-lg p-6 text-white sm:min-h-64 sm:p-10"
        style={{ background: `linear-gradient(135deg, ${show.tone}, #070720)` }}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-white/70">{show.network}</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{show.title}</h1>
        <p className="mt-2 max-w-xl text-white/85">{show.blurb}</p>
        <p className="mt-4 text-sm font-semibold text-nine-cyan">{show.airs}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/live">Watch live highlights</Button>
        <Button to="/tv" variant="secondary">
          All shows
        </Button>
      </div>
      <p className="mt-6 max-w-2xl text-nine-muted">
        This demo page mirrors a Nine Network programme hub. Episode guides and 9Now deep links are mocked for
        local browsing only.
      </p>
    </PageLayout>
  );
}
