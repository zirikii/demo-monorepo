import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { SOLUTIONS } from "@/data/solutions";

export default function SolutionsPage() {
  return (
    <PageLayout title="Solutions">
      <PageHero
        eyebrow="By team"
        title="Built for how real teams work"
        body="Software, IT, product, and business teams share one system of work — with agents in the loop."
        crumbs={[{ label: "Home", to: "/" }, { label: "Solutions" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {SOLUTIONS.map((solution) => (
            <li key={solution.slug}>
              <Link
                to={`/solutions/${solution.slug}`}
                className="focus-atl flex h-full flex-col gap-3 rounded-atl-lg border border-line p-6 hover:border-atl-blue"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
                  {solution.audience}
                </p>
                <h2 className="text-2xl font-extrabold">{solution.name}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{solution.intro}</p>
                <p className="mt-auto pt-4 text-sm font-bold text-atl-blue">Explore {solution.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
