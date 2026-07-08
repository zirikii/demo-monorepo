export interface Movie {
  id: string;
  title: string;
  language: string;
  genre: string;
  rating: number;
  certificate: "U" | "UA" | "A";
  poster: { from: string; to: string };
}

/** Fictional now-showing titles (demo data — not real releases). */
export const nowShowing: Movie[] = [
  { id: "m1", title: "Monsoon Express", language: "Hindi", genre: "Action Thriller", rating: 8.4, certificate: "UA", poster: { from: "#1d2b64", to: "#f8cdda" } },
  { id: "m2", title: "Chennai Nights", language: "Tamil", genre: "Romance Drama", rating: 8.1, certificate: "U", poster: { from: "#42275a", to: "#734b6d" } },
  { id: "m3", title: "The Last Wicket", language: "Hindi", genre: "Sports Drama", rating: 9.0, certificate: "U", poster: { from: "#134e5e", to: "#71b280" } },
  { id: "m4", title: "Hyderabad Heist", language: "Telugu", genre: "Crime Comedy", rating: 7.8, certificate: "UA", poster: { from: "#232526", to: "#414345" } },
  { id: "m5", title: "Skyfall Over Ladakh", language: "Hindi", genre: "Adventure", rating: 8.7, certificate: "U", poster: { from: "#0f2027", to: "#2c5364" } },
  { id: "m6", title: "Bengaluru Bytes", language: "Kannada", genre: "Tech Comedy", rating: 7.5, certificate: "U", poster: { from: "#5a3f37", to: "#2c7744" } },
  { id: "m7", title: "Rani of the Ring", language: "Hindi", genre: "Biopic", rating: 8.9, certificate: "U", poster: { from: "#8e0e00", to: "#1f1c18" } },
  { id: "m8", title: "Kolkata Chronicles", language: "Bengali", genre: "Mystery", rating: 8.2, certificate: "UA", poster: { from: "#141e30", to: "#243b55" } },
];

export interface LiveEvent {
  id: string;
  name: string;
  kind: string;
  city: string;
  date: string;
  priceFrom: number;
}

export const liveEvents: LiveEvent[] = [
  { id: "e1", name: "Indie Sunset Music Fest", kind: "Concert", city: "Mumbai", date: "2026-08-14", priceFrom: 999 },
  { id: "e2", name: "Standup Saturday: Laughter Club", kind: "Comedy", city: "Bengaluru", date: "2026-07-25", priceFrom: 499 },
  { id: "e3", name: "Sufi Nights Live", kind: "Concert", city: "Delhi", date: "2026-09-05", priceFrom: 799 },
  { id: "e4", name: "Startup Expo & Demo Day", kind: "Conference", city: "Hyderabad", date: "2026-08-01", priceFrom: 299 },
  { id: "e5", name: "Food Truck Carnival", kind: "Festival", city: "Pune", date: "2026-07-19", priceFrom: 199 },
  { id: "e6", name: "Theatre: The Silk Route", kind: "Play", city: "Kolkata", date: "2026-08-22", priceFrom: 349 },
];

export const movieCities: string[] = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
];
