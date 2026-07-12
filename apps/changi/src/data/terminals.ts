export interface Terminal {
  slug: string;
  name: string;
  code: "T1" | "T2" | "T3" | "T4";
  tagline: string;
  summary: string;
  highlights: string[];
  facilities: string[];
  transport: string[];
  tint: string;
}

/** The four Changi terminals (Jewel is covered under Experience). */
export const terminals: Terminal[] = [
  {
    slug: "t1",
    name: "Terminal 1",
    code: "T1",
    tagline: "Home of the Kinetic Rain & Jewel",
    summary:
      "Terminal 1 connects directly to Jewel and welcomes travellers with the mesmerising Kinetic Rain sculpture above the departure hall.",
    highlights: ["Kinetic Rain kinetic art", "Direct link to Jewel", "Rooftop swimming pool & bar"],
    facilities: ["Free Wi-Fi", "Shower & rest areas", "Baggage storage", "Nursing rooms", "Prayer rooms"],
    transport: ["Changi Airport MRT (via T2/T3)", "Taxi & private hire pick-up", "Public bus 24, 34, 36"],
    tint: "from-magenta to-plum",
  },
  {
    slug: "t2",
    name: "Terminal 2",
    code: "T2",
    tagline: "The Wonderfall & Dreamscape",
    summary:
      "Freshly reimagined, Terminal 2 features the Wonderfall digital waterfall and the immersive Dreamscape garden of illuminated pods.",
    highlights: ["The Wonderfall media wall", "Dreamscape garden", "Immersive Skytrain arrival"],
    facilities: ["Free Wi-Fi", "Snooze lounges", "Foot reflexology paths", "Nursing rooms", "Free movie theatre"],
    transport: ["Changi Airport MRT", "Taxi & private hire", "Skytrain to T1/T3/T4"],
    tint: "from-flame to-amber",
  },
  {
    slug: "t3",
    name: "Terminal 3",
    code: "T3",
    tagline: "The Slide @ T3 & Butterfly Garden",
    summary:
      "Terminal 3 is home to the four-storey Slide @ T3 and a tropical Butterfly Garden with over a thousand fluttering residents.",
    highlights: ["The Slide @ T3", "Butterfly Garden", "Crowne Plaza hotel access"],
    facilities: ["Free Wi-Fi", "Sunflower Garden", "Entertainment decks", "Shower & rest areas", "Nursing rooms"],
    transport: ["Changi Airport MRT", "Taxi & private hire", "Skytrain to T1/T2"],
    tint: "from-purple-600 to-magenta",
  },
  {
    slug: "t4",
    name: "Terminal 4",
    code: "T4",
    tagline: "Fast, seamless & sculptural",
    summary:
      "Terminal 4 pioneers end-to-end self-service travel and celebrates heritage with the Peranakan-inspired Heritage Zone.",
    highlights: ["Fast & Seamless Travel (FAST)", "Heritage Zone façades", "Petalclouds kinetic sculpture"],
    facilities: ["Free Wi-Fi", "Self-service check-in & bag-drop", "Immersive Wall", "Nursing rooms", "Rest areas"],
    transport: ["Free shuttle bus to T2", "Taxi & private hire", "Public bus 24, 34, 36"],
    tint: "from-amber to-flame",
  },
];
