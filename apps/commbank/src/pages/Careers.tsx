import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function CareersPage() {
  useDocumentTitle("Careers");
  return (
    <PageLayout>
      <PageHero eyebrow="About" title="Careers" summary="Explore how people grow careers at CommBank — demo listings only." />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-10 sm:px-6">{['Graduate — Technology','Home Lending Specialist — Sydney','Cyber Security Analyst — Melbourne'].map((role)=>(<div key={role} className="rounded-lg border border-line bg-card px-4 py-3 font-semibold text-ink">{role}</div>))}</div>
    </PageLayout>
  );
}
