import { z } from "zod";
import { formatShortDate, pluralise } from "@/lib/format";
import type { FormId, TemplateValues } from "../flows";

export const RATE_NIGHTS = ["1 night", "3 nights", "7 nights", "14 nights", "30 nights"] as const;
export const MIN_STAYS = ["1", "2", "3", "4"] as const;
export const EVENT_CATEGORIES = [
  "Concert",
  "Sport",
  "Festival",
  "Conference",
  "Theatre",
  "Holiday",
] as const;
export const INVITE_ROLES = ["Admin", "Revenue", "Front desk", "Read only"] as const;
export const PMS_OPTIONS = [
  "Mews",
  "Cloudbeds",
  "Oracle OPERA Cloud",
  "RMS Cloud",
  "Little Hotelier",
  "Apaleo",
  "Protel",
] as const;
export const GO_LIVE = ["As soon as possible", "Next week", "Next month"] as const;
export const GROWTH_PRODUCTS = [
  "Demand Plus",
  "Dynamic Revenue Plus",
  "Website Builder",
  "Guest Engagement",
  "Not sure yet",
] as const;
export const CALLBACK_TIMES = ["This afternoon", "Tomorrow morning", "Tomorrow afternoon"] as const;

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  options?: readonly string[] | ((ctx: FormContext) => readonly string[]);
  inputMode?: "numeric" | "decimal" | "email" | "text" | "tel";
  type?: "date";
  /** Template filled from the conversation, e.g. "{billingEmail}". */
  prefill?: string;
  hint?: string;
};

/** What a form can see beyond its own fields: the conversation's facts and the property's setup. */
export type FormContext = {
  facts: TemplateValues;
  rooms: string[];
  teamEmails: string[];
  today: string;
};

export type FormDefinition = {
  id: FormId;
  title: string;
  submitLabel: string;
  fields: FormField[];
  schema: z.ZodType<Record<string, string>>;
  /** Cross-field and policy checks that need the conversation, e.g. a duplicate invite. */
  refine?: (values: Record<string, string>, ctx: FormContext) => Record<string, string> | null;
  /** Facts recorded for later flow steps. */
  toFacts: (values: Record<string, string>, ctx: FormContext) => TemplateValues;
  /** The hotelier's bubble shown after submitting. */
  summarise: (values: Record<string, string>, ctx: FormContext) => string;
};

export function optionsFor(field: FormField, ctx: FormContext): readonly string[] | undefined {
  return typeof field.options === "function" ? field.options(ctx) : field.options;
}

const email = z.string().trim().email("Enter a valid email address");
const required = (message: string) => z.string().trim().min(2, message);
const isoDate = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date");
const choice = <T extends readonly [string, ...string[]]>(values: T, message: string) =>
  z.enum(values, { errorMap: () => ({ message }) });

/** Stable reference numbers, so the same request always gets the same ref in tests and replays. */
export function referenceFor(prefix: string, values: Record<string, string>): string {
  const text = Object.values(values).join("|");
  let hash = 7;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return `${prefix}-${String(hash % 1_000_000).padStart(6, "0")}`;
}

/** "+10%" → "up 10%", "-$20" → "down $20", "$289" → "set to $289". */
export function describeRateChange(raw: string): string | null {
  const text = raw.trim().replace(/\s+/g, "");
  const match = /^([+-])?(\$)?(\d{1,4}(?:\.\d{1,2})?)(%)?$/.exec(text);
  if (!match) return null;
  const [, sign, dollar, amount, percent] = match;
  if (dollar && percent) return null;
  if (percent && Number(amount) > 90) return null;
  const value = percent ? `${amount}%` : `$${amount}`;
  if (sign === "+") return `up ${value}`;
  if (sign === "-") return `down ${value}`;
  return percent ? `up ${value}` : `set to ${value}`;
}

