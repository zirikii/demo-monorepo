import type { BlogPost } from "./types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "payday-super-what-changes",
    title: "Payday Super: what actually changes for your pay run",
    category: "Payroll",
    excerpt:
      "Superannuation moves to the same cadence as wages. Here is what that means for cash flow, reconciliation and your clearing house.",
    author: "Priya Raman",
    authorRole: "Payroll Product Lead",
    publishedOn: "2026-07-28",
    tags: ["Payroll", "Compliance", "Superannuation"],
    body: [
      "Payday Super changes the timing obligation, not the calculation. Contributions must reach the fund on the same cadence as wages rather than quarterly, which turns a four-times-a-year reconciliation into a per-run one.",
      "For most employers the practical impact is cash flow. Money that previously sat in the business between quarters now leaves with each pay. Businesses that were using the quarterly gap as working capital need to plan for that shift before the obligation starts.",
      "The second impact is data quality. A quarterly cycle gave you time to correct a wrong fund or a missing member number. On a fortnightly cycle, an error is discovered and must be fixed inside two weeks.",
      "The practical preparation is unglamorous: audit your employee super details now, make sure choice-of-fund forms are on file, and confirm that your clearing house settlement time fits inside your pay cycle.",
      "In Employment OS, super is calculated with each run and validated by the Payroll Agent before submission, which surfaces missing fund details as an exception rather than a rejection weeks later.",
    ],
  },
  {
    slug: "annualised-salary-reconciliation",
    title: "Annualised salaries still need reconciling — here's the method",
    category: "Compliance",
    excerpt:
      "An annualised wage arrangement is not a shortcut around the award. A worked example of the twelve-month reconciliation.",
    author: "Nadia Fischer",
    authorRole: "HR Advisory",
    publishedOn: "2026-07-14",
    tags: ["Compliance", "Awards", "Fair Work"],
    body: [
      "Annualised wage arrangements let you pay a salary that absorbs overtime and penalties, but the award still sets the floor. Every twelve months you must compare what the employee was actually paid against what the award would have produced, and pay the shortfall.",
      "That comparison requires hours. If you are not recording start times, finish times and unpaid breaks for salaried staff covered by an award, you cannot perform the reconciliation and you are exposed.",
      "The worked example most people get wrong is the outer-limit breach. If an employee exceeds the ordinary hours or penalty hours specified in the arrangement in any pay period, those excess hours are payable in that period — not netted off at the end of the year.",
      "Practically: record hours for everyone covered by an award, run the comparison quarterly rather than annually so surprises are small, and keep the written arrangement current when duties change.",
    ],
  },
  {
    slug: "ai-in-hiring-what-to-disclose",
    title: "Using AI in hiring: what you should disclose to candidates",
    category: "Hiring",
    excerpt:
      "Transparency is becoming the baseline expectation. A short, practical disclosure framework for AI-assisted screening.",
    author: "Daniel Whitmore",
    authorRole: "Talent Product Manager",
    publishedOn: "2026-06-30",
    tags: ["Hiring", "AI", "Ethics"],
    body: [
      "Candidates increasingly expect to know when AI is involved in assessing them. The good news is that a clear disclosure improves completion rates rather than hurting them, because uncertainty is what makes people drop out.",
      "Disclose three things: that an AI system is scoring or interviewing, what it is assessing against, and that a person makes the final decision. Keep it to two sentences in the job ad and repeat it before the assessment starts.",
      "Give candidates a route to a human. An accessible alternative is not just good practice, it protects you where a candidate's circumstances make an automated assessment unfair.",
      "Finally, keep the reasoning. If you cannot explain why a candidate scored the way they did, you cannot defend the decision — to the candidate, to your own hiring manager, or to a regulator.",
    ],
  },
  {
    slug: "casual-conversion-obligations",
    title: "Casual conversion: the check most employers forget",
    category: "Compliance",
    excerpt:
      "The offer obligation is time-bound and does not wait for the employee to ask. A calendar-based approach.",
    author: "Rachel Nguyen",
    authorRole: "HR Advisory",
    publishedOn: "2026-06-12",
    tags: ["Compliance", "Casual employment", "Fair Work"],
    body: [
      "Casual conversion trips businesses up because the obligation sits with the employer and runs on a clock. Waiting for an employee to request conversion is not a compliant position.",
      "Track two dates against every casual: their start date and the anniversary of it. Assess the pattern of work in the preceding period, and either make an offer or record the reasonable grounds for not doing so — in writing, on time.",
      "The written record of reasonable grounds is what most businesses miss. A decision that was defensible at the time becomes indefensible when nobody wrote down why.",
      "In Employment OS this runs as a workflow: the anniversary triggers a review task for the manager with the hours pattern attached, and the outcome is stored against the employee record.",
    ],
  },
  {
    slug: "onboarding-first-90-days",
    title: "The first 90 days decide whether a hire stays",
    category: "People & culture",
    excerpt:
      "Turnover in shift-based industries concentrates in the first three months. Four interventions that move the number.",
    author: "Elena Marchetti",
    authorRole: "People Science",
    publishedOn: "2026-05-29",
    tags: ["Retention", "Onboarding", "Culture"],
    body: [
      "In hospitality, retail and care, most first-year turnover happens in the first ninety days — and a meaningful share happens before the first pay lands.",
      "The first intervention is speed. A new starter who is rostered, paid correctly and trained on time forms a very different impression from one chasing a manager for a uniform.",
      "The second is a named buddy. Not a manager — a peer on the same shift pattern who answers the questions people will not ask a supervisor.",
      "The third is a thirty-day check-in with actual content: what has surprised you, what is harder than you expected, what would you change. Fifteen minutes, recorded, actioned.",
      "The fourth is recognition that arrives early. A Hero Points award in the first fortnight signals that the effort was noticed, which is what most early leavers say was missing.",
    ],
  },
  {
    slug: "roster-cost-before-you-publish",
    title: "Know what a roster costs before you publish it",
    category: "Operations",
    excerpt:
      "Labour cost discovered in the pay run is labour cost you cannot change. Move the number forward.",
    author: "Keith Warrick",
    authorRole: "Workforce Operations",
    publishedOn: "2026-05-08",
    tags: ["Rostering", "Labour cost", "Operations"],
    body: [
      "Most multi-site operators find out what a roster cost two weeks after the shifts were worked. By then the only lever left is next fortnight's roster.",
      "Costing a roster against award rates as you build it changes the conversation. A manager can see that moving a shift thirty minutes earlier avoids a penalty band, and make the change while it still matters.",
      "The second benefit is comparability. When every venue costs its roster the same way, you can see which sites are structurally over-rostered rather than which managers are worse at explaining themselves.",
      "Set a labour-cost percentage target per site, show it live as the roster is built, and require an override reason to publish above it.",
    ],
  },
  {
    slug: "smartmatch-hiring-without-ads",
    title: "How three operators filled 96 roles without a paid job ad",
    category: "Hiring",
    excerpt:
      "Matching against an existing talent pool changes the economics of volume hiring. The numbers from last summer.",
    author: "Michael Oliverio",
    authorRole: "Customer Story",
    publishedOn: "2026-04-22",
    tags: ["Hiring", "SmartMatch", "Case study"],
    body: [
      "Volume hiring in hospitality has historically been an advertising problem: post widely, pay per ad, and sift.",
      "Matching inverts that. The pool already exists, the availability and pay expectations are already stated, and the shortlist is generated before the ad would have gone live.",
      "Across last summer, three operators in our customer base filled 96 casual roles with no paid advertising spend at all, at a median eleven days from requisition to first shift.",
      "The constraint that remains is speed of response. Candidates matched to three employers take the first credible offer, so the operators who won were the ones who screened and scheduled within forty-eight hours.",
    ],
  },
  {
    slug: "hero-ai-agents-explained",
    title: "What a Hero AI agent actually does in a pay run",
    category: "Product",
    excerpt:
      "Not a chatbot. A walkthrough of the validations the Payroll Agent runs before you approve.",
    author: "Sam Okafor",
    authorRole: "Product",
    publishedOn: "2026-04-03",
    tags: ["AI", "Payroll", "Product"],
    body: [
      "The Payroll Agent is not a chat window bolted onto payroll. It runs a defined set of validations across the draft run and reports what it found in plain language.",
      "It checks for employees with hours but no super, rates that moved without an approved change, terminated employees still in the run, overtime that exceeds the roster by a threshold, and leave taken without a balance.",
      "Each finding names the employee, the rule and the dollar impact, and links to the line that produced it. Nothing is auto-corrected.",
      "The value is not the intelligence, it is the consistency. A payroll officer running a Friday cycle at 4pm checks what they remember to check. The agent checks the same twenty-two things every time.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const BLOG_CATEGORIES = Array.from(new Set(BLOG_POSTS.map((post) => post.category))).sort();
