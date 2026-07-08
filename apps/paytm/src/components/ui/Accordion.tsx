import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/cn";

export interface AccordionItem {
  id: string;
  title: string;
  body: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/** Plus/minus accordion used for FAQs and footer link groups. */
export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("divide-y divide-hairline rounded-2xl border border-hairline bg-card", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${item.id}-panel`}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink hover:text-paytm-navy"
            >
              {item.title}
              {open ? (
                <Minus aria-hidden="true" className="h-4 w-4 shrink-0 text-paytm-cyan" />
              ) : (
                <Plus aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-faint" />
              )}
            </button>
            {open ? (
              <div id={`${item.id}-panel`} className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
