export interface Experience {
  slug: string;
  name: string;
  location: string;
  admission: "Free" | "Ticketed";
  duration: string;
  summary: string;
  description: string;
  highlights: string[];
  tint: string;
}

/** Attractions across Jewel and the terminals. */
export const experiences: Experience[] = [
  {
    slug: "jewel-rain-vortex",
    name: "HSBC Rain Vortex",
    location: "Jewel, Level 1",
    admission: "Free",
    duration: "30–45 min",
    summary: "The world's tallest indoor waterfall at the heart of Jewel.",
    description:
      "Cascading 40 metres through the glass-and-steel dome, the HSBC Rain Vortex is the beating heart of Jewel. By day it shimmers with sunlight; by night it transforms into a choreographed light-and-sound show on the hour.",
    highlights: ["40m indoor waterfall", "Evening light & sound show", "Ringed by the Shiseido Forest Valley"],
    tint: "from-sky-400 via-indigo-500 to-purple-600",
  },
  {
    slug: "canopy-park",
    name: "Canopy Park",
    location: "Jewel, Level 5",
    admission: "Ticketed",
    duration: "2–3 hrs",
    summary: "Topiaries, hedge mazes and bouncing nets high above the vortex.",
    description:
      "The playful crown of Jewel gathers gardens and attractions across the top level — walk the Canopy Bridge, lose yourself in the Hedge Maze, and bounce across the Manulife Sky Nets suspended above the greenery.",
    highlights: ["Manulife Sky Nets", "Hedge & Mirror Mazes", "Canopy Bridge & Foggy Bowls"],
    tint: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    slug: "shiseido-forest-valley",
    name: "Shiseido Forest Valley",
    location: "Jewel, Levels 1–4",
    admission: "Free",
    duration: "45 min",
    summary: "A terraced indoor garden of trails, ferns and quiet lookouts.",
    description:
      "Wrapping the Rain Vortex, the Shiseido Forest Valley is a lush four-storey indoor garden. Follow the Valley Trail or the Canyon Trail past thousands of plants and trees to viewing decks that frame the falls.",
    highlights: ["Two walking trails", "Thousands of trees & plants", "Viewing decks over the vortex"],
    tint: "from-lime-400 via-emerald-500 to-teal-600",
  },
  {
    slug: "changi-experience-studio",
    name: "Changi Experience Studio",
    location: "Jewel, Level 4",
    admission: "Ticketed",
    duration: "2 hrs",
    summary: "Singapore's largest digital entertainment attraction.",
    description:
      "A hands-on playground of interactive games and immersive installations that tell the Changi story. Race a virtual Skytrain, paint the sky with your own aircraft, and step into larger-than-life displays.",
    highlights: ["Interactive games", "Immersive projections", "The story of Changi"],
    tint: "from-fuchsia-400 via-magenta to-plum",
  },
  {
    slug: "kinetic-rain",
    name: "Kinetic Rain",
    location: "Terminal 1, Departure Hall",
    admission: "Free",
    duration: "15 min",
    summary: "1,216 bronze droplets dancing in perfect choreography.",
    description:
      "Above the Terminal 1 departure hall, two sculptures of computer-controlled bronze raindrops rise and fall in a mesmerising 15-minute sequence — one of the largest kinetic art installations in the world.",
    highlights: ["1,216 kinetic droplets", "15-minute art sequence", "Free to watch, any time"],
    tint: "from-amber-400 via-orange-500 to-flame",
  },
  {
    slug: "butterfly-garden",
    name: "Butterfly Garden",
    location: "Terminal 3, Departure Transit",
    admission: "Free",
    duration: "30 min",
    summary: "A tropical haven of over a thousand butterflies.",
    description:
      "The world's first airport butterfly garden is home to more than a thousand butterflies across dozens of species, set among a lush two-storey habitat with a grotto waterfall.",
    highlights: ["1,000+ butterflies", "Grotto waterfall", "Free for departing travellers"],
    tint: "from-pink-400 via-rose-500 to-fuchsia-600",
  },
];
