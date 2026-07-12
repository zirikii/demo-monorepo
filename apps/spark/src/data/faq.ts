export type FaqItem = {
  question: string;
  answer: string[];
};

export const faqs: FaqItem[] = [
  {
    question: "How do Travel Packs work?",
    answer: [
      "These Travel Packs are designed for people visiting New Zealand for a short-term visit of up to three months.",
      "Your Travel Pack expires three months following the date you activate it by starting to use it in New Zealand. Once it has expired you can purchase other value packs or extras, but you can't purchase another Travel Pack for your SIM.",
      "The text, calling minutes, and data inclusions in the plan are available for three months, and do not refresh with new data, calling or text allocations during this time.",
      "The price you pay is the total cost for all three months. It's not a monthly fee.",
    ],
  },
  {
    question: "What do I do if I run out of data, minutes or texts?",
    answer: [
      "If you run out of data, calling minutes or texts during your three month term, you can buy other value packs or extras to get more allowances.",
      "Otherwise standard rate charges will apply. See the standard rates below.",
    ],
  },
  {
    question: "What do I do when my three-month Travel Pack expires?",
    answer: [
      "If you still need to use your mobile in New Zealand after three months when your Travel Pack expires, and you want to keep using the same SIM and number, you'll need to purchase a new Prepaid or Pay Monthly plan.",
      "You won't be able to purchase another Travel Pack for your SIM.",
    ],
  },
  {
    question: "What are the standard rates for calls, texts and data?",
    answer: [
      "Additional NZ minutes, standard NZ texts, picture messages, casual data, voicemail, video messaging and international direct-dial calls are charged at Spark's standard casual rates once pack allowances are used.",
      "The table on this page mirrors the key rates from the Spark travel pack page.",
    ],
  },
  {
    question: "Questions about Endless data",
    answer: [
      "With the Endless Travel Pack, data is used in this order: 100GB of full-speed Endless Travel Pack data, any other packs you've added, then speed-reduced Endless data at a maximum speed of 1.2Mbps.",
      "Tethering is included on the $129 Endless Travel Pack.",
      "You can only have one Travel Pack. If you run out of data before it expires, add another extra or Prepaid value pack.",
    ],
  },
  {
    question: "Our General Terms and Mobile and Wireless Terms apply",
    answer: [
      "This demo mirrors Spark's public page structure. For real purchases, Spark's General Terms, Mobile and Wireless Terms, and other product terms apply.",
    ],
  },
  {
    question: "Other terms and conditions",
    answer: [
      "Unlimited text is for standard person-to-person texts to standard New Zealand numbers and excludes premium or special numbers.",
      "Unlimited allowances cannot be used for re-supply, call centre usage, telemarketing, bulk messaging, machine-to-machine communication, or similar commercial patterns.",
    ],
  },
];
