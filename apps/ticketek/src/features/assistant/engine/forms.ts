import { z } from "zod";
import { formatCurrency, pluralise } from "@/lib/format";
import type { FormId, TemplateValues } from "../flows";

export const ACCESS_NEEDS = ["Wheelchair space", "Easy-access seat", "Companion Card", "Hearing loop or Auslan"] as const;
export const TRANSFER_AMOUNTS = ["All tickets in the order", "Just 1 ticket"] as const;
export const UNSUBSCRIBE_CHANNELS = ["Marketing emails", "SMS", "Push notifications", "Everything"] as const;

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  options?: readonly string[];
  inputMode?: "numeric" | "decimal" | "email" | "text";
  /** Template filled from the conversation, e.g. "{email}". */
  prefill?: string;
};

/** What a form can see beyond its own fields: the conversation's facts and the fan's vouchers. */
export type FormContext = { facts: TemplateValues; vouchers: { code: string; balance: number }[] };

export type FormDefinition = {
  id: FormId;
  title: string;
  submitLabel: string;
  fields: FormField[];
  schema: z.ZodType<Record<string, string>>;
  /** Cross-field and policy checks that need the conversation, e.g. the resale price cap. */
  refine?: (values: Record<string, string>, ctx: FormContext) => Record<string, string> | null;
  /** Facts recorded for later flow steps. */
  toFacts: (values: Record<string, string>, ctx: FormContext) => TemplateValues;
  /** The fan's bubble shown after submitting. */
  summarise: (values: Record<string, string>, ctx: FormContext) => string;
};

const email = z.string().trim().email("Enter a valid email address");
const required = (message: string) => z.string().trim().min(2, message);

