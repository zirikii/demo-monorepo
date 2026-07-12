import type { AccentColour } from "./common";

export type PromotionCategory = "travel" | "move" | "device" | "plan" | "help";

export interface PromotionCta {
  label: string;
  href: string;
}

export interface Promotion {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  category: PromotionCategory;
  accent: AccentColour;
  cta: PromotionCta;
  /** Optional secondary link, e.g. "Learn more". */
  secondaryCta?: PromotionCta;
  badge?: string;
  /** Optional bullet highlights shown on larger cards. */
  highlights?: string[];
}
