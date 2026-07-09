export type OfferCategory = "Recharge" | "Travel" | "Movies" | "UPI" | "Shopping" | "Bills";

export interface Offer {
  id: string;
  category: OfferCategory;
  title: string;
  code: string;
  detail: string;
  expires: string;
  minSpend?: number;
}

export const offerCategories: OfferCategory[] = ["Recharge", "Travel", "Movies", "UPI", "Shopping", "Bills"];

/** Fictional promo inventory for the offers page. */
export const offers: Offer[] = [
  { id: "of1", category: "Recharge", title: "₹30 cashback on first recharge of the month", code: "RECH30", detail: "Valid once per user on prepaid recharges of ₹199 or more.", expires: "2026-07-31", minSpend: 199 },
  { id: "of2", category: "Recharge", title: "5% back on annual plans", code: "ANNUAL5", detail: "Up to ₹150 cashback on plans with 300+ days validity.", expires: "2026-08-15", minSpend: 1499 },
  { id: "of3", category: "Travel", title: "Flat ₹500 off domestic flights", code: "FLYNOW", detail: "On round trips above ₹6,000. All airlines included.", expires: "2026-07-20", minSpend: 6000 },
  { id: "of4", category: "Travel", title: "Bus tickets: 10% off up to ₹120", code: "BUSGO", detail: "Valid on all operators, twice per user.", expires: "2026-08-31", minSpend: 400 },
  { id: "of5", category: "Movies", title: "Buy 1 Get 1 on Friday shows", code: "FILMYBOGO", detail: "Second ticket free up to ₹250 at partner cinemas.", expires: "2026-07-25" },
  { id: "of6", category: "UPI", title: "Scratch card on every 3rd UPI payment", code: "AUTO", detail: "Assured rewards between ₹5 and ₹100. No code needed.", expires: "2026-09-30" },
  { id: "of7", category: "Shopping", title: "₹75 off partner store vouchers", code: "SHOP75", detail: "On gift vouchers worth ₹999+ from listed brands.", expires: "2026-08-10", minSpend: 999 },
  { id: "of8", category: "Bills", title: "Electricity bill: ₹25 instant discount", code: "POWER25", detail: "First electricity payment on Paytm, bills above ₹500.", expires: "2026-07-31", minSpend: 500 },
  { id: "of9", category: "Bills", title: "Set autopay, earn ₹50", code: "AUTOPAY50", detail: "Activate any bill autopay mandate and get a one-time reward.", expires: "2026-12-31" },
  { id: "of10", category: "Movies", title: "Student Tuesday: 20% off", code: "CAMPUS20", detail: "Show a valid student ID at entry. Max discount ₹150.", expires: "2026-10-31" },
  { id: "of11", category: "Travel", title: "Trains: zero payment gateway fee", code: "RAILFREE", detail: "On all train bookings paid via UPI.", expires: "2026-09-15" },
  { id: "of12", category: "UPI", title: "Refer & earn ₹100 per friend", code: "INVITE", detail: "Friend must complete first UPI transfer within 15 days.", expires: "2026-12-31" },
];
