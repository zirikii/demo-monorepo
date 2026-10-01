import { commonNodes } from "./common";
import { helpNodes } from "./help";
import { refundNodes } from "./refunds";
import { ticketNodes } from "./tickets";
import { findTopic } from "./topics";
import { transferNodes } from "./transfers";
import type { FlowNode } from "./types";

export const allNodes: FlowNode[] = [...commonNodes, ...ticketNodes, ...refundNodes, ...transferNodes, ...helpNodes];

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

/** Breadcrumb label for the topic a step belongs to, e.g. "Refunds & exchanges". */
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
export type { FlowNode, FlowOption, FlowCard, Topic, TopicId, FormId, OrderFilter, OrderPick } from "./types";
