import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { FilterChips } from "@/components/ui/Tabs";
import { TextField } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { faqCategories, faqs, supportChannels } from "@/data/faqs";
import { matchesQuery } from "@/lib/search";

export function SupportPage() {
  useDocumentTitle("Help & support");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(
    () =>
      faqs.filter((faq) => {
        if (category !== "All" && faq.category !== category) return false;
        return matchesQuery([faq.question, faq.answer, faq.category], query);
      }),
    [query, category],
  );

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Help & support" }]} />
      <PageHero
        eyebrow="Support"
        title="How can we help?"
        description="Search our frequently asked questions, or connect with a specialist."
        tone="light"
      />

      <section id="claims" className="scroll-mt-28 border-b border-line py-12">
        <div className="container-page">
          <SectionHeading title="We're here to help" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {supportChannels.map((channel) => (
              <Card key={channel.title} className="flex h-full flex-col">
                <h3 className="text-base font-bold text-black">{channel.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{channel.description}</p>
                <p className="mt-4 text-sm font-semibold text-black underline underline-offset-4">
                  {channel.action}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="merchant" className="scroll-mt-28 py-14">
        <div className="container-page">
          <SectionHeading title="Search support and FAQs" className="mb-8" />

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-6">
              <TextField
                label="Search FAQs"
                placeholder="e.g. activate card, BPAY, redraw"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div>
                <p className="mb-2 text-sm font-semibold text-black">Category</p>
                <FilterChips
                  options={faqCategories}
                  value={category}
                  onChange={setCategory}
                  ariaLabel="Filter FAQs by category"
                />
              </div>
            </aside>

            <div>
              <p className="mb-4 text-sm text-ink-soft" role="status">
                Showing <strong className="text-black">{results.length}</strong> of {faqs.length}{" "}
                questions
              </p>
              {results.length === 0 ? (
                <EmptyState
                  title="No questions match your search"
                  description="Try a different term, or choose a different category to browse."
                />
              ) : (
                <Accordion
                  items={results.map((faq) => ({
                    id: faq.id,
                    title: faq.question,
                    content: faq.answer,
                  }))}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <ThingsYouShouldKnow>
        <p>
          Phone numbers shown in FAQ answers are CommBank&apos;s real published numbers, included
          for realism. This demo cannot contact anyone on your behalf.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
