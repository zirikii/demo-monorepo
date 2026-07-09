export type PlanCategory = "unlimited" | "data" | "talktime" | "annual";

export interface RechargePlan {
  id: string;
  operatorId: string;
  category: PlanCategory;
  price: number;
  validity: string;
  data: string;
  calls: string;
  extras?: string;
}

export const planCategories: { id: PlanCategory; label: string }[] = [
  { id: "unlimited", label: "Unlimited" },
  { id: "data", label: "Data Packs" },
  { id: "talktime", label: "Talktime" },
  { id: "annual", label: "Annual" },
];

/** Representative prepaid plans (fictional pricing for the demo). */
export const rechargePlans: RechargePlan[] = [
  // Unlimited
  { id: "u-239", operatorId: "airtel", category: "unlimited", price: 239, validity: "28 days", data: "1.5 GB/day", calls: "Unlimited", extras: "100 SMS/day" },
  { id: "u-299", operatorId: "jio", category: "unlimited", price: 299, validity: "28 days", data: "2 GB/day", calls: "Unlimited", extras: "Streaming apps bundle" },
  { id: "u-319", operatorId: "vi", category: "unlimited", price: 319, validity: "31 days", data: "2 GB/day", calls: "Unlimited", extras: "Weekend data rollover" },
  { id: "u-349", operatorId: "airtel", category: "unlimited", price: 349, validity: "28 days", data: "2.5 GB/day", calls: "Unlimited", extras: "Free hellotunes" },
  { id: "u-666", operatorId: "jio", category: "unlimited", price: 666, validity: "84 days", data: "1.5 GB/day", calls: "Unlimited", extras: "100 SMS/day" },
  { id: "u-719", operatorId: "vi", category: "unlimited", price: 719, validity: "84 days", data: "1.5 GB/day", calls: "Unlimited" },
  // Data packs
  { id: "d-19", operatorId: "jio", category: "data", price: 19, validity: "1 day", data: "1 GB", calls: "—" },
  { id: "d-29", operatorId: "airtel", category: "data", price: 29, validity: "2 days", data: "2 GB", calls: "—" },
  { id: "d-58", operatorId: "vi", category: "data", price: 58, validity: "28 days", data: "3 GB", calls: "—" },
  { id: "d-98", operatorId: "jio", category: "data", price: 98, validity: "14 days", data: "12 GB", calls: "—", extras: "Booster pack" },
  { id: "d-118", operatorId: "airtel", category: "data", price: 118, validity: "12 days", data: "12 GB", calls: "—" },
  // Talktime
  { id: "t-10", operatorId: "bsnl", category: "talktime", price: 10, validity: "Regular", data: "—", calls: "₹7.47 talktime" },
  { id: "t-50", operatorId: "bsnl", category: "talktime", price: 50, validity: "Regular", data: "—", calls: "₹39.37 talktime" },
  { id: "t-100", operatorId: "mtnl", category: "talktime", price: 100, validity: "Regular", data: "—", calls: "₹81.75 talktime" },
  { id: "t-500", operatorId: "airtel", category: "talktime", price: 500, validity: "Regular", data: "—", calls: "₹423.73 talktime" },
  // Annual
  { id: "a-1799", operatorId: "jio", category: "annual", price: 1799, validity: "336 days", data: "24 GB", calls: "Unlimited", extras: "100 SMS/day" },
  { id: "a-2999", operatorId: "airtel", category: "annual", price: 2999, validity: "365 days", data: "2 GB/day", calls: "Unlimited", extras: "Rewards membership" },
  { id: "a-3099", operatorId: "vi", category: "annual", price: 3099, validity: "365 days", data: "2 GB/day", calls: "Unlimited" },
];

export interface DthPack {
  id: string;
  providerId: string;
  name: string;
  price: number;
  validity: string;
  channels: string;
}

export const dthPacks: DthPack[] = [
  { id: "dth-1", providerId: "tata-play", name: "Hindi Family Value", price: 299, validity: "30 days", channels: "215 channels" },
  { id: "dth-2", providerId: "tata-play", name: "South Star Combo", price: 349, validity: "30 days", channels: "245 channels" },
  { id: "dth-3", providerId: "dish-tv", name: "Super Saver Pack", price: 249, validity: "30 days", channels: "190 channels" },
  { id: "dth-4", providerId: "d2h", name: "Gold Sports Combo", price: 399, validity: "30 days", channels: "260 channels + 4 sports" },
  { id: "dth-5", providerId: "sun-direct", name: "Tamil Premium", price: 319, validity: "30 days", channels: "230 channels" },
  { id: "dth-6", providerId: "airtel-dtv", name: "Entertainment Plus HD", price: 459, validity: "30 days", channels: "280 channels, 45 HD" },
];
