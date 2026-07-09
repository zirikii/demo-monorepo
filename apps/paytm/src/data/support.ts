export interface SupportTopic {
  id: string;
  title: string;
  blurb: string;
  emoji: string;
}

export const supportTopics: SupportTopic[] = [
  { id: "st1", title: "Payment pending or failed", blurb: "Track a stuck payment and see auto-refund timelines.", emoji: "⏳" },
  { id: "st2", title: "UPI & bank account", blurb: "Link accounts, reset UPI PIN, or change your primary bank.", emoji: "🏦" },
  { id: "st3", title: "Recharge & bill issues", blurb: "Wrong number recharged, plan not activated, bill not updated.", emoji: "🧾" },
  { id: "st4", title: "Travel bookings", blurb: "Cancellations, refunds, and rescheduling for flights, trains, and buses.", emoji: "✈️" },
  { id: "st5", title: "Account & profile", blurb: "Update mobile number, KYC, or recover a blocked account.", emoji: "👤" },
  { id: "st6", title: "Report fraud", blurb: "Flag suspicious calls, collect requests, or unauthorised activity.", emoji: "🚨" },
];

export interface EscalationStep {
  level: string;
  title: string;
  body: string;
  sla: string;
}

export const escalationLadder: EscalationStep[] = [
  { level: "Level 1", title: "In-app & web help", body: "Start with the help centre — most issues resolve instantly with guided flows.", sla: "Instant to 24 hours" },
  { level: "Level 2", title: "Grievance officer", body: "Unresolved tickets can be escalated with your ticket number for a formal review.", sla: "Within 48 hours" },
  { level: "Level 3", title: "Nodal desk", body: "A final internal escalation reviews level-2 outcomes end to end.", sla: "Within 7 working days" },
  { level: "External", title: "RBI Ombudsman", body: "If still unresolved, payment complaints can go to the RBI Integrated Ombudsman.", sla: "Per RBI timelines" },
];

export interface SecurityPractice {
  id: string;
  title: string;
  body: string;
  emoji: string;
}

export const securityPractices: SecurityPractice[] = [
  { id: "sp1", title: "Device binding", body: "Your account works only from a verified device + SIM pair, blocking remote takeovers.", emoji: "📱" },
  { id: "sp2", title: "Tokenised cards", body: "Saved cards are stored as network tokens — real numbers never touch our servers.", emoji: "💳" },
  { id: "sp3", title: "Real-time fraud models", body: "Every transaction is scored in milliseconds against behavioural fraud signals.", emoji: "🧠" },
  { id: "sp4", title: "PCI-DSS certified", body: "Payment infrastructure is audited to the highest industry compliance standard.", emoji: "✅" },
  { id: "sp5", title: "Bug bounty", body: "Independent researchers are rewarded for responsibly disclosing vulnerabilities.", emoji: "🐛" },
  { id: "sp6", title: "24x7 monitoring", body: "Security operations watch platform health and threat feeds around the clock.", emoji: "🛰️" },
];

export interface SafetyTip {
  title: string;
  body: string;
}

export const safetyTips: SafetyTip[] = [
  { title: "You never need a PIN to receive money", body: "Entering your UPI PIN always sends money. Ignore anyone asking you to 'approve' an incoming payment with a PIN." },
  { title: "Never share OTPs or screen access", body: "Support staff will never ask for OTPs, PINs, or screen-sharing apps. Calls that do are scams." },
  { title: "Verify before you pay a QR", body: "Check the merchant name shown after scanning. If it doesn't match the shop, don't proceed." },
];
