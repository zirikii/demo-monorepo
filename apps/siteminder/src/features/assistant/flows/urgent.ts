import type { FlowNode } from "./types";

export const urgentNodes: FlowNode[] = [
  {
    id: "urgent",
    topic: "urgent",
    title: "Urgent issues",
    say: "Let's move fast. What's happening?",
    options: [
      { label: "We're overbooked or a guest is at the desk", next: "urgent.overbooking" },
      { label: "None of my channels are working", next: "urgent.down" },
      { label: "Suspicious email or someone in my account", next: "urgent.security" },
      { label: "Card fraud or a chargeback", next: "urgent.fraud" },
    ],
    keywords: ["urgent", "emergency", "asap", "right now", "critical"],
  },
  {
    id: "urgent.overbooking",
    topic: "urgent",
    title: "Overbooking",
    say: "Let's look after the guest first, then stop it happening again. I'm closing the oversold room type on every channel as soon as you confirm, and an urgent reservations specialist can help you rebook.",
    card: {
      kind: "urgent",
      title: "Overbooked — do this now",
      steps: [
        "Check the guest in if any room can be upgraded, or walk them to a nearby partner hotel",
        "Close the oversold room type for the night on every channel",
        "Find the channel the extra booking came from in Reservations",
        "Ask an urgent reservations specialist to check for a sync gap",
      ],
    },
    options: [
      { label: "Close the room on all channels", next: "reservations.closeout" },
      { label: "Get an urgent specialist", next: "handoff" },
    ],
    keywords: ["overbooked", "overbooking", "double booked", "guest at the desk", "no room for the guest", "walk the guest", "oversold"],
  },
  {
    id: "urgent.down",
    topic: "urgent",
    title: "All channels down",
    say: "{statusLine} If none of your channels are updating, check your internet access to the platform first, then I'll get a specialist.",
    card: { kind: "platform-status" },
    options: [
      { label: "Get an urgent specialist", next: "handoff" },
      { label: "It's only one channel", next: "channels" },
    ],
    keywords: ["all channels down", "nothing is syncing", "everything is down", "platform down", "siteminder is down"],
  },
  {
    id: "urgent.security",
    topic: "urgent",
    title: "Account security",
    say: "Don't click any links in the email. SiteMinder will never ask for your password or card details by email or phone. I'm resetting your two-factor and connecting you with our Trust & Safety team.",
    card: {
      kind: "urgent",
      title: "Protect your account",
      steps: [
        "Don't click links or open attachments in the suspicious email",
        "Change your SiteMinder password from the login page, not from the email",
        "Check Team for users you don't recognise and remove them",
        "Forward the email to Trust & Safety, then delete it",
      ],
    },
    options: [
      { label: "Connect me with Trust & Safety", next: "handoff" },
      { label: "Reset my two-factor now", next: "account.login.mfa" },
    ],
    keywords: ["phishing", "suspicious email", "scam email", "hacked", "someone logged in", "fake booking.com email", "compromised"],
  },
  {
    id: "urgent.fraud",
    topic: "urgent",
    title: "Card fraud",
    say: "I'm sorry. If a guest's card was used fraudulently or you've received a chargeback on a SiteMinder Pay payment, our payments team can pause the payout and help you respond before the deadline.",
    card: {
      kind: "urgent",
      title: "Chargeback or fraud",
      steps: [
        "Don't refund outside SiteMinder Pay — it can cost you twice",
        "Note the booking reference and the chargeback deadline",
        "Gather the booking confirmation, ID check and signed registration card",
        "Our payments team will submit the evidence with you",
      ],
    },
    options: [
      { label: "Talk to the payments team", next: "handoff" },
      { label: "Back to urgent issues", next: "urgent" },
    ],
    keywords: ["chargeback", "fraud", "fraudulent", "stolen card", "dispute"],
  },
];
