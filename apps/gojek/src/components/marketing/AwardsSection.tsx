import { Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { awards } from "@/data/awards";

export function AwardsSection() {
  return (
    <section id="awards" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Recognition"
          title="Awarded across the region"
          description="From customer experience to social impact, our work has been recognised by the industry."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award) => (
            <div
              key={`${award.year}-${award.title}`}
              className="flex h-full flex-col rounded-2xl border border-line bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gojek-tint text-gojek">
                  <Trophy aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-ink-faint">{award.year}</span>
              </div>
              <h3 className="mt-4 text-base font-bold leading-snug text-ink">{award.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{award.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
