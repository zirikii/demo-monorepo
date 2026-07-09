import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

interface FaqSectionProps {
  items: { q: string; a: string }[];
  title?: string;
}

export function FaqSection({ items, title = "Frequently asked questions" }: FaqSectionProps) {
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
      <SectionHeading eyebrow="FAQ" title={title} align="center" />
      <Accordion items={items} className="mt-10" />
    </section>
  );
}
