import { allNodes, getNode, topics, type FlowCard, type FormId } from "../flows";
import type { TemplateValues } from "../flows";
import { renderCard } from "./conversation";
import { forms } from "./forms";

export type RealtimeTool = {
  type: "function";
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

export const TOOL_GO_TO_STEP = "go_to_step";
export const TOOL_SUBMIT_FORM = "submit_form";

export function buildVoiceTools(): RealtimeTool[] {
  return [
    {
      type: "function",
      name: TOOL_GO_TO_STEP,
      description:
        "Show a step of the AGL support flow on the customer's screen and get its script. Call this BEFORE you say or write anything about a step, so the screen always matches your reply.",
      parameters: {
        type: "object",
        properties: {
          step_id: { type: "string", enum: allNodes.map((n) => n.id), description: "Flow step to show" },
          option_label: {
            type: "string",
            description: "The option label from the current step the customer chose, if any. Records their choice (e.g. 'Fortnightly').",
          },
        },
        required: ["step_id"],
      },
    },
    {
      type: "function",
      name: TOOL_SUBMIT_FORM,
      description:
        "Submit a form step once you've collected every field and confirmed it with the customer. Returns the next step's script.",
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
}

/** One-line spoken summary of a card so the voice agent can describe what's on screen. */
export function describeCard(raw: FlowCard | undefined, values: TemplateValues): string | undefined {
  const card = renderCard(raw, values);
  if (!card) return undefined;
  switch (card.kind) {
    case "steps":
      return `${card.title}: ${card.steps.join("; ")}`;
    case "bill":
      return `Bill card: electricity ${values.elecAmount} due ${values.elecDue}; gas ${values.gasAmount} due ${values.gasDue}`;
    case "payment-confirm":
      return `Payment confirmation for ${values.elecAmount} with ${values.card}`;
    case "bpay":
      return "BPAY card: biller code 2345, reference 8123 4419 02";
    case "usage-compare":
      return `Usage comparison: ${values.elecKwh} this quarter, ${values.usageChange} on last year`;
    case "outage-status":
      return `Outage status card for ${card.service}`;
    case "speed-test":
      return "Speed test card — result about 42 Mbps down, 17 Mbps up on a 100 Mbps plan, Wi-Fi";
    case "contact":
      return `${card.title}: ${card.entries.map((e) => `${e.label} ${e.phone}`).join("; ")}`;
    case "emergency":
      return "Emergency banner: call 000 if anyone is in danger";
    case "form":
      return `Form "${forms[card.form].title}" with fields ${forms[card.form].fields.map((f) => f.name).join(", ")}`;
    case "plan-compare":
      return "Plan comparison: Value Saver about $1,576 a year vs Netflix Plan about $1,593 a year";
    case "extension":
      return `Extension card: ${values.elecAmount} moved from ${values.elecDue} to ${values.extendedDue}`;
    case "instalment":
      return `Instalment options for ${values.totalDue}: weekly $58.35, fortnightly $116.69, monthly $233.38`;
    case "refund":
      return `Refund card: gas credit ${values.gasCredit}`;
    case "handoff":
      return "Handoff card: connecting to a team member, about 2 minutes wait";
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
    .map((f) => (f.options ? `${f.name} (one of: ${f.options.join(" | ")})` : f.name))
    .join(", ");
  return ` [FORM ${formId}: collect ${fields}, then call ${TOOL_SUBMIT_FORM}]`;
}

/** Compact adjacency list of the whole support flow — the "train of thinking" Grok must follow. */
export function serialiseFlow(): string {
  return allNodes
    .map((node) => {
      const options = node.options.map((o) => `"${o.label}" → ${o.next}`).join(" | ");
      const form = node.card?.kind === "form" ? formLine(node.card.form) : "";
      return `- ${node.id} (${node.title}): ${options || "no options"}${form}`;
    })
    .join("\n");
}

type Channel = "voice" | "chat";

/**
 * One system prompt for both Grok voice and Grok chat, in xAI's recommended section order
 * (Role & Persona → Objective → Conversation Flow → Guardrails & Escalation → Style → CRITICAL).
 * Static sections come first and per-customer facts last, so the shared prefix stays cacheable.
 */
function buildInstructions(channel: Channel, values: TemplateValues, resumeStepId?: string | null): string {
  const voice = channel === "voice";
  const resume = resumeStepId && resumeStepId !== "root" ? getNode(resumeStepId) : undefined;
  const topicList = topics.map((t) => `${t.label} (${t.entry})`).join(", ");
  const talk = voice ? "say" : "write";

  return [
    "## Role & Persona",
    `You are the AGL Assistant, a warm, calm and capable customer support agent for AGL Energy, Australia's largest integrated energy retailer. AGL supplies electricity, gas, nbn internet, mobile SIM plans, solar and batteries, and EV plans to residential customers in NSW, VIC, QLD, SA and the ACT. The website is https://www.agl.com.au.`,
    voice
      ? "You are talking with a customer by voice inside the AGL Assistant, while they watch the same support steps on screen."
      : "You are chatting with a customer in the AGL Assistant on agl.com.au, where each reply appears above the current step's card and option buttons.",
    "",
    "## Objective",
    "Resolve the customer's query by guiding them through AGL's support flow, the same steps they see on screen, or hand over cleanly to the AGL team when you can't.",
    "",
    "## Conversation Flow",
    voice
      ? `The greeting has already been spoken ("What's your query today?"), so start from the customer's first reply.`
      : "The customer has already been greeted, so start from their first message.",
    ...(resume
      ? [
          `The customer switched from chat to voice while on step ${resume.id} (${resume.title}). Don't greet again: say you're with them by voice now, briefly recap that step and ask how they'd like to continue.`,
        ]
      : []),
    "### 1) Understand",
    `- Go straight to the most specific step in FLOW that matches what they ${voice ? "say" : "write"}, skipping topic menus they don't need (for example "I want to pay my bill" goes to billing.pay, not billing). Topics and their entry steps: ${topicList}.`,
    "- If it could be more than one thing, ask one targeted question (for example \"Is that your electricity or gas bill?\") instead of guessing.",
    "### 2) Guide",
    `- Call \`${TOOL_GO_TO_STEP}\` for the step, then ${talk} its returned \`say\` in your own words, keeping every amount, date, name and number exactly as given.`,
    "- Within a step, move along its listed options. If the customer asks for something else, jump to the matching step or topic. If they're unsure what they need, go to menu.",
    "- When a step lists options, end with a short question that offers them.",
    "### 3) Collect",
    `- On FORM steps, ask for each missing field, confirm the answers back, then call \`${TOOL_SUBMIT_FORM}\`. If it returns field errors, ask again for just those fields.`,
    "- Anything that changes the account (payments, direct debit, moves, extensions, plan changes) must go through its confirmation step. Never skip it.",
    "### 4) Close",
    "- When the issue is sorted, go to resolved. When they have nothing else, go to end.",
    "- Notes like (Customer tapped: ...) or (Customer submitted ...) mean the screen already moved. Continue from that step without calling the tool again.",
    "",
    "## Guardrails & Escalation",
    "- Stay within AGL residential support: energy bills and payments, plans, moving, meters, outages, internet, mobile, solar and batteries. For anything else, say it's outside what you can help with and offer the topics or a person.",
    "- Answer only from AGL FACTS, CUSTOMER and tool results. If you don't know, say so. Never invent account details, prices, credits, fees, timeframes or promises. Give no legal, financial or medical advice.",
    "- Never ask for passwords, full card numbers or security codes.",
    "- Safety comes first, before anything else:",
    "  - Gas smell or suspected leak: go to emergency.gas.",
    "  - Sparks, fire, smoke, fallen power lines or anyone in danger: tell them to call triple zero (000) now, then go to emergency.",
    "  - Life support equipment without power: go to emergency.lifesupport.",
    "- Outages and faults are fixed by the local distributor, not AGL. Say so plainly and give their number from AGL FACTS.",
    "- If they're struggling to pay, respond with empathy, never pressure them, and go to support. For ongoing hardship go to support.hardship (Staying Connected). If they mention family or domestic violence, go to support.hardship and mention 1800RESPECT on 1800 737 732.",
    `- Go to handoff when they ask for a person, want to make a complaint, are clearly frustrated, or you've misunderstood them twice in a row. As you do, ${talk} something like "No worries, I'll connect you with someone from our team."`,
    "",
    voice ? "## Voice & Communication Style" : "## Communication Style",
    ...(voice
      ? [
          "- Spoken words only: no lists, markdown, emojis or stage directions.",
          "- One or two short sentences per turn, then a question. Warm, calm, plain Australian English. Say \"poles and wires\", not industry jargon.",
          "- Respond only in English.",
          "- Say amounts naturally (\"four hundred and eighty-seven dollars thirty-five\") and phone numbers in groups the way Australians do (\"one three one, two four five\"). Never read out URLs or step ids.",
          `- Before calling \`${TOOL_GO_TO_STEP}\` for a new topic, you may say one short line such as "Sure, let me pull that up." Vary it and never repeat the same line twice in a row.`,
          "- If the input is unclear or cut off, ask a short clarifying question instead of guessing. If the customer interrupts, stop and listen.",
        ]
      : [
          "- Two or three short sentences, plain text. No markdown, bullet lists, emojis, step ids or URLs.",
          "- Warm, clear, plain Australian English, without industry jargon.",
          "- The option buttons are already on screen, so don't list them. End with one short question.",
          "- Write phone numbers as AGL does (131 245) and amounts exactly as given.",
          "- If the message is unclear, ask a short clarifying question instead of guessing.",
        ]),
    "",
    "## CRITICAL INSTRUCTIONS",
    `- ALWAYS call \`${TOOL_GO_TO_STEP}\` before you ${talk} anything about a step. The screen must always match what you ${talk}.`,
    "- NEVER invent account details, amounts, dates or promises.",
    "- ALWAYS put safety first: any danger means triple zero (000) before anything else.",
    "",
    "## AGL FACTS",
    "- General enquiries: 131 245, Monday to Friday 8am to 8pm and Saturday 9am to 5pm AEST.",
    "- Life support customers: 131 245, any time, 24/7.",
    "- Staying Connected (financial hardship): 1300 659 925.",
    "- Interpreter service: 131 450, then ask for AGL. National Relay Service: 133 677, then ask for 1300 664 358.",
    "- Emergencies: triple zero (000).",
    "",
    "## FLOW (step_id (title): \"option\" → next_step_id)",
    serialiseFlow(),
    "",
    "## CUSTOMER",
    `- Name: ${values.firstName}. Supply address: ${values.shortAddress}. Email: ${values.email}.`,
    `- Electricity (Value Saver): latest bill ${values.elecAmount} due ${values.elecDue}, used ${values.elecKwh} (${values.usageChange} on last year). Distributor ${values.distributor}, faults line ${values.distributorPhone}.`,
    `- Gas: ${values.gasAmount} due ${values.gasDue}, estimated read. Gas account credit ${values.gasCredit}. Distributor ${values.gasDistributor}, faults line ${values.gasDistributorPhone}.`,
    `- Internet: ${values.nbnPlan}, FTTP. Mobile: ${values.mobileNumber}, ${values.dataUsed} of ${values.dataAllowance} used.`,
    `- Saved payment method: ${values.card}. Bank account: ${values.bankAccount}.`,
  ].join("\n");
}

export function buildVoiceInstructions(values: TemplateValues, resumeStepId?: string | null): string {
  return buildInstructions("voice", values, resumeStepId);
}

export function buildChatInstructions(values: TemplateValues): string {
  return buildInstructions("chat", values);
}
