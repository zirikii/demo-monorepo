import { describe, expect, it } from "vitest";
import { forms } from "@/features/assistant/engine/forms";
import { allNodes, getNode, popularQuestions, ROOT_ID, topics, type FlowNode } from "@/features/assistant/flows";
import { STEP_LINKS } from "./routes";

function targets(node: FlowNode): string[] {
  const out = node.options.map((o) => o.next);
  if (node.pick) out.push(node.pick.next, ...Object.values(node.pick.byPolicy ?? {}), ...Object.values(node.pick.byDelivery ?? {}));
  if (node.decide) out.push(node.decide.otherwise, ...Object.values(node.decide.cases));
  if (node.card?.kind === "form") out.push(node.card.next);
  return out.filter((t): t is string => Boolean(t));
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

  it("only uses forms that are defined", () => {
    for (const n of allNodes) if (n.card?.kind === "form") expect(forms[n.card.form], n.id).toBeDefined();
  });

  it("gives every order picker an empty-state line", () => {
    for (const n of allNodes.filter((x) => x.pick)) expect(n.pick!.emptySay.length, n.id).toBeGreaterThan(20);
  });

  it("links info cards to real pages", () => {
    const links = allNodes.flatMap((n) => (n.card?.kind === "info" && n.card.link ? [n.card.link.to] : []));
    for (const to of links) expect(STEP_LINKS.some((pattern) => pattern.test(to)), to).toBe(true);
  });

  it("covers the Ticketek support topics", () => {
    expect(topics.map((t) => t.id)).toEqual(
      expect.arrayContaining(["tickets", "refunds", "changes", "transfer", "resale", "accessibility", "groups", "payments", "account", "eventday", "discover"]),
    );
  });
});
