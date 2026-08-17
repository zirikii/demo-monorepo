import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { searchSite } from "@/lib/search";

export default function SearchResultsPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchSite(query);

  return (
    <PageLayout title={query ? `Search: ${query}` : "Search"}>
      <PageHero
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search hub24.com.au"}
        body={
          query
            ? `${results.length} ${results.length === 1 ? "result" : "results"} across products, audiences, insights and documents.`
            : "Search products, audience pages, insights and product documents."
        }
        crumbs={[{ label: "Home", to: "/" }, { label: "Search" }]}
      />

      <Section>
        <form
          className="flex max-w-xl items-end gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const value = new FormData(event.currentTarget).get("q");
            setParams(typeof value === "string" && value.trim() ? { q: value.trim() } : {});
          }}
        >
          <Field label="Search" htmlFor="results-search" className="flex-1">
            <TextInput
              id="results-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="e.g. managed portfolios"
            />
          </Field>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>

        {query && results.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="No results"
            body="Try a broader term such as “super”, “managed portfolios”, “SMSF” or “Engage”."
          />
        ) : null}

        {results.length > 0 ? (
          <>
            <SectionHeading className="mt-12" eyebrow="Results" title="What we found" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {results.map((result) => (
                <LinkCard key={`${result.kind}-${result.title}`} to={result.to} className="flex flex-col gap-2">
                  <Badge tone="neutral" className="w-fit">
                    {result.kind}
                  </Badge>
                  <CardHeading className="text-base">{result.title}</CardHeading>
                  <CardBody className="text-sm">{result.excerpt}</CardBody>
                </LinkCard>
              ))}
            </div>
          </>
        ) : null}
      </Section>
    </PageLayout>
  );
}
