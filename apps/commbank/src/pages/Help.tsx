import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { helpFaqs } from "@/data/faqs";
import { Accordion } from "@/components/ui/Accordion";

export function HelpPage() {
  useDocumentTitle("Help");
  return (
    <PageLayout>
      <PageHero eyebrow="Support" title="Help" summary="Answers for this unofficial CommBank demo." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><Accordion items={helpFaqs} /></div>
    </PageLayout>
  );
}
