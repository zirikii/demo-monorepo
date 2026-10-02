import { describe, expect, it } from "vitest";
import { seedProperty } from "@/data/property";
import { buildContext } from "@/features/assistant/engine/context";
import { promptOptions } from "@/features/assistant/engine/session";
import {
  buildChatInstructions,
  buildVoiceInstructions,
  buildVoiceTools,
  describeCard,
  serialiseFlow,
  TOOL_GO_TO_STEP,
  TOOL_SELECT_RECORD,
  TOOL_SUBMIT_FORM,
} from "@/features/assistant/engine/voicePrompt";
import { allNodes } from "@/features/assistant/flows";
import { defaultConfig } from "@/features/studio/config";

const property = seedProperty();
const customer = { property, signedIn: true };
const context = buildContext(
  { state: property, signedIn: true },
  { personalGreeting: true, insights: true },
);

describe("Grok prompt and tools", () => {
  it("offers the three flow tools, and drops forms when voice forms are off", () => {
    expect(buildVoiceTools().map((t) => t.name)).toEqual([
      TOOL_GO_TO_STEP,
      TOOL_SELECT_RECORD,
      TOOL_SUBMIT_FORM,
    ]);
    expect(buildVoiceTools({ voiceForms: false }).map((t) => t.name)).not.toContain(
      TOOL_SUBMIT_FORM,
    );
  });

  it("gives select_record examples that are real record ids", () => {
    const description = JSON.stringify(buildVoiceTools()[1]!.parameters);
    expect(description).toContain("exp");
    expect(description).toContain("BDC-4821937");
    expect(description).toContain("evt-bledisloe");
    expect(property.bookings.some((b) => b.id === "BDC-4821937")).toBe(true);
  });

  it("serialises every step and marks record pickers", () => {
    const flow = serialiseFlow();
    for (const n of allNodes) expect(flow).toContain(n.id);
    expect(flow).toContain("PICK CHANNEL (channels-all)");
    expect(flow).toContain("PICK HISTORY (events-past)");
  });

  it("gives Grok the property, its records, the events store, the rules and custom instructions", () => {
    const config = defaultConfig();
    config.assistant.customInstructions = "Mention the Demand Plus offer.";
    const prompt = buildVoiceInstructions(context, promptOptions(config, customer), "Hi Sophie");
    expect(prompt).toContain("The Harbour Lane Hotel, Sydney. 86 rooms");
    expect(prompt).toContain("## PROPERTY RECORDS");
    expect(prompt).toContain("Booking BDC-4821937: Hannah Okafor");
    expect(prompt).toContain("## DEMAND EVENTS");
    expect(prompt).toContain("Upcoming evt-bledisloe");
    expect(prompt).toContain("Past evt-nrl-gf-2025: NRL Grand Final");
    expect(prompt).toContain("Security or fraud");
    expect(prompt).toContain("Mention the Demand Plus offer.");
    expect(prompt).toContain("triple zero (000)");
    expect(prompt).toContain("Spoken words only");
  });

  it("asks a signed-out visitor to log in", () => {
    const prompt = buildChatInstructions(
      context,
      promptOptions(defaultConfig(), { ...customer, signedIn: false }),
      "Hi",
    );
    expect(prompt).toContain("Not logged in");
    expect(prompt).not.toContain("## DEMAND EVENTS");
  });

  it("tells Grok which topics are switched off", () => {
    const config = defaultConfig();
    config.topics.grow = false;
    expect(buildChatInstructions(context, promptOptions(config, customer), "Hi")).toContain(
      "Grow revenue (grow)",
    );
  });

  it("describes on-screen cards for voice", () => {
    expect(
      describeCard(
        { kind: "steps", title: "Edit room rates mapping", steps: ["Go to Distribution"] },
        {},
      ),
    ).toContain("Edit room rates mapping");
    expect(describeCard(undefined, {})).toBeUndefined();
  });
});
