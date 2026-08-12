import type { CustomerStory } from "./types";

export const customerStories: CustomerStory[] = [
  { slug: "harbour-co", company: "Harbour & Co", industry: "Hospitality", headline: "Cut payroll prep from two days to two hours", quote: "Employment OS pulled timesheets, leave and awards into one place — our managers finally trust the numbers.", person: "Amelia Nguyen", role: "Head of People", metric: "85% less payroll admin" },
  { slug: "northline-logistics", company: "Northline Logistics", industry: "Transport", headline: "Onboarded 120 drivers without a paper form", quote: "Candidates accept offers on their phone and show up day one with equipment and super already sorted.", person: "Jack Williams", role: "Ops Director", metric: "48-hour average onboarding" },
  { slug: "brightwell-health", company: "Brightwell Health", industry: "Healthcare", headline: "Leave balances staff can actually see", quote: "We stopped the inbox ping-pong. Nurses check balances in the Work app and managers approve in minutes.", person: "Isla Chen", role: "Clinical Services Manager", metric: "3× faster leave approvals" },
  { slug: "kite-digital", company: "Kite Digital", industry: "Technology", headline: "One ATS that hands off to HR cleanly", quote: "Recruitment used to dump spreadsheets on us. Now every hire lands as a complete employee record.", person: "Noah Patel", role: "Talent Lead", metric: "40% faster time-to-hire" },
];

export function getCustomer(slug: string): CustomerStory | undefined {
  return customerStories.find((c) => c.slug === slug);
}
