import type { PillarId } from "./types";

export type PillarMeta = {
  id: PillarId;
  label: string;
  to: string;
  /** Tailwind text colour utility backed by the app @theme tokens. */
  text: string;
  bg: string;
  border: string;
  dot: string;
  blurb: string;
};

export const pillars: Record<PillarId, PillarMeta> = {
  news: {
    id: "news",
    label: "News",
    to: "/news",
    text: "text-news",
    bg: "bg-news",
    border: "border-news",
    dot: "bg-news",
    blurb: "Breaking news, politics, finance and the stories shaping Australia.",
  },
  sport: {
    id: "sport",
    label: "Sport",
    to: "/sport",
    text: "text-sport",
    bg: "bg-sport",
    border: "border-sport",
    dot: "bg-sport",
    blurb: "AFL, NRL, cricket and football — live scores and expert analysis.",
  },
  lifestyle: {
    id: "lifestyle",
    label: "Lifestyle",
    to: "/lifestyle",
    text: "text-lifestyle",
    bg: "bg-lifestyle",
    border: "border-lifestyle",
    dot: "bg-lifestyle",
    blurb: "Food, health, relationships, royals and everything 9Honey.",
  },
  travel: {
    id: "travel",
    label: "Travel",
    to: "/travel",
    text: "text-travel",
    bg: "bg-travel",
    border: "border-travel",
    dot: "bg-travel",
    blurb: "Destination guides, deals and tips for your next getaway.",
  },
  entertainment: {
    id: "entertainment",
    label: "Entertainment",
    to: "/entertainment",
    text: "text-entertainment",
    bg: "bg-entertainment",
    border: "border-entertainment",
    dot: "bg-entertainment",
    blurb: "TV, celebrity, MAFS, The Block and the best of 9Now.",
  },
  shopping: {
    id: "shopping",
    label: "Shopping",
    to: "/shopping",
    text: "text-shopping",
    bg: "bg-shopping",
    border: "border-shopping",
    dot: "bg-shopping",
    blurb: "Deals, coupon codes and reviews to help you spend smarter.",
  },
};

export const pillarOrder: PillarId[] = [
  "news",
  "sport",
  "lifestyle",
  "travel",
  "entertainment",
  "shopping",
];

export function pillarMeta(id: PillarId): PillarMeta {
  return pillars[id];
}
