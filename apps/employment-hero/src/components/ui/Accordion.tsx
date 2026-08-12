import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/data/types";

export function Accordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-eh-line rounded-eh-lg border border-eh-line bg-white">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="focus-eh flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-eh-ink">{item.question}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-eh-purple-tint text-eh-purple">
                {open ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            {open ? (
              <p className="px-6 pb-6 text-sm leading-relaxed text-eh-ink-soft">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
