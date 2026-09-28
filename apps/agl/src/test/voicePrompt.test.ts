import { describe, expect, it } from "vitest";
import { buildContext } from "@/features/assistant/engine/context";
import {
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

  it("opens with the query question and follows the flow graph", () => {
    const text = buildVoiceInstructions(values);
    expect(text).toContain('asking "What\'s your query today?"');
    expect(text).toContain("Internet & mobile");
    expect(text).toContain("- netmob (Internet & mobile):");
    expect(text).toContain(values.elecAmount);
    expect(text).not.toContain("IMPORTANT: The customer switched");
  });

  it("resumes mid-flow when the customer switches from chat", () => {
    const text = buildVoiceInstructions(values, "internet.down");
    expect(text.startsWith("IMPORTANT: The customer switched from chat to voice while on step internet.down")).toBe(true);
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
