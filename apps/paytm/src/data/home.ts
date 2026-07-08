export interface CategoryTile {
  id: string;
  label: string;
  icon: string;
  to: string;
}

/** Icon grid inside the home "Recharges & Bill Payments" card. */
export const homeCategoryTiles: CategoryTile[] = [
  { id: "mobile", label: "Mobile Recharge/Bill", icon: "/brand/icons/cat-mobile.png", to: "/recharge" },
  { id: "electricity", label: "Electricity Bill", icon: "/brand/icons/cat-electricity.png", to: "/electricity-bill-payment" },
  { id: "fastag", label: "FASTag Recharge", icon: "/brand/icons/cat-fastag.png", to: "/fastag-recharge" },
  { id: "dth", label: "DTH Recharge", icon: "/brand/icons/cat-dth.png", to: "/dth-recharge" },
  { id: "insurance", label: "Insurance Premium", icon: "/brand/icons/cat-insurance.png", to: "/insurance" },
  { id: "view-all", label: "View All Products", icon: "/brand/icons/cat-view-all.png", to: "/bill-payments" },
];

export interface QuickPayItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  cta: string;
  to: string;
}

/** Slim quick-pay strips under the hero card row. */
export const quickPayItems: QuickPayItem[] = [
  {
    id: "broadband",
    icon: "/brand/icons/cat-broadband.png",
    title: "Wifi, Landline or Broadband Bill Due?",
    subtitle: "Check the latest bill and pay it instantly",
    cta: "Pay Now",
    to: "/broadband-bill-payment",
  },
  {
    id: "loan-emi",
    icon: "/brand/icons/cat-loan-emi.png",
    title: "Loan EMI due?",
    subtitle: "Pay pending EMIs in a few simple steps",
    cta: "Pay Now",
    to: "/loan-emi-payment",
  },
];

export interface AppPromo {
  id: string;
  title: string;
  body: string;
  tint: string;
}

/** Three app-feature promo cards (swipe row on the real site). */
export const appPromos: AppPromo[] = [
  {
    id: "hide-payments",
    title: "Swipe left to keep it hush",
    body: "Hide any payment from your history with one gesture and reveal it only when you want.",
    tint: "#fdeef1",
  },
  {
    id: "expense-tracking",
    title: "Expense tracking made smarter",
    body: "Auto-categorised spends with monthly summaries you can export any time.",
    tint: "#e9f3ff",
  },
  {
    id: "balance-check",
    title: "We do the math, you do the spending",
    body: "Check the live balance of all your linked bank accounts in one place.",
    tint: "#fff6e6",
  },
];

export interface UpiFeature {
  title: string;
  body: string;
}

export const upiFeatures: UpiFeature[] = [
  { title: "Send to any UPI app", body: "Pay any UPI ID or QR — the receiver doesn't need this app." },
  { title: "Direct from bank", body: "Money moves account-to-account in real time, 24x7, even on holidays." },
  { title: "Scan & pay anywhere", body: "One scanner for shops, bills, autos, and friends." },
  { title: "Payment reminders", body: "Never miss rent or an EMI with scheduled reminders and autopay." },
];

export interface InfoSection {
  heading: string;
  paragraphs: string[];
}

/** Long-form original copy blocks near the bottom of the homepage. */
export const homeInfoSections: InfoSection[] = [
  {
    heading: "Pay with UPI, straight from your bank",
    paragraphs: [
      "Link your bank account once and every payment — to a friend, a shop, or a bill — moves instantly over UPI with your PIN as the only key. There's no wallet to load and no waiting for settlements: the amount leaves your account and lands in theirs in seconds.",
      "Set up autopay for the payments you make every month, split expenses after a trip, and request money with a tap. A categorised statement keeps every rupee accounted for.",
    ],
  },
  {
    heading: "Every bill, one place",
    paragraphs: [
      "From prepaid recharges and electricity bills to FASTag top-ups, broadband dues, piped gas, water, and school fees — the bills you juggle across a dozen websites live together here, with reminders before every due date.",
      "Saved billers mean the next payment takes seconds: pick the account, confirm the amount, done. Receipts stay in your history for whenever you need them.",
    ],
  },
  {
    heading: "Travel that starts on time",
    paragraphs: [
      "Search flights across airlines with student, armed-forces, and senior-citizen fares built in. Book train tickets with live seat availability and check PNR status without leaving the page. For road trips, compare bus operators on ratings, boarding points, and punctuality.",
      "Free cancellation options, instant refunds to source, and gate-change alerts keep the journey as smooth as the booking.",
    ],
  },
  {
    heading: "Movies, events, and weekend plans",
    paragraphs: [
      "Grab movie tickets with seat-level selection at cinemas near you, or discover concerts, comedy nights, and plays in your city. Offers land automatically at checkout — no coupon hunting required.",
    ],
  },
];
