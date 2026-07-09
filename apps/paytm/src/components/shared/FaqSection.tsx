import type { Faq } from "../../data/faqs";
import { Accordion } from "../ui/Accordion";
import { SectionHeading } from "../ui/SectionHeading";

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
}

export function FaqSection({ faqs, title = "Frequently Asked Questions" }: FaqSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <SectionHeading title={title} />
      <Accordion
        items={faqs.map((f, i) => ({ id: `faq-${i}`, title: f.q, body: f.a }))}
      />
    </section>
  );
}
