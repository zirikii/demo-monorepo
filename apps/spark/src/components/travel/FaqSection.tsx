import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faq";
import { StandardRatesTable } from "./StandardRatesTable";

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="spark-container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Need to know" title="How Travel Packs work">
              <p>
                Key rules from Spark&apos;s page: the pack lasts three months from activation, allowances do not refresh, and the price is the total cost for the whole term.
              </p>
            </SectionHeading>
            <div className="mt-8">
              <StandardRatesTable />
            </div>
          </div>

          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
