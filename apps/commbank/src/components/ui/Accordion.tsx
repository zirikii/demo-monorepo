import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

export function Accordion({
  items,
  className,
  defaultOpenId,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
                className="focus-cba flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-bold text-ink hover:text-ink-soft"
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")}
                />
              </button>
            </h3>
            {open ? (
              <div className="animate-fade-in pb-5 text-[15px] leading-relaxed text-ink-soft">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