function normaliseVoucher(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/** Stable reference numbers, so the same request always gets the same ref in tests and replays. */
export function referenceFor(prefix: string, values: Record<string, string>): string {
  const text = Object.values(values).join("|");
  let hash = 7;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return `${prefix}-${String(hash % 1_000_000).padStart(6, "0")}`;
}

function voucherBalance(code: string, ctx: FormContext): number {
  const key = normaliseVoucher(code);
  const known = ctx.vouchers.find((v) => normaliseVoucher(v.code) === key);
  if (known) return known.balance;
  let hash = 0;
  for (const ch of key) hash = (hash * 17 + ch.charCodeAt(0)) % 997;
  return [25, 40, 50, 60, 100, 150][hash % 6]!;
}

export const forms: Record<FormId, FormDefinition> = {
  "resend-tickets": {
    id: "resend-tickets",
    title: "Resend my tickets",
    submitLabel: "Resend",
    fields: [{ name: "email", label: "Send to", inputMode: "email", prefill: "{email}" }],
    schema: z.object({ email }),
    toFacts: (v) => ({ resendEmail: v.email ?? "" }),
    summarise: (v) => `Please resend my tickets to ${v.email}`,
  },
  "transfer-tickets": {
    id: "transfer-tickets",
    title: "Transfer to a friend",
    submitLabel: "Send tickets",
    fields: [
      { name: "friendName", label: "Friend's name", placeholder: "Sam Taylor" },
      { name: "friendEmail", label: "Their Ticketek email", placeholder: "sam@example.com", inputMode: "email" },
      { name: "amount", label: "How many", options: TRANSFER_AMOUNTS },
    ],
    schema: z.object({
      friendName: required("Enter your friend's name"),
      friendEmail: email,
      amount: z.enum(TRANSFER_AMOUNTS, { errorMap: () => ({ message: "Choose how many tickets" }) }),
    }),
    refine: (v, ctx) => (v.friendEmail?.toLowerCase() === ctx.facts.email?.toLowerCase() ? { friendEmail: "That's your own email — enter your friend's" } : null),
    toFacts: (v, ctx) => {
      const count = v.amount === "Just 1 ticket" ? 1 : Math.max(1, Number(ctx.facts.orderTickets) || 1);
      return {
        friendName: v.friendName ?? "",
        friendEmail: v.friendEmail ?? "",
        transferCount: pluralise(count, "ticket"),
        transferQuantity: String(count),
      };
    },
    summarise: (v) => `Send ${v.amount === "Just 1 ticket" ? "1 ticket" : "all my tickets"} to ${v.friendName} (${v.friendEmail})`,
  },
  "resale-price": {
    id: "resale-price",
    title: "Your Marketplace price",
    submitLabel: "List tickets",
    fields: [{ name: "price", label: "Price per ticket (AUD)", placeholder: "e.g. 95.00", inputMode: "decimal" }],
    schema: z.object({ price: z.string().trim().regex(/^\$?\d{1,4}(\.\d{1,2})?$/, "Enter a price like 95 or 95.50") }),
    refine: (v, ctx) => {
      const price = Number((v.price ?? "").replace("$", ""));
      const cap = Number(ctx.facts.orderFaceValue);
      if (price < 1) return { price: "Enter at least $1" };
      if (cap > 0 && price > cap) return { price: `Marketplace caps resale at the original price of ${formatCurrency(cap)}` };
      return null;
    },
    toFacts: (v) => {
      const price = Number((v.price ?? "").replace("$", ""));
      return { resalePrice: formatCurrency(price), resaleAmount: String(price) };
    },
    summarise: (v) => `List them at ${formatCurrency(Number((v.price ?? "").replace("$", "")))} each`,
  },
  "accessible-booking": {
    id: "accessible-booking",
    title: "Accessible booking request",
    submitLabel: "Send request",
    fields: [
      { name: "event", label: "Event", placeholder: "e.g. Swan Lake, Sydney" },
      { name: "need", label: "What you need", options: ACCESS_NEEDS },
      { name: "quantity", label: "Tickets", options: ["1", "2", "3", "4"] },
    ],
    schema: z.object({
      event: required("Tell us which event"),
      need: z.enum(ACCESS_NEEDS, { errorMap: () => ({ message: "Choose what you need" }) }),
      quantity: z.enum(["1", "2", "3", "4"], { errorMap: () => ({ message: "Choose how many tickets" }) }),
    }),
    toFacts: (v) => ({
      accessEvent: v.event ?? "",
      accessNeed: v.need ?? "",
      accessQuantity: pluralise(Number(v.quantity), "ticket"),
      requestRef: referenceFor("ACC", v),
    }),
    summarise: (v) => `${v.need} for ${v.event}, ${pluralise(Number(v.quantity), "ticket")}`,
  },
  "group-enquiry": {
    id: "group-enquiry",
    title: "Group enquiry",
    submitLabel: "Send enquiry",
    fields: [
      { name: "event", label: "Event", placeholder: "e.g. MJ The Musical" },
      { name: "size", label: "Group size", placeholder: "10 or more", inputMode: "numeric" },
      { name: "date", label: "Preferred date", placeholder: "e.g. a Saturday in March" },
    ],
    schema: z.object({
      event: required("Tell us which event"),
      size: z
        .string()
        .trim()
        .regex(/^\d{1,4}$/, "Enter a number")
        .refine((s) => Number(s) >= 10, "Group bookings start at 10 people"),
      date: required("Tell us roughly when"),
    }),
    toFacts: (v) => ({ groupEvent: v.event ?? "", groupSize: v.size ?? "", groupDate: v.date ?? "", requestRef: referenceFor("GRP", v) }),
    summarise: (v) => `A group of ${v.size} for ${v.event}, ${v.date}`,
  },
  "voucher-balance": {
    id: "voucher-balance",
    title: "Check a gift voucher",
    submitLabel: "Check balance",
    fields: [{ name: "code", label: "Voucher code", placeholder: "GV-XXXX-XXXX" }],
    schema: z.object({
      code: z
        .string()
        .trim()
        .refine((s) => /^GV[A-Z0-9]{8}$/.test(normaliseVoucher(s)), "Codes look like GV-7F3K-92QD"),
    }),
    toFacts: (v, ctx) => {
      const key = normaliseVoucher(v.code ?? "");
      return { voucherCode: `${key.slice(0, 2)}-${key.slice(2, 6)}-${key.slice(6)}`, voucherBalance: formatCurrency(voucherBalance(key, ctx)) };
    },
    summarise: (v) => `My voucher code is ${(v.code ?? "").toUpperCase()}`,
  },
  "data-erasure": {
    id: "data-erasure",
    title: "Delete my personal data",
    submitLabel: "Lodge request",
    fields: [
      { name: "email", label: "Account email", inputMode: "email", prefill: "{email}" },
      { name: "confirm", label: "Confirm", options: ["Yes, delete my data and close my account"] },
    ],
    schema: z.object({
      email,
      confirm: z.literal("Yes, delete my data and close my account", { errorMap: () => ({ message: "Please confirm" }) }),
    }),
    toFacts: (v) => ({ requestRef: referenceFor("PRV", { email: v.email ?? "" }) }),
    summarise: (v) => `Please delete my data for ${v.email}`,
  },
  unsubscribe: {
    id: "unsubscribe",
    title: "Unsubscribe",
    submitLabel: "Update preferences",
    fields: [{ name: "channel", label: "Stop sending me", options: UNSUBSCRIBE_CHANNELS }],
    schema: z.object({ channel: z.enum(UNSUBSCRIBE_CHANNELS, { errorMap: () => ({ message: "Choose what to stop" }) }) }),
    toFacts: (v) => ({ unsubscribeChannel: v.channel === "Everything" ? "all Ticketek marketing" : (v.channel ?? "").toLowerCase() }),
    summarise: (v) => `Unsubscribe me from ${v.channel === "Everything" ? "everything" : (v.channel ?? "").toLowerCase()}`,
  },
};

export type FormResult =
  | { ok: true; facts: TemplateValues; summary: string }
  | { ok: false; errors: Record<string, string> };

export function validateForm(id: FormId, values: Record<string, unknown>, ctx: FormContext): FormResult {
  const def = forms[id];
  const parsed = def.schema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { ok: false, errors };
  }
  const refined = def.refine?.(parsed.data, ctx);
  if (refined) return { ok: false, errors: refined };
  return { ok: true, facts: def.toFacts(parsed.data, ctx), summary: def.summarise(parsed.data, ctx) };
}
