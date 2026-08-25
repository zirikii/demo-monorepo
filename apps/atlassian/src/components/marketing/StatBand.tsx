import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CUSTOMER_STORIES } from "@/data/stories";

const CARD_TONES = ["bg-[#cfe1fd]", "bg-[#d3f1e4]", "bg-[#f3e8ff]", "bg-[#ffe8cc]"];

export function StatBand() {
  return (
    <Section>
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink-strong md:text-[2.75rem] md:leading-[1.15]">
            350K+ unstoppable teams harness the power of AI
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Discover how the teams of the future ship faster and deliver measurable outcomes.
          </p>
        </div>
        <ButtonLink to="/customers" variant="secondary">
          Read all stories
        </ButtonLink>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {CUSTOMER_STORIES.map((story, index) => {
          const result = story.results[0];
          return (
            <li key={story.slug}>
              <Link
                to={`/customers/${story.slug}`}
                className={`focus-atl flex h-full flex-col gap-4 p-6 transition hover:shadow-atl-lift ${CARD_TONES[index] ?? "bg-atl-tint"}`}
              >
                <p className="text-sm font-bold text-ink-strong">{story.company}</p>
                <p className="text-3xl font-semibold text-ink-strong">{result?.value}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{result?.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
