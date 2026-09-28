import type { FlowNode } from "./types";

export const TOPIC_MENU_OPTIONS = [
  { label: "Billing & payments", next: "billing" },
  { label: "Internet & mobile", next: "netmob" },
  { label: "Moving house", next: "moving" },
  { label: "Meters & readings", next: "meters" },
  { label: "My account & plan", next: "account" },
  { label: "Payment support", next: "support" },
  { label: "Outages & emergencies", next: "emergency" },
  { label: "Solar & batteries", next: "solar" },
];

export const commonNodes: FlowNode[] = [
  {
    id: "root",
    topic: "common",
    title: "Start",
    say: "Hi {firstName}, I'm the AGL Assistant. What's your query today? Pick a topic, or just tell me in your own words.",
    options: TOPIC_MENU_OPTIONS,
  },
  {
    id: "menu",
    topic: "common",
    title: "Topics",
    say: "No worries. Which of these is closest to what you need?",
    options: [...TOPIC_MENU_OPTIONS, { label: "Talk to a person", next: "handoff" }],
    keywords: ["menu", "topics", "start again", "start over", "main menu", "something else", "other"],
  },
  {
    id: "fallback",
    topic: "common",
    title: "Not sure",
    say: "Sorry, I didn't quite catch that. Could you tell me a bit more, or pick the closest topic?",
    options: [...TOPIC_MENU_OPTIONS, { label: "Talk to a person", next: "handoff" }],
  },
  {
    id: "resolved",
    topic: "common",
    title: "All sorted",
    say: "Great, glad that's sorted. Is there anything else I can help with today?",
    options: [
      { label: "Yes, something else", next: "menu" },
      { label: "No, that's all", next: "end" },
    ],
    keywords: ["fixed", "sorted", "working now", "that worked", "all good", "thanks that's it"],
  },
  {
    id: "end",
    topic: "common",
    title: "Goodbye",
    say: "Thanks for chatting with AGL, {firstName}. Have a great day.",
    card: { kind: "success", title: "Chat complete", detail: "A transcript has been saved to My Account › Messages." },
    options: [{ label: "Start a new chat", next: "root" }],
    keywords: ["bye", "goodbye", "that's all", "nothing else", "no thanks"],
  },
  {
    id: "handoff",
    topic: "common",
    title: "Talk to a person",
    say: "No problem. I'll connect you with one of our team. I've passed on everything we've covered so you won't need to repeat yourself.",
    card: { kind: "handoff" },
    options: [
      { label: "Keep chatting with the assistant", next: "menu" },
      { label: "Call 131 245 instead", next: "handoff.call" },
    ],
    keywords: [
      "talk to a person",
      "speak to someone",
      "real person",
      "human",
      "agent",
      "operator",
      "customer service",
      "complaint",
      "make a complaint",
    ],
  },
  {
    id: "handoff.call",
    topic: "common",
    title: "Call us",
    say: "You can call us on 131 245. For life support or emergencies, we're available any time.",
    card: {
      kind: "contact",
      title: "Call AGL",
      entries: [
        { label: "General enquiries", phone: "131 245", note: "Hours depend on your query" },
        { label: "Staying Connected (hardship)", phone: "1300 659 925" },
        { label: "National Relay Service", phone: "133 677", note: "Quote 1300 664 358" },
      ],
    },
    options: [{ label: "Back to topics", next: "menu" }],
    keywords: ["phone number", "call you", "call agl", "contact number"],
  },
];
