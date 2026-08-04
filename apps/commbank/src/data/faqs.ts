export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
};

export const faqCategories = [
  "All",
  "Cards",
  "Accounts",
  "Payments",
  "Home loans",
  "Digital banking",
  "Security",
  "Insurance",
] as const;
export type FaqCategory = Exclude<(typeof faqCategories)[number], "All">;

export const faqs: Faq[] = [
  {
    id: "activate-card",
    question: "How do I activate my CommBank card?",
    answer:
      "Log on to the CommBank app, go to Cards, select the card and tap Activate. You can also activate in NetBank, at a CommBank ATM, or by calling 13 2221.",
    category: "Cards",
  },
  {
    id: "lock-block-limit",
    question: "What is Lock, Block, Limit?",
    answer:
      "Lock, Block, Limit lets you temporarily lock your card, block certain transaction types like overseas or online purchases, and set your own spending limits — all from the CommBank app.",
    category: "Cards",
  },
  {
    id: "lost-card",
    question: "My card is lost or stolen. What should I do?",
    answer:
      "Lock the card immediately in the CommBank app or NetBank, then order a replacement. If you think it has been used fraudulently, call 13 2221 straight away.",
    category: "Cards",
  },
  {
    id: "change-credit-limit",
    question: "How do I change my credit card limit?",
    answer:
      "You can request an increase or reduce your limit in NetBank under Cards. Limit increases are subject to a credit assessment.",
    category: "Cards",
  },
  {
    id: "open-account",
    question: "How long does it take to open an account?",
    answer:
      "You can open an Everyday Account Smart Access online in under 5 minutes if you're over 18 and have identification handy. You'll be registered for NetBank automatically.",
    category: "Accounts",
  },
  {
    id: "waive-monthly-fee",
    question: "How do I get the monthly account fee waived on Smart Access?",
    answer:
      "The $4 monthly account fee is waived when at least $2,000 is deposited into the account each calendar month, or if you're under 30. Other exemptions apply for eligible pension recipients.",
    category: "Accounts",
  },
  {
    id: "close-account",
    question: "How do I close a bank account?",
    answer:
      "Transfer out any remaining balance, cancel direct debits, then request closure in the CommBank app under the account's Manage menu, or visit a branch.",
    category: "Accounts",
  },
  {
    id: "update-details",
    question: "How do I update my address or phone number?",
    answer:
      "Go to Settings then Personal details in NetBank or the CommBank app. Changes to your mobile number may require verification with NetCode.",
    category: "Accounts",
  },
  {
    id: "bpay",
    question: "How do I pay a bill with BPAY?",
    answer:
      "In NetBank choose Transfers & BPAY, select BPAY, then enter the biller code and reference from your bill. You can schedule one-off or recurring payments.",
    category: "Payments",
  },
  {
    id: "payid",
    question: "What is PayID and how do I create one?",
    answer:
      "PayID lets you receive payments using your mobile number or email instead of a BSB and account number. Create one in the CommBank app under Settings, then PayID.",
    category: "Payments",
  },
  {
    id: "international-transfer",
    question: "How do I send money overseas?",
    answer:
      "Use International Money Transfer in NetBank or the CommBank app to send money to more than 200 countries in over 30 currencies. You'll need the recipient's bank details and SWIFT code.",
    category: "Payments",
  },
  {
    id: "cancel-payment",
    question: "Can I cancel a payment I've already made?",
    answer:
      "Scheduled and recurring payments can be cancelled before the processing date in NetBank. Payments already sent can't be reversed, but we can attempt a trace or recall — contact us as soon as possible.",
    category: "Payments",
  },
  {
    id: "redraw",
    question: "What is a home loan redraw facility?",
    answer:
      "Redraw lets you access additional repayments you've made above your minimum. Request a redraw in NetBank or the CommBank app, subject to your loan's redraw limits.",
    category: "Home loans",
  },
  {
    id: "home-loan-interest",
    question: "How is interest calculated on my home loan?",
    answer:
      "Interest is calculated daily on the outstanding balance and charged monthly. Money in a linked Everyday Offset account reduces the balance interest is calculated on.",
    category: "Home loans",
  },
  {
    id: "fixed-to-variable",
    question: "Can I switch from a fixed rate to a variable rate?",
    answer:
      "Yes, though break costs may apply if you switch before the end of your fixed period. Request a break cost quote in NetBank or by calling 13 2224.",
    category: "Home loans",
  },
  {
    id: "home-loan-hardship",
    question: "I'm struggling with my home loan repayments. What can I do?",
    answer:
      "Contact our financial assistance team as early as possible. Options can include a repayment pause, reduced repayments, or extending your loan term.",
    category: "Home loans",
  },
  {
    id: "netbank-password",
    question: "I've forgotten my NetBank password. How do I reset it?",
    answer:
      "On the NetBank log on page choose Forgot password, then verify your identity with your client number and a NetCode sent to your registered mobile.",
    category: "Digital banking",
  },
  {
    id: "netcode",
    question: "What is NetCode?",
    answer:
      "NetCode is a one-time security code sent by SMS or generated in the CommBank app. It's required to confirm higher-risk activity like adding a new payee.",
    category: "Digital banking",
  },
  {
    id: "cardless-cash",
    question: "How does Cardless Cash work?",
    answer:
      "Request cash in the CommBank app, then enter the cash code and PIN at a CommBank ATM to withdraw without your card. Requests expire after 30 minutes.",
    category: "Digital banking",
  },
  {
    id: "digital-wallet",
    question: "Which digital wallets can I use?",
    answer:
      "You can add an eligible CommBank card to Apple Pay, Google Pay, Samsung Pay, Garmin Pay and Fitbit Pay, or tap and pay directly from the CommBank app.",
    category: "Digital banking",
  },
  {
    id: "report-scam",
    question: "How do I report a scam or suspicious message?",
    answer:
      "Forward suspicious texts and emails to hoax@cba.com.au, then call us on 13 2221. If you've shared your details, lock your cards in the app immediately.",
    category: "Security",
  },
  {
    id: "callerchecktm",
    question: "How do I know a call from CommBank is genuine?",
    answer:
      "Use CallerCheck in the CommBank app — we send a notification you can approve so you know the caller is really us. We'll never ask for your password or NetCode.",
    category: "Security",
  },
  {
    id: "namecheck",
    question: "What is NameCheck?",
    answer:
      "NameCheck compares the account name you enter against the details we hold, and warns you before you send money if it doesn't look right.",
    category: "Security",
  },
  {
    id: "unauthorised-transaction",
    question: "I don't recognise a transaction on my account.",
    answer:
      "Check the merchant details in the app first — many trade under a different name. If it's still not right, dispute the transaction in the app or call 13 2221.",
    category: "Security",
  },
  {
    id: "make-insurance-claim",
    question: "How do I make an insurance claim?",
    answer:
      "Home and car claims can be lodged online or by calling 13 1361. Travel insurance claims for cover included with your credit card are lodged with Cover-More.",
    category: "Insurance",
  },
  {
    id: "cancel-insurance",
    question: "How do I cancel my home insurance policy?",
    answer:
      "You can cancel your home or landlord insurance policy at any time by calling 13 1361. Read your Product Disclosure Statement for the terms that apply to your policy.",
    category: "Insurance",
  },
  {
    id: "travel-insurance-activate",
    question: "How do I activate the travel insurance on my credit card?",
    answer:
      "Spend at least $500 in a single transaction on prepaid travel costs with your eligible card, then activate your cover before you leave Australia.",
    category: "Insurance",
  },
];

export const supportChannels = [
  {
    title: "Message us",
    description:
      "Get instant help from Ceba, our virtual assistant, or connect to a specialist in the CommBank app.",
    action: "Message in the app",
  },
  {
    title: "Call us",
    description:
      "13 2221 for personal banking, 13 1998 for business, 13 2221 (option 3) to report fraud. Available 24/7.",
    action: "See all numbers",
  },
  {
    title: "Find a branch",
    description: "Find a branch, ATM or specialist near you and check opening hours.",
    action: "Locate us",
  },
  {
    title: "Book an appointment",
    description:
      "Book time with a home lending or business banking specialist at a time that suits.",
    action: "Book online",
  },
];
