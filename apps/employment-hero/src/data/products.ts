import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "hiring",
    name: "Hiring & Employment",
    category: "Hiring",
    tagline: "Fill roles without writing another job ad",
    summary:
      "Job ads, an applicant tracking system and AI screening that builds a shortlist from a live candidate pool.",
    heroHeadline: "Hiring. Handled.",
    heroBlurb:
      "Post once, or skip the ad entirely. SmartMatch surfaces ready-to-work candidates from a pool of 2.5 million profiles, and the recruitment agent screens them before you spend a minute reading a résumé.",
    bullets: [
      "Publish to the Employment Hero job board and the major aggregators in one step",
      "Track every applicant through a drag-and-drop pipeline with team scorecards",
      "Let the recruitment agent run structured video interviews and rank the answers",
      "Move a successful candidate straight into onboarding without re-keying a thing",
    ],
    modules: [
      {
        name: "SmartMatch",
        description: "Live shortlists drawn from the built-in candidate pool, no job ad required.",
      },
      {
        name: "Applicant tracking",
        description: "Pipelines, scorecards, interview scheduling and offer management.",
      },
      {
        name: "Recruitment agent",
        description: "Structured AI video interviews scored against a rubric you control.",
      },
      {
        name: "Careers page",
        description: "A branded careers site that stays in sync with your open roles.",
      },
    ],
    stat: { value: "80 sec", label: "to screen ten candidates" },
    planFrom: "Included from HR Engage",
  },
  {
    slug: "hr-software",
    name: "HR",
    category: "HR",
    tagline: "The system of record your team actually opens",
    summary:
      "Employee records, onboarding, policies, performance and engagement in one place, with workflows that chase the follow-ups for you.",
    heroHeadline: "HR admin. Automated away.",
    heroBlurb:
      "Contracts, certifications, policy sign-off and performance reviews all run themselves. Your people team gets its calendar back and every record stays audit-ready.",
    bullets: [
      "Generate a compliant employment contract in under five minutes",
      "Onboard new starters with a guided checklist and automatic account provisioning",
      "Run reviews, 1:1s, goals and 360 feedback on a schedule that repeats itself",
      "Track certifications and visa checks with expiry reminders before they lapse",
    ],
    modules: [
      {
        name: "Core HR",
        description: "Employee files, org chart, documents, assets and incident reporting.",
      },
      {
        name: "Onboarding",
        description: "Checklists, tax declarations and day-one account provisioning.",
      },
      {
        name: "Performance",
        description: "Reviews, 1:1s, goals, 360 feedback and a nine-box talent grid.",
      },
      {
        name: "Engagement",
        description: "Company feed, shout-outs, hero points and happiness surveys.",
      },
      {
        name: "Workflows",
        description: "Template or custom automations for any repeatable people process.",
      },
    ],
    stat: { value: "5 min", label: "to generate a contract" },
    planFrom: "From $10 per employee per month",
  },
  {
    slug: "payroll-software",
    name: "Payroll",
    category: "Payroll",
    tagline: "Pay runs that reconcile before you press send",
    summary:
      "Award interpretation, timesheet ingestion, superannuation and Single Touch Payroll Phase 2 reporting, with errors flagged before submission.",
    heroHeadline: "Payroll that just works, without the busywork.",
    heroBlurb:
      "Timesheets, leave and expenses flow straight into the pay run. Modern award rules, penalty rates and allowances are interpreted for you, and anomalies surface before the run is finalised.",
    bullets: [
      "Interpret modern awards, penalty rates, overtime and allowances automatically",
      "Report Single Touch Payroll Phase 2 to the ATO on every pay event",
      "Clear superannuation through HeroClear, built for Payday Super",
      "Catch anomalies — a doubled shift, a missing bank account — before you submit",
    ],
    modules: [
      {
        name: "Intelligent pay runs",
        description: "Timesheets, leave and expenses pulled in and checked automatically.",
      },
      {
        name: "Award interpretation",
        description: "Modern award rules applied per employee, per shift, per pay cycle.",
      },
      {
        name: "HeroClear",
        description: "An embedded super clearing house built for Payday Super obligations.",
      },
      {
        name: "Managed payroll",
        description: "A dedicated specialist who runs the cycle end to end on your behalf.",
      },
    ],
    stat: { value: "$140b", label: "processed each year" },
    planFrom: "Included from HR Engage",
  },
  {
    slug: "employee-experience",
    name: "Employee Experience",
    category: "Employee experience",
    tagline: "Benefits your team notices on payday",
    summary:
      "The Employment Hero Work app, Swag Spend, earned wage access, perks and an employee assistance program.",
    heroHeadline: "Everything work. One app.",
    heroBlurb:
      "Payslips, rosters, leave, recognition and benefits live in the same app your team already checks. Employment Hero Work turns HR from a portal people avoid into something they open on the bus.",
    bullets: [
      "Clock on, swap shifts and request leave from a phone",
      "Reach up to 50% of already-earned wages between pay cycles",
      "Save on the weekly shop with cashback and negotiated perks",
      "Talk to a counsellor through the employee assistance program, confidentially",
    ],
    modules: [
      {
        name: "Employment Hero Work",
        description: "The employee superapp — work, money, career and benefits.",
      },
      {
        name: "Swag Spend account",
        description: "Budgeting, cashback and a linked card with Apple and Google Pay.",
      },
      {
        name: "Earned wage access",
        description: "Up to 50% of earned wages, capped at $1,000 a week, repaid post-tax.",
      },
      {
        name: "Perks and benefits",
        description: "Discounts, novated leasing and an employee assistance program.",
      },
    ],
    stat: { value: "50%", label: "of earned wages, on demand" },
    planFrom: "Free for employees",
  },
  {
    slug: "heroforce",
    name: "HeroForce",
    category: "Managed",
    tagline: "Employment, done for you",
    summary:
      "We become the legal employer of record so you can hire locally or across 180+ countries without setting up an entity.",
    heroHeadline: "Employment infrastructure, shared.",
    heroBlurb:
      "Hire the person you want, wherever they are. HeroForce carries the employment contract, the local compliance and the payroll obligation, and your managers carry on managing.",
    bullets: [
      "Employ in 180+ countries without registering a local entity",
      "Transition an existing offshore team across in a matter of days",
      "Access pre-vetted, ready-to-work talent through the talent marketplace",
      "Keep one invoice, one platform and one point of accountability",
    ],
    modules: [
      {
        name: "Employ locally",
        description: "Local contracts, compliance and payroll handled on your behalf.",
      },
      {
        name: "Employ globally",
        description: "Employer of record coverage across more than 180 countries.",
      },
      {
        name: "Employ on demand",
        description: "Flexible, managed access to pre-vetted contract talent.",
      },
    ],
    stat: { value: "180+", label: "countries covered" },
    planFrom: "Custom pricing",
  },
  {
    slug: "find-candidates",
    name: "SmartMatch",
    category: "Hiring",
    tagline: "Never write another job ad",
    summary:
      "AI matching that builds a live shortlist from the built-in candidate pool the moment a role opens.",
    heroHeadline: "Stop advertising. Start matching.",
    heroBlurb:
      "Describe the role once. SmartMatch reads it against 2.5 million candidate profiles and returns a ranked shortlist of people who are actually available, not people who happened to see your ad.",
    bullets: [
      "A live shortlist within minutes of opening the role",
      "Ranked on skills, availability, location and salary expectation",
      "Candidates opt in, so every match is genuinely open to hearing from you",
      "Hand-off straight into interviews and onboarding",
    ],
    modules: [
      {
        name: "Match scoring",
        description: "Skills, availability and salary weighted against your role brief.",
      },
      {
        name: "Talent pool",
        description: "2.5 million opted-in candidate profiles across Australia.",
      },
      {
        name: "Outreach",
        description: "Templated, trackable first contact that lands in the Work app.",
      },
    ],
    stat: { value: "2.5m", label: "candidate profiles" },
    planFrom: "Included from HR Engage",
  },
  {
    slug: "swag-spend-account",
    name: "Swag Spend account",
    category: "Employee experience",
    tagline: "A money account built into payday",
    summary:
      "Budgeting, cashback and a linked card that sits alongside the payslip your employer already sends.",
    heroHeadline: "Money that keeps up with work.",
    heroBlurb:
      "The Swag Spend account lives inside Employment Hero Work. Pay lands, budgets update, cashback accrues, and earned wage access costs less when it goes here.",
    bullets: [
      "See pay land the moment it clears, not the morning after",
      "Split each pay into spending buckets automatically",
      "Earn cashback at everyday retailers",
      "Pay with a linked card through Apple Pay and Google Pay",
    ],
    modules: [
      { name: "Budgets", description: "Automatic buckets that split each pay as it arrives." },
      { name: "Cashback", description: "Negotiated rates at supermarkets, fuel and retail." },
      { name: "Linked card", description: "A card in the wallet your team already uses." },
    ],
    stat: { value: "1.3%", label: "earned wage access fee" },
    planFrom: "Free for employees",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const productPillars = ["Hiring", "HR", "Payroll", "Employee experience"] as const;
