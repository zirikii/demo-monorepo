import { describe, expect, it } from "vitest";
import { helpCategories } from "@/data/help";
import { buildContext, GUEST } from "@/features/assistant/engine/context";
import { forms } from "@/features/assistant/engine/forms";
import { allNodes, getNode, popularQuestions, ROOT_ID, topics } from "@/features/assistant/flows";

const PLACEHOLDER = /\{(\w+)\}/g;

function placeholdersIn(value: unknown): string[] {
  if (typeof value === "string") return [...value.matchAll(PLACEHOLDER)].map((m) => m[1]!);
  if (Array.isArray(value)) return value.flatMap(placeholdersIn);
  if (value && typeof value === "object") return Object.values(value).flatMap(placeholdersIn);
  return [];
}

describe("assistant flow graph", () => {
  it("has unique step ids", () => {
    const ids = allNodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only links to steps that exist", () => {
    for (const node of allNodes) {
      for (const option of node.options) {
        expect(getNode(option.next), `${node.id} → ${option.next}`).toBeDefined();
      }
      if (node.card?.kind === "form") expect(getNode(node.card.next), `${node.id} form → ${node.card.next}`).toBeDefined();
    }
  });

  it("can reach every step from the greeting", () => {
    // Only unmatched free text lands on the fallback step.
    const seen = new Set<string>(["fallback"]);
    const queue = [ROOT_ID];
    while (queue.length) {
      const id = queue.shift()!;
      if (seen.has(id)) continue;
      seen.add(id);
      const node = getNode(id)!;
      queue.push(...node.options.map((o) => o.next));
      if (node.card?.kind === "form") queue.push(node.card.next);
    }
    const unreachable = allNodes.map((n) => n.id).filter((id) => !seen.has(id));
    expect(unreachable).toEqual([]);
  });

  it("gives every step at least one way forward", () => {
    for (const node of allNodes) {
      const hasForm = node.card?.kind === "form";
      expect(node.options.length > 0 || hasForm, node.id).toBe(true);
    }
  });

  it("offers every AGL help topic from the greeting", () => {
    const root = getNode(ROOT_ID)!;
    expect(root.say).toContain("What's your query today?");
    for (const topic of topics) {
      expect(getNode(topic.entry), topic.id).toBeDefined();
      expect(root.options.map((o) => o.next)).toContain(topic.entry);
    }
    expect(root.options.map((o) => o.label)).toEqual(
      expect.arrayContaining(["Billing & payments", "Internet & mobile", "Moving house", "Outages & emergencies"]),
    );
  });

  it("points popular questions and help articles at real steps", () => {
    for (const q of popularQuestions) expect(getNode(q.step), q.label).toBeDefined();
    for (const category of helpCategories) {
      for (const article of category.articles) {
        if (article.assistantStep) expect(getNode(article.assistantStep), article.slug).toBeDefined();
      }
    }
  });

  it("only uses placeholders the context or earlier answers can fill", () => {
    const known = new Set(Object.keys(buildContext(GUEST)));
    for (const node of allNodes) for (const o of node.options) for (const key of Object.keys(o.set ?? {})) known.add(key);
    for (const def of Object.values(forms)) {
      const sample = Object.fromEntries(def.fields.map((f) => [f.name, "x"]));
      for (const key of Object.keys(def.toFacts(sample))) known.add(key);
    }
    for (const node of allNodes) {
      const used = [...placeholdersIn(node.say), ...placeholdersIn(node.card), ...node.options.flatMap((o) => placeholdersIn(o))];
      for (const key of used) expect(known.has(key), `${node.id} uses {${key}}`).toBe(true);
    }
  });
});
