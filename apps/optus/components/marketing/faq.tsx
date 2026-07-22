"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
const faqs = [
  {
    question: "Does this connect to Optus systems?",
    answer: "No. The demo uses local JSON seed data and mock route handlers only.",
  },
  {
    question: "Can any credentials sign in?",
    answer: "Yes. Login is intentionally mock so reviewers can explore the protected hub quickly.",
  },
  {
    question: "Where do brand assets live?",
    answer:
      "The logo, white logo, mark, favicon, and asset manifest are committed under public/brand.",
  },
];
export function Faq() {
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-black text-optus-ink">Demo FAQ</h2>
      <Accordion.Root
        type="single"
        collapsible
        className="mt-6 divide-y divide-optus-line rounded-lg border border-optus-line bg-white"
      >
        {faqs.map((faq) => (
          <Accordion.Item value={faq.question} key={faq.question}>
            <Accordion.Trigger className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-optus-ink">
              {faq.question}
              <ChevronDown className="h-4 w-4 text-optus-teal" aria-hidden="true" />
            </Accordion.Trigger>
            <Accordion.Content className="px-5 pb-5 text-sm leading-6 text-optus-muted">
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
