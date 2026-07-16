export type PillarId =
  | "news"
  | "sport"
  | "lifestyle"
  | "travel"
  | "entertainment"
  | "shopping";

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  pillar: PillarId;
  category: string;
  author: string;
  authorTitle: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  body: string[];
  live?: boolean;
  sponsored?: boolean;
  featured?: boolean;
};

export type NavColumn = {
  heading: string;
  links: { label: string; to: string }[];
};

export type PrimaryNavItem = {
  id: PillarId;
  label: string;
  to: string;
  columns: NavColumn[];
};

export type BrandLink = {
  label: string;
  to: string;
  active?: boolean;
};

export type ScoreLine = {
  team: string;
  short: string;
  score: number;
};

export type Match = {
  id: string;
  competition: string;
  status: "LIVE" | "FT" | "Upcoming";
  clock: string;
  venue: string;
  scores?: ScoreLine[];
  startsAt?: string;
};

export type VideoClip = {
  id: string;
  title: string;
  pillar: PillarId;
  show: string;
  duration: string;
  publishedAt: string;
  live?: boolean;
};

export type CityForecast = {
  city: string;
  state: string;
  icon: "sun" | "cloud" | "rain" | "storm" | "wind";
  summary: string;
  now: number;
  min: number;
  max: number;
  rain: number;
};

export type Show = {
  name: string;
  channel: string;
  slot: string;
  blurb: string;
  tag: string;
};

export type Deal = {
  id: string;
  retailer: string;
  title: string;
  discount: string;
  code: string;
  category: string;
  expires: string;
};
