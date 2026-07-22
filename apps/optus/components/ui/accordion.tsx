"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Accordion({
  items,
  className,
}: {
  items: { id: string; title: string; content: React.ReactNode }[];
  className?: string;
}) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn("w-full", className)}>
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id} className="border-b border-line">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-optus-ink transition hover:text-optus-teal [&[data-state=open]>svg]:rotate-180">
              {item.title}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-optus-teal transition-transform"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="pb-5 text-sm leading-relaxed text-optus-ink-soft">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
