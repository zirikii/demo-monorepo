import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Accordion } from "@/components/ui/Accordion";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkCard } from "@/components/ui/Card";
import { faqCategories, faqs, filterFaqs } from "@/data/faqs";
import { pluralise } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const quickHelp = [
  {
    to: "/support/contact-us",
    title: "Contact us",
    body: "Message us in the CommBank app or call to connect to the right help.",
  },
  {
    to: "/locate-us",
    title: "Locate us",
    body: "Find a branch, ATM or specialist near you and see available services.",
  },
  {
    to: "/support/security",
    title: "CommBank Safe",
    body: "Report a scam, check the latest alerts and learn how to protect yourself.",
  },
  {
    to: "/digital-banking/netbank",
    title: "Manage online",
    body: "Update details, view statements and manage payments in NetBank.",
  },
];

export function SupportPage() {
  useDocumentTitle("CommBank support");
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const category = searchParams.get("category") ?? "all";

  const results = useMemo(() => filterFaqs(faqs, query, category), [query, category]);

  const setCategory = (next: string) => {
    const params = new URLSearchParams(searchParams);
    if (next === "all") params.delete("category");
    else params.set("category", next);
    setSearchParams(params, { replace: true });
  };

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Help & support" }]} />
      <PageHero
        eyebrow="Help & support"
        title="Search support and FAQs"
        intro="Your question might have been asked before. Search our FAQs, or message us in the CommBank app for instant help from Ceba."
      />

      <Section>
        <form
          role="search"
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="faq-search">
            Search support and FAQs
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-ghost"
            />
            <input
              id="faq-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search support and FAQs"
              className="focus-cba w-full rounded-full border border-line bg-surface py-3 pl-12 pr-4 text-[15px]"
            />
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
            className={cn(
              "focus-cba rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              category === "all"
                ? "border-ink bg-ink text-surface"
                : "border-line bg-surface text-ink hover:bg-surface-tint",
            )}
          >
            All topics
          </button>
          {faqCategories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={cn(
                "focus-cba rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                category === option
                  ? "border-ink bg-ink text-surface"
                  : "border-line bg-surface text-ink hover:bg-surface-tint",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-ink-faint" aria-live="polite">
          {pluralise(results.length, "result")}
        </p>

        <div className="mt-4">
          {results.length === 0 ? (
            <EmptyState
              title="No matching FAQs"
              body="Try a different search term or choose another topic. You can also message us in the CommBank app."
            />
          ) : (
            <Accordion
              items={results.map((faq) => ({
                id: faq.id,
                title: faq.question,
                content: <p>{faq.answer}</p>,
              }))}
            />
          )}
        </div>
      </Section>

      <Section tone="tint" title="Popular ways to get help">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickHelp.map((item) => (
            <LinkCard key={item.to} to={item.to} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
