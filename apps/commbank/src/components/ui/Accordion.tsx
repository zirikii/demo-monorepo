import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-card">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-ink hover:bg-surface"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.q}
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-4 text-sm text-ink-soft"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
