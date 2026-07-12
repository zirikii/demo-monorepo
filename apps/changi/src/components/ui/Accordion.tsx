import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-sand-deep overflow-hidden rounded-card border border-sand-deep bg-card", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink hover:bg-sand-alt"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              {item.question}
              <ChevronDown
                className={cn("size-5 shrink-0 text-magenta transition-transform", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            {isOpen && <p className="px-5 pb-5 text-ink-soft leading-relaxed">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
