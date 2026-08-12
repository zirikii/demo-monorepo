import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  { slug: "employment-os-explained", title: "What is an Employment Operating System?", excerpt: "Why stitching HR, payroll and hiring tools together no longer cuts it for growing teams.", category: "Product", date: "2026-07-28", author: "Priya Nair" },
  { slug: "payroll-error-checklist", title: "The payroll error checklist before every pay run", excerpt: "Catch award mismatches, leave balances and STP issues before money leaves the account.", category: "Payroll", date: "2026-07-14", author: "James Cotter" },
  { slug: "onboarding-in-48-hours", title: "How Harbour & Co onboards in 48 hours", excerpt: "A practical playbook for paperless contracts, equipment and day-one access.", category: "HR", date: "2026-06-30", author: "Elena Vos" },
  { slug: "hiring-scorecards", title: "Scorecards that keep hiring fair", excerpt: "Structured interviews beat gut feel — here's a template you can copy today.", category: "Recruitment", date: "2026-06-12", author: "Marcus Lee" },
  { slug: "benefits-employees-open", title: "Benefits employees actually open", excerpt: "From lifestyle wallets to EAP, design perks that show up in the Work app.", category: "Benefits", date: "2026-05-22", author: "Sofia Rahman" },
  { slug: "leave-culture", title: "Building a leave culture managers won't block", excerpt: "Transparency on balances and coverage planning reduces last-minute declines.", category: "Culture", date: "2026-05-05", author: "Tom Hale" },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
