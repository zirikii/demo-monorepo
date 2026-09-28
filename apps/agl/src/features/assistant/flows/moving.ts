import type { FlowNode } from "./types";

export const movingNodes: FlowNode[] = [
  {
    id: "moving",
    topic: "moving",
    title: "Moving house",
    say: "Moving house, exciting! I can move your services in a couple of minutes. What would you like to do?",
    options: [
      { label: "Move my electricity and gas", next: "moving.energy" },
      { label: "Move my internet", next: "moving.internet" },
      { label: "Just disconnect my old address", next: "moving.disconnect" },
      { label: "Are there any moving fees?", next: "moving.fees" },
    ],
    keywords: ["moving", "move house", "moving house", "new address", "relocating", "i'm moving", "im moving"],
  },
  {
    id: "moving.energy",
    topic: "moving",
    title: "Move energy",
    say: "Let's get power and gas on at your new place. What's the new address, and what day do you get the keys?",
    card: { kind: "form", form: "move-request", next: "moving.energy.done" },
    options: [{ label: "Actually, just disconnect my old address", next: "moving.disconnect" }],
    keywords: ["move my electricity", "move my gas", "move my energy", "connect power", "connect electricity"],
  },
  {
    id: "moving.energy.done",
    topic: "moving",
    title: "Move booked",
    say: "You're all set. Power and gas will be on at {newAddress} from {moveDate}, and we'll disconnect {shortAddress} the same day. Because you moved online, you'll also get a 100 dollar bill credit.",
    card: {
      kind: "success",
      title: "Move booked",
      detail: "Connect {newAddress} · {moveDate} · Power On Guarantee · $100 online movers credit",
    },
    options: [
      { label: "Move my internet too", next: "moving.internet" },
      { label: "That's everything", next: "resolved" },
    ],
  },
  {
    id: "moving.internet",
    topic: "moving",
    title: "Move internet",
    say: "Good news, your new address can get nbn fibre, so your Home Fast plan will move across with no change. We'll send a new modem only if you need one.",
    card: {
      kind: "info",
      title: "nbn® at your new address",
      body: "Connection type: FTTP · Home Fast nbn® 100 moves with you · Relocation fee waived",
    },
    options: [
      { label: "Book the internet move", next: "moving.internet.done" },
      { label: "Move my electricity and gas too", next: "moving.energy" },
    ],
    keywords: ["move my internet", "move nbn", "move broadband", "internet at new address"],
  },
  {
    id: "moving.internet.done",
    topic: "moving",
    title: "Internet move booked",
    say: "Booked. Your internet will move on your moving day and we'll text you when it's live.",
    card: { kind: "success", title: "Internet move booked", detail: "Home Fast nbn® 100 · SMS confirmation on activation" },
    options: [{ label: "Thanks", next: "resolved" }],
  },
  {
    id: "moving.disconnect",
    topic: "moving",
    title: "Disconnect old address",
    say: "I can disconnect electricity and gas at {shortAddress}. We need at least 3 business days' notice. When would you like it done?",
    options: [
      { label: "This Friday", next: "moving.disconnect.done", set: { disconnectDate: "Friday 2 October" } },
      { label: "Next Monday", next: "moving.disconnect.done", set: { disconnectDate: "Monday 5 October" } },
      { label: "End of the month", next: "moving.disconnect.done", set: { disconnectDate: "Friday 30 October" } },
    ],
    keywords: ["disconnect", "cancel electricity", "cancel gas", "close my account", "move out", "moving out", "cancel my account"],
  },
  {
    id: "moving.disconnect.done",
    topic: "moving",
    title: "Disconnection booked",
    say: "Done. Electricity and gas at {shortAddress} will be disconnected on {disconnectDate}. Your final bill will arrive about a week later.",
    card: { kind: "success", title: "Disconnection booked", detail: "{shortAddress} · {disconnectDate} · Final bill within 10 days" },
    options: [
      { label: "Set up my new address too", next: "moving.energy" },
      { label: "That's all", next: "resolved" },
    ],
  },
  {
    id: "moving.fees",
    topic: "moving",
    title: "Moving fees",
    say: "Your distributor may charge a small connection fee, usually between 15 and 50 dollars, which appears on your first bill. There's no AGL fee to move, and with our Power On Guarantee your power will be on the day you move in.",
    card: {
      kind: "steps",
      title: "Moving costs",
      steps: ["No AGL moving fee", "Distributor connection fee: ~$15–$50 (on first bill)", "Power On Guarantee — or we'll credit you", "$100 online movers bill credit on eligible plans"],
    },
    options: [
      { label: "Start my move", next: "moving.energy" },
      { label: "Thanks", next: "resolved" },
    ],
    keywords: ["moving fee", "connection fee", "cost to move", "power on guarantee"],
  },
];
