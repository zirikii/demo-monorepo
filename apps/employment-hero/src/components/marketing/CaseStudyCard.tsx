import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className="focus-eh group flex flex-col rounded-eh-lg border border-eh-line bg-white p-7 transition hover:border-eh-purple hover:shadow-eh-lift"
    >
      <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
        {study.industry}
      </p>
      <h3 className="mt-3 font-display text-2xl font-bold text-eh-ink group-hover:text-eh-purple">
        {study.company}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-eh-ink-soft">{study.challenge}</p>
      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-eh-line pt-5">
        {study.results.map((result) => (
          <div key={result.label}>
            <dt className="sr-only">{result.label}</dt>
            <dd className="font-display text-xl font-bold text-eh-purple">{result.value}</dd>
            <p className="mt-0.5 text-[11px] leading-snug text-eh-ink-faint">{result.label}</p>
          </div>
        ))}
      </dl>
    </Link>
  );
}
