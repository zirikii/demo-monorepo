export interface EmployerReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  title: string;
  body: string;
  /** e.g. "Melbourne VIC · Full time" */
  meta: string;
}

export interface Employer {
  id: string;
  slug: string;
  name: string;
  /** Path under /employers, e.g. "/employers/bupa.svg". */
  logo: string;
  industry: string;
  tagline: string;
  about: string;
  /** Headquarters / primary location label. */
  location: string;
  /** Approximate headcount label, e.g. "1,000+ employees". */
  size: string;
  /** Average review score out of 5 (demo metric). */
  rating: number;
  reviewCount: number;
  /** Short culture blurb for company profiles. */
  culture: string;
  /** Workplace perks shown on company profiles. */
  perks: string[];
  /** Sample employee reviews (fictional). */
  reviews: EmployerReview[];
}
