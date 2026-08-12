import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { resources } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const pageMeta: Record<string, { eyebrow: string; title: string; intro: string; type?: string }> = {
  "/resources": {
    eyebrow: "Resource hub",
    title: "Big ideas. At your fingertips.",
    intro: "Practical thinking, templates and expert guidance for every employment moment.",
  },
  "/resources/blog": {
    eyebrow: "Blog",
    title: "Fresh thinking for better work.",
    intro: "Bite-sized ideas to keep you ahead of HR, payroll, hiring and workplace change.",
    type: "Article",
  },
  "/resources/guides-and-playbooks": {
    eyebrow: "Guides and playbooks",
    title: "Deep expertise, made useful.",
    intro: "Practical guides you can turn into action today.",
    type: "Guide",
  },
  "/resources/webinars": {
    eyebrow: "Webinars",
    title: "Watch, learn and run ahead.",
    intro: "Live and on-demand conversations with employment experts.",
    type: "Webinar",
  },
  "/resources/templates": {
    eyebrow: "Templates",
    title: "Start with something proven.",
    intro: "Customisable tools for planning, policies and people programs.",
    type: "Template",
  },
};

export function ResourcesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const meta = pageMeta[location.pathname] ?? pageMeta["/resources"];
  const [type, setType] = useState(meta?.type ?? "All");
  const query = searchParams.get("search") ?? "";
  useDocumentTitle(meta?.eyebrow ?? "Resources");

  const filtered = useMemo(
    () =>
      resources.filter(
        (resource) =>
          (type === "All" || resource.type === type) &&
          (!query ||
            `${resource.title} ${resource.summary}`.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, type],
  );

  return (
    <PageLayout>
      <section className="bg-coral-soft py-20 sm:py-28">
        <div className="container-hero text-center">
          <p className="eyebrow">{meta?.eyebrow}</p>
          <h1 className="mx-auto mt-6 max-w-5xl text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
            {meta?.title}
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-ink-soft">{meta?.intro}</p>
          <form
            className="mx-auto mt-9 flex max-w-xl rounded-full border border-ink/10 bg-white p-1.5 shadow-soft"
            onSubmit={(event) => event.preventDefault()}
          >
            <Search aria-hidden="true" className="ml-4 h-5 w-5 self-center text-ink-faint" />
            <label htmlFor="resource-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resource-search"
              value={query}
              onChange={(event) => {
                const next = new URLSearchParams(searchParams);
                if (event.target.value) next.set("search", event.target.value);
                else next.delete("search");
                setSearchParams(next, { replace: true });
              }}
              placeholder="What would you like help with?"
              className="min-h-11 flex-1 bg-transparent px-4 outline-none"
            />
          </form>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-hero">
          <div className="flex flex-wrap gap-2" aria-label="Filter resources">
            {["All", "Guide", "Template", "Webinar", "Article", "Research"].map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={type === option}
                onClick={() => setType(option)}
                className={`focus-hero rounded-full border px-4 py-2 text-sm font-bold ${type === option ? "border-ink bg-ink text-white" : "border-line bg-white"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-faint" aria-live="polite">
            {filtered.length} resources
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <Card key={resource.title} className="group overflow-hidden">
                <div className={`tone-${resource.color} grid h-48 place-items-center`}>
                  <span className="grid h-20 w-20 rotate-6 place-items-center rounded-3xl bg-white/70 text-4xl font-semibold transition-transform group-hover:rotate-0">
                    {resource.type[0]}
                  </span>
                </div>
                <div className="p-6">
                  <Badge tone={resource.color as "violet" | "coral" | "green" | "blue" | "yellow"}>
                    {resource.type}
                  </Badge>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                    {resource.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{resource.summary}</p>
                  <button
                    type="button"
                    className="focus-hero mt-6 rounded-full text-sm font-bold underline underline-offset-4"
                  >
                    Read resource
                  </button>
                </div>
              </Card>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="mt-8 rounded-hero-lg bg-neutral-soft p-10 text-center">
              <h2 className="text-2xl font-bold">No matching resources</h2>
              <p className="mt-2 text-ink-soft">Try a broader search or clear the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setType("All");
                  setSearchParams({});
                }}
                className="focus-hero mt-5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="container-hero rounded-hero-xl bg-violet p-10 text-center sm:p-16">
          <h2 className="text-4xl font-semibold tracking-[-0.045em]">
            Turn ideas into easier employment.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
            See how the workflows behind these resources come to life in Employment OS.
          </p>
          <ButtonLink to="/book-a-demo" className="mt-7">
            Book a demo
          </ButtonLink>
        </div>
      </section>
    </PageLayout>
  );
}
