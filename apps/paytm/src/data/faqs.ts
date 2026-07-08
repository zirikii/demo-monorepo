export interface Faq {
  q: string;
  a: string;
}

export const rechargeFaqs: Faq[] = [
  { q: "How do I recharge a prepaid mobile on this site?", a: "Enter the 10-digit number, pick the operator and circle, choose an amount or browse plans, then confirm. In this demo the final step shows a simulated success screen instead of charging money." },
  { q: "Can I see plans before paying?", a: "Yes — the Browse Plans section lists unlimited, data, talktime, and annual packs for the selected operator. Tap any plan to auto-fill the amount." },
  { q: "What happens if a recharge fails?", a: "On the real product a failed recharge is auto-refunded to the source account. This demo never moves money, so every attempt simply simulates the success path." },
  { q: "Do postpaid bills work the same way?", a: "Switch the toggle to Postpaid, enter your number, and the due amount is fetched from the operator. The demo fills a sample bill for illustration." },
];

export const electricityFaqs: Faq[] = [
  { q: "Which electricity boards are supported?", a: "All major state discoms — Delhi, Maharashtra, Karnataka, Tamil Nadu, UP, and more. Pick your state to see the boards available in this demo list." },
  { q: "Where do I find my consumer number?", a: "It's printed on any previous bill, usually near your name — a 6 to 16 character ID your board uses to identify the connection." },
  { q: "When is my payment reflected?", a: "Board systems typically update within a few minutes to 24 hours. The demo shows an instant simulated confirmation." },
];

export const fastagFaqs: Faq[] = [
  { q: "How fast does a FASTag top-up reflect?", a: "Top-ups usually reach the tag wallet within minutes so you can drive through tolls right away. This demo simulates the confirmation instantly." },
  { q: "Which banks' tags can I recharge?", a: "All major issuers — ICICI, HDFC, SBI, Axis, IDFC FIRST, Kotak, and more — using your vehicle registration number." },
  { q: "What if I enter the wrong vehicle number?", a: "The issuer validates the registration before charging. In the demo, format validation happens locally before the simulated payment." },
];

export const upiFaqs: Faq[] = [
  { q: "What is UPI and why use it here?", a: "UPI (Unified Payments Interface) lets you pay directly from your bank account in real time using a UPI ID or QR — no wallet loading needed." },
  { q: "Is there any charge for UPI transfers?", a: "Person-to-person UPI transfers are free. This demo only simulates transfers, so nothing is ever charged." },
  { q: "What's a UPI statement?", a: "A monthly, categorised summary of your UPI spends that you can export — helpful for budgeting and expense claims." },
  { q: "How is my account kept safe?", a: "Device binding, UPI PIN, and transaction limits protect every payment. See the Security page for the practices this demo describes." },
];

export const loanFaqs: Faq[] = [
  { q: "How is my EMI calculated?", a: "Using the standard reducing-balance formula on principal, rate, and tenure — the calculator on this page runs the same math live as you move the sliders." },
  { q: "Will checking eligibility affect my credit score?", a: "No — eligibility previews use a soft inquiry. A full bureau pull happens only when you proceed with an application on the real product." },
  { q: "How quickly is a loan disbursed?", a: "Pre-approved users typically see funds the same day after e-sign. This demo stops at the simulated approval step." },
];

export const insuranceFaqs: Faq[] = [
  { q: "Are these real insurance quotes?", a: "No — premiums shown are illustrative demo figures. The real marketplace fetches live quotes from insurer partners." },
  { q: "Can I renew an expired bike policy?", a: "Yes, expired two-wheeler policies can usually be renewed online after a quick self-inspection video." },
  { q: "Who settles my claim?", a: "Claims are always settled by the insurer that issued your policy; the platform helps you file and track them." },
];
