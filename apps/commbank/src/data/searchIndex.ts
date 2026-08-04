import type { SearchDoc } from "@/lib/search";
import { everydayAccounts, savingsAccounts } from "./accounts";
import { creditCards } from "./cards";
import { homeLoanProducts } from "./homeLoans";
import { businessProducts, personalLoans } from "./lending";
import { insuranceProducts, investingProducts } from "./insurance";
import { articles } from "./articles";
import { faqs } from "./faqs";

const pageDocs: SearchDoc[] = [
  {
    title: "Banking",
    description: "Bank accounts, savings, credit cards, personal loans and digital banking.",
    to: "/banking",
    category: "Banking",
    keywords: ["everyday", "accounts", "banking"],
  },
  {
    title: "Home loans",
    description: "Compare home loans, check rates and calculate your repayments.",
    to: "/home-loans",
    category: "Home loans",
    keywords: ["mortgage", "refinance", "first home buyer"],
  },
  {
    title: "Home loan interest rates",
    description: "Current owner occupied and investment variable and fixed home loan rates.",
    to: "/home-loans/rates",
    category: "Home loans",
    keywords: ["rates", "comparison rate", "wealth package", "lvr"],
  },
  {
    title: "Home loan repayments calculator",
    description: "Work out your repayments, total interest and the cost over the life of the loan.",
    to: "/home-loans/calculator",
    category: "Tools",
    keywords: ["calculator", "repayments", "interest only"],
  },
  {
    title: "Foreign exchange calculator",
    description: "Convert Australian dollars into more than 10 currencies at indicative rates.",
    to: "/banking/international-travel#fx",
    category: "Tools",
    keywords: ["fx", "exchange rate", "travel money", "currency"],
  },
  {
    title: "Interest rates and fees",
    description: "Interest rates and fees across accounts, cards, loans and business products.",
    to: "/products/interest-rates-and-fees",
    category: "Rates",
    keywords: ["fees", "charges", "rates"],
  },
  {
    title: "Tools & calculators",
    description: "Repayments, borrowing power, savings goal and currency conversion tools.",
    to: "/tools-and-calculators",
    category: "Tools",
    keywords: ["calculator", "borrowing power", "savings goal"],
  },
  {
    title: "CommBank Yello",
    description: "Our customer recognition program with cashback, discounts and experiences.",
    to: "/commbank-yello",
    category: "Yello",
    keywords: ["yello", "cashback", "tiers", "gold", "diamond"],
  },
  {
    title: "NetBank",
    description: "Do your day-to-day banking from your laptop or desktop with NetBank.",
    to: "/digital-banking/netbank",
    category: "Digital banking",
    keywords: ["netbank", "log on", "online banking"],
  },
  {
    title: "CommBank app",
    description: "Bank on the go, tap and pay, and manage your cards from your phone.",
    to: "/digital-banking/app",
    category: "Digital banking",
    keywords: ["app", "mobile", "cardless cash", "ceba"],
  },
  {
    title: "Locate us",
    description: "Find a branch, ATM or business banking centre near you.",
    to: "/locate-us",
    category: "Support",
    keywords: ["branch", "atm", "opening hours", "find"],
  },
  {
    title: "Help & support",
    description: "Search our FAQs or connect with a specialist.",
    to: "/support",
    category: "Support",
    keywords: ["support", "faq", "contact", "help"],
  },
  {
    title: "Security & scams",
    description: "How CommBank Safe protects you, and how to report a scam.",
    to: "/security",
    category: "Security",
    keywords: ["scam", "fraud", "namecheck", "callercheck", "hoax"],
  },
  {
    title: "Register for NetBank",
    description: "Register for NetBank using your CommBank card and client number.",
    to: "/register",
    category: "Digital banking",
    keywords: ["register", "sign up", "client number"],
  },
  {
    title: "Business banking",
    description: "Accounts, EFTPOS terminals and finance for Australian businesses.",
    to: "/business",
    category: "Business",
    keywords: ["business", "eftpos", "merchant", "abn"],
  },
  {
    title: "Institutional banking",
    description: "Global markets, transaction banking and capital markets.",
    to: "/institutional",
    category: "Institutional",
    keywords: ["institutional", "markets", "corporate"],
  },
  {
    title: "About us",
    description: "Who we are, our history and how we're run.",
    to: "/about-us",
    category: "About",
    keywords: ["about", "history", "company"],
  },
  {
    title: "Careers",
    description: "Roles across technology, retail banking, risk and operations.",
    to: "/careers",
    category: "About",
    keywords: ["jobs", "careers", "hiring"],
  },
];

export const searchIndex: SearchDoc[] = [
  ...pageDocs,
  ...everydayAccounts.map((product) => ({
    title: product.name,
    description: product.description,
    to: `/banking/bank-accounts#${product.id}`,
    category: "Bank accounts",
    keywords: [product.tagline],
  })),
  ...savingsAccounts.map((product) => ({
    title: product.name,
    description: product.description,
    to: `/banking/savings-accounts#${product.id}`,
    category: "Savings accounts",
    keywords: [product.tagline],
  })),
  ...creditCards.map((card) => ({
    title: card.name,
    description: card.tagline,
    to: `/banking/credit-cards#${card.id}`,
    category: "Credit cards",
    keywords: [card.category, card.purchaseRate],
  })),
  ...personalLoans.map((loan) => ({
    title: loan.name,
    description: loan.tagline,
    to: `/banking/personal-loans#${loan.id}`,
    category: "Personal loans",
    keywords: ["personal loan", "car loan"],
  })),
  ...homeLoanProducts.map((loan) => ({
    title: loan.name,
    description: loan.description,
    to: `/home-loans#${loan.id}`,
    category: "Home loans",
    keywords: ["home loan", "mortgage", "offset"],
  })),
  ...insuranceProducts.map((product) => ({
    title: product.name,
    description: product.description,
    to: `/insurance#${product.id}`,
    category: "Insurance",
    keywords: ["insurance", "cover", "claim"],
  })),
  ...investingProducts.map((product) => ({
    title: product.name,
    description: product.description,
    to: `/investing-and-super#${product.id}`,
    category: "Investing & Super",
    keywords: ["invest", "super", "shares"],
  })),
  ...businessProducts.map((product) => ({
    title: product.name,
    description: product.description,
    to: `/business#${product.id}`,
    category: "Business",
    keywords: ["business", product.category],
  })),
  ...articles.map((article) => ({
    title: article.title,
    description: article.standfirst,
    to: `/newsroom/${article.slug}`,
    category: "Newsroom",
    keywords: [article.category],
  })),
  ...faqs.map((faq) => ({
    title: faq.question,
    description: faq.answer,
    to: `/support#${faq.id}`,
    category: "Support",
    keywords: [faq.category],
  })),
];
