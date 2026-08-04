import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function SustainabilityPage() {
  useDocumentTitle("Sustainability");
  return (
    <PageLayout>
      <PageHero eyebrow="About" title="Sustainability" summary="Illustrative sustainability themes — not an official report." />
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-ink-soft sm:px-6"><p>Climate, community, and responsible lending topics appear across CommBank’s real reporting. This demo only sketches the narrative for UI fidelity.</p></div>
    </PageLayout>
  );
}
