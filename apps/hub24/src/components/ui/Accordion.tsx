import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="focus-hub flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-semibold text-ink-strong">{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn("h-5 w-5 shrink-0 text-hub-teal transition", isOpen && "rotate-180")}
              />
            </button>
            {isOpen ? <p className="pb-5 text-[0.95rem] leading-relaxed text-ink-soft">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
