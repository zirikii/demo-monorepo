import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { StoryCard } from "@/components/article/StoryCard";
import { getBreaking, getByPillar } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Badge } from "@/components/ui/Badge";

export function LivePage() {
  useDocumentTitle("Live");
  const live = [...getBreaking(), ...getByPillar("sport").filter((a) => a.isLive)];
  const unique = Array.from(new Map(live.map((a) => [a.slug, a])).values());

  return (
    <PageLayout hideTicker>
      <div className="mb-6 flex items-center gap-3">
        <Badge tone="live">Live</Badge>
        <h1 className="font-display text-4xl font-bold">Live coverage</h1>
      </div>
      <p className="mb-8 max-w-2xl text-nine-muted">
        Mock live blogs and match centres. In production these would stream updates; here they link to seeded
        stories.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {unique.map((a) => (
          <div key={a.slug} className="rounded-lg border border-nine-line p-4">
            <StoryCard article={a} compact />
            <Link
              to={`/${a.pillar}/${a.slug}`}
              className="mt-3 inline-block text-sm font-semibold text-nine-live no-underline hover:underline"
            >
              Open live story →
            </Link>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
