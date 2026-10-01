import { BOOKING_STATUS_LABELS, CHANNEL_STATUS_LABELS, PLANS } from "@/features/property/views";
import { pluralise } from "@/lib/format";
import { PRIORITIES } from "./config";
import { scoreSentiment } from "./sentiment";
import type { Priority, RoutingDecision, RoutingOutcome, RoutingRule, RoutingSignals, RuleCondition, RuleTrace, StudioConfig } from "./types";

const DAY_MS = 86_400_000;

function normalise(text: string): string {
  return ` ${text.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim()} `;
}

export function higherPriority(a: Priority, b: Priority): Priority {
  return PRIORITIES.indexOf(a) <= PRIORITIES.indexOf(b) ? a : b;
}

function whenLabel(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

function checkCondition(condition: RuleCondition, s: RoutingSignals): { matched: boolean; reason: string } {
  switch (condition.kind) {
    case "keywords": {
      const said = normalise(s.customerTurns.join(" "));
      const hits = condition.terms.filter((t) => said.includes(normalise(t)));
      return hits.length
        ? { matched: true, reason: `Heard ${hits.map((h) => `“${h}”`).join(", ")}` }
        : { matched: false, reason: "No matching words" };
    }
    case "sentiment": {
      const recent = s.customerTurns.slice(-condition.consecutive).map(scoreSentiment);
      const low = recent.length === condition.consecutive && recent.every((v) => v < condition.below);
      const shown = recent.map((v) => v.toFixed(2)).join(", ") || "none yet";
      return low
        ? { matched: true, reason: `Last ${condition.consecutive} messages scored ${shown}` }
        : { matched: false, reason: `Last ${condition.consecutive} messages: ${shown}` };
    }
    case "event_within": {
      if (!s.event) return { matched: false, reason: "No event in the conversation" };
      const { label, daysUntil } = s.event;
      return daysUntil >= 0 && daysUntil <= condition.days
        ? { matched: true, reason: `${label} is ${whenLabel(daysUntil)}` }
        : { matched: false, reason: `${label} is ${whenLabel(daysUntil)}` };
    }
    case "event_at_risk": {
      if (!s.nextEvent) return { matched: false, reason: "No upcoming events in the demand calendar" };
      const { label, daysUntil } = s.nextEvent;
      if (daysUntil > condition.days) return { matched: false, reason: `${label} is ${whenLabel(daysUntil)}` };
      return s.channelIssues.length
        ? { matched: true, reason: `${label} is ${whenLabel(daysUntil)} and ${s.channelIssues.join(", ")} ${s.channelIssues.length === 1 ? "isn't" : "aren't"} selling` }
        : { matched: false, reason: `${label} is ${whenLabel(daysUntil)}, all channels selling` };
    }
    case "channel_issue": {
      if (!s.channel) return { matched: false, reason: "No channel in the conversation" };
      const label = `${s.channel.label}: ${CHANNEL_STATUS_LABELS[s.channel.status].toLowerCase()}`;
      return { matched: condition.statuses.includes(s.channel.status), reason: label };
    }
    case "booking_status": {
      if (!s.booking) return { matched: false, reason: "No booking in the conversation" };
      const label = `${s.booking.label}: ${BOOKING_STATUS_LABELS[s.booking.status].toLowerCase()}`;
      return { matched: condition.statuses.includes(s.booking.status), reason: label };
    }
    case "topic": {
      const topic = s.topics.find((t) => condition.topics.includes(t));
      return topic ? { matched: true, reason: `Conversation reached ${topic}` } : { matched: false, reason: "Topic not reached" };
    }
    case "plan":
      return { matched: condition.plans.includes(s.plan), reason: `On ${PLANS[s.plan].name}` };
    case "property_size":
      return s.rooms >= condition.minRooms
        ? { matched: true, reason: `${s.rooms} rooms` }
        : { matched: false, reason: `${s.rooms} of ${condition.minRooms} rooms` };
    case "invoice_overdue":
      if (s.overdueDays === 0) return { matched: false, reason: "No overdue invoices" };
      return s.overdueDays >= condition.minDays
        ? { matched: true, reason: `Invoice ${pluralise(s.overdueDays, "day")} overdue` }
        : { matched: false, reason: `Invoice ${pluralise(s.overdueDays, "day")} overdue` };
    case "misunderstood":
      return s.fallbackCount >= condition.count
        ? { matched: true, reason: `Assistant fell back ${s.fallbackCount} times` }
        : { matched: false, reason: `${s.fallbackCount} of ${condition.count} fallbacks` };
    case "repeat_contact": {
      const cutoff = s.now.getTime() - condition.withinDays * DAY_MS;
      const count = s.priorContacts.filter((c) => new Date(c.endedAt).getTime() >= cutoff).length;
      return count >= condition.count
        ? { matched: true, reason: `${count} contacts in ${condition.withinDays} days` }
        : { matched: false, reason: `${count} of ${condition.count} contacts in ${condition.withinDays} days` };
    }
    default: {
      const exhaustive: never = condition;
      return exhaustive;
    }
  }
}

function decisionFor(rule: RoutingRule, reason: string): RoutingDecision {
  return { action: rule.action, queue: rule.queue, priority: rule.priority, ruleId: rule.id, ruleName: rule.name, reason };
}

const FALLBACK: RoutingDecision = {
  action: "none",
  queue: "general",
  priority: "P3",
  ruleId: null,
  ruleName: null,
  reason: "No rule matched, so the hotelier goes to Customer Support",
};

/**
 * Evaluates every rule in order and explains each one.
 * - `live`: after each hotelier message, the first matching `handoff` rule moves them to a person.
 * - `handoff`: when a handoff happens, the first matching rule of either kind picks the queue and
 *   the ticket takes the most urgent priority of everything that matched.
 */
export function evaluateRouting(config: StudioConfig, signals: RoutingSignals, stage: "live" | "handoff"): RoutingOutcome {
  if (!config.routing.enabled) {
    return {
      decision: { ...FALLBACK, reason: "Routing is switched off" },
      matched: [],
      trace: config.routing.rules.map((r) => ({ ruleId: r.id, name: r.name, enabled: r.enabled, matched: false, reason: "Routing is switched off" })),
    };
  }
  const trace: RuleTrace[] = [];
  const matched: RoutingDecision[] = [];
  for (const rule of config.routing.rules) {
    if (!rule.enabled) {
      trace.push({ ruleId: rule.id, name: rule.name, enabled: false, matched: false, reason: "Rule is off" });
      continue;
    }
    const result = checkCondition(rule.condition, signals);
    trace.push({ ruleId: rule.id, name: rule.name, enabled: true, matched: result.matched, reason: result.reason });
    if (result.matched) matched.push(decisionFor(rule, result.reason));
  }
  if (stage === "live") {
    return { decision: matched.find((d) => d.action === "handoff") ?? FALLBACK, matched, trace };
  }
  const first = matched[0];
  if (!first) return { decision: FALLBACK, matched, trace };
  const priority = matched.reduce((p, d) => higherPriority(p, d.priority), first.priority);
  return { decision: { ...first, priority }, matched, trace };
}

export function describeCondition(condition: RuleCondition): string {
  switch (condition.kind) {
    case "keywords":
      if (condition.terms.length === 0) return "no words yet";
      return condition.terms.slice(0, 4).join(", ") + (condition.terms.length > 4 ? ` +${condition.terms.length - 4}` : "");
    case "sentiment":
      return `below ${condition.below} for ${condition.consecutive} messages`;
    case "event_within":
      return pluralise(condition.days, "day");
    case "event_at_risk":
      return `${pluralise(condition.days, "day")} with a channel down`;
    case "channel_issue":
      return condition.statuses.map((s) => CHANNEL_STATUS_LABELS[s].toLowerCase()).join(" or ");
    case "booking_status":
      return condition.statuses.map((s) => BOOKING_STATUS_LABELS[s].toLowerCase()).join(" or ");
    case "topic":
      return condition.topics.join(", ");
    case "plan":
      return condition.plans.map((p) => PLANS[p].name).join(" or ");
    case "property_size":
      return `${condition.minRooms}+ rooms`;
    case "invoice_overdue":
      return pluralise(condition.minDays, "day");
    case "misunderstood":
      return `${condition.count} times`;
    case "repeat_contact":
      return `${condition.count}+ times in ${condition.withinDays} days`;
    default: {
      const exhaustive: never = condition;
      return exhaustive;
    }
  }
}
