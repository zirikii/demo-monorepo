import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function NewsroomPage() {
  useDocumentTitle("Newsroom");
  return (
    <PageLayout>
      <PageHero eyebrow="About" title="Newsroom" summary="Demo headlines inspired by typical bank media updates." />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-10 sm:px-6">{['CommBank expands digital home loan tools','Yello customers unlock new partner offers','Sustainability update: financing the transition'].map((h)=>(<article key={h} className="rounded-lg border border-line bg-card px-4 py-3"><h2 className="font-bold text-ink">{h}</h2><p className="text-sm text-ink-soft">Demo article summary for walkthroughs.</p></article>))}</div>
    </PageLayout>
  );
}
