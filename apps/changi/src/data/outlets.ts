export type Outlet = {
  id: string;
  name: string;
  category: "Dining" | "Shopping";
  subcategory: string;
  terminal: string;
  hours: string;
  highlight?: string;
};

export const outlets: Outlet[] = [
  { id: "o1", name: "Jumbo Seafood", category: "Dining", subcategory: "Restaurants", terminal: "T3", hours: "10:00–22:00", highlight: "Chilli crab classic" },
  { id: "o2", name: "Ya Kun Kaya Toast", category: "Dining", subcategory: "Cafés", terminal: "T2", hours: "24 Hours", highlight: "Local breakfast" },
  { id: "o3", name: "Burger King", category: "Dining", subcategory: "Fast Food", terminal: "T1", hours: "06:00–23:00" },
  { id: "o4", name: "Imperial Treasure", category: "Dining", subcategory: "Fine Dining", terminal: "T3", hours: "11:30–22:00" },
  { id: "o5", name: "Staff Café Food Court", category: "Dining", subcategory: "Food Court", terminal: "T4", hours: "07:00–21:00" },
  { id: "o6", name: "Old Chang Kee", category: "Dining", subcategory: "Homegrown Brands", terminal: "T2", hours: "08:00–22:00", highlight: "Curry puff favourite" },
  { id: "o7", name: "The Public House", category: "Dining", subcategory: "Pubs & Bars", terminal: "T3", hours: "12:00–01:00" },
  { id: "o8", name: "7-Eleven Express Bites", category: "Dining", subcategory: "Quick Bites", terminal: "T1", hours: "24 Hours" },
  { id: "o9", name: "Sephora", category: "Shopping", subcategory: "Beauty", terminal: "T3", hours: "06:00–23:00" },
  { id: "o10", name: "Mothercare", category: "Shopping", subcategory: "Children & Maternity", terminal: "T2", hours: "08:00–22:00" },
  { id: "o11", name: "Godiva", category: "Shopping", subcategory: "Deli & Confectionary", terminal: "T1", hours: "07:00–22:00" },
  { id: "o12", name: "Apple Shop", category: "Shopping", subcategory: "Electronics", terminal: "T3", hours: "08:00–22:00" },
  { id: "o13", name: "Uniqlo", category: "Shopping", subcategory: "Fashion & Accessories", terminal: "T2", hours: "08:00–22:00" },
  { id: "o14", name: "Hermès", category: "Shopping", subcategory: "Luxury", terminal: "T3", hours: "08:00–21:00" },
  { id: "o15", name: "Changi Recommends", category: "Shopping", subcategory: "Souvenirs, Gifts & Books", terminal: "T1", hours: "24 Hours" },
  { id: "o16", name: "Rolex Boutique", category: "Shopping", subcategory: "Watches & Jewellery", terminal: "T3", hours: "09:00–21:00" },
  { id: "o17", name: "DFS Wine & Spirits", category: "Shopping", subcategory: "Wine & Spirits", terminal: "T2", hours: "06:00–23:00", highlight: "GST absorbed" },
  { id: "o18", name: "FairPrice Xpress", category: "Shopping", subcategory: "Supermarket & Convenience", terminal: "T4", hours: "24 Hours" },
  { id: "o19", name: "Samsonite", category: "Shopping", subcategory: "Travel", terminal: "T1", hours: "07:00–22:00" },
  { id: "o20", name: "Decathlon Travel", category: "Shopping", subcategory: "Sports", terminal: "Jewel", hours: "10:00–22:00" },
  { id: "o21", name: "Sunglass Hut", category: "Shopping", subcategory: "Optical", terminal: "T3", hours: "08:00–22:00" },
  { id: "o22", name: "MUJI", category: "Shopping", subcategory: "Home & Living", terminal: "Jewel", hours: "10:00–22:00" },
  { id: "o23", name: "Lego Certified Store", category: "Shopping", subcategory: "Entertainment", terminal: "Jewel", hours: "10:00–22:00" },
  { id: "o24", name: "TwG Tea", category: "Dining", subcategory: "Cafés", terminal: "T3", hours: "08:00–22:00" },
  { id: "o25", name: "Din Tai Fung", category: "Dining", subcategory: "Restaurants", terminal: "Jewel", hours: "11:00–22:00" },
];
