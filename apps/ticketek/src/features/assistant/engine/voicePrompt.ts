import type { Persona } from "@/features/studio/types";
import { allNodes, getNode, topics, type FlowCard, type FlowNode, type FormId, type TemplateValues } from "../flows";
import { renderCard } from "./conversation";
import { forms } from "./forms";

export type RealtimeTool = {
  type: "function";
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

export const TOOL_GO_TO_STEP = "go_to_step";
export const TOOL_SELECT_ORDER = "select_order";
export const TOOL_SUBMIT_FORM = "submit_form";

/** Studio settings and fan details that shape the prompt. */
export type SupportPromptOptions = {
  persona: Persona;
  voiceForms: boolean;
  /** Plain-English routing rules, e.g. "Fan says scammed → hand off to Customer Relations (P1)". */
  escalations: string[];
  disabledTopics: { label: string; entry: string }[];
  customInstructions: string;
  /** One line per order the fan can pick. */
  orders: string[];
  /** One line per past event, most recent first. Empty when history is switched off. */
  history: string[];
};

export function buildVoiceTools({ voiceForms = true }: { voiceForms?: boolean } = {}): RealtimeTool[] {
  const tools: RealtimeTool[] = [
    {
      type: "function",
      name: TOOL_GO_TO_STEP,
      description:
        "Show a step of the Ticketek support flow on the fan's screen and get its script. Call this BEFORE you say or write anything about a step, so the screen always matches your reply.",
      parameters: {
        type: "object",
        properties: {
          step_id: { type: "string", enum: allNodes.map((n) => n.id), description: "Flow step to show" },
          option_label: {
            type: "string",
            description: "The option label from the current step the fan chose, if any. Records their choice.",
          },
        },
        required: ["step_id"],
      },
    },
    {
      type: "function",
      name: TOOL_SELECT_ORDER,
      description:
        "On a step that asks which order (marked PICK ORDER in FLOW), choose the fan's order. The app applies Ticketek policy (cancelled, rescheduled, Ticket Protect, delivery method) and returns the step to show next.",
      parameters: {
        type: "object",
        properties: { order_id: { type: "string", description: "Order number from CUSTOMER ORDERS, e.g. TK41882950" } },
        required: ["order_id"],
      },
    },
    {
      type: "function",
      name: TOOL_SUBMIT_FORM,
      description:
        "Submit a form step once you've collected every field and confirmed it with the fan. Returns the next step's script, or field errors to ask about again.",
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
      return `${card.title}: ${card.steps.join("; ")}`;
    case "order":
      return `Order card: ${values.orderEvent} at ${values.orderVenue}, ${values.orderDate}. ${values.orderSeats}, ${values.orderDelivery}. Order ${values.orderId}, ${values.orderTotal}`;
    case "mobile-ticket":
      return `Mobile ticket for ${values.orderEvent}, ${values.orderSeats}. ${values.barcodeLine}`;
    case "refund":
      return card.mode === "auto"
        ? `Refund card: ${values.orderTotal} returning automatically to ${values.cardLabel}`
        : `Refund confirmation: ${values.orderTotal} to ${values.cardLabel}`;
    case "reschedule":
      return `Date change: ${values.orderEvent} moved from ${values.orderOriginalDate} to ${values.orderDate}; refunds close ${values.refundDeadline}`;
    case "event-day":
      return `Event day card: ${values.orderVenue}, gates open ${values.gatesOpen}, starts ${values.orderDate}`;
    case "recommendations":
      return `Recommendations: ${values.recsLine}`;
    case "contact":
      return `${card.title}: ${card.entries.map((e) => `${e.label} ${e.phone}`).join("; ")}`;
    case "form":
      return `Form "${forms[card.form].title}" with fields ${forms[card.form].fields.map((f) => f.name).join(", ")}`;
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
  const fields = def.fields.map((f) => (f.options ? `${f.name} (one of: ${f.options.join(" | ")})` : f.name)).join(", ");
  return ` [FORM ${formId}: collect ${fields}, then call ${TOOL_SUBMIT_FORM}]`;
}

function nodeLine(node: FlowNode): string {
  if (node.decide) {
    const cases = Object.entries(node.decide.cases)
      .map(([value, next]) => `${value} → ${next}`)
      .join(", ");
    return `- ${node.id} (${node.title}): checks ${node.decide.fact} of the chosen order (${cases}), never shown itself`;
  }
  const options = node.options.map((o) => `"${o.label}" → ${o.next}`).join(" | ");
  const pick = node.pick ? ` [PICK ORDER (${node.pick.filter}): call ${TOOL_SELECT_ORDER}]` : "";
  const form = node.card?.kind === "form" ? formLine(node.card.form) : "";
  return `- ${node.id} (${node.title}): ${options || "no options"}${pick}${form}`;
}

/** Compact adjacency list of the whole support flow — the path Grok must follow. */
export function serialiseFlow(): string {
  return allNodes.map(nodeLine).join("\n");
}

type Channel = "voice" | "chat";

const PERSONA_STYLE: Record<Persona, string> = {
  warm: "Warm, friendly and reassuring, like a Ticketek fan who works in support.",
  upbeat: "Upbeat and enthusiastic about live events, while staying clear and helpful.",
  concise: "Efficient and to the point: skip small talk and keep every turn as short as possible.",
};

/**
 * One system prompt for both Grok voice and Grok chat, in xAI's recommended section order
 * (Role & Persona → Objective → Conversation Flow → Guardrails & Escalation → Style → CRITICAL).
 * Static sections come first and per-fan facts last, so the shared prefix stays cacheable.
 */
function buildInstructions(channel: Channel, values: TemplateValues, opts: SupportPromptOptions, greeting: string, resumeStepId?: string | null): string {
  const voice = channel === "voice";
  const resume = resumeStepId && resumeStepId !== "root" ? getNode(resumeStepId) : undefined;
  const topicList = topics.map((t) => `${t.label} (${t.entry})`).join(", ");
  const talk = voice ? "say" : "write";

  return [
    "## Role & Persona",
    "You are Ticketek Support, the assistant for Ticketek Australia, the country's largest ticketing company for concerts, sport, theatre, comedy and family events. The website is https://premier.ticketek.com.au.",
    voice
      ? "You are talking with a fan by voice inside the Ticketek Support panel, while they watch the same support steps on screen."
      : "You are chatting with a fan in the Ticketek Support panel, where each reply appears above the current step's card and option buttons.",
    "",
    "## Objective",
    "Resolve the fan's question by guiding them through Ticketek's support flow, the same steps they see on screen, or hand over cleanly to the Ticketek team when you can't.",
    "",
    "## Conversation Flow",
    voice
      ? `The greeting has already been spoken ("${greeting}"), so start from the fan's first reply.`
      : `The fan has already been greeted ("${greeting}"), so start from their first message.`,
    ...(resume
      ? [`The fan switched from chat to voice while on step ${resume.id} (${resume.title}). Don't greet again: say you're with them by voice now, briefly recap that step and ask how they'd like to continue.`]
      : []),
    "### 1) Understand",
    `- Go straight to the most specific step in FLOW that matches what they ${talk === "say" ? "say" : "write"}, skipping menus they don't need. Topics and their entry steps: ${topicList}.`,
    "- If it could be more than one order or topic, ask one targeted question instead of guessing.",
    "### 2) Guide",
    `- Call \`${TOOL_GO_TO_STEP}\` for the step, then ${talk} its returned \`say\` in your own words, keeping every event, amount, date, seat and number exactly as given.`,
    `- On PICK ORDER steps, work out which order they mean from CUSTOMER ORDERS (ask if unclear) and call \`${TOOL_SELECT_ORDER}\`. Never decide refund, transfer or resale eligibility yourself — the tool applies Ticketek policy and tells you which step to show.`,
    "- Within a step, move along its listed options. If they ask for something else, jump to the matching step or topic. If they're unsure, go to menu.",
    "- When a step lists options, end with a short question that offers them.",
    "### 3) Collect",
    opts.voiceForms
      ? `- On FORM steps, ask for each missing field, confirm the answers back, then call \`${TOOL_SUBMIT_FORM}\`. If it returns field errors, ask again for just those fields.`
      : "- On FORM steps, don't collect the fields yourself: ask the fan to fill in the form on screen, then continue once they've submitted it.",
    "- Anything that changes an order (refunds, transfers, Marketplace listings) must go through its confirmation or form step. Never skip it.",
    "### 4) Close",
    "- When the issue is sorted, go to resolved. When they have nothing else, go to end.",
    "- Notes like (Fan tapped: ...) or (Fan submitted ...) mean the screen already moved. Continue from that step without calling a tool again.",
    "",
    "## Guardrails & Escalation",
    "- Stay within Ticketek support: tickets and delivery, refunds and event changes, transfers, Marketplace resale, accessibility, groups, payments and vouchers, accounts, event-day info and finding events. For anything else, say it's outside what you can help with and offer the topics or a person.",
    "- Answer only from TICKETEK FACTS, CUSTOMER and tool results. If you don't know, say so. Never invent orders, seats, prices, refund amounts, timeframes or promises. Give no legal or financial advice.",
    "- Never ask for passwords, full card numbers or security codes.",
    "- Safety first: if anyone is hurt, unsafe or in danger, tell them to call triple zero (000) and find venue security or first aid, then go to safety.",
    "- Tickets bought from unofficial resellers or social media may be fake: go to tickets.scam.",
    `- Go to handoff when they ask for a person, want to complain, are clearly upset, or you've misunderstood them twice. As you do, ${talk} something like "No worries, I'll connect you with someone from our team."`,
    ...(opts.escalations.length ? ["- Routing rules set by the Ticketek support team (these also run automatically; when one fires you'll get a (Routing ...) note):", ...opts.escalations.map((e) => `  - ${e}`)] : []),
    ...(opts.disabledTopics.length
      ? [`- These topics are switched off for the assistant: ${opts.disabledTopics.map((t) => `${t.label} (${t.entry})`).join(", ")}. Don't go into their steps; go to handoff and say a team member will help.`]
      : []),
    "",
    voice ? "## Voice & Communication Style" : "## Communication Style",
    `- Persona: ${PERSONA_STYLE[opts.persona]}`,
    ...(voice
      ? [
          "- Spoken words only: no lists, markdown, emojis or stage directions.",
          "- One or two short sentences per turn, then a question. Friendly, plain Australian English.",
          "- Respond only in English.",
          "- Say amounts naturally (\"two hundred and sixteen dollars nineteen\"), order numbers in small groups, and phone numbers the way Australians do (\"thirteen hundred, six six five, nine one five\"). Never read out URLs or step ids.",
          `- Before calling a tool for a new topic, you may say one short line such as "Sure, let me pull that up." Vary it and never repeat the same line twice in a row.`,
          "- If the input is unclear or cut off, ask a short clarifying question instead of guessing. If the fan interrupts, stop and listen.",
        ]
      : [
          "- Two or three short sentences, plain text. No markdown, bullet lists, emojis, step ids or URLs.",
          "- Friendly, clear, plain Australian English.",
          "- The option buttons are already on screen, so don't list them. End with one short question.",
          "- Write phone numbers as Ticketek does (1300 665 915) and amounts exactly as given.",
        ]),
    ...(opts.customInstructions.trim() ? ["", "## SUPPORT TEAM INSTRUCTIONS", opts.customInstructions.trim()] : []),
    "",
    "## CRITICAL INSTRUCTIONS",
    `- ALWAYS call \`${TOOL_GO_TO_STEP}\` or \`${TOOL_SELECT_ORDER}\` before you ${talk} anything about a step. The screen must always match what you ${talk}.`,
    "- NEVER invent order details, amounts, dates or promises, and never override Ticketek policy.",
    "- ALWAYS put safety first: any danger means triple zero (000) before anything else.",
    "",
    "## TICKETEK FACTS",
    "- App/Mobile Tickets: barcodes appear in the Ticketek app 48 hours before the event. Screenshots won't scan.",
    "- Cancelled events are refunded automatically, including fees, to the original payment method within 30 days.",
    "- Rescheduled events: tickets carry over to the new date; refunds can be requested until 7 days before the new date.",
    "- Otherwise tickets can't be refunded for a change of plans, unless the order has Ticket Protect (covers illness, injury, transport breakdown and other listed reasons).",
    "- Transfers: only App/Mobile Tickets for upcoming events, to a friend's Ticketek account. Marketplace (Fan to Fan) resale: up to the original price, closes 2 hours before the event, sellers paid within 7 business days after the event less a 10% fee.",
    "- Fees: service fee per ticket, $6.95 handling per order, $8.50 for posted souvenir tickets. Afterpay is available on most events.",
    `- Accessible Bookings: 1300 665 915, ${values.phoneHours}. National Relay Service: 133 677, then ask for 1300 665 915.`,
    "- Emergencies: triple zero (000).",
    "",
    "## FLOW (step_id (title): \"option\" → next_step_id)",
    serialiseFlow(),
    "",
    "## CUSTOMER",
    `- Name: ${values.firstName}. Email: ${values.email}. Fan tier: ${values.fanTier} (${values.lifetimeEvents} events with Ticketek). Saved card: ${values.cardLabel}.`,
    ...(values.welcomeLine ? [`- Right now: ${values.welcomeLine}`] : []),
    `- Recommendations: ${values.recsLine}`,
    "",
    "## CUSTOMER ORDERS",
    ...(opts.orders.length ? opts.orders : ["- No orders (the fan may be signed out: suggest signing in via step signin)."]),
    ...(opts.history.length ? ["", "## EVENTS ATTENDED (most recent first)", ...opts.history] : []),
  ].join("\n");
}

export function buildVoiceInstructions(values: TemplateValues, opts: SupportPromptOptions, greeting: string, resumeStepId?: string | null): string {
  return buildInstructions("voice", values, opts, greeting, resumeStepId);
}

export function buildChatInstructions(values: TemplateValues, opts: SupportPromptOptions, greeting: string): string {
  return buildInstructions("chat", values, opts, greeting);
}
