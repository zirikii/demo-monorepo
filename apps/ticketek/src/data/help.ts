export type HelpCategory = { id: string; title: string; description: string };

export type HelpArticle = {
  slug: string;
  category: string;
  title: string;
  body: string[];
  /** Support assistant step that resolves this question for a signed-in fan. */
  assist?: { step: string; label: string };
};

export const HELP_CATEGORIES: HelpCategory[] = [
  { id: "delivery", title: "Ticket Delivery", description: "Mobile tickets, EzyTickets, collection and posted tickets" },
  { id: "event-updates", title: "Event Updates", description: "Cancelled, rescheduled and changed events" },
  { id: "refunds", title: "Refunds & Exchanges", description: "What's refundable, Ticket Protect and timeframes" },
  { id: "marketplace", title: "Transfers & Marketplace", description: "Send tickets to friends or resell them safely" },
  { id: "buying", title: "Buying Tickets", description: "Payments, fees, presales and gift vouchers" },
  { id: "accessibility", title: "Accessibility", description: "Accessible seating and Companion Card" },
  { id: "account", title: "My Account", description: "Sign in, details, marketing and privacy" },
  { id: "about", title: "About Ticketek", description: "Policies and company information" },
];

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "mobile-tickets",
    category: "delivery",
    title: "When will my mobile tickets appear?",
    body: [
      "App/Mobile Tickets appear in the Ticketek app under My Tickets. For most events, the barcode unlocks 48 hours before the start time to stop screenshots and scalping.",
      "Sign in to the app with the email you bought the tickets with. Screenshots won't scan — the barcode refreshes on screen.",
    ],
    assist: { step: "tickets", label: "Find my tickets" },
  },
  {
    slug: "ezytickets",
    category: "delivery",
    title: "I haven't received my EzyTicket",
    body: [
      "EzyTickets are emailed as a PDF, usually within 24 hours of purchase. Check your junk folder, and search your inbox for 'Ticketek'.",
      "You can resend them from My Account, or ask Ticketek Support to send them again.",
    ],
    assist: { step: "tickets", label: "Resend my tickets" },
  },
  {
    slug: "collection",
    category: "delivery",
    title: "Collecting tickets at the venue",
    body: [
      "Venue collection tickets can be picked up from the box office from 90 minutes before the show. Bring photo ID and the card you paid with.",
      "If someone else is collecting, they need a signed authority and a copy of your photo ID.",
    ],
  },
  {
    slug: "event-cancelled",
    category: "event-updates",
    title: "My event has been cancelled",
    body: [
      "If an event is cancelled, you don't need to do anything. We refund the full amount, including fees, to your original payment method automatically — usually within 30 days.",
      "Any part paid with a gift voucher comes back as a new voucher.",
    ],
    assist: { step: "changes", label: "Check my event" },
  },
  {
    slug: "event-rescheduled",
    category: "event-updates",
    title: "My event has been rescheduled",
    body: [
      "When a show moves, your tickets and seats carry over to the new date automatically.",
      "If you can't make the new date, you can request a refund until 7 days before it.",
    ],
    assist: { step: "refunds", label: "Request a refund" },
  },
  {
    slug: "purchase-policy",
    category: "refunds",
    title: "Purchase Policy",
    body: [
      "Tickets can't be refunded or exchanged for a change of mind, unless the event is cancelled, rescheduled or significantly changed, or the purchase is covered by Ticket Protect.",
      "Tickets must only be bought from Ticketek or Ticketek Marketplace. Tickets resold elsewhere may be cancelled without refund.",
      "This demo summarises the policy for illustration only.",
    ],
  },
  {
    slug: "ticket-protect",
    category: "refunds",
    title: "How does Ticket Protect work?",
    body: [
      "Ticket Protect is optional cover added at checkout. If you can't attend because of illness, injury, transport breakdown or another covered reason, you can claim back the ticket price.",
      "Claims are lodged online with supporting evidence, like a medical certificate.",
    ],
    assist: { step: "refunds", label: "Start a claim" },
  },
  {
    slug: "transfer-tickets",
    category: "marketplace",
    title: "Transferring tickets to a friend",
    body: [
      "App/Mobile Tickets for upcoming events can be sent to a friend's Ticketek account from the app or My Account.",
      "Your friend gets an email to accept. Once they do, your barcodes stop working and theirs go live.",
    ],
    assist: { step: "transfer", label: "Transfer my tickets" },
  },
  {
    slug: "marketplace-fan-to-fan",
    category: "marketplace",
    title: "Marketplace (Fan to Fan) resale",
    body: [
      "Can't go? List your App/Mobile Tickets on Marketplace, up to the original price. Every sold ticket is reissued with a new barcode, so it's safe for buyers and sellers.",
      "Listings close 2 hours before the event. Sellers are paid within 7 business days after the event, less a 10% fee.",
    ],
    assist: { step: "resale", label: "Sell my tickets" },
  },
  {
    slug: "fees",
    category: "buying",
    title: "What fees will I pay?",
    body: [
      "Ticket prices include GST. Each ticket has a service fee, each order a handling fee of $6.95, and posted souvenir tickets cost $8.50. All fees show before you pay.",
    ],
  },
  {
    slug: "payment-declined",
    category: "buying",
    title: "My payment was declined",
    body: [
      "Declines usually come from your bank's fraud checks. Check the card details and billing postcode, make sure the card is enabled for online purchases, or try another card or Afterpay.",
    ],
    assist: { step: "payments", label: "Get payment help" },
  },
  {
    slug: "accessible-seating",
    category: "accessibility",
    title: "Booking wheelchair and easy-access seats",
    body: [
      "Many events let you choose accessible seating online. For others, call Accessible Bookings on 1300 665 915 (Mon–Fri 9am–5pm AEST), or send a request through Ticketek Support.",
    ],
    assist: { step: "accessible", label: "Request accessible seating" },
  },
  {
    slug: "companion-card",
    category: "accessibility",
    title: "Using a Companion Card",
    body: [
      "Companion Card holders get a free ticket for their companion at participating events. Choose the Companion Card price type at checkout and bring the card to the venue.",
    ],
  },
  {
    slug: "reset-password",
    category: "account",
    title: "Resetting your password",
    body: ["Choose 'Forgot password' on the sign-in page and we'll email you a reset link. Links expire after 60 minutes."],
    assist: { step: "account", label: "Account help" },
  },
  {
    slug: "privacy-policy",
    category: "account",
    title: "Privacy Policy",
    body: [
      "Ticketek collects the personal information needed to sell and deliver tickets and to keep events safe. You can request access to, correction of, or deletion of your data at any time.",
      "This demo summarises the policy for illustration only.",
    ],
    assist: { step: "account.erasure", label: "Request data deletion" },
  },
  {
    slug: "terms-of-use",
    category: "about",
    title: "Terms of Use",
    body: ["Use of this demo site is for illustration only. No real tickets are sold."],
  },
  {
    slug: "about-ticketek",
    category: "about",
    title: "About Ticketek",
    body: [
      "Ticketek is Australia's leading ticketing company, part of TEG, selling tickets for many of the country's biggest concerts, sporting events, theatre and festivals.",
      "This demo is an unofficial recreation and is not affiliated with Ticketek or TEG.",
    ],
  },
];

export const REQUEST_TYPES = [
  "Where are my tickets?",
  "Refund request",
  "Event cancelled or rescheduled",
  "Transfer tickets",
  "Marketplace (Fan to Fan)",
  "Accessible booking",
  "Payment issue",
  "Account & privacy",
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number];

/** Instant-answer step offered before a fan submits a request. */
export const REQUEST_ASSIST: Record<RequestType, string> = {
  "Where are my tickets?": "tickets",
  "Refund request": "refunds",
  "Event cancelled or rescheduled": "changes",
  "Transfer tickets": "transfer",
  "Marketplace (Fan to Fan)": "resale",
  "Accessible booking": "accessible",
  "Payment issue": "payments",
  "Account & privacy": "account",
};

export function getArticle(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}
