"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export type AccordionItem = { title: string; content: React.ReactNode };

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item, index) => (
        <AccordionPrimitive.Item key={item.title} value={`item-${index}`} className="px-5">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="flex w-full items-center justify-between py-4 text-left text-base font-bold text-optus-ink transition hover:text-optus-teal-dark [&[data-state=open]>svg]:rotate-180">
              {item.title}<ChevronDown className="h-5 w-5 shrink-0 text-optus-teal-dark transition-transform" aria-hidden="true" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"><div className="pb-5 text-sm leading-relaxed text-optus-ink/80">{item.content}</div></AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
