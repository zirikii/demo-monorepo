import { PageLayout } from "@/components/layout/PageLayout";
import { LeadStory } from "@/components/article/LeadStory";
import { StoryCard } from "@/components/article/StoryCard";
import { PillarRail } from "@/components/home/PillarRail";
import { getLatest } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Button } from "@/components/ui/Button";

export function HomePage() {
  useDocumentTitle("nine.com.au | News, Sport, TV, Entertainment, Lifestyle");
  const latest = getLatest(7);
  const [lead, ...rest] = latest;

  return (
    <PageLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-nine-wash px-4 py-3">
        <p className="text-sm text-nine-muted">
          <span className="font-semibold text-nine-ink">nine.com.au</span> — news, sport, lifestyle, travel,
          entertainment & shopping in one place.
        </p>
        <Button to="/newsletter" variant="secondary" size="sm">
          Get the newsletter
        </Button>
      </div>

      {lead && <LeadStory article={lead} />}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <StoryCard key={a.slug} article={a} />
        ))}
      </div>

      <PillarRail pillar="news" />
      <PillarRail pillar="sport" />
      <PillarRail pillar="lifestyle" />
      <PillarRail pillar="entertainment" />
      <PillarRail pillar="travel" />
    </PageLayout>
  );
}
