import { Link } from "react-router-dom";
import type { Pillar } from "@/data/articles";
import { titleCase } from "@/lib/format";

export function SectionHero({
  pillar,
  title,
  dek,
}: {
  pillar: Pillar | string;
  title?: string;
  dek?: string;
}) {
  return (
    <header className="mb-8 border-b border-nine-line pb-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-nine-blue">
        <Link to="/" className="text-nine-muted no-underline hover:text-nine-blue">
          Home
        </Link>
        <span className="mx-2 text-nine-line">/</span>
        {titleCase(pillar)}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-nine-ink sm:text-5xl">{title ?? titleCase(pillar)}</h1>
      {dek && <p className="mt-2 max-w-2xl text-nine-muted">{dek}</p>}
    </header>
  );
}
