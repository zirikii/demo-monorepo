import type { Faq, FaqCategory } from "./types";

export const faqCategories: FaqCategory[] = [
  "Bank accounts",
  "Cards",
  "Home loans",
  "Digital banking",
  "Insurance",
  "Business",
  "Security",
];

export const faqs: Faq[] = [
  {
    id: "open-account",
    question: "How do I open a bank account?",
    answer:
      "Most personal bank accounts can be opened online in about 10 minutes. Choose the account that matches how you plan to use it, verify your identity, then activate your card in the CommBank app. You can also open an account at your local branch.",
    category: "Bank accounts",
  },
  {
    id: "close-account",
    question: "How do I close or cancel a CommBank account?",
    answer:
      "You can close most everyday and savings accounts in the CommBank app under Settings, or by messaging us. Make sure any direct debits and scheduled payments are moved first and the balance is zero.",
    category: "Bank accounts",
  },
  {
    id: "transaction-vs-savings",
    question: "What is the difference between a transaction and a savings account?",
    answer:
      "A transaction account is for everyday use — receiving pay, spending with a debit card and paying bills. A savings account is designed to hold money and earn interest, and is usually linked to a transaction account so you can move funds between the two.",
    category: "Bank accounts",
  },
  {
    id: "interest-paid",
    question: "When is interest paid on my savings account?",
    answer:
      "Interest is calculated daily on your closing balance and paid into your account on the last business day of each month.",
    category: "Bank accounts",
  },
  {
    id: "payid",
    question: "What is PayID and how do I set one up?",
    answer:
      "PayID lets people pay you using your mobile number or email address instead of a BSB and account number. Set one up in the CommBank app under Settings, then Manage PayID.",
    category: "Bank accounts",
  },
  {
    id: "activate-card",
    question: "How do I activate a CommBank card?",
    answer:
      "Activate your Debit Mastercard or credit card in the CommBank app or NetBank and choose your PIN at the same time. Your digital card is available in the app straight away.",
    category: "Cards",
  },
  {
    id: "lock-block-limit",
    question: "What is Lock, Block, Limit?",
    answer:
      "Lock, Block, Limit lets you instantly lock your card if you have misplaced it, block particular transaction types such as ATM cash or overseas purchases, and set your own spend limits — all from the CommBank app.",
    category: "Cards",
  },
  {
    id: "lost-card",
    question: "My card is lost or stolen. What should I do?",
    answer:
      "Lock the card immediately in the CommBank app, then order a replacement. If you believe it has been used fraudulently, message us in the app or call 13 2221.",
    category: "Cards",
  },
  {
    id: "credit-limit",
    question: "How do I change my credit limit?",
    answer:
      "Request a credit limit increase or decrease in NetBank or the CommBank app. Increases are subject to a credit assessment; decreases usually take effect immediately.",
    category: "Cards",
  },
  {
    id: "awards-points",
    question: "How do Awards points work?",
    answer:
      "Eligible Awards cards earn 1 point per $1 spent on eligible purchases, up to a cap per statement period. Points can be redeemed for travel, gift cards, merchandise or cashback in the CommBank app.",
    category: "Cards",
  },
  {
    id: "conditional-approval",
    question: "How long does conditional approval take?",
    answer:
      "Eligible customers who apply online can receive conditional approval in as little as 10 minutes. Conditional approval is not a formal loan offer and is subject to a full credit assessment.",
    category: "Home loans",
  },
  {
    id: "redraw",
    question: "What is a home loan redraw facility?",
    answer:
      "Redraw lets you access additional repayments you have already made above your minimum. Available redraw is shown in NetBank and the CommBank app and can be transferred to your everyday account.",
    category: "Home loans",
  },
  {
    id: "offset",
    question: "How does an offset account work?",
    answer:
      "The balance of an Everyday Offset account is subtracted from your home loan balance before daily interest is calculated, so you pay interest on a smaller amount. An offset feature fee applies.",
    category: "Home loans",
  },
  {
    id: "lmi",
    question: "When do I need Lenders' Mortgage Insurance?",
    answer:
      "LMI generally applies when you borrow more than 80% of the value of the property. It protects the lender, not you, and the one-off premium can usually be added to the loan amount.",
    category: "Home loans",
  },
  {
    id: "switch-fixed",
    question: "Can I switch from a variable to a fixed rate?",
    answer:
      "Yes. You can request a switch in NetBank or through a Home Lending Specialist. A $50 switching fee applies per change and the new rate takes effect once the switch is processed.",
    category: "Home loans",
  },
  {
    id: "netbank-register",
    question: "How do I register for NetBank?",
    answer:
      "You can register online with your CommBank card details, a valid email address and an Australian mobile number. Once registered you will receive a client number and can set a password.",
    category: "Digital banking",
  },
  {
    id: "netcode",
    question: "What is NetCode?",
    answer:
      "NetCode is a one-time security code sent by SMS or generated in the CommBank app. It is used to confirm higher-risk activity such as adding a new payee or changing your contact details.",
    category: "Digital banking",
  },
  {
    id: "digital-wallet",
    question: "Which digital wallets can I use?",
    answer:
      "You can pay with the CommBank app itself, or add an eligible CommBank debit or credit card to Apple Pay, Google Pay or Samsung Pay, plus supported wearables.",
    category: "Digital banking",
  },
  {
    id: "statements",
    question: "How do I find my statements online?",
    answer:
      "Statements for the last seven years are available in NetBank under each account, and in the CommBank app under the account's Statements tab.",
    category: "Digital banking",
  },
  {
    id: "ceba",
    question: "What is Ceba?",
    answer:
      "Ceba is our virtual assistant in the CommBank app. It can help with hundreds of everyday tasks and connect you to a specialist when you need a person.",
    category: "Digital banking",
  },
  {
    id: "make-claim",
    question: "How do I make an insurance claim?",
    answer:
      "Lodge and track most claims in the CommBank app or online. You will need your policy number, the date of the incident and photos or documents supporting the claim.",
    category: "Insurance",
  },
  {
    id: "travel-insurance-card",
    question: "Does my credit card include travel insurance?",
    answer:
      "Eligible credit cards include complimentary international travel insurance. You need to activate the cover before you travel and meet the spend criteria set out in the policy.",
    category: "Insurance",
  },
  {
    id: "merchant-settlement",
    question: "When are merchant payments settled?",
    answer:
      "Card payments taken on a Smart Terminal settle to your CommBank business account the next business day. Settlement on weekends and public holidays occurs on the next business day.",
    category: "Business",
  },
  {
    id: "commbiz",
    question: "What is CommBiz?",
    answer:
      "CommBiz is our online banking platform for larger businesses, with multi-user access, approval workflows, bulk payments and detailed reporting.",
    category: "Business",
  },
  {
    id: "report-scam",
    question: "How do I report a scam?",
    answer:
      "If you think you have been scammed, message us in the CommBank app or call 13 2221. Business customers should call 13 1998 and select option 4. Change your passwords immediately if you have shared any details.",
    category: "Security",
  },
  {
    id: "callercheck",
    question: "What is CallerCheck?",
    answer:
      "CallerCheck lets you confirm a call is really from us. Ask the caller to send a CallerCheck security code, which appears as a notification in your CommBank app.",
    category: "Security",
  },
  {
    id: "hoax-message",
    question: "I received a suspicious email or SMS. What should I do?",
    answer:
      "Do not click any links. Forward the message to hoax@cba.com.au and then delete it. Always reach your banking from the CommBank app or by typing our address directly.",
    category: "Security",
  },
];

export function filterFaqs(all: Faq[], query: string, category: string): Faq[] {
  const needle = query.trim().toLowerCase();
  return all.filter((faq) => {
    if (category !== "all" && faq.category !== category) return false;
    if (!needle) return true;
    return faq.question.toLowerCase().includes(needle) || faq.answer.toLowerCase().includes(needle);
  });
}
