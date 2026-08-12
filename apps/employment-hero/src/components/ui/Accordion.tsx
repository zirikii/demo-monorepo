import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line rounded-eh-lg border border-line bg-white">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="focus-eh flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-semibold text-ink">{item.q}</span>
              <ChevronDown aria-hidden="true" className={cn("h-5 w-5 shrink-0 text-ink-faint transition", isOpen && "rotate-180")} />
            </button>
            {isOpen ? <p className="px-5 pb-4 text-[15px] leading-relaxed text-ink-soft">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
