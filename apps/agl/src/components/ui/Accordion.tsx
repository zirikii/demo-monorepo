import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id: string; title: string; content: ReactNode };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const base = useId();
  return (
    <div className={cn("divide-y divide-line rounded-agl-lg border border-line bg-white", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${base}-${item.id}`;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-ink hover:text-agl-blue"
            >
              {item.title}
              <ChevronDown aria-hidden="true" className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")} />
            </button>
            <div id={panelId} hidden={!open} className="px-5 pb-5 text-ink-soft">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
