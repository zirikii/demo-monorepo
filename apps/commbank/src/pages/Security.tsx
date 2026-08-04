import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { securityTips } from "@/data/faqs";

export function SecurityPage() {
  useDocumentTitle("Security");
  return (
    <PageLayout>
      <PageHero eyebrow="Support" title="Security" summary="Tips to stay safe online — educational demo content." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><ul className="space-y-3">{securityTips.map((tip) => (<li key={tip} className="rounded-lg border border-line bg-card px-4 py-3 text-sm text-ink-soft">{tip}</li>))}</ul></div>
    </PageLayout>
  );
}
