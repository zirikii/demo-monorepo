import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col divide-y divide-line rounded-go-lg border border-line bg-white">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="focus-go flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-extrabold text-ink-strong">{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn("h-5 w-5 shrink-0 text-ink-faint transition", open && "rotate-180")}
              />
            </button>
            {open ? (
              <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
