export type RewardItem = {
  id: string;
  title: string;
  points: number;
  category: string;
  description: string;
};

export const rewardBenefits = [
  { title: "Earn everywhere", body: "Collect points when you dine, shop, and park across Changi and Jewel." },
  { title: "Redeem instantly", body: "Use points at participating outlets or in the Changi Rewards catalogue." },
  { title: "Fly further", body: "Convert points toward exclusive travel promotions with airline partners." },
  { title: "Changi Monarch", body: "Unlock elevated privileges with higher tier membership." },
];

export const catalogue: RewardItem[] = [
  { id: "r1", title: "S$10 Dining Voucher", points: 1000, category: "Dining", description: "Redeem at selected Changi restaurants and cafés." },
  { id: "r2", title: "S$20 Retail Voucher", points: 2000, category: "Shopping", description: "Spend across participating fashion and lifestyle stores." },
  { id: "r3", title: "Canopy Park Admission", points: 1500, category: "Experience", description: "Two tickets to Canopy Park at Jewel." },
  { id: "r4", title: "Lounge Day Pass", points: 4500, category: "Travel", description: "Single-entry pay-per-use lounge experience." },
  { id: "r5", title: "Changi Exclusive Tote", points: 800, category: "Merchandise", description: "Limited-edition Changi Airport tote bag." },
  { id: "r6", title: "Movie Theatre Tickets", points: 1200, category: "Experience", description: "Pair of tickets at terminal cinemas." },
  { id: "r7", title: "Parking Voucher", points: 1800, category: "Travel", description: "S$15 parking credit at Changi car parks." },
  { id: "r8", title: "Spa Express Session", points: 3200, category: "Wellness", description: "30-minute express treatment airside." },
];
