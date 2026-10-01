import type { FlowNode } from "./types";

export const TOP_TOPIC_OPTIONS = [
  { label: "Channels & connectivity", next: "channels" },
  { label: "Reservations", next: "reservations" },
  { label: "Events & demand", next: "events" },
  { label: "Billing & subscription", next: "billing" },
  { label: "Rates & availability", next: "rates" },
  { label: "More topics", next: "menu" },
];

export const ALL_TOPIC_OPTIONS = [
  { label: "Channels & connectivity", next: "channels" },
  { label: "Reservations", next: "reservations" },
  { label: "Rates & availability", next: "rates" },
  { label: "Events & demand", next: "events" },
  { label: "Billing & subscription", next: "billing" },
  { label: "Payment support", next: "arrangements" },
  { label: "Account & users", next: "account" },
  { label: "Property changes", next: "property" },
  { label: "Urgent issues", next: "urgent" },
  { label: "Grow revenue", next: "grow" },
];

export const commonNodes: FlowNode[] = [
  {
    id: "root",
    topic: "common",
    title: "Start",
    say: "Hi {firstName}, I'm SiteMinder Support. {welcomeLine} What can I help you with?",
    options: TOP_TOPIC_OPTIONS,
  },
  {
    id: "menu",
    topic: "common",
    title: "Topics",
    say: "Sure. Which of these is closest to what you need?",
    options: [...ALL_TOPIC_OPTIONS, { label: "Talk to a person", next: "handoff" }],
    keywords: ["menu", "topics", "start again", "start over", "main menu", "something else", "other"],
  },
  {
    id: "fallback",
    topic: "common",
    title: "Not sure",
    say: "Sorry, I didn't quite catch that. Could you tell me a bit more, or pick the closest topic?",
    options: [...TOP_TOPIC_OPTIONS.slice(0, 5), { label: "Talk to a person", next: "handoff" }],
  },
  {
    id: "resolved",
    topic: "common",
    title: "All sorted",
    say: "Great, glad that's sorted. Is there anything else I can help with?",
    options: [
      { label: "Yes, something else", next: "menu" },
      { label: "No, that's all", next: "end" },
    ],
    keywords: ["sorted", "that worked", "all good", "fixed", "thanks that's it"],
  },
  {
    id: "end",
    topic: "common",
    title: "Goodbye",
    say: "Thanks for chatting with SiteMinder, {firstName}. Happy selling!",
    card: { kind: "success", title: "Chat complete", detail: "A transcript has been sent to {email} and saved against support code {supportCode}." },
    options: [{ label: "Start a new chat", next: "root" }],
    keywords: ["bye", "goodbye", "that's all", "nothing else", "no thanks"],
  },
  {
    id: "signin",
    topic: "common",
    title: "Log in",
    say: "Log in to SiteMinder and I'll be able to see your channels, bookings and invoices, so we can sort this out much faster.",
    card: { kind: "info", title: "Log in to SiteMinder", body: "Use the email you log in to the platform with.", link: { label: "Log in", to: "/login" } },
    options: [
      { label: "Continue without logging in", next: "menu" },
      { label: "Talk to a person", next: "handoff" },
    ],
    keywords: ["sign in", "log in", "login"],
  },
  {
    id: "record.missing",
    topic: "common",
    title: "Not listed",
    say: "I can only see records for {propertyName}. If it belongs to another property in your group, switch property in the platform first. Otherwise a specialist can track it down.",
    options: [
      { label: "Talk to a person", next: "handoff" },
      { label: "Back to topics", next: "menu" },
    ],
    keywords: ["isn't listed", "not listed", "can't find it", "different property"],
  },
  {
    id: "handoff",
    topic: "common",
    title: "Talk to a person",
    say: "No problem, I'll connect you with our {handoffTeam}. {handoffLine}",
    card: { kind: "handoff" },
    options: [
      { label: "Keep chatting with the assistant", next: "menu" },
      { label: "Call instead", next: "handoff.call" },
    ],
    keywords: ["talk to a person", "speak to someone", "real person", "human", "agent", "live chat", "customer service", "account manager", "complaint"],
  },
  {
    id: "safety",
    topic: "common",
    title: "Safety first",
    say: "I'm sorry, safety comes first. If anyone at the property is hurt or in danger, call triple zero (000) now. I'm getting a person from our team for you.",
    card: {
      kind: "contact",
      title: "Get help now",
      entries: [
        { label: "Emergency", phone: "000", note: "Police, fire or ambulance" },
        { label: "Outside Australia", phone: "112", note: "International emergency number" },
      ],
    },
    options: [{ label: "Connect me with a person", next: "handoff" }],
  },
  {
    id: "handoff.call",
    topic: "common",
    title: "Call us",
    say: "Our phone team is available {phoneHours}. Have your support code {supportCode} ready so we can find your property straight away.",
    card: {
      kind: "contact",
      title: "Call SiteMinder Support",
      entries: [
        { label: "Australia & New Zealand", phone: "1800 000 312", note: "Demo number · 24/7" },
        { label: "United Kingdom & Europe", phone: "+44 20 0000 0312", note: "Demo number · 24/7" },
        { label: "Americas", phone: "+1 555 000 0312", note: "Demo number · 24/7" },
      ],
    },
    options: [{ label: "Back to topics", next: "menu" }],
    keywords: ["phone number", "call you", "call siteminder", "contact number", "support code"],
  },
];
