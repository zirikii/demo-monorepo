export type Terminal = {
  id: string;
  name: string;
  code: string;
  summary: string;
  highlights: string[];
};

export const terminals: Terminal[] = [
  {
    id: "t1",
    name: "Terminal 1",
    code: "T1",
    summary: "Home to Kinetic Rain and the Cactus Garden, with extensive shopping near Departures.",
    highlights: ["Kinetic Rain", "Cactus Garden", "Expanded Central Plaza"],
  },
  {
    id: "t2",
    name: "Terminal 2",
    code: "T2",
    summary: "Recently refreshed halls with lush greenery, dining clusters, and easy Jewel access.",
    highlights: ["Sunflower Garden", "Heritage Zone", "Skytrain to Jewel"],
  },
  {
    id: "t3",
    name: "Terminal 3",
    code: "T3",
    summary: "Light-filled architecture with Butterfly Garden, Slide@T3, and premium retail.",
    highlights: ["Butterfly Garden", "Slide@T3", "Movie Theatre"],
  },
  {
    id: "t4",
    name: "Terminal 4",
    code: "T4",
    summary: "Automated check-in experience with vibrant murals and the Social Tree.",
    highlights: ["Facial recognition clearance", "Social Tree", "Entertainment Deck"],
  },
];
