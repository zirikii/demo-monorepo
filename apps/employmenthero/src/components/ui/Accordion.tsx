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
    <div className={cn("divide-y divide-line overflow-hidden rounded-eh-lg border border-line bg-white", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="focus-eh flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[1.02rem] font-bold text-ink-strong">{item.question}</span>
              <ChevronDown
                aria-hidden
                className={cn("h-5 w-5 shrink-0 text-eh-purple transition", open && "rotate-180")}
              />
            </button>
            {open ? (
              <p className="animate-eh-fade px-6 pb-6 text-[0.95rem] leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
