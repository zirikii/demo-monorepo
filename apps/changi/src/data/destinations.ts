export interface Destination {
  city: string;
  code: string;
  country: string;
  tagline: string;
  /** gradient class used for the card backdrop (no external imagery) */
  tint: string;
}

/** "Explore cities we are flying to today" — Changi homepage destination strip. */
export const destinations: Destination[] = [
  { city: "Tokyo", code: "HND", country: "Japan", tagline: "Lesser-known spots to visit", tint: "from-rose-400 to-fuchsia-600" },
  { city: "Kyoto", code: "UKY", country: "Japan", tagline: "All about onsens & ryokans", tint: "from-pink-400 to-rose-600" },
  { city: "Melbourne", code: "MEL", country: "Australia", tagline: "Best day trips out of the city", tint: "from-sky-400 to-indigo-600" },
  { city: "Rome", code: "FCO", country: "Italy", tagline: "Top things to see & do", tint: "from-amber-400 to-orange-600" },
  { city: "London", code: "LHR", country: "United Kingdom", tagline: "Weekend day-trip ideas", tint: "from-indigo-400 to-purple-600" },
  { city: "Bangkok", code: "BKK", country: "Thailand", tagline: "New things to do this season", tint: "from-orange-400 to-red-600" },
  { city: "Seoul", code: "ICN", country: "South Korea", tagline: "Cafés, palaces & night markets", tint: "from-violet-400 to-fuchsia-600" },
  { city: "Jeju", code: "CJU", country: "South Korea", tagline: "The Hawaii of South Korea", tint: "from-emerald-400 to-teal-600" },
  { city: "Penang", code: "PEN", country: "Malaysia", tagline: "Top nature retreats", tint: "from-lime-400 to-emerald-600" },
  { city: "Bali", code: "DPS", country: "Indonesia", tagline: "Perfect for family fun", tint: "from-teal-400 to-cyan-600" },
  { city: "Hong Kong", code: "HKG", country: "Hong Kong", tagline: "Lesser-known attractions", tint: "from-red-400 to-rose-600" },
  { city: "Cebu", code: "CEB", country: "Philippines", tagline: "Best nature activities await", tint: "from-cyan-400 to-blue-600" },
  { city: "Amsterdam", code: "AMS", country: "Netherlands", tagline: "Hidden gems to visit", tint: "from-orange-400 to-amber-600" },
  { city: "Busan", code: "PUS", country: "South Korea", tagline: "Vibrant coastal city", tint: "from-blue-400 to-indigo-600" },
  { city: "Phnom Penh", code: "PNH", country: "Cambodia", tagline: "A food journey", tint: "from-amber-400 to-yellow-600" },
  { city: "Haikou", code: "HAK", country: "China", tagline: "Recommendations for you", tint: "from-fuchsia-400 to-pink-600" },
];
