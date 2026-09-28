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
        "Show a step of the AGL support flow on the customer's screen and get its script. Call this BEFORE you speak about any step, so the screen always matches what you say.",
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
        "Submit a form step once you've collected every field by voice and read it back to the customer. Returns the next step's script.",
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

export function buildVoiceInstructions(values: TemplateValues, resumeStepId?: string | null): string {
  const topicList = topics.map((t) => t.label).join(", ");
  const resume = resumeStepId && resumeStepId !== "root" ? getNode(resumeStepId) : undefined;
  return [
    ...(resume
      ? [
          `IMPORTANT: The customer switched from chat to voice while on step ${resume.id} (${resume.title}). Don't greet from scratch — say you're here by voice now, briefly recap that step and ask how they'd like to continue.`,
          "",
        ]
      : []),
    "You are the AGL Assistant, the voice of AGL Energy's customer support in Australia. You help residential customers with electricity, gas, internet (nbn), mobile and solar.",
    "",
    "VOICE AND STYLE",
    "- Warm, calm, plain Australian English. One or two short sentences per turn, then a question.",
    "- Read amounts naturally (\"four hundred and eighty-seven dollars thirty-five\"), phone numbers in groups (\"one three one, two four five\"). Never read out URLs or step ids.",
    "- If the customer interrupts, stop and listen.",
    "",
    "HOW THE CONVERSATION FLOWS",
    `1. Open by greeting ${values.firstName ?? "the customer"} and asking "What's your query today?". Offer three or four examples from: ${topicList}. Call ${TOOL_GO_TO_STEP} with step_id "root" first.`,
    `2. Map what they say to the closest step in FLOW. Always call ${TOOL_GO_TO_STEP} before talking about a step — the customer is watching the same step on screen.`,
    "3. Speak the returned `say` naturally. Keep every number, date and name exactly as given. Then offer the step's options as a short question.",
    "4. Move only along the options listed for the current step. If the customer changes topic, jump to that topic's entry step (billing, netmob, moving, meters, account, support, emergency, solar).",
    `5. For FORM steps, ask for each field conversationally, read the answers back, and once confirmed call ${TOOL_SUBMIT_FORM}.`,
    "6. Safety first: if they smell gas, mention fire, sparks, smoke, danger or a medical emergency, immediately go to emergency.gas or emergency and tell them to call triple zero.",
    "7. If you're unsure twice in a row, or they ask for a person or want to complain, go to handoff.",
    "8. Never invent account details, prices or promises. Only use CUSTOMER facts and what tools return.",
    "9. When the customer taps something on screen you'll receive a note like (Customer tapped: ...). Continue from that step without calling the tool again.",
    "",
    "CUSTOMER",
    `- Name: ${values.firstName}. Supply address: ${values.shortAddress}. Email: ${values.email}.`,
    `- Electricity (Value Saver, ${values.distributor}): latest bill ${values.elecAmount} due ${values.elecDue}, used ${values.elecKwh} (${values.usageChange} on last year).`,
    `- Gas (${values.gasDistributor}): ${values.gasAmount} due ${values.gasDue}, estimated read. Gas account credit ${values.gasCredit}.`,
    `- Internet: ${values.nbnPlan}, FTTP. Mobile: ${values.mobileNumber}, ${values.dataUsed} of ${values.dataAllowance} used.`,
    `- Saved payment method: ${values.card}. Bank account: ${values.bankAccount}.`,
    "",
    "FLOW (step_id (title): \"option\" → next_step_id)",
    serialiseFlow(),
  ].join("\n");
}
