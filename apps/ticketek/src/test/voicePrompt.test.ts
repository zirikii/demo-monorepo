import { describe, expect, it } from "vitest";
import { SEED_FAN, seedOrders } from "@/data/fan";
import { buildContext } from "@/features/assistant/engine/context";
import { promptOptions } from "@/features/assistant/engine/session";
import { buildChatInstructions, buildVoiceInstructions, buildVoiceTools, describeCard, serialiseFlow, TOOL_GO_TO_STEP, TOOL_SELECT_ORDER, TOOL_SUBMIT_FORM } from "@/features/assistant/engine/voicePrompt";
import { allNodes } from "@/features/assistant/flows";
import { viewOrders } from "@/features/fan/orders";
import { defaultConfig } from "@/features/studio/config";

const views = viewOrders(seedOrders());
const customer = { profile: SEED_FAN, views, signedIn: true };
const context = buildContext({ profile: SEED_FAN, orders: seedOrders(), views, signedIn: true }, { personalGreeting: true, recommendations: true });

describe("Grok prompt and tools", () => {
  it("offers the three flow tools, and drops forms when voice forms are off", () => {
    expect(buildVoiceTools().map((t) => t.name)).toEqual([TOOL_GO_TO_STEP, TOOL_SELECT_ORDER, TOOL_SUBMIT_FORM]);
    expect(buildVoiceTools({ voiceForms: false }).map((t) => t.name)).not.toContain(TOOL_SUBMIT_FORM);
  });

  it("serialises every step and marks order pickers", () => {
    const flow = serialiseFlow();
    for (const n of allNodes) expect(flow).toContain(n.id);
    expect(flow).toContain("PICK ORDER");
  });

  it("gives Grok the fan's orders, history, rules and custom instructions", () => {
    const config = defaultConfig();
    config.assistant.customInstructions = "Mention the ABBA presale.";
    const prompt = buildVoiceInstructions(context, promptOptions(config, customer), "Hi Jordan");
    expect(prompt).toContain("## CUSTOMER ORDERS");
    expect(prompt).toContain(views[0]!.order.id);
    expect(prompt).toContain("## EVENTS ATTENDED");
    expect(prompt).toContain("Scam or account fraud");
    expect(prompt).toContain("Mention the ABBA presale.");
    expect(prompt).toContain("triple zero (000)");
  });

  it("tells Grok which topics are switched off", () => {
    const config = defaultConfig();
    config.topics.resale = false;
    expect(buildChatInstructions(context, promptOptions(config, customer), "Hi")).toContain("Sell on Marketplace (resale)");
  });

  it("describes on-screen cards for voice", () => {
    expect(describeCard({ kind: "steps", title: "Buy safely", steps: ["Only buy from Ticketek"] }, {})).toContain("Buy safely");
    expect(describeCard(undefined, {})).toBeUndefined();
  });
});
