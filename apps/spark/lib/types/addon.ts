export type AddOnCategory = "roaming" | "data" | "entertainment";

export type AddOnUnit = "one-off" | "per month" | "per day";

export interface AddOn {
  id: string;
  name: string;
  category: AddOnCategory;
  description: string;
  /** Price in NZD. */
  price: number;
  unit: AddOnUnit;
  /** For roaming packs: destinations the pack covers. */
  zones?: string[];
  /** For roaming/data packs: validity window in days. */
  durationDays?: number;
  /** Data allowance copy where relevant, e.g. "5GB". */
  data?: string;
  popular?: boolean;
}
