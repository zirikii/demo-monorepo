import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function AboutPage() {
  useDocumentTitle("About us");
  return (
    <PageLayout>
      <PageHero eyebrow="About" title="About us" summary="Commonwealth Bank of Australia is Australia’s leading provider of integrated financial services — this page is an unofficial demo overview." />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm text-ink-soft sm:px-6"><p>Retail Banking Services, Business Banking, Institutional Banking & Markets, and ASB in New Zealand serve millions of customers.</p><p>This repository clone focuses on the public marketing site and a simplified NetBank experience for demos and agent evaluation.</p></div>
    </PageLayout>
  );
}
