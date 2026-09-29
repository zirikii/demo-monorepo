import { describe, expect, it } from "vitest";
import { buildContext } from "@/features/assistant/engine/context";
import {
  buildChatInstructions,
  buildVoiceInstructions,
  buildVoiceTools,
  describeCard,
  serialiseFlow,
  TOOL_GO_TO_STEP,
  TOOL_SUBMIT_FORM,
} from "@/features/assistant/engine/voicePrompt";
import { allNodes } from "@/features/assistant/flows";

const values = buildContext({ firstName: "Alex", email: "alex@example.com" });

describe("Grok voice prompt", () => {
  it("exposes go_to_step with every flow step and submit_form", () => {
    const tools = buildVoiceTools();
    expect(tools.map((t) => t.name)).toEqual([TOOL_GO_TO_STEP, TOOL_SUBMIT_FORM]);
    const params = tools[0]!.parameters as { properties: { step_id: { enum: string[] } } };
    expect(params.properties.step_id.enum).toEqual(allNodes.map((n) => n.id));
  });

  it("follows xAI's recommended section order", () => {
    for (const text of [buildVoiceInstructions(values), buildChatInstructions(values)]) {
      const headers = text.split("\n").filter((line) => line.startsWith("## "));
      expect(headers.slice(0, 6)).toEqual([
        "## Role & Persona",
        "## Objective",
        "## Conversation Flow",
        "## Guardrails & Escalation",
        expect.stringMatching(/Communication Style$/),
        "## CRITICAL INSTRUCTIONS",
      ]);
    }
  });

  it("grounds Grok in AGL, its escalation paths and the flow graph", () => {
    const text = buildVoiceInstructions(values);
    expect(text).toContain("AGL Energy, Australia's largest integrated energy retailer");
    expect(text).toContain("131 245");
    expect(text).toContain("1300 659 925");
    expect(text).toContain("go to emergency.gas");
    expect(text).toContain("Internet & mobile (netmob)");
    expect(text).toContain("- netmob (Internet & mobile):");
    expect(text).toContain(values.elecAmount);
    expect(text).toContain(`${values.distributor}, faults line ${values.distributorPhone}`);
    expect(text).not.toContain("switched from chat to voice");
  });

  it("keeps voice spoken and chat written", () => {
    const voice = buildVoiceInstructions(values);
    const chat = buildChatInstructions(values);
    expect(voice).toContain("Spoken words only");
    expect(voice).toContain("The greeting has already been spoken");
    expect(chat).toContain("The option buttons are already on screen");
    expect(chat).not.toContain("Spoken words only");
  });

  it("resumes mid-flow when the customer switches from chat", () => {
    expect(buildVoiceInstructions(values, "internet.down")).toContain(
      "The customer switched from chat to voice while on step internet.down",
    );
  });

  it("lists form fields so Grok knows what to collect", () => {
    expect(serialiseFlow()).toContain("[FORM meter-read: collect reading, then call submit_form]");
  });

  it("describes cards with real values", () => {
    expect(describeCard({ kind: "bill", billKind: "electricity" }, values)).toContain(values.elecAmount);
    expect(describeCard({ kind: "success", title: "Done", detail: "SMS to {mobileNumber}" }, values)).toBe("Done: SMS to 0412 555 019");
    expect(describeCard(undefined, values)).toBeUndefined();
  });
});
