import type { TopicId } from "@/features/assistant/flows/types";

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  /** The assistant flow step that answers the same question, so "Ask AGL Assistant" can deep-link. */
  assistantStep?: string;
  sections: { heading: string; body?: string; steps?: string[] }[];
};

export type HelpCategory = {
  slug: string;
  title: string;
  description: string;
  icon: "receipt" | "user" | "truck" | "heart" | "alert" | "shield";
  assistantTopic?: TopicId;
  articles: HelpArticle[];
};

export const helpCategories: HelpCategory[] = [
  {
    slug: "billing-payments",
    title: "Billing and payments",
    description: "Make payments and understand billing.",
    icon: "receipt",
    assistantTopic: "billing",
    articles: [
      {
        slug: "how-billing-works",
        title: "How billing works",
        summary: "When you'll get your bill, what's on it and how we calculate your charges.",
        assistantStep: "billing.understand",
        sections: [
          {
            heading: "When you'll be billed",
            body: "Electricity and gas are usually billed quarterly, or monthly if you've chosen monthly billing. Internet and mobile are billed monthly in advance.",
          },
          {
            heading: "What's on your bill",
            steps: [
              "Your amount due and due date on the first page",
              "Supply charges — a fixed daily charge for being connected",
              "Usage charges — what you used, in kWh (electricity) or MJ (gas)",
              "Whether your bill used an actual or estimated meter read",
              "Credits, concessions and the Energy Bill Relief Fund rebate",
            ],
          },
        ],
      },
      {
        slug: "ways-to-pay-your-bill",
        title: "Ways to pay your bill",
        summary: "Pay in the AGL app, online, by direct debit, BPAY®, PayPal and more.",
        assistantStep: "billing.pay.other",
        sections: [
          {
            heading: "Flexible payment options",
            steps: [
              "AGL app — one-touch payments with your stored payment method",
              "Direct Debit — automatic payments from your bank account or card",
              "Pay online — with your card or PayPal",
              "BPAY® — use the biller code and reference on your bill",
              "SMS Pay — reply 'Pay' to the text we send before your due date",
              "Centrepay, Australia Post or the AGL Payment line",
            ],
          },
        ],
      },
      {
        slug: "unexpected-high-bill",
        title: "Unexpected high energy bill",
        summary: "Possible reasons your electricity or gas bill is higher and how to manage it.",
        assistantStep: "billing.high",
        sections: [
          {
            heading: "Common reasons",
            steps: [
              "Seasonal heating or cooling — winter bills are often the highest",
              "An estimated meter read that's higher than your actual use",
              "More people at home, or new appliances",
              "A change in your energy rates",
            ],
          },
          {
            heading: "What you can do",
            body: "Compare your usage in the AGL app, submit a meter read if your bill was estimated, or talk to us about a payment extension if you need more time.",
          },
        ],
      },
      {
        slug: "understand-your-energy-prices",
        title: "Understand your energy prices",
        summary: "What affects your rates and how to get the most value from your plan.",
        sections: [
          {
            heading: "What goes into your price",
            body: "Wholesale energy costs, network charges set by your distributor, environmental schemes and retail costs all make up your rates. Prices usually change on 1 July each year.",
          },
        ],
      },
    ],
  },
  {
    slug: "account-setup-management",
    title: "Account set-up and management",
    description: "Set up and manage your services, check plan details and more.",
    icon: "user",
    assistantTopic: "account",
    articles: [
      {
        slug: "using-agl-assistant",
        title: "Using the AGL Assistant",
        summary: "Get instant answers 24/7 — by chat or by voice.",
        sections: [
          {
            heading: "Fast answers to everyday questions",
            body: "Our AGL Assistant is available 24/7 and replies straight away. If your question needs a human, it will connect you to the right person with everything you've already told it.",
          },
          {
            heading: "Things you can ask",
            steps: [
              "“I'm moving. I need to disconnect electricity and gas.”",
              "“Add my concession, health or seniors card.”",
              "“My internet keeps dropping out.”",
              "“I want a credit refund.”",
            ],
          },
          {
            heading: "Talk instead of type",
            body: "Select Voice in the chat window to talk to the AGL Assistant hands-free. It follows the same steps you see on screen, so you can switch between voice and chat at any time.",
          },
        ],
      },
      {
        slug: "update-mailing-address",
        title: "Update your mailing address",
        summary: "Change where we send your bills and letters.",
        assistantStep: "account.address",
        sections: [{ heading: "How to update it", body: "Log in to My Account, or ask the AGL Assistant to update it for you in a few seconds." }],
      },
      {
        slug: "concession-cards",
        title: "Add a concession, health or seniors card",
        summary: "Make sure you're getting the concessions you're entitled to.",
        assistantStep: "account.concession",
        sections: [
          {
            heading: "Eligible cards",
            steps: ["Pensioner Concession Card", "Health Care Card", "DVA Gold Card", "Commonwealth Seniors Health Card (state rules apply)"],
          },
        ],
      },
    ],
  },
  {
    slug: "moving-meters-installations",
    title: "Moving, meters and installations",
    description: "Learn about moving house, meter reads and installations.",
    icon: "truck",
    assistantTopic: "moving",
    articles: [
      {
        slug: "move-house",
        title: "Move house with AGL",
        summary: "Move your electricity, gas and internet in a few minutes.",
        assistantStep: "moving",
        sections: [
          {
            heading: "Before you move",
            steps: [
              "Tell us at least 3 business days before you move",
              "Check your new address for power, gas and nbn® connection type",
              "Make sure there's clear access to the meter",
            ],
          },
        ],
      },
      {
        slug: "submit-meter-read",
        title: "Submit a meter read",
        summary: "Send us a read to avoid an estimated bill.",
        assistantStep: "meters.submit",
        sections: [
          {
            heading: "How to read your meter",
            steps: ["Find your meter number on your bill", "Read the numbers from left to right, ignoring red digits", "Submit in the AGL app, My Account or the AGL Assistant"],
          },
        ],
      },
      {
        slug: "smart-meters",
        title: "Smart meters",
        summary: "What a smart meter is and how to get one installed.",
        assistantStep: "meters.smart",
        sections: [{ heading: "Benefits", steps: ["No more estimated bills", "Hourly usage insights in the AGL app", "Access to time-of-use and EV plans"] }],
      },
    ],
  },
  {
    slug: "financial-support",
    title: "Financial support",
    description: "Support options, concessions and rebates to help with bills.",
    icon: "heart",
    assistantTopic: "support",
    articles: [
      {
        slug: "payment-extensions-instalment-plans",
        title: "Payment extensions and instalment plans",
        summary: "Delay a payment or pay smaller amounts more often.",
        assistantStep: "support.extension",
        sections: [
          {
            heading: "Options",
            steps: [
              "Payment extension — more time to pay a bill",
              "Instalment plan — weekly, fortnightly or monthly payments",
              "Payment arrangement — up to 12 months (NSW, QLD, SA) or 24 months (VIC)",
            ],
          },
          { heading: "Staying Connected", body: "If you're facing ongoing hardship, call our Staying Connected team on 1300 659 925." },
        ],
      },
      {
        slug: "energy-bill-relief-fund",
        title: "Energy Bill Relief Fund",
        summary: "Government rebates paid in quarterly instalments on your electricity bill.",
        assistantStep: "support.rebates",
        sections: [{ heading: "How it's applied", body: "Eligible residential and small business customers receive the rebate automatically as a credit on their electricity bill." }],
      },
    ],
  },
  {
    slug: "emergencies-outages",
    title: "Emergencies and outages",
    description: "How we can help if there's extreme weather or an outage.",
    icon: "alert",
    assistantTopic: "emergency",
    articles: [
      {
        slug: "power-outages",
        title: "Power outages",
        summary: "What to do if your power goes out.",
        assistantStep: "emergency.power",
        sections: [
          { heading: "In an emergency", body: "Call 000 if there's an emergency or you need immediate medical attention. If you rely on life support, follow your action plan." },
          {
            heading: "Check your home",
            steps: ["Check your fuse box — has the main switch or a safety switch tripped?", "Check if neighbours have power", "Contact your distributor — their number is under 'Faults and Emergencies' on your bill"],
          },
        ],
      },
      {
        slug: "gas-leaks-safety",
        title: "Gas leaks and safety",
        summary: "What to do if you smell gas.",
        assistantStep: "emergency.gas",
        sections: [
          {
            heading: "If you can smell gas",
            steps: [
              "Turn off gas appliances and the gas at the meter if it's safe",
              "Open windows and avoid naked flames or switches",
              "From outside, call a licensed gas fitter and your gas distributor",
            ],
          },
        ],
      },
      {
        slug: "internet-troubleshooting",
        title: "Internet troubleshooting and outages",
        summary: "Try these steps if your internet is not working, dropping out or too slow.",
        assistantStep: "internet.down",
        sections: [
          {
            heading: "Troubleshooting steps",
            steps: ["Check your Wi-Fi is turned on", "Turn your modem off for 30 seconds, then on again", "Reset the nbn® connection box", "If it's slow, run an isolation test and a wired speed test"],
          },
        ],
      },
      {
        slug: "mobile-troubleshooting",
        title: "Mobile troubleshooting and support",
        summary: "Get your AGL mobile service running smoothly.",
        assistantStep: "mobile.signal",
        sections: [
          { heading: "My phone isn't connecting", steps: ["Turn your phone off", "Remove the SIM, wipe it with a dry cloth and reinsert", "Turn your phone on and wait 1–2 minutes"] },
          { heading: "Mobile data settings", body: "Set the APN to 'yesinternet'. AGL mobile uses the Optus Mobile Network." },
        ],
      },
    ],
  },
  {
    slug: "online-security",
    title: "Looking after your online security",
    description: "Protect yourself from scams and boost your account security.",
    icon: "shield",
    articles: [
      {
        slug: "scams-phishing-fraud",
        title: "Scams, phishing and fraud",
        summary: "How to spot a scam that pretends to be from AGL.",
        sections: [{ heading: "We'll never", steps: ["Ask for your password or 2FA code", "Threaten immediate disconnection by SMS", "Ask you to pay with gift cards"] }],
      },
      {
        slug: "two-factor-authentication",
        title: "Added security with 2FA",
        summary: "Turn on two-factor authentication or create a passkey.",
        assistantStep: "account.login",
        sections: [{ heading: "Set up 2FA", steps: ["Log in to My Account", "Go to Profile › Security", "Choose SMS code or a passkey"] }],
      },
    ],
  },
];

export function findCategory(slug: string | undefined): HelpCategory | undefined {
  return helpCategories.find((c) => c.slug === slug);
}

export function findArticle(categorySlug: string | undefined, articleSlug: string | undefined) {
  const category = findCategory(categorySlug);
  const article = category?.articles.find((a) => a.slug === articleSlug);
  return category && article ? { category, article } : undefined;
}

export function searchHelp(query: string): { category: HelpCategory; article: HelpArticle }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return helpCategories.flatMap((category) =>
    category.articles
      .filter((a) => `${a.title} ${a.summary}`.toLowerCase().includes(q))
      .map((article) => ({ category, article })),
  );
}
