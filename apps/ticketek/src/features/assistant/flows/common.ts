import type { FlowNode } from "./types";

export const TOP_TOPIC_OPTIONS = [
  { label: "Where's my ticket?", next: "tickets" },
  { label: "Refunds & exchanges", next: "refunds" },
  { label: "Event changes", next: "changes" },
  { label: "Transfer tickets", next: "transfer" },
  { label: "Sell on Marketplace", next: "resale" },
  { label: "More topics", next: "menu" },
];

export const ALL_TOPIC_OPTIONS = [
  { label: "Where's my ticket?", next: "tickets" },
  { label: "Refunds & exchanges", next: "refunds" },
  { label: "Event changes", next: "changes" },
  { label: "Transfer tickets", next: "transfer" },
  { label: "Sell on Marketplace", next: "resale" },
  { label: "Event-day info", next: "eventday" },
  { label: "Accessible bookings", next: "accessible" },
  { label: "Group bookings", next: "groups" },
  { label: "Payments & vouchers", next: "payments" },
  { label: "Account & privacy", next: "account" },
  { label: "Find something to see", next: "discover.recs" },
];

export const commonNodes: FlowNode[] = [
  {
    id: "root",
    topic: "common",
    title: "Start",
    say: "Hi {firstName}, I'm Ticketek Support. {welcomeLine} What can I help you with?",
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
    keywords: ["sorted", "that worked", "all good", "found them", "thanks that's it"],
  },
  {
    id: "end",
    topic: "common",
    title: "Goodbye",
    say: "Thanks for chatting with Ticketek, {firstName}. Enjoy the show!",
    card: { kind: "success", title: "Chat complete", detail: "A copy of this conversation has been emailed to {email}." },
    options: [{ label: "Start a new chat", next: "root" }],
    keywords: ["bye", "goodbye", "that's all", "nothing else", "no thanks"],
  },
  {
    id: "signin",
    topic: "common",
    title: "Sign in",
    say: "Sign in to your Ticketek account and I'll be able to see your orders and sort this out much faster.",
    card: { kind: "info", title: "Sign in to Ticketek", body: "Use the email you bought your tickets with.", link: { label: "Sign in", to: "/login" } },
    options: [
      { label: "Continue without signing in", next: "menu" },
      { label: "Talk to a person", next: "handoff" },
    ],
    keywords: ["sign in", "log in", "login"],
  },
  {
    id: "order.missing",
    topic: "common",
    title: "Order not listed",
    say: "Orders only show in the account they were bought with. If a friend bought them, ask them to transfer the tickets to you. If you used a different email, I can resend the confirmation.",
    options: [
      { label: "Resend my tickets", next: "tickets.resend" },
      { label: "Talk to a person", next: "handoff" },
      { label: "Back to topics", next: "menu" },
    ],
    keywords: ["order isn't listed", "can't find my order", "order missing", "different email"],
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
    keywords: [
      "talk to a person",
      "speak to someone",
      "real person",
      "human",
      "agent",
      "live chat",
      "customer service",
      "complaint",
      "make a complaint",
    ],
  },
  {
    id: "safety",
    topic: "common",
    title: "Your safety",
    say: "I'm sorry, your safety comes first. If anyone is hurt or in danger, call triple zero (000) now, and at a venue find the nearest security or first aid staff. I'm getting a person from our team for you.",
    card: {
      kind: "contact",
      title: "Get help now",
      entries: [
        { label: "Emergency", phone: "000", note: "Police, fire or ambulance" },
        { label: "At the venue", phone: "Security or first aid", note: "Look for staff in hi-vis" },
      ],
    },
    options: [{ label: "Connect me with a person", next: "handoff" }],
  },
  {
    id: "handoff.call",
    topic: "common",
    title: "Call us",
    say: "Ticketek is mostly online, but these lines are staffed {phoneHours}.",
    card: {
      kind: "contact",
      title: "Call Ticketek",
      entries: [
        { label: "Accessible Bookings", phone: "1300 665 915", note: "Mon–Fri 9am–5pm AEST" },
        { label: "National Relay Service", phone: "133 677", note: "Then ask for 1300 665 915" },
      ],
    },
    options: [{ label: "Back to topics", next: "menu" }],
    keywords: ["phone number", "call you", "call ticketek", "contact number"],
  },
];
