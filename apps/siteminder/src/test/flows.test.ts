import { describe, expect, it } from "vitest";
import { seedProperty } from "@/data/property";
import { bookingFacts, buildContext, channelFacts, eventFacts, historyFacts, invoiceFacts, RECORD_KIND } from "@/features/assistant/engine/context";
import { neededRecord } from "@/features/assistant/engine/conversation";
import { forms, optionsFor, type FormContext, type FormField } from "@/features/assistant/engine/forms";
import { handoffFacts } from "@/features/assistant/engine/session";
import { allNodes, getNode, popularQuestions, ROOT_ID, topics, type FlowNode } from "@/features/assistant/flows";
import { defaultConfig } from "@/features/studio/config";
import { evaluateRouting } from "@/features/studio/routing";
import { STEP_LINKS } from "./routes";

function targets(node: FlowNode): string[] {
  const out = node.options.map((o) => o.next);
  if (node.pick) out.push(node.pick.next, ...Object.values(node.pick.byStatus ?? {}));
  if (node.decide) out.push(node.decide.otherwise, ...Object.values(node.decide.cases));
  if (node.card?.kind === "form") out.push(node.card.next);
  return out.filter((t): t is string => Boolean(t));
}

function templateStrings(node: FlowNode): string[] {
  const card = node.card ? JSON.stringify(node.card) : "";
  return [node.say, card, node.pick?.emptySay ?? "", ...node.options.flatMap((o) => [o.label, ...Object.values(o.set ?? {})])];
}

function sampleValues(fields: FormField[], ctx: FormContext): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "date" ? "2026-11-20" : (optionsFor(f, ctx)?.[0] ?? "12")]));
}

function knownPlaceholders(): Set<string> {
  const now = new Date();
  const state = seedProperty(now);
  const ctx: FormContext = { facts: {}, rooms: [], teamEmails: [], today: "2026-10-01" };
  const keys = [
    ...Object.keys(buildContext({ state, signedIn: true }, { personalGreeting: true, insights: true, now })),
    ...Object.keys(channelFacts(state.channels[0]!, now)),
    ...Object.keys(bookingFacts(state.bookings[0]!, state)),
    ...Object.keys(invoiceFacts(state.invoices[0]!, state)),
    ...Object.keys(eventFacts(state.events[0]!, state, now)),
    ...Object.keys(historyFacts(state.events.at(-1)!)),
    ...Object.keys(handoffFacts(defaultConfig(), evaluateRouting(defaultConfig(), { customerTurns: [], topics: [], fallbackCount: 0, channelIssues: [], plan: "plus", rooms: 86, overdueDays: 0, priorContacts: [], now }, "handoff"), "SMS-1", { property: state, signedIn: true })),
    ...Object.values(forms).flatMap((f) => Object.keys(f.toFacts(sampleValues(f.fields, ctx), ctx))),
    ...allNodes.flatMap((n) => n.options.flatMap((o) => Object.keys(o.set ?? {}))),
  ];
  return new Set(keys);
}

describe("support flow graph", () => {
  it("has unique step ids", () => {
    const ids = allNodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never points at a step that doesn't exist", () => {
    const dangling = allNodes.flatMap((n) => targets(n).filter((t) => !getNode(t)).map((t) => `${n.id} → ${t}`));
    expect(dangling).toEqual([]);
  });

  it("reaches every step from the root, topics, popular questions or keywords", () => {
    const seen = new Set<string>();
    const queue = [ROOT_ID, "menu", "fallback", "handoff", "safety", ...topics.map((t) => t.entry), ...popularQuestions.map((q) => q.step)];
    for (const n of allNodes) if (n.keywords?.length) queue.push(n.id);
    while (queue.length) {
      const id = queue.shift()!;
      if (seen.has(id)) continue;
      seen.add(id);
      const node = getNode(id);
      if (node) queue.push(...targets(node));
    }
    expect(allNodes.map((n) => n.id).filter((id) => !seen.has(id))).toEqual([]);
  });

  it("only uses placeholders the engine can fill", () => {
    const known = knownPlaceholders();
    const unknown = allNodes.flatMap((n) =>
      templateStrings(n).flatMap((text) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]!).filter((key) => !known.has(key)).map((key) => `${n.id}: {${key}}`)),
    );
    expect(unknown).toEqual([]);
  });

  it("only uses forms that are defined", () => {
    for (const n of allNodes) if (n.card?.kind === "form") expect(forms[n.card.form], n.id).toBeDefined();
  });

  it("gives every record picker an empty-state line", () => {
    for (const n of allNodes.filter((x) => x.pick)) expect(n.pick!.emptySay.length, n.id).toBeGreaterThan(20);
  });

  it("has a picker for every kind of record a step needs", () => {
    const pickable = new Set(allNodes.flatMap((n) => (n.pick ? [RECORD_KIND[n.pick.filter]] : [])));
    for (const n of allNodes) {
      const kind = neededRecord(n);
      if (n.picker) expect(getNode(n.picker)?.pick, n.id).toBeDefined();
      if (kind) expect(pickable.has(kind), `${n.id} needs a ${kind}`).toBe(true);
    }
  });

  it("links info cards to real pages", () => {
    const links = allNodes.flatMap((n) => (n.card?.kind === "info" && n.card.link ? [n.card.link.to] : []));
    expect(links.length).toBeGreaterThan(3);
    for (const to of links) expect(STEP_LINKS.some((pattern) => pattern.test(to)), to).toBe(true);
  });

  it("covers SiteMinder's support topics", () => {
    expect(topics.map((t) => t.id)).toEqual(["channels", "reservations", "rates", "events", "billing", "arrangements", "account", "property", "urgent", "grow"]);
    for (const t of topics) expect(getNode(t.entry), t.id).toBeDefined();
  });
});
