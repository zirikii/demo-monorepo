import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-cream-deep rounded-2xl border border-cream-deep bg-card", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-navy hover:bg-cream-alt"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={cn("size-5 shrink-0 transition-transform", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            {isOpen && <p className="px-6 pb-6 leading-relaxed text-ink-soft">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
