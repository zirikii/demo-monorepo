export type YelloOffer = {
  id: string;
  brand: string;
  title: string;
  cashback: string;
  category: string;
  expires: string;
};

export const yelloOffers: YelloOffer[] = [
  { id: "o1", brand: "Woolworths", title: "5% cashback on groceries", cashback: "5%", category: "Shopping", expires: "2026-09-30" },
  { id: "o2", brand: "Caltex / Ampol", title: "4¢/L fuel offer", cashback: "4¢/L", category: "Fuel", expires: "2026-08-31" },
  { id: "o3", brand: "JB Hi-Fi", title: "$20 cashback on $100+", cashback: "$20", category: "Electronics", expires: "2026-09-15" },
  { id: "o4", brand: "Uber Eats", title: "$8 off two orders", cashback: "$8", category: "Dining", expires: "2026-08-20" },
  { id: "o5", brand: "Booking.com", title: "8% back on hotels", cashback: "8%", category: "Travel", expires: "2026-10-01" },
  { id: "o6", brand: "The Iconic", title: "10% cashback weekend", cashback: "10%", category: "Fashion", expires: "2026-08-10" },
  { id: "o7", brand: "Origin Energy", title: "Electric welcome credit", cashback: "$50", category: "Bills", expires: "2026-12-31" },
  { id: "o8", brand: "nbn partner", title: "Monthly plan discount", cashback: "$10/mo", category: "Bills", expires: "2026-11-30" },
];
