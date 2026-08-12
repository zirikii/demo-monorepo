import type { Industry, Solution } from "./types";

export const industries: Industry[] = [
  {
    slug: "hospitality",
    name: "Hospitality",
    blurb:
      "Split shifts, penalty rates and a roster that changes on a Friday afternoon. Hospitality payroll punishes manual processes.",
    award: "Hospitality Industry (General) Award 2020",
    challenges: [
      "Penalty rates and overtime that shift with every roster change",
      "High casual turnover and constant onboarding",
      "Wage compliance scrutiny across multiple venues",
      "Clock-in accuracy when the venue is at capacity",
    ],
    outcomes: [
      { value: "12 hrs", label: "saved per venue each week" },
      { value: "99.4%", label: "timesheet accuracy" },
      { value: "3 days", label: "to onboard a new venue" },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    blurb:
      "Seasonal peaks, part-time teams and a payroll that has to reconcile across every store on the same Tuesday.",
    award: "General Retail Industry Award 2020",
    challenges: [
      "Ramping headcount for peak trade and unwinding it after",
      "Junior rates that change on a birthday",
      "Consistent policy sign-off across stores",
      "Visibility of labour cost against daily sales",
    ],
    outcomes: [
      { value: "40%", label: "faster seasonal onboarding" },
      { value: "$0", label: "in award interpretation errors" },
      { value: "18%", label: "lift in shift fill rate" },
    ],
  },
  {
    slug: "ndis-providers",
    name: "NDIS providers",
    blurb:
      "Support workers on the road, mandatory screening checks, and the SCHADS award behind every timesheet.",
    award: "Social, Community, Home Care and Disability Services Award",
    challenges: [
      "Broken shifts, sleepovers and travel time",
      "NDIS worker screening and expiry tracking",
      "Documentation trails for audit",
      "Rostering to participant plans, not just availability",
    ],
    outcomes: [
      { value: "100%", label: "screening checks in date" },
      { value: "6 hrs", label: "saved per fortnightly pay run" },
      { value: "2x", label: "faster incident reporting" },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    blurb:
      "Site-based crews, allowances for everything, and inductions that have to be provable years later.",
    award: "Building and Construction General On-site Award",
    challenges: [
      "Site, travel and tool allowances layered on base rates",
      "White card and licence expiry across subcontractors",
      "Inductions completed before anyone steps on site",
      "Cost tracking per project, not per person",
    ],
    outcomes: [
      { value: "9 hrs", label: "saved per project each month" },
      { value: "100%", label: "inductions completed pre-start" },
      { value: "24 hrs", label: "to mobilise a new crew" },
    ],
  },
  {
    slug: "software-it",
    name: "Software & IT",
    blurb:
      "Fast-growing teams, distributed hires, and a performance cycle that needs to survive a doubling in headcount.",
    award: "Professional Employees Award 2020",
    challenges: [
      "Hiring across states and time zones",
      "Equity, bonus and review cycles at scale",
      "Onboarding that provisions accounts on day one",
      "Retention signals before someone resigns",
    ],
    outcomes: [
      { value: "11 days", label: "cut from time-to-hire" },
      { value: "94%", label: "review completion rate" },
      { value: "1 day", label: "to fully provision a starter" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb:
      "Rotating rosters, registration checks and a duty of care that does not pause for a payroll deadline.",
    award: "Nurses Award 2020",
    challenges: [
      "24/7 rosters with shift penalties and on-call",
      "AHPRA registration and mandatory training tracking",
      "Fatigue rules built into roster generation",
      "Casual pool management across sites",
    ],
    outcomes: [
      { value: "31%", label: "reduction in unfilled shifts" },
      { value: "100%", label: "registrations verified" },
      { value: "4 hrs", label: "saved per roster cycle" },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    blurb:
      "Billable teams where every hour counts, and where a slow onboarding costs real revenue.",
    award: "Clerks — Private Sector Award 2020",
    challenges: [
      "Utilisation visibility alongside leave planning",
      "Structured progression and promotion cycles",
      "Client confidentiality obligations on every file",
      "Graduate intakes that arrive all at once",
    ],
    outcomes: [
      { value: "7%", label: "lift in utilisation" },
      { value: "2 wks", label: "faster graduate onboarding" },
      { value: "88%", label: "goal completion rate" },
    ],
  },
  {
    slug: "not-for-profit",
    name: "Not for profit",
    blurb: "Mixed volunteer and paid workforces, tight budgets, and grant reporting that never ends.",
    award: "Social, Community, Home Care and Disability Services Award",
    challenges: [
      "Salary packaging and fringe benefits",
      "Volunteer records alongside employee records",
      "Grant-funded headcount reporting",
      "Police and working-with-children checks",
    ],
    outcomes: [
      { value: "5 hrs", label: "saved per grant acquittal" },
      { value: "100%", label: "checks tracked to expiry" },
      { value: "22%", label: "lower admin cost" },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const solutions: Solution[] = [
  {
    slug: "onboarding-software",
    name: "Onboarding software",
    blurb:
      "Turn a signed contract into a productive first day, without a single welcome email written by hand.",
    steps: [
      {
        title: "Send the offer",
        body: "Generate a compliant contract from a template, send it for e-signature, and track it to acceptance.",
      },
      {
        title: "Collect the paperwork",
        body: "Tax file declaration, super choice, bank details and emergency contacts, filled in by the new starter.",
      },
      {
        title: "Provision the accounts",
        body: "Google Workspace and Microsoft 365 accounts are created before the laptop is even unboxed.",
      },
      {
        title: "Run the first week",
        body: "A guided checklist walks the manager and the new starter through policies, training and their first 1:1.",
      },
    ],
    relatedProducts: ["hr-software", "hiring"],
  },
  {
    slug: "employee-rostering-software",
    name: "Employee rostering software",
    blurb: "Build a roster that respects the award, the budget and the people on it.",
    steps: [
      {
        title: "Forecast the demand",
        body: "Start from last cycle's trade, then adjust for events, seasonality and leave already approved.",
      },
      {
        title: "Fill the shifts",
        body: "Publish open shifts to the Work app and let qualified staff bid, or assign directly.",
      },
      {
        title: "Cost it before you publish",
        body: "Award rates, penalties and overtime are priced into the roster while you are still editing it.",
      },
      {
        title: "Feed payroll automatically",
        body: "Approved timesheets flow into the pay run with no re-keying and no spreadsheet in between.",
      },
    ],
    relatedProducts: ["payroll-software", "employee-experience"],
  },
  {
    slug: "performance-management",
    name: "Performance management",
    blurb: "Reviews that actually happen, because the platform chases them instead of you.",
    steps: [
      {
        title: "Set the cycle",
        body: "Choose the cadence, the template and the participants once, then let it repeat.",
      },
      {
        title: "Gather the input",
        body: "Self-assessments, manager reviews and 360 feedback collected in the same window.",
      },
      {
        title: "Have the conversation",
        body: "1:1 agendas pre-populated with goals, feedback and anything left open last time.",
      },
      {
        title: "Act on the result",
        body: "Map outcomes to the nine-box grid and flag development plans or flight risks.",
      },
    ],
    relatedProducts: ["hr-software"],
  },
  {
    slug: "compliance-management",
    name: "Compliance management",
    blurb: "Know that every policy is signed, every licence is current and every pay run is defensible.",
    steps: [
      {
        title: "Publish the policy",
        body: "Distribute to the right groups and collect acknowledgement with a timestamped record.",
      },
      {
        title: "Track the credentials",
        body: "Licences, tickets, visas and screening checks with reminders well before expiry.",
      },
      {
        title: "Interpret the award",
        body: "Modern award rules applied per shift so underpayment never becomes a headline.",
      },
      {
        title: "Prove it later",
        body: "A full audit trail of who agreed to what, when, and which version they saw.",
      },
    ],
    relatedProducts: ["hr-software", "payroll-software"],
  },
  {
    slug: "employee-engagement",
    name: "Employee engagement",
    blurb: "Find out how the team is really travelling before the exit interview tells you.",
    steps: [
      {
        title: "Ask regularly",
        body: "Short happiness surveys on a cadence people will actually answer.",
      },
      {
        title: "Recognise publicly",
        body: "Shout-outs and hero points that surface good work in the company feed.",
      },
      {
        title: "Spot the pattern",
        body: "Sentiment tracked by team and tenure so a dip has a name attached to it.",
      },
      {
        title: "Close the loop",
        body: "Share what changed as a result, which is the part most engagement programs skip.",
      },
    ],
    relatedProducts: ["hr-software", "employee-experience"],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
