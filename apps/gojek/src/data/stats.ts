export type Stat = { value: number; suffix?: string; label: string; sublabel?: string };

export const platformStats: Stat[] = [
  { value: 3, label: "Countries", sublabel: "Indonesia, Singapore & Vietnam" },
  { value: 20, suffix: "+", label: "Products", sublabel: "One super-app" },
  { value: 190, suffix: "+", label: "Cities & towns", sublabel: "Across Southeast Asia" },
  { value: 2_800_000_000, label: "Transactions", sublabel: "Completed to date" },
];

export const ecosystemStats: Stat[] = [
  { value: 3_000_000, label: "Driver-partners", sublabel: "Earning flexibly with Gojek" },
  { value: 6_400_000, label: "Merchant-partners", sublabel: "Within the GoTo ecosystem" },
  { value: 190_000_000, label: "App downloads", sublabel: "And counting" },
  { value: 200_000, label: "Trees planted", sublabel: "GoGreener, 2024" },
];