export const forms: Record<FormId, FormDefinition> = {
  "channel-credentials": {
    id: "channel-credentials",
    title: "Reconnect {channelName}",
    submitLabel: "Reconnect",
    fields: [
      {
        name: "listingId",
        label: "{channelName} property ID",
        placeholder: "e.g. 4482917",
        inputMode: "numeric",
        hint: "Find it in the {channelName} extranet under Property settings.",
      },
      {
        name: "confirm",
        label: "Re-authorised in the extranet?",
        options: ["Yes, I've re-authorised SiteMinder"],
      },
    ],
    schema: z.object({
      listingId: z
        .string()
        .trim()
        .regex(/^[A-Za-z0-9-]{5,14}$/, "Property IDs are 5 to 14 letters or numbers"),
      confirm: z.literal("Yes, I've re-authorised SiteMinder", {
        errorMap: () => ({ message: "Re-authorise SiteMinder in the extranet first" }),
      }),
    }),
    toFacts: (v) => ({ credListingId: v.listingId ?? "" }),
    summarise: (v, ctx) =>
      `I've re-authorised SiteMinder in ${ctx.facts.channelName ?? "the extranet"}. Property ID ${v.listingId}`,
  },
  "bulk-rates": {
    id: "bulk-rates",
    title: "Bulk rate update",
    submitLabel: "Send to all channels",
    fields: [
      { name: "room", label: "Rooms", options: (ctx) => ["All rooms", ...ctx.rooms] },
      {
        name: "change",
        label: "Change",
        placeholder: "+10%, -$20 or $289",
        hint: "A percentage or dollar change, or a new nightly rate.",
      },
      { name: "from", label: "From", type: "date", prefill: "{today}" },
      { name: "nights", label: "For", options: RATE_NIGHTS },
    ],
    schema: z.object({
      room: required("Choose which rooms"),
      change: z.string().trim().min(1, "Enter a change"),
      from: isoDate,
      nights: choice(RATE_NIGHTS, "Choose how many nights"),
    }),
    refine: (v, ctx): Record<string, string> | null => {
      if (!describeRateChange(v.change ?? ""))
        return { change: "Try +10%, -$20 or a nightly rate like $289" };
      if ((v.from ?? "") < ctx.today) return { from: "Choose today or a future date" };
      return null;
    },
    toFacts: (v) => ({
      rateRoom: v.room ?? "All rooms",
      rateChange: describeRateChange(v.change ?? "") ?? "",
      rateFrom: formatShortDate(v.from ?? ""),
      rateFromDate: v.from ?? "",
      rateNights: v.nights ?? "7 nights",
      rateRef: referenceFor("RC", v),
    }),
    summarise: (v) =>
      `${v.room} ${describeRateChange(v.change ?? "")} from ${formatShortDate(v.from ?? "")} for ${v.nights}`,
  },
  "event-pricing": {
    id: "event-pricing",
    title: "Event pricing for {eventName}",
    submitLabel: "Apply to all channels",
    fields: [
      {
        name: "uplift",
        label: "Rate uplift (%)",
        inputMode: "numeric",
        prefill: "{eventUpliftValue}",
        hint: "Suggested from your past events like this one.",
      },
      {
        name: "minStay",
        label: "Minimum stay (nights)",
        options: MIN_STAYS,
        prefill: "{eventMinStayValue}",
      },
    ],
    schema: z.object({
      uplift: z
        .string()
        .trim()
        .regex(/^\d{1,2}$/, "Enter a whole percentage")
        .refine((s) => Number(s) >= 1 && Number(s) <= 80, "Keep the uplift between 1% and 80%"),
      minStay: choice(MIN_STAYS, "Choose a minimum stay"),
    }),
    toFacts: (v) => ({
      planUplift: v.uplift ?? "0",
      planMinStay: v.minStay ?? "1",
      planUpliftLabel: `${v.uplift}%`,
      planMinStayLabel: `${v.minStay}-night`,
    }),
    summarise: (v, ctx) =>
      `Apply +${v.uplift}% with a ${v.minStay}-night minimum for ${ctx.facts.eventName ?? "the event"}`,
  },
  "add-event": {
    id: "add-event",
    title: "Add a demand event",
    submitLabel: "Add to calendar",
    fields: [
      { name: "name", label: "Event", placeholder: "e.g. Coldplay at Accor Stadium" },
      { name: "date", label: "Date", type: "date" },
      { name: "venue", label: "Venue", placeholder: "e.g. ICC Sydney" },
      { name: "category", label: "Type", options: EVENT_CATEGORIES },
      { name: "crowd", label: "Expected crowd", placeholder: "e.g. 40000", inputMode: "numeric" },
    ],
    schema: z.object({
      name: required("Tell us the event"),
      date: isoDate,
      venue: required("Tell us the venue"),
      category: choice(EVENT_CATEGORIES, "Choose a type"),
      crowd: z
        .string()
        .trim()
        .regex(/^\d{2,6}$/, "Enter a number, e.g. 40000"),
    }),
    refine: (v, ctx) =>
      (v.date ?? "") < ctx.today
        ? { date: "Choose a future date. Past events come from your history." }
        : null,
    toFacts: (v) => ({
      newEventName: v.name ?? "",
      newEventDate: v.date ?? "",
      newEventDateLabel: formatShortDate(v.date ?? ""),
      newEventVenue: v.venue ?? "",
      newEventCategory: (v.category ?? "").toLowerCase(),
      newEventCrowd: v.crowd ?? "",
    }),
    summarise: (v) => `Add ${v.name} at ${v.venue} on ${formatShortDate(v.date ?? "")}`,
  },
  "add-user": {
    id: "add-user",
    title: "Invite a user",
    submitLabel: "Send invitation",
    fields: [
      { name: "name", label: "Name", placeholder: "Alex Chen" },
      {
        name: "email",
        label: "Work email",
        placeholder: "alex@harbourlane.com.au",
        inputMode: "email",
      },
      { name: "role", label: "Role", options: INVITE_ROLES },
    ],
    schema: z.object({
      name: required("Enter their name"),
      email,
      role: choice(INVITE_ROLES, "Choose a role"),
    }),
    refine: (v, ctx) =>
      ctx.teamEmails.some((e) => e.toLowerCase() === v.email?.trim().toLowerCase())
        ? { email: "That person already has access" }
        : null,
    toFacts: (v) => ({
      newUserName: v.name ?? "",
      newUserEmail: (v.email ?? "").trim(),
      newUserRole: v.role ?? "",
    }),
    summarise: (v) => `Invite ${v.name} (${v.email}) as ${v.role}`,
  },
  "billing-details": {
    id: "billing-details",
    title: "Billing details",
    submitLabel: "Save details",
    fields: [
      { name: "email", label: "Invoice email", inputMode: "email", prefill: "{billingEmail}" },
      { name: "abn", label: "ABN", inputMode: "numeric", prefill: "{billingAbn}" },
    ],
    schema: z.object({
      email,
      abn: z
        .string()
        .trim()
        .refine((s) => /^\d{11}$/.test(s.replace(/\s/g, "")), "ABNs are 11 digits"),
    }),
    toFacts: (v) => {
      const digits = (v.abn ?? "").replace(/\s/g, "");
      return {
        billingEmail: (v.email ?? "").trim(),
        billingAbn: `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`,
      };
    },
    summarise: (v) => `Send invoices to ${v.email}, ABN ${v.abn}`,
  },
  "add-property": {
    id: "add-property",
    title: "Add a property",
    submitLabel: "Start onboarding",
    fields: [
      { name: "name", label: "Property name", placeholder: "e.g. The Harbour Lane Melbourne" },
      { name: "city", label: "City", placeholder: "e.g. Melbourne" },
      { name: "rooms", label: "Rooms", placeholder: "e.g. 64", inputMode: "numeric" },
    ],
    schema: z.object({
      name: required("Enter the property name"),
      city: required("Enter the city"),
      rooms: z
        .string()
        .trim()
        .regex(/^\d{1,4}$/, "Enter a number")
        .refine((s) => Number(s) >= 1, "At least 1 room"),
    }),
    toFacts: (v) => ({
      newPropertyName: v.name ?? "",
      newPropertyCity: v.city ?? "",
      newPropertyRooms: v.rooms ?? "",
      requestRef: referenceFor("ONB", v),
    }),
    summarise: (v) => `Add ${v.name} in ${v.city}, ${pluralise(Number(v.rooms), "room")}`,
  },
  "switch-pms": {
    id: "switch-pms",
    title: "Switch PMS",
    submitLabel: "Book the switch",
    fields: [
      { name: "pms", label: "New PMS", options: PMS_OPTIONS },
      { name: "when", label: "Go live", options: GO_LIVE },
    ],
    schema: z.object({
      pms: choice(PMS_OPTIONS, "Choose your new PMS"),
      when: choice(GO_LIVE, "Choose when"),
    }),
    refine: (v, ctx) => (v.pms === ctx.facts.pms ? { pms: `You're already on ${v.pms}` } : null),
    toFacts: (v) => ({
      newPms: v.pms ?? "",
      pmsGoLive: (v.when ?? "").toLowerCase(),
      requestRef: referenceFor("PMS", v),
    }),
    summarise: (v) => `Move us to ${v.pms}, ${(v.when ?? "").toLowerCase()}`,
  },
  "growth-callback": {
    id: "growth-callback",
    title: "Book a growth callback",
    submitLabel: "Book callback",
    fields: [
      {
        name: "product",
        label: "Interested in",
        options: GROWTH_PRODUCTS,
        prefill: "{growthInterest}",
      },
      {
        name: "phone",
        label: "Best number",
        placeholder: "02 9000 0000",
        inputMode: "tel",
        prefill: "{phone}",
      },
      { name: "time", label: "When", options: CALLBACK_TIMES },
    ],
    schema: z.object({
      product: choice(GROWTH_PRODUCTS, "Choose a product"),
      phone: z
        .string()
        .trim()
        .refine(
          (s) => /^(\+?61|0)[2-478]\d{8}$/.test(s.replace(/[\s()-]/g, "")),
          "Enter an Australian phone number",
        ),
      time: choice(CALLBACK_TIMES, "Choose a time"),
    }),
    toFacts: (v) => ({
      growthProduct: v.product === "Not sure yet" ? "growing revenue" : (v.product ?? ""),
      callbackPhone: (v.phone ?? "").trim(),
      callbackTime: (v.time ?? "").toLowerCase(),
      requestRef: referenceFor("GRW", v),
    }),
    summarise: (v) =>
      `Call me on ${v.phone} ${(v.time ?? "").toLowerCase()} about ${v.product === "Not sure yet" ? "growing revenue" : v.product}`,
  },
};

export type FormResult =
  | { ok: true; facts: TemplateValues; summary: string }
  | { ok: false; errors: Record<string, string> };

export function validateForm(
  id: FormId,
  values: Record<string, unknown>,
  ctx: FormContext,
): FormResult {
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
  return {
    ok: true,
    facts: def.toFacts(parsed.data, ctx),
    summary: def.summarise(parsed.data, ctx),
  };
}
