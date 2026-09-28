import type { FlowNode } from "./types";

export const supportNodes: FlowNode[] = [
  {
    id: "support",
    topic: "support",
    title: "Payment support",
    say: "Thanks for letting us know. Life doesn't always go to plan, and there are a few ways we can help. What would suit you best?",
    options: [
      { label: "A bit more time to pay", next: "support.extension" },
      { label: "Pay in smaller instalments", next: "support.instalment" },
      { label: "Concessions and rebates", next: "support.rebates" },
      { label: "Ongoing hardship support", next: "support.hardship" },
    ],
    keywords: ["can't pay", "cannot pay", "struggling", "financial hardship", "hardship", "help paying", "financial support", "afford"],
  },
  {
    id: "support.extension",
    topic: "support",
    title: "Payment extension",
    say: "I can extend your electricity bill of {elecAmount} from {elecDue} to {extendedDue}, with no fees. Would that help?",
    card: { kind: "extension" },
    options: [
      { label: "Yes, extend it", next: "support.extension.done" },
      { label: "I'd rather pay in instalments", next: "support.instalment" },
    ],
    keywords: ["more time to pay", "payment extension", "extension", "extend my bill", "pay later", "delay payment"],
  },
  {
    id: "support.extension.done",
    topic: "support",
    title: "Extension confirmed",
    say: "Done. Your new due date is {extendedDue}. We'll send you a reminder a few days before.",
    card: { kind: "success", title: "Extension confirmed", detail: "{elecAmount} · New due date {extendedDue} · No fees" },
    options: [{ label: "Thank you", next: "resolved" }],
  },
  {
    id: "support.instalment",
    topic: "support",
    title: "Instalment plan",
    say: "An instalment plan splits your {totalDue} balance into smaller payments before your next bill. How often would you like to pay?",
    card: { kind: "instalment" },
    options: [
      { label: "Weekly", next: "support.instalment.done", set: { instalmentFrequency: "weekly", instalmentAmount: "$58.35" } },
      { label: "Fortnightly", next: "support.instalment.done", set: { instalmentFrequency: "fortnightly", instalmentAmount: "$116.69" } },
      { label: "Monthly", next: "support.instalment.done", set: { instalmentFrequency: "monthly", instalmentAmount: "$233.38" } },
    ],
    keywords: ["instalment", "instalments", "installment", "payment plan", "payment arrangement", "smaller payments", "split my bill"],
  },
  {
    id: "support.instalment.done",
    topic: "support",
    title: "Instalments set up",
    say: "All set. You'll pay {instalmentAmount} {instalmentFrequency} from your {bankAccount}, starting this Friday.",
    card: { kind: "success", title: "Instalment plan active", detail: "{instalmentAmount} {instalmentFrequency} · {bankAccount} · Starts Friday" },
    options: [{ label: "Thanks", next: "resolved" }],
  },
  {
    id: "support.rebates",
    topic: "support",
    title: "Concessions & rebates",
    say: "You're receiving the Energy Bill Relief Fund rebate as a quarterly credit on your electricity bill. If you hold a pension, health care or seniors card, you may also be eligible for state concessions.",
    card: {
      kind: "steps",
      title: "Support you may be eligible for",
      steps: [
        "Energy Bill Relief Fund — applied automatically each quarter",
        "NSW Low Income Household Rebate — pension or health care card",
        "Medical Energy Rebate — for eligible medical conditions",
        "Life Support Rebate — for approved equipment",
      ],
    },
    options: [
      { label: "Add my concession card", next: "account.concession" },
      { label: "Thanks", next: "resolved" },
    ],
    keywords: ["rebate", "rebates", "energy bill relief", "government rebate", "concessions"],
  },
  {
    id: "support.hardship",
    topic: "support",
    title: "Staying Connected",
    say: "Our Staying Connected team can build a support plan around your situation, including pausing collection, reviewing your plan and energy efficiency help. You can call them directly, or I can connect you now.",
    card: {
      kind: "contact",
      title: "Staying Connected",
      entries: [
        { label: "Staying Connected team", phone: "1300 659 925", note: "Mon–Fri 8am–8pm" },
        { label: "Family and domestic violence support", phone: "1800 737 732", note: "1800RESPECT, 24/7" },
      ],
    },
    options: [
      { label: "Connect me now", next: "handoff" },
      { label: "Thanks, I'll call", next: "resolved" },
    ],
    keywords: ["staying connected", "lost my job", "domestic violence", "family violence"],
  },
];
