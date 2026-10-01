import { toLocalIso } from "@/lib/clock";
import type { ConversationRecord } from "./types";

function hoursAgo(h: number): string {
  return toLocalIso(new Date(Date.now() - h * 3_600_000));
}

export function seedLog(): ConversationRecord[] {
  return [
    {
      id: "conv-seed-1",
      ref: "TKS-20418",
      startedAt: hoursAgo(2.2),
      endedAt: hoursAgo(2.1),
      fanName: "Priya S.",
      signedIn: true,
      channel: "voice",
      engine: "grok",
      outcome: "handoff",
      queue: "event-day",
      priority: "P1",
      ruleName: "Event in the next 48 hours",
      topics: ["tickets"],
      trail: ["tickets", "tickets.mobile", "tickets.inactive", "handoff"],
      turns: 4,
      transcript: [
        { role: "assistant", text: "Hi Priya, I'm Ticketek Support. Mrs Doubtfire is tomorrow night — your tickets are live in the app." },
        { role: "fan", text: "My ticket says this ticket is no longer active" },
        { role: "assistant", text: "That usually means the barcode was replaced after a transfer or resale." },
        { role: "fan", text: "I didn't transfer it" },
        { role: "system", text: "Routing: Event in the next 48 hours → Event Day desk, P1" },
      ],
    },
    {
      id: "conv-seed-2",
      ref: "TKS-20412",
      startedAt: hoursAgo(5),
      endedAt: hoursAgo(4.9),
      fanName: "Marcus T.",
      signedIn: true,
      channel: "chat",
      engine: "grok",
      outcome: "resolved",
      topics: ["refunds"],
      trail: ["refunds", "refunds.cancelled", "resolved", "end"],
      turns: 3,
      transcript: [
        { role: "fan", text: "my show got cancelled how do i get my money back" },
        { role: "assistant", text: "Outback Truckers Live was cancelled, so a full refund goes back to your card automatically within 30 days." },
        { role: "fan", text: "great thanks" },
      ],
    },
    {
      id: "conv-seed-3",
      ref: "TKS-20397",
      startedAt: hoursAgo(9),
      endedAt: hoursAgo(8.8),
      fanName: "Guest",
      signedIn: false,
      channel: "chat",
      engine: "scripted",
      outcome: "handoff",
      queue: "relations",
      priority: "P1",
      ruleName: "Scam or account fraud",
      topics: ["tickets"],
      trail: ["tickets", "order.missing", "handoff"],
      turns: 2,
      transcript: [
        { role: "fan", text: "I bought tickets on facebook and they say fake ticket at the gate" },
        { role: "system", text: "Routing: Scam or account fraud → Customer Relations, P1" },
      ],
    },
    {
      id: "conv-seed-4",
      ref: "TKS-20388",
      startedAt: hoursAgo(26),
      endedAt: hoursAgo(25.8),
      fanName: "Helen W.",
      signedIn: true,
      channel: "chat",
      engine: "grok",
      outcome: "handoff",
      queue: "accessibility",
      priority: "P2",
      ruleName: "Accessibility needs",
      topics: ["accessibility"],
      trail: ["accessible", "accessible.form", "accessible.done", "handoff"],
      turns: 3,
      transcript: [
        { role: "fan", text: "I need wheelchair seating for Swan Lake" },
        { role: "assistant", text: "Tell me the event and what you need, and our Accessibility team will hold the right seats." },
        { role: "fan", text: "Can someone call me instead?" },
      ],
    },
  ];
}
