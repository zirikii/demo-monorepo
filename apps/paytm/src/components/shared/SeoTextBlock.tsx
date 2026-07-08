import type { InfoSection } from "../../data/home";

interface SeoTextBlockProps {
  sections: InfoSection[];
}

/** Long-form informational copy blocks near the bottom of pages. */
export function SeoTextBlock({ sections }: SeoTextBlockProps) {
  return (
    <section className="border-t border-hairline bg-card">
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-14 sm:px-6">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-xl font-bold text-paytm-navy">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
