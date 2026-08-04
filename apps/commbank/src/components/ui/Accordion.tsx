import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type AccordionItem = { id: string; title: string; content: ReactNode };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id} id={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="focus-ring flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-black"
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")}
                />
              </button>
            </h3>
            {open ? (
              <div id={panelId} className="pb-5 text-sm leading-relaxed text-ink-soft">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
