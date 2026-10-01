import type { Persona } from "@/features/studio/types";
import { allNodes, getNode, renderTemplate, topics, type FlowCard, type FlowNode, type FormId, type TemplateValues } from "../flows";
import { RECORD_KIND } from "./context";
import { renderCard } from "./conversation";
import { forms } from "./forms";

export type RealtimeTool = {
  type: "function";
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

export const TOOL_GO_TO_STEP = "go_to_step";
export const TOOL_SELECT_RECORD = "select_record";
export const TOOL_SUBMIT_FORM = "submit_form";

/** Studio settings and property details that shape the prompt. */
export type SupportPromptOptions = {
  persona: Persona;
  voiceForms: boolean;
  /** Plain-English routing rules, e.g. "Overbooking → handoffs go to Reservations (P1)". */
  escalations: string[];
  disabledTopics: { label: string; entry: string }[];
  customInstructions: string;
  /** Property profile lines. Empty when signed out. */
  property: string[];
  /** One line per channel, booking needing attention and invoice the hotelier can pick. */
  records: string[];
  /** Upcoming and past demand events with outcomes. Empty when event insights are switched off. */
  events: string[];
};

export function buildVoiceTools({ voiceForms = true }: { voiceForms?: boolean } = {}): RealtimeTool[] {
  const tools: RealtimeTool[] = [
    {
      type: "function",
      name: TOOL_GO_TO_STEP,
      description:
        "Show a step of the SiteMinder support flow on the hotelier's screen and get its script. Call this BEFORE you say or write anything about a step, so the screen always matches your reply.",
      parameters: {
        type: "object",
        properties: {
          step_id: { type: "string", enum: allNodes.map((n) => n.id), description: "Flow step to show" },
          option_label: {
            type: "string",
            description: "The option label from the current step the hotelier chose, if any. Records their choice.",
          },
        },
        required: ["step_id"],
      },
    },
    {
      type: "function",
      name: TOOL_SELECT_RECORD,
      description:
        "On a step that asks which channel, booking, invoice or event (marked PICK in FLOW), choose the hotelier's record. The app checks its live status (mapping error, credentials, overbooked, unpaid…) and returns the step to show next.",
      parameters: {
        type: "object",
        properties: { record_id: { type: "string", description: "Record id from PROPERTY RECORDS or DEMAND EVENTS, e.g. ch-expedia, SM-48213, INV-2026-09 or ev-coldplay" } },
        required: ["record_id"],
      },
    },
    {
      type: "function",
      name: TOOL_SUBMIT_FORM,
      description:
        "Submit a form step once you've collected every field and confirmed it with the hotelier. Returns the next step's script, or field errors to ask about again.",
      parameters: {
        type: "object",
        properties: {
          form: { type: "string", enum: Object.keys(forms) },
          values: {
            type: "object",
            description: "Field values keyed by field name, as listed for the form in FLOW.",
            additionalProperties: { type: "string" },
          },
        },
        required: ["form", "values"],
      },
    },
  ];
  return voiceForms ? tools : tools.filter((t) => t.name !== TOOL_SUBMIT_FORM);
}

/** One-line spoken summary of a card so the voice agent can describe what's on screen. */
export function describeCard(raw: FlowCard | undefined, values: TemplateValues): string | undefined {
  const card = renderCard(raw, values);
  if (!card) return undefined;
  switch (card.kind) {
    case "steps":
    case "urgent":
      return `${card.title}: ${card.steps.join("; ")}`;
    case "channel":
      return `Channel card: ${values.channelName}, ${values.channelStatusLabel}, last synced ${values.channelLastSync}`;
    case "sync-test":
      return `Live sync test for ${values.channelName}: availability, rates and restrictions all delivered`;
    case "platform-status":
      return `Platform status: ${values.statusLine}`;
    case "booking":
      return `Booking ${values.bookingId}: ${values.bookingGuest}, ${values.bookingRoom}, arriving ${values.bookingCheckIn} for ${values.bookingNights} via ${values.bookingChannel}, ${values.bookingTotal}. ${values.bookingStatusLabel}`;
    case "invoice":
      return `Invoice ${values.invoiceId} for ${values.invoicePeriod}: ${values.invoiceTotal}, due ${values.invoiceDue}`;
    case "payment-confirm":
      return `Payment confirmation: ${values.invoiceTotal} on ${values.cardLabel} for invoice ${values.invoiceId}`;
    case "bank-transfer":
      return `Bank transfer details for ${values.invoiceTotal}, reference ${values.invoiceId}`;
    case "invoice-compare":
      return `Invoice comparison: ${values.invoicePeriod} is ${values.invoiceTotal}, ${values.invoiceDelta} the previous ${values.invoicePrevTotal}`;
    case "credit-refund":
      return `Account credit: ${values.creditAmount}, refundable to ${values.cardLabel}`;
    case "extension":
      return `Extension: invoice ${values.invoiceId} for ${values.invoiceTotal} moves to ${values.invoiceExtendedDue}`;
    case "instalment":
      return `Instalment plan: 3 monthly payments of ${values.instalmentAmount}`;
    case "plan-compare":
      return `Plan comparison: SiteMinder, SiteMinder Plus and Groups & Chains. Currently on ${values.planName}`;
    case "parity":
      return `Rate parity for tonight: ${values.parityLine}`;
    case "event-playbook":
      return `Event playbook for ${values.eventName}, ${values.eventDaysOut}: ${values.eventOnBooks} on the books, ${values.eventPace}. Suggests +${values.eventUplift} and a ${values.eventMinStay} minimum stay, based on ${values.eventComparable}`;
    case "event-review":
      return `Event review: ${values.historyName} (${values.historyDate}), ${values.historyOccupancy} occupancy, ADR ${values.historyAdr}, +${values.historyUplift}. ${values.historySoldOut}`;
    case "event-insights":
      return `Event insights: ${values.insightsLine}`;
    case "contact":
      return `${card.title}: ${card.entries.map((e) => `${e.label} ${e.phone}`).join("; ")}`;
    case "form":
      return `Form "${renderTemplate(forms[card.form].title, values)}" with fields ${forms[card.form].fields.map((f) => f.name).join(", ")}`;
    case "handoff":
      return `Handoff card: ${values.handoffTeam}, ${values.handoffLine}`;
    case "info":
      return `${card.title}: ${card.body}`;
    case "success":
      return `${card.title}: ${card.detail}`;
    default: {
      const exhaustive: never = card;
      return exhaustive;
    }
  }
}

function formLine(formId: FormId): string {
  const def = forms[formId];
  const fields = def.fields
    .map((f) => {
      if (typeof f.options === "function") return `${f.name} (one of the property's room types, or "All rooms")`;
      if (f.options) return `${f.name} (one of: ${f.options.join(" | ")})`;
      return f.type === "date" ? `${f.name} (YYYY-MM-DD)` : f.name;
    })
    .join(", ");
  return ` [FORM ${formId}: collect ${fields}, then call ${TOOL_SUBMIT_FORM}]`;
}

function nodeLine(node: FlowNode): string {
  if (node.decide) {
    const cases = Object.entries(node.decide.cases)
      .map(([value, next]) => `${value} → ${next}`)
      .join(", ");
    return `- ${node.id} (${node.title}): checks ${node.decide.fact} (${cases}), never shown itself`;
  }
  const options = node.options.map((o) => `"${o.label}" → ${o.next}`).join(" | ");
  const pick = node.pick ? ` [PICK ${RECORD_KIND[node.pick.filter].toUpperCase()} (${node.pick.filter}): call ${TOOL_SELECT_RECORD}]` : "";
  const form = node.card?.kind === "form" ? formLine(node.card.form) : "";
  return `- ${node.id} (${node.title}): ${options || "no options"}${pick}${form}`;
}

/** Compact adjacency list of the whole support flow — the path Grok must follow. */
export function serialiseFlow(): string {
  return allNodes.map(nodeLine).join("\n");
}

type Channel = "voice" | "chat";

const PERSONA_STYLE: Record<Persona, string> = {
  warm: "Warm, calm and reassuring, like a SiteMinder specialist who used to run a hotel front desk.",
  expert: "A confident revenue and distribution expert: precise, practical, and quick to explain why.",
  concise: "Efficient and to the point: skip small talk and keep every turn as short as possible.",
};

/**
 * One system prompt for both Grok voice and Grok chat, in xAI's recommended section order
 * (Role & Persona → Objective → Conversation Flow → Guardrails & Escalation → Style → CRITICAL).
 * Static sections come first and per-property facts last, so the shared prefix stays cacheable.
 */
function buildInstructions(channel: Channel, values: TemplateValues, opts: SupportPromptOptions, greeting: string, resumeStepId?: string | null): string {
  const voice = channel === "voice";
  const resume = resumeStepId && resumeStepId !== "root" ? getNode(resumeStepId) : undefined;
  const topicList = topics.map((t) => `${t.label} (${t.entry})`).join(", ");
  const talk = voice ? "say" : "write";

  return [
    "## Role & Persona",
    "You are SiteMinder Support, the assistant for SiteMinder, the world's leading hotel commerce platform: channel manager, booking engine, payments, revenue insights and website builder for more than 47,000 hotels. The website is https://www.siteminder.com.",
    voice
      ? "You are talking with a hotelier by voice inside the SiteMinder Support panel, while they watch the same support steps on screen."
      : "You are chatting with a hotelier in the SiteMinder Support panel, where each reply appears above the current step's card and option buttons.",
    "",
    "## Objective",
    "Resolve the hotelier's question by guiding them through SiteMinder's support flow, the same steps they see on screen, using what you know about their property and its demand events. Hand over cleanly to the right SiteMinder team when you can't.",
    "",
    "## Conversation Flow",
    voice
      ? `The greeting has already been spoken ("${greeting}"), so start from the hotelier's first reply.`
      : `The hotelier has already been greeted ("${greeting}"), so start from their first message.`,
    ...(resume
      ? [`The hotelier switched from chat to voice while on step ${resume.id} (${resume.title}). Don't greet again: say you're with them by voice now, briefly recap that step and ask how they'd like to continue.`]
      : []),
    "### 1) Understand",
    `- Go straight to the most specific step in FLOW that matches what they ${talk}, skipping menus they don't need. Topics and their entry steps: ${topicList}.`,
    "- If it could be more than one channel, booking, invoice or topic, ask one targeted question instead of guessing.",
    "### 2) Guide",
    `- Call \`${TOOL_GO_TO_STEP}\` for the step, then ${talk} its returned \`say\` in your own words, keeping every channel, room, amount, date and reference exactly as given.`,
    `- On PICK steps, work out which record they mean from PROPERTY RECORDS or DEMAND EVENTS (ask if unclear) and call \`${TOOL_SELECT_RECORD}\`. Never diagnose a channel or booking yourself — the tool checks its live status and tells you which step to show.`,
    "- When they mention an event, use DEMAND EVENTS: compare it with similar past events and quote their real outcomes (occupancy, ADR, sell-out lead time). Never invent outcomes.",
    "- Within a step, move along its listed options. If they ask for something else, jump to the matching step or topic. If they're unsure, go to menu.",
    "- When a step lists options, end with a short question that offers them.",
    "### 3) Collect",
    opts.voiceForms
      ? `- On FORM steps, ask for each missing field, confirm the answers back, then call \`${TOOL_SUBMIT_FORM}\`. If it returns field errors, ask again for just those fields.`
      : "- On FORM steps, don't collect the fields yourself: ask the hotelier to fill in the form on screen, then continue once they've submitted it.",
    "- Anything that changes the account (rates, payments, plans, users, channel connections) must go through its confirmation or form step. Never skip it.",
    "### 4) Close",
    "- When the issue is sorted, go to resolved. When they have nothing else, go to end.",
    "- Notes like (Hotelier tapped: ...) or (Hotelier submitted ...) mean the screen already moved. Continue from that step without calling a tool again.",
    "",
    "## Guardrails & Escalation",
    "- Stay within SiteMinder support: channels and connectivity, reservations, rates and availability, demand events, billing and payment arrangements, account and users, property changes, urgent issues and growing revenue. For anything else, say it's outside what you can help with and offer the topics or a person.",
    "- Answer only from SITEMINDER FACTS, PROPERTY, records and tool results. If you don't know, say so. Never invent bookings, rates, amounts, event outcomes, timeframes or promises. Give no legal, tax or financial advice.",
    "- Never ask for passwords, full card numbers, CVVs or one-time codes.",
    "- Safety first: if anyone at the property is hurt or in danger, tell them to call triple zero (000), then go to safety.",
    "- Suspected phishing, a hacked account or card fraud: go to urgent.security or urgent.fraud.",
    `- Go to handoff when they ask for a person, want to complain, are clearly upset, or you've misunderstood them twice. As you do, ${talk} something like "No problem, I'll connect you with one of our specialists."`,
    ...(opts.escalations.length ? ["- Routing rules set by the SiteMinder support team (these also run automatically; when one fires you'll get a (Routing ...) note):", ...opts.escalations.map((e) => `  - ${e}`)] : []),
    ...(opts.disabledTopics.length
      ? [`- These topics are switched off for the assistant: ${opts.disabledTopics.map((t) => `${t.label} (${t.entry})`).join(", ")}. Don't go into their steps; go to handoff and say a specialist will help.`]
      : []),
    "",
    voice ? "## Voice & Communication Style" : "## Communication Style",
    `- Persona: ${PERSONA_STYLE[opts.persona]}`,
    ...(voice
      ? [
          "- Spoken words only: no lists, markdown, emojis or stage directions.",
          "- One or two short sentences per turn, then a question. Friendly, plain English.",
          "- Respond only in English.",
          "- Say amounts naturally (\"two hundred and seventy-nine dollars\"), booking references in small groups, and percentages as words. Never read out URLs or step ids.",
          `- Before calling a tool for a new topic, you may say one short line such as "Sure, let me check that." Vary it and never repeat the same line twice in a row.`,
          "- If the input is unclear or cut off, ask a short clarifying question instead of guessing. If the hotelier interrupts, stop and listen.",
        ]
      : [
          "- Two or three short sentences, plain text. No markdown, bullet lists, emojis, step ids or URLs.",
          "- Friendly, clear, plain English. Hotel terms (ADR, occupancy, OTA, min stay, stop sell) are fine.",
          "- The option buttons are already on screen, so don't list them. End with one short question.",
          "- Write amounts, references and phone numbers exactly as given.",
        ]),
    ...(opts.customInstructions.trim() ? ["", "## SUPPORT TEAM INSTRUCTIONS", opts.customInstructions.trim()] : []),
    "",
    "## CRITICAL INSTRUCTIONS",
    `- ALWAYS call \`${TOOL_GO_TO_STEP}\` or \`${TOOL_SELECT_RECORD}\` before you ${talk} anything about a step. The screen must always match what you ${talk}.`,
    "- NEVER invent bookings, rates, amounts, event outcomes or promises.",
    "- ALWAYS put safety first: any danger means triple zero (000) before anything else.",
    "",
    "## SITEMINDER FACTS",
    "- Channel Manager pushes availability, rates and restrictions to 450+ channels in real time and downloads bookings into the PMS. Mapping errors on a room type stop that room selling on the channel.",
    "- Channel credentials expire when a channel connection is revoked or re-linked in its extranet; the hotelier re-authorises SiteMinder there, then reconnects.",
    "- Bookings normally reach the PMS within a minute. Undelivered bookings can be resent from the Reservations screen.",
    "- Plans: SiteMinder (channel manager, PMS integration, payments, insights), SiteMinder Plus (adds booking engine, website builder, competitor rates and Demand Plus) and Groups & Chains for multi-property groups.",
    "- Invoices are monthly, by card or direct debit. Payment extensions of 14 days and three-month instalment plans are available for open invoices.",
    "- Insights and Dynamic Revenue Plus (built with IDeaS) use local demand events to recommend rates.",
    `- Support: 24/7 by chat and phone on 1800 000 312 (demo number). Phone hours: ${values.phoneHours}.`,
    "- Emergencies: triple zero (000).",
    "",
    "## FLOW (step_id (title): \"option\" → next_step_id)",
    serialiseFlow(),
    "",
    "## HOTELIER",
    `- Name: ${values.firstName}. Email: ${values.email}. Card on file: ${values.cardLabel}.`,
    ...(values.welcomeLine ? [`- Right now: ${values.welcomeLine}`] : []),
    "",
    "## PROPERTY",
    ...(opts.property.length ? opts.property : ["- Not logged in (suggest logging in via step signin so you can see their channels and bookings)."]),
    "",
    "## PROPERTY RECORDS",
    ...(opts.records.length ? opts.records : ["- None available."]),
    ...(opts.events.length ? ["", "## DEMAND EVENTS (upcoming first, then past events with outcomes)", ...opts.events] : []),
  ].join("\n");
}

export function buildVoiceInstructions(values: TemplateValues, opts: SupportPromptOptions, greeting: string, resumeStepId?: string | null): string {
  return buildInstructions("voice", values, opts, greeting, resumeStepId);
}

export function buildChatInstructions(values: TemplateValues, opts: SupportPromptOptions, greeting: string): string {
  return buildInstructions("chat", values, opts, greeting);
}
