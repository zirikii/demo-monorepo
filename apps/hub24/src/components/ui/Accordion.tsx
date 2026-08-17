import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("divide-y divide-line rounded-h24-lg border border-line bg-white", className)}>
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : item.id)}
              className="focus-h24 flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-[1.05rem] font-semibold text-ink-strong">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden
                className={cn("h-5 w-5 shrink-0 text-h24-teal transition", expanded && "rotate-180")}
              />
            </button>
            {expanded ? (
              <div className="px-5 pb-5 text-[0.95rem] leading-relaxed text-ink-soft">{item.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
