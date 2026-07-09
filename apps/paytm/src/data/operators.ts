export interface Operator {
  id: string;
  name: string;
  short: string;
  accent: string;
  type: "mobile" | "dth" | "broadband";
}

/** Mobile network operators shown on the recharge page. */
export const mobileOperators: Operator[] = [
  { id: "airtel", name: "Airtel", short: "airtel", accent: "#e40000", type: "mobile" },
  { id: "jio", name: "Jio", short: "Jio", accent: "#0f3cc9", type: "mobile" },
  { id: "vi", name: "Vi", short: "VI", accent: "#ee2737", type: "mobile" },
  { id: "bsnl", name: "BSNL", short: "BSNL", accent: "#111111", type: "mobile" },
  { id: "mtnl", name: "MTNL", short: "MTNL", accent: "#0b7a3b", type: "mobile" },
]

export const dthProviders: Operator[] = [
  { id: "tata-play", name: "Tata Play", short: "TP", accent: "#3d1e6d", type: "dth" },
  { id: "airtel-dtv", name: "Airtel Digital TV", short: "airtel", accent: "#e40000", type: "dth" },
  { id: "dish-tv", name: "Dish TV", short: "dishtv", accent: "#f26522", type: "dth" },
  { id: "d2h", name: "d2h", short: "d2h", accent: "#d81f26", type: "dth" },
  { id: "sun-direct", name: "Sun Direct", short: "SUN", accent: "#ffb300", type: "dth" },
]

export const broadbandProviders: Operator[] = [
  { id: "airtel-bb", name: "Airtel Xstream Fiber", short: "airtel", accent: "#e40000", type: "broadband" },
  { id: "jio-fiber", name: "JioFiber", short: "Jio", accent: "#0f3cc9", type: "broadband" },
  { id: "act", name: "ACT Fibernet", short: "ACT", accent: "#f7941d", type: "broadband" },
  { id: "bsnl-bb", name: "BSNL Broadband", short: "BSNL", accent: "#111111", type: "broadband" },
  { id: "hathway", name: "Hathway", short: "HW", accent: "#00a651", type: "broadband" },
  { id: "tata-fiber", name: "Tata Play Fiber", short: "TP", accent: "#3d1e6d", type: "broadband" },
]

export const telecomCircles: string[] = [
  "Andhra Pradesh & Telangana",
  "Assam",
  "Bihar & Jharkhand",
  "Chennai",
  "Delhi NCR",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Kolkata",
  "Madhya Pradesh & Chhattisgarh",
  "Maharashtra & Goa",
  "Mumbai",
  "North East",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh (East)",
  "Uttar Pradesh (West)",
  "West Bengal",
]
