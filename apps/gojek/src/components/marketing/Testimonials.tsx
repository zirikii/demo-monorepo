import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="From our community"
          title="Millions of stories, one platform"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-line bg-card p-6"
            >
              <Quote aria-hidden="true" className="h-8 w-8 text-gojek" />
              <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-bold text-ink">{t.name}</p>
                <p className="text-sm text-ink-soft">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
