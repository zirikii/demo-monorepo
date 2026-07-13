export type ExperienceItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  summary: string;
};

export const experiences: ExperienceItem[] = [
  { id: "e1", title: "HSBC Rain Vortex", category: "Nature", location: "Jewel", summary: "The world's tallest indoor waterfall anchors Jewel's central atrium." },
  { id: "e2", title: "Canopy Park", category: "Play", location: "Jewel L5", summary: "Hedge Maze, Mirror Maze, Discovery Slides, and sky nets." },
  { id: "e3", title: "Butterfly Garden", category: "Nature", location: "T3", summary: "Tropical butterflies in Changi's enchanting airside garden." },
  { id: "e4", title: "Kinetic Rain", category: "Art", location: "T1", summary: "Copper droplets form shifting sculptures above the departure hall." },
  { id: "e5", title: "Slide@T3", category: "Play", location: "T3", summary: "Two indoor slides for a quick burst of fun between gates." },
  { id: "e6", title: "Movie Theatre", category: "Movie Theatres", location: "T3", summary: "Catch a film before your flight at the terminal cinema." },
  { id: "e7", title: "Cactus Garden", category: "Nature", location: "T1", summary: "A serene desert landscape tucked into the terminal." },
  { id: "e8", title: "Sunflower Garden", category: "Nature", location: "T2", summary: "Bright blooms and photo moments airside." },
  { id: "e9", title: "Social Tree", category: "Art", location: "T4", summary: "Share messages that light up a digital art installation." },
  { id: "e10", title: "Entertainment Deck", category: "Relax", location: "T4", summary: "Games, music, and unwind zones for longer waits." },
];
