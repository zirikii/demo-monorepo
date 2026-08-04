import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function PrivacyPage() {
  useDocumentTitle("Privacy");
  return (
    <PageLayout>
      <PageHero eyebrow="Legal" title="Privacy" summary="Demo privacy notice — this app stores mock sessions in localStorage only." />
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-ink-soft sm:px-6"><p>Do not enter real banking credentials. No data is sent to Commonwealth Bank systems from this demo.</p></div>
    </PageLayout>
  );
}
