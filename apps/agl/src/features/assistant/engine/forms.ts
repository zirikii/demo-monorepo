import { z } from "zod";
import type { FormId, TemplateValues } from "../flows";

export const CONCESSION_TYPES = [
  "Pensioner Concession Card",
  "Health Care Card",
  "DVA Gold Card",
  "Commonwealth Seniors Health Card",
] as const;

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  options?: readonly string[];
  inputMode?: "numeric" | "text";
};

export type FormDefinition = {
  id: FormId;
  title: string;
  submitLabel: string;
  fields: FormField[];
  schema: z.ZodType<Record<string, string>>;
  /** Facts recorded for later flow steps, plus the user bubble shown after submitting. */
  toFacts: (values: Record<string, string>) => TemplateValues;
  summarise: (values: Record<string, string>) => string;
};

const address = z.string().trim().min(8, "Enter a full street address");

export const forms: Record<FormId, FormDefinition> = {
  "meter-read": {
    id: "meter-read",
    title: "Gas meter read",
    submitLabel: "Submit read",
    fields: [{ name: "reading", label: "Meter reading", placeholder: "e.g. 08421", inputMode: "numeric" }],
    schema: z.object({
      reading: z.string().trim().regex(/^\d{3,6}$/, "Enter 3–6 digits, ignoring red numbers"),
    }),
    toFacts: (v) => ({ meterRead: v.reading ?? "" }),
    summarise: (v) => `My gas meter reads ${v.reading}`,
  },
  "mailing-address": {
    id: "mailing-address",
    title: "New mailing address",
    submitLabel: "Update address",
    fields: [{ name: "address", label: "Mailing address", placeholder: "PO Box 118, Newtown NSW 2042" }],
    schema: z.object({ address }),
    toFacts: (v) => ({ newMailingAddress: v.address ?? "" }),
    summarise: (v) => `Please send my mail to ${v.address}`,
  },
  concession: {
    id: "concession",
    title: "Concession card",
    submitLabel: "Add card",
    fields: [
      { name: "cardType", label: "Card type", options: CONCESSION_TYPES },
      { name: "cardNumber", label: "Card number", placeholder: "e.g. 123 456 789A" },
    ],
    schema: z.object({
      cardType: z.enum(CONCESSION_TYPES, { errorMap: () => ({ message: "Choose a card type" }) }),
      cardNumber: z
        .string()
        .trim()
        .regex(/^[0-9A-Za-z ]{8,14}$/, "Enter the number as it appears on your card"),
    }),
    toFacts: (v) => ({ concessionType: v.cardType ?? "", concessionNumber: v.cardNumber ?? "" }),
    summarise: (v) => `Add my ${v.cardType} (${v.cardNumber})`,
  },
  "move-request": {
    id: "move-request",
    title: "Your move",
    submitLabel: "Book my move",
    fields: [
      { name: "newAddress", label: "New address", placeholder: "8 Wattle Avenue, Marrickville NSW 2204" },
      { name: "moveDate", label: "Move-in date", options: ["Friday 2 October", "Saturday 3 October", "Monday 5 October", "Friday 9 October"] },
    ],
    schema: z.object({
      newAddress: address,
      moveDate: z.string().trim().min(3, "Choose your move-in date"),
    }),
    toFacts: (v) => ({ newAddress: v.newAddress ?? "", moveDate: v.moveDate ?? "" }),
    summarise: (v) => `I'm moving to ${v.newAddress} on ${v.moveDate}`,
  },
};

export type FormResult =
  | { ok: true; facts: TemplateValues; summary: string }
  | { ok: false; errors: Record<string, string> };

export function validateForm(id: FormId, values: Record<string, unknown>): FormResult {
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
  return { ok: true, facts: def.toFacts(parsed.data), summary: def.summarise(parsed.data) };
}
