import type { AddOn, Faq, PlanFamily } from "./types";

export const planFamilies: PlanFamily[] = [
  {
    id: "hr",
    label: "HR",
    intro:
      "Per employee, per month. A minimum of 10 users applies to every plan. Billing is based on the higher of your contracted user count or your active users.",
    plans: [
      {
        id: "hr-essentials",
        name: "HR Essentials",
        price: "$10",
        priceNote: "per employee / month",
        blurb: "Designed for teams moving away from spreadsheets and manual processes.",
        features: [
          "Employee records and org chart",
          "Contracts and e-signature",
          "Guided onboarding checklists",
          "Leave requests and approvals",
          "Policy distribution and sign-off",
          "Employment Hero Work app",
        ],
        cta: "Start free",
      },
      {
        id: "hr-engage",
        name: "HR Engage",
        price: "$14",
        priceNote: "per employee / month",
        blurb: "Everything in HR Essentials, plus tools for engagement, performance and growth.",
        features: [
          "Everything in HR Essentials",
          "Performance reviews and 1:1s",
          "Goals and 360 feedback",
          "Happiness and custom surveys",
          "Recognition, shout-outs and hero points",
          "Hiring and applicant tracking",
        ],
        highlighted: true,
        cta: "Request a demo",
      },
      {
        id: "hr-elite",
        name: "HR Elite",
        price: "Custom",
        priceNote: "talk to sales",
        blurb: "Everything in HR Engage, plus advanced automation, reporting and security.",
        features: [
          "Everything in HR Engage",
          "Custom workflow automation",
          "Advanced reporting and analytics",
          "SAML single sign-on",
          "Nine-box talent grid",
          "Priority support",
        ],
        cta: "Request a demo",
      },
      {
        id: "employment-unlimited",
        name: "Employment Unlimited",
        price: "Custom",
        priceNote: "talk to sales",
        blurb: "The complete Employment Operating System, with every module switched on.",
        features: [
          "Everything in HR Elite",
          "Payroll and award interpretation",
          "Rostering and time & attendance",
          "HR advisory line",
          "Learning management",
          "Dedicated customer success manager",
        ],
        cta: "Request a demo",
      },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    intro:
      "Payroll pricing is per employee, per pay cycle, with a monthly platform fee. Award interpretation is included on every plan.",
    plans: [
      {
        id: "payroll-standard",
        name: "Payroll Standard",
        price: "$6",
        priceNote: "per employee / month",
        blurb: "Compliant pay runs for teams on straightforward salaried arrangements.",
        features: [
          "Unlimited pay runs",
          "Single Touch Payroll Phase 2",
          "Superannuation via HeroClear",
          "Payslips in the Work app",
          "Leave accrual tracking",
        ],
        cta: "Start free",
      },
      {
        id: "payroll-advanced",
        name: "Payroll Advanced",
        price: "$9",
        priceNote: "per employee / month",
        blurb: "For award-covered workforces with shifts, penalties and allowances.",
        features: [
          "Everything in Payroll Standard",
          "Modern award interpretation",
          "Timesheet and roster ingestion",
          "Anomaly detection before submission",
          "Multi-entity pay runs",
        ],
        highlighted: true,
        cta: "Request a demo",
      },
      {
        id: "payroll-managed",
        name: "Managed Payroll",
        price: "$20",
        priceNote: "per employee / month",
        blurb: "A dedicated payroll specialist runs the cycle end to end.",
        features: [
          "Everything in Payroll Advanced",
          "Dedicated payroll specialist",
          "Pay run preparation and review",
          "Year-end finalisation",
          "$400 monthly minimum",
        ],
        cta: "Talk to sales",
      },
    ],
  },
  {
    id: "recruitment",
    label: "Recruitment",
    intro:
      "Hiring tools are included with HR Engage and above. AI interviews are metered in credits — one credit is one completed interview.",
    plans: [
      {
        id: "hiring-free",
        name: "Hiring Free",
        price: "$0",
        priceNote: "forever",
        blurb: "Post roles and manage applicants at no cost, on any HR plan.",
        features: [
          "Unlimited job ads on the Employment Hero board",
          "Branded careers page",
          "Applicant tracking pipeline",
          "Interview scheduling",
        ],
        cta: "Start free",
      },
      {
        id: "smartmatch",
        name: "SmartMatch",
        price: "$99",
        priceNote: "per role",
        blurb: "Skip the job ad. Get a ranked shortlist from the candidate pool.",
        features: [
          "Live shortlist within minutes",
          "2.5 million opted-in profiles",
          "Match scoring on skills and availability",
          "Templated candidate outreach",
        ],
        highlighted: true,
        cta: "Request a demo",
      },
      {
        id: "recruitment-agent",
        name: "Recruitment Agent",
        price: "$4",
        priceNote: "per AI credit",
        blurb: "Structured AI video interviews, scored against your own rubric.",
        features: [
          "Everything in SmartMatch",
          "Structured AI video interviews",
          "Rubric-based answer scoring",
          "Ranked shortlist with transcripts",
          "Human review on every decision",
        ],
        cta: "Talk to sales",
      },
    ],
  },
  {
    id: "heroforce",
    label: "HeroForce",
    intro:
      "HeroForce pricing depends on the country of employment and the shape of the engagement. Every quote includes local compliance and payroll.",
    plans: [
      {
        id: "heroforce-local",
        name: "Employ locally",
        price: "From $89",
        priceNote: "per employee / month",
        blurb: "We carry the Australian employment contract and its obligations.",
        features: [
          "Local employment contracts",
          "Award and compliance coverage",
          "Payroll and superannuation",
          "Workers compensation handled",
        ],
        cta: "Talk to sales",
      },
      {
        id: "heroforce-global",
        name: "Employ globally",
        price: "From $499",
        priceNote: "per employee / month",
        blurb: "Employer of record coverage across more than 180 countries.",
        features: [
          "Everything in Employ locally",
          "180+ countries covered",
          "Local benefits and statutory leave",
          "Multi-currency payments",
          "Entity-free market entry",
        ],
        highlighted: true,
        cta: "Talk to sales",
      },
      {
        id: "heroforce-on-demand",
        name: "Employ on demand",
        price: "Custom",
        priceNote: "talk to sales",
        blurb: "Flexible, managed access to pre-vetted contract talent.",
        features: [
          "Pre-vetted talent marketplace",
          "Flexible engagement lengths",
          "Managed onboarding and offboarding",
          "Consolidated invoicing",
        ],
        cta: "Talk to sales",
      },
    ],
  },
];

export const addOns: AddOn[] = [
  {
    name: "Chat",
    price: "$2",
    minimum: "$20 / month",
    description: "Team messaging built into the platform, with channels tied to your org chart.",
  },
  {
    name: "Rostering & Time and Attendance",
    price: "$4",
    minimum: "$40 / month",
    description: "Shift bidding, swapping, geofenced clock-in and award-based shift costing.",
  },
  {
    name: "Managed Payroll",
    price: "$20",
    minimum: "$400 / month",
    description: "A dedicated payroll specialist prepares and reviews every cycle for you.",
  },
  {
    name: "HR Advisory",
    price: "$14",
    minimum: "$280 / month",
    description: "An advice line, document review and employee relations representation.",
  },
  {
    name: "Learning — 10-course bundle",
    price: "$8",
    minimum: "$80 / month",
    description: "Ten compliance and capability courses assigned straight from an employee file.",
  },
  {
    name: "LMS Plus",
    price: "$17",
    minimum: "$170 / month",
    description: "The full learning library plus your own uploaded course content.",
  },
  {
    name: "EAP — Standard",
    price: "$8",
    minimum: "$80 / month",
    description: "Confidential counselling sessions for employees and their immediate family.",
  },
  {
    name: "EAP — Premium",
    price: "$10",
    minimum: "$100 / month",
    description: "Expanded session limits plus manager support and critical incident response.",
  },
];

export const featureMatrix: { group: string; rows: { feature: string; plans: boolean[] }[] }[] = [
  {
    group: "People",
    rows: [
      { feature: "Employee records and org chart", plans: [true, true, true, true] },
      { feature: "Contracts and e-signature", plans: [true, true, true, true] },
      { feature: "Certification and visa tracking", plans: [false, true, true, true] },
      { feature: "Multi-entity management", plans: [false, false, true, true] },
    ],
  },
  {
    group: "Hiring",
    rows: [
      { feature: "Job ads and careers page", plans: [true, true, true, true] },
      { feature: "Applicant tracking pipeline", plans: [false, true, true, true] },
      { feature: "SmartMatch shortlists", plans: [false, true, true, true] },
      { feature: "AI recruitment agent", plans: [false, false, true, true] },
    ],
  },
  {
    group: "Performance and engagement",
    rows: [
      { feature: "Reviews and 1:1s", plans: [false, true, true, true] },
      { feature: "Goals and 360 feedback", plans: [false, true, true, true] },
      { feature: "Nine-box talent grid", plans: [false, false, true, true] },
      { feature: "Happiness surveys", plans: [false, true, true, true] },
    ],
  },
  {
    group: "Pay and time",
    rows: [
      { feature: "Leave requests and accruals", plans: [true, true, true, true] },
      { feature: "Payroll and award interpretation", plans: [false, false, false, true] },
      { feature: "Rostering and time & attendance", plans: [false, false, false, true] },
      { feature: "Earned wage access", plans: [true, true, true, true] },
    ],
  },
  {
    group: "Platform",
    rows: [
      { feature: "Employment Hero Work app", plans: [true, true, true, true] },
      { feature: "Custom workflow automation", plans: [false, false, true, true] },
      { feature: "Advanced reporting", plans: [false, false, true, true] },
      { feature: "SAML single sign-on", plans: [false, false, true, true] },
    ],
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "Is there a minimum number of users?",
    answer:
      "Yes. Every plan is billed for a minimum of 10 users, even if your team is smaller today.",
  },
  {
    question: "How is the employee count calculated?",
    answer:
      "You are billed on the higher of two numbers: the user count in your customer agreement, or the number of active users in the platform during that month.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "You can move up a plan at any time and the change applies from your next billing period. Moving down happens at the end of your current term.",
  },
  {
    question: "Do add-ons have their own minimums?",
    answer:
      "Most do. Each add-on lists its monthly minimum next to the per-employee price so there are no surprises on the first invoice.",
  },
  {
    question: "Is payroll included in the HR plans?",
    answer:
      "Payroll is included in Employment Unlimited. On the other HR plans it is priced separately — see the Payroll tab above.",
  },
];
