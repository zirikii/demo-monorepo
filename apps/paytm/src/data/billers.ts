export interface ElectricityBoard {
  id: string;
  name: string;
  state: string;
}

/** State electricity boards for the electricity bill page (subset for demo). */
export const electricityBoards: ElectricityBoard[] = [
  { id: "bses-rajdhani", name: "BSES Rajdhani Power Limited", state: "Delhi" },
  { id: "bses-yamuna", name: "BSES Yamuna Power Limited", state: "Delhi" },
  { id: "tata-power-delhi", name: "Tata Power (DDL)", state: "Delhi" },
  { id: "msedcl", name: "Maharashtra State Electricity Distribution (MSEDCL)", state: "Maharashtra" },
  { id: "best", name: "BEST Undertaking", state: "Maharashtra" },
  { id: "adani-mumbai", name: "Adani Electricity Mumbai", state: "Maharashtra" },
  { id: "bescom", name: "BESCOM", state: "Karnataka" },
  { id: "tneb", name: "TNEB (TANGEDCO)", state: "Tamil Nadu" },
  { id: "tsspdcl", name: "TSSPDCL", state: "Telangana" },
  { id: "apspdcl", name: "APSPDCL", state: "Andhra Pradesh" },
  { id: "uppcl-urban", name: "UPPCL (Urban)", state: "Uttar Pradesh" },
  { id: "uppcl-rural", name: "UPPCL (Rural)", state: "Uttar Pradesh" },
  { id: "pspcl", name: "PSPCL", state: "Punjab" },
  { id: "dhbvn", name: "DHBVN", state: "Haryana" },
  { id: "uhbvn", name: "UHBVN", state: "Haryana" },
  { id: "jvvnl", name: "JVVNL", state: "Rajasthan" },
  { id: "cesc", name: "CESC Limited", state: "West Bengal" },
  { id: "wbsedcl", name: "WBSEDCL", state: "West Bengal" },
  { id: "kseb", name: "KSEB", state: "Kerala" },
  { id: "gescom", name: "GESCOM", state: "Karnataka" },
  { id: "mgvcl", name: "MGVCL", state: "Gujarat" },
  { id: "ugvcl", name: "UGVCL", state: "Gujarat" },
  { id: "mpseb", name: "MPPKVVCL", state: "Madhya Pradesh" },
  { id: "nbpdcl", name: "NBPDCL", state: "Bihar" },
  { id: "sbpdcl", name: "SBPDCL", state: "Bihar" },
];

export const statesWithBoards: string[] = [...new Set(electricityBoards.map((b) => b.state))].sort();

export interface FastagIssuer {
  id: string;
  name: string;
}

export const fastagIssuers: FastagIssuer[] = [
  { id: "icici", name: "ICICI Bank FASTag" },
  { id: "hdfc", name: "HDFC Bank FASTag" },
  { id: "sbi", name: "SBI FASTag" },
  { id: "axis", name: "Axis Bank FASTag" },
  { id: "idfc", name: "IDFC FIRST Bank FASTag" },
  { id: "kotak", name: "Kotak Mahindra Bank FASTag" },
  { id: "airtel-payments", name: "Airtel Payments Bank FASTag" },
];

export interface Lender {
  id: string;
  name: string;
}

export const emiLenders: Lender[] = [
  { id: "bajaj", name: "Bajaj Finance" },
  { id: "hdb", name: "HDB Financial Services" },
  { id: "tata-capital", name: "Tata Capital" },
  { id: "home-credit", name: "Home Credit" },
  { id: "idfc-loan", name: "IDFC FIRST Bank Loans" },
  { id: "lt-finance", name: "L&T Finance" },
  { id: "muthoot", name: "Muthoot Finance" },
];

export interface BillCategory {
  id: string;
  label: string;
  description: string;
  to: string;
  emoji: string;
}

/** Hub grid on /bill-payments. */
export const billCategories: BillCategory[] = [
  { id: "mobile", label: "Mobile Recharge & Bill", description: "Prepaid recharges and postpaid bills for every operator.", to: "/recharge", emoji: "📱" },
  { id: "electricity", label: "Electricity Bill", description: "Pay state boards and private discoms in seconds.", to: "/electricity-bill-payment", emoji: "💡" },
  { id: "dth", label: "DTH Recharge", description: "Top up set-top boxes across all major providers.", to: "/dth-recharge", emoji: "📡" },
  { id: "fastag", label: "FASTag Recharge", description: "Keep your toll wallet loaded for every road trip.", to: "/fastag-recharge", emoji: "🛣️" },
  { id: "broadband", label: "Broadband & Landline", description: "Clear wifi and landline dues before the due date.", to: "/broadband-bill-payment", emoji: "🌐" },
  { id: "loan-emi", label: "Loan EMI", description: "Pay EMIs for leading NBFCs and banks on time.", to: "/loan-emi-payment", emoji: "🏦" },
  { id: "water", label: "Water Bill", description: "Municipal water boards across metros and towns.", to: "/bill-payments", emoji: "🚰" },
  { id: "gas", label: "Piped Gas", description: "City gas distributors and LPG cylinder bookings.", to: "/bill-payments", emoji: "🔥" },
  { id: "insurance", label: "Insurance Premium", description: "Renew life and general policies without paperwork.", to: "/insurance", emoji: "🛡️" },
  { id: "municipal", label: "Municipal Tax", description: "Property and civic taxes for major corporations.", to: "/bill-payments", emoji: "🏛️" },
  { id: "education", label: "Education Fees", description: "School and coaching fees with saved student IDs.", to: "/bill-payments", emoji: "🎓" },
  { id: "metro", label: "Metro Card Recharge", description: "Top up metro smart cards for daily commutes.", to: "/bill-payments", emoji: "🚇" },
];
