import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function AccessibilityPage() {
  useDocumentTitle("Accessibility");
  return (
    <PageLayout>
      <PageHero eyebrow="Legal" title="Accessibility" summary="We aim for keyboard access, focus rings, and semantic landmarks in this demo." />
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-ink-soft sm:px-6"><p>Report demo accessibility issues via your usual Cursor / repo feedback channel. This is not the real CommBank accessibility contact.</p></div>
    </PageLayout>
  );
}
