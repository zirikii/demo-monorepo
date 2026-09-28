import { accountNodes } from "./account";
import { billingNodes } from "./billing";
import { commonNodes } from "./common";
import { emergencyNodes } from "./emergency";
import { internetMobileNodes } from "./internetMobile";
import { meterNodes } from "./meters";
import { movingNodes } from "./moving";
import { solarNodes } from "./solar";
import { supportNodes } from "./support";
import { findTopic } from "./topics";
import type { FlowNode } from "./types";

export const allNodes: FlowNode[] = [
  ...commonNodes,
  ...billingNodes,
  ...internetMobileNodes,
  ...movingNodes,
  ...meterNodes,
  ...accountNodes,
  ...supportNodes,
  ...emergencyNodes,
  ...solarNodes,
];

const byId = new Map(allNodes.map((node) => [node.id, node]));

export const ROOT_ID = "root";

export function getNode(id: string): FlowNode | undefined {
  return byId.get(id);
}

export function requireNode(id: string): FlowNode {
  const node = byId.get(id);
  if (!node) throw new Error(`Unknown assistant flow step: ${id}`);
  return node;
}

/** Breadcrumb label for the topic a step belongs to, e.g. "Internet & mobile". */
export function topicLabel(node: FlowNode): string | undefined {
  if (node.topic === "common") return undefined;
  return findTopic(node.topic)?.label;
}

export type TemplateValues = Record<string, string>;

/** Fills {placeholders}; unknown keys are left visible so gaps are obvious in review. */
export function renderTemplate(text: string, values: TemplateValues): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export { topics, popularQuestions, findTopic } from "./topics";
export type { FlowNode, FlowOption, FlowCard, Topic, TopicId, FormId } from "./types";
