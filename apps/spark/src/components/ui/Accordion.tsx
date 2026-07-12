import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type AccordionItem = {
  question: string;
  answer: string[];
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <section key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                className="spark-focus flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-extrabold text-ink sm:px-7"
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                {item.question}
                <ChevronDown
                  aria-hidden
                  className={cn("size-5 shrink-0 text-spark-purple transition", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            {isOpen && (
              <div className="space-y-3 px-5 pb-6 text-sm leading-7 text-ink-soft sm:px-7">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
