import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Accordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-go-line border-y border-go-line">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="focus-go flex w-full items-center justify-between gap-4 py-4 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="font-semibold">{item.q}</span>
              <ChevronDown className={cn("shrink-0 transition", expanded && "rotate-180")} size={18} />
            </button>
            {expanded ? <p className="pb-4 text-sm text-go-muted">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
