import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/data/faqs";

interface FaqSectionProps {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
}

export function FaqSection({ faqs, eyebrow = "Help", title = "Frequently asked questions" }: FaqSectionProps) {
  return (
    <section className="bg-sand-alt py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-10" />
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
