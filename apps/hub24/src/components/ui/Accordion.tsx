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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className={cn(
        "divide-y divide-line overflow-hidden rounded-hub-lg border border-line",
        className,
      )}
    >
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="bg-white">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="focus-hub flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[1.02rem] font-bold text-ink-strong">{item.question}</span>
              <ChevronDown
                aria-hidden
                className={cn("h-5 w-5 shrink-0 text-hub-blue transition", open && "rotate-180")}
              />
            </button>
            {open ? (
              <div className="animate-hub-fade px-5 pb-5 text-ink-soft">{item.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
