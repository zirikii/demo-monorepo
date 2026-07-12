export type PlanKind = "mobile" | "broadband";

export type PlanTerm = "open-term" | "12-month-contract" | "prepaid";

export interface Plan {
  id: string;
  kind: PlanKind;
  /** Marketing name, e.g. "Endless Data Mobile". */
  name: string;
  tagline: string;
  /** Monthly price in NZD. */
  monthlyPrice: number;
  /** Data allowance copy, e.g. "Endless data" or "60GB". */
  data: string;
  /** Calls & text copy, e.g. "Endless mins & texts". */
  calls: string;
  /** Broadband only: connection speed copy. */
  speed?: string;
  term: PlanTerm;
  features: string[];
  /** Highlighted as the recommended option. */
  popular?: boolean;
  /** Whether roaming/travel is included or easy to add. */
  roamingReady?: boolean;
}
