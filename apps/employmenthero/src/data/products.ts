import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    slug: "employment-os",
    name: "Employment OS",
    category: "HR",
    tagline: "The world's first AI Employment Operating System",
    summary:
      "Hiring, HR, payroll and benefits under one roof, with Hero AI agents turning records into actions.",
    heroHeadline: "The AI Employment Operating System that runs employment for you",
    heroBody:
      "Employment OS connects every stage of the employment lifecycle, then puts intelligent agents to work on the admin. One login, one source of truth, and a system that triggers the next action the moment something changes.",
    bullets: [
      "One record per employee from application through to offboarding",
      "Hero AI agents for recruitment, HR and payroll",
      "Fair Work award interpretation baked into every pay run",
      "Replaces an average of four disconnected tools",
    ],
    features: [
      {
        title: "A system of action, not a system of record",
        body: "When a contract is signed, Employment OS opens onboarding, provisions the Work app, schedules compliance training and queues the first pay — without anyone chasing it.",
        icon: "workflow",
      },
      {
        title: "Hero AI across the lifecycle",
        body: "Recruitment, HR and payroll agents draft, score and validate. Every action is human-in-the-loop, so nothing reaches an employee without approval.",
        icon: "sparkles",
      },
      {
        title: "Compliance that keeps pace",
        body: "Modern award rates, STP Phase 2, SuperStream and Payday Super are maintained for you as legislation changes.",
        icon: "shield",
      },
      {
        title: "Insight without a data team",
        body: "Headcount, turnover, leave liability and labour cost sit in one dashboard, refreshed with every pay run.",
        icon: "chart",
      },
    ],
    metrics: [
      { label: "Average annual saving", value: "$45K" },
      { label: "Reduction in admin", value: "up to 80%" },
      { label: "Tools replaced", value: "4+" },
    ],
    faqs: [
      {
        question: "What makes this an operating system rather than software?",
        answer:
          "An HRIS stores what happened. Employment OS decides what happens next — it holds the employment record, the workflows that act on it and the agents that execute them in one place.",
      },
      {
        question: "Do I have to adopt every module at once?",
        answer:
          "No. Most businesses start with HR or payroll and switch on hiring, learning and benefits as they grow. The record travels with you.",
      },
    ],
    relatedSlugs: ["hr-software", "payroll-software", "heroforce"],
  },
  {
    slug: "hr-software",
    name: "HR software",
    category: "HR",
    tagline: "HR software for Australian businesses",
    summary:
      "Onboarding, records, policies, performance and people insights in one compliant platform.",
    heroHeadline: "HR that does the work, not just the filing",
    heroBody:
      "From onboarding and compliance through to workflows and people insights, Employment OS automates the HR admin so you can focus on running your business.",
    bullets: [
      "Paperless onboarding with e-signed contracts and TFN declarations",
      "Certifications, VEVO checks and policy sign-off tracked automatically",
      "Org chart, goals, 1:1s, reviews and 360 feedback",
      "Employee files that satisfy Fair Work record-keeping obligations",
    ],
    features: [
      {
        title: "Onboarding in minutes",
        body: "Send a contract, collect super choice, bank details and TFN declaration, and have the new starter in the Work app before their first shift.",
        icon: "users",
      },
      {
        title: "Policies that stick",
        body: "Publish a policy, require acknowledgement, and see exactly who has signed and who needs a nudge.",
        icon: "shield",
      },
      {
        title: "Performance without the spreadsheet",
        body: "Run review cycles, goals and 1:1s on a rhythm your managers will actually keep.",
        icon: "chart",
      },
      {
        title: "People insights",
        body: "Turnover, tenure, absence patterns and engagement scores, segmented by team, site and manager.",
        icon: "search",
      },
    ],
    metrics: [
      { label: "Onboarding time saved", value: "6 hrs / hire" },
      { label: "Policy acknowledgement", value: "97%" },
      { label: "Employee records", value: "audit-ready" },
    ],
    faqs: [
      {
        question: "Can I migrate employee records from spreadsheets?",
        answer:
          "Yes. The importer maps a CSV of your team to Employment OS fields, and the implementation team validates the first pass with you.",
      },
      {
        question: "Does it cover contractors?",
        answer:
          "Contractors get their own record type with ABN, insurance expiry and invoice tracking, separate from employee award data.",
      },
    ],
    relatedSlugs: ["employment-os", "payroll-software", "learning-management-system"],
  },
  {
    slug: "payroll-software",
    name: "Payroll software",
    category: "Payroll",
    tagline: "Not just payroll software — a payroll system of action",
    summary:
      "Award interpretation, STP Phase 2, SuperStream and Payday Super, validated before you submit.",
    heroHeadline: "Payroll that runs itself",
    heroBody:
      "From validations to submissions, Employment OS handles the workflow — not just the data entry. Timesheets flow into award interpretation, exceptions surface before approval, and lodgement happens on schedule.",
    bullets: [
      "Modern award rates, penalties, allowances and overtime interpreted automatically",
      "Single Touch Payroll Phase 2 lodgement to the ATO",
      "SuperStream contributions and Payday Super readiness",
      "Pay run exceptions flagged before anyone approves",
    ],
    features: [
      {
        title: "Award interpretation you can audit",
        body: "Every line on a payslip traces back to the clause that produced it, so you can answer a Fair Work query in minutes.",
        icon: "shield",
      },
      {
        title: "Timesheets to pay run",
        body: "Clock-ins from the Work app become approved hours, interpreted pay and a draft pay run without re-keying.",
        icon: "clock",
      },
      {
        title: "Payroll Agent validations",
        body: "Hero AI checks the run for missing super, unusual overtime, terminated staff and rate drift, then explains what it found.",
        icon: "sparkles",
      },
      {
        title: "Managed payroll when you want it",
        body: "Hand the whole run to an Employment Hero payroll specialist and keep the same platform and reporting.",
        icon: "wallet",
      },
    ],
    metrics: [
      { label: "Faster pay runs", value: "66%" },
      { label: "Awards supported", value: "120+" },
      { label: "Payroll processed", value: "$140B+ / yr" },
    ],
    faqs: [
      {
        question: "Is it STP Phase 2 compliant?",
        answer:
          "Yes. Disaggregation of gross, employment and income types and country codes are handled in the pay run and lodged to the ATO with each submission.",
      },
      {
        question: "What about Payday Super?",
        answer:
          "Super is calculated and queued with every run, so contributions can be paid on the same cadence as wages.",
      },
    ],
    relatedSlugs: ["employment-os", "hr-software", "heroforce"],
  },
  {
    slug: "hiring",
    name: "Hiring",
    category: "Hiring",
    tagline: "Get back to growing your business, not sifting through CVs",
    summary:
      "AI-powered hiring, fully integrated with your HR system — from sourcing to signed contract.",
    heroHeadline: "Hire faster, without a recruiter's budget",
    heroBody:
      "Post once, reach a talent pool of 2.3 million ready-to-work candidates, let the Recruitment Agent do the first pass, and turn an accepted offer into an onboarded employee with one click.",
    bullets: [
      "Multi-post to seek-style boards and your own careers page",
      "SmartMatch surfaces candidates before you advertise",
      "AI screening and first-round interviews",
      "Accepted offer flows straight into onboarding and payroll",
    ],
    features: [
      {
        title: "One pipeline",
        body: "Every applicant, referral and sourced candidate lands in the same board with stage, owner and next action.",
        icon: "workflow",
      },
      {
        title: "Interview scheduling that stops the back-and-forth",
        body: "Share availability, let candidates self-book, and sync to Google or Outlook calendars.",
        icon: "clock",
      },
      {
        title: "Blind screening",
        body: "Hide names, photos and graduation years for a first pass, and report on EDI outcomes across the funnel.",
        icon: "shield",
      },
      {
        title: "Offer to onboarded",
        body: "The signed contract creates the employee record, the payroll profile and the Work app invitation.",
        icon: "users",
      },
    ],
    metrics: [
      { label: "Screening time cut", value: "75%" },
      { label: "Median time to hire", value: "15 days" },
      { label: "Job-board spend saved", value: "$8K+" },
    ],
    faqs: [
      {
        question: "Do candidates need an Employment Hero account?",
        answer:
          "No. They can apply directly, though candidates already in the Work app apply with one tap and arrive with a verified profile.",
      },
      {
        question: "Can I keep using my existing job boards?",
        answer: "Yes — multi-posting pushes the same ad out and pulls applicants back into one pipeline.",
      },
    ],
    relatedSlugs: ["recruitment-agent", "applicant-tracking-system", "find-candidates"],
  },
  {
    slug: "recruitment-agent",
    name: "AI Recruitment Agent",
    category: "Hiring",
    tagline: "Automatically score, screen and interview applicants",
    summary:
      "A Hero AI agent that runs the first round for you and hands back a ranked, explained shortlist.",
    heroHeadline: "Your first-round interviewer, on call around the clock",
    heroBody:
      "The Recruitment Agent reads every application against your criteria, runs a structured first-round interview, and returns a ranked shortlist with the reasoning attached. You decide who moves forward.",
    bullets: [
      "Structured scoring against the criteria you set",
      "Asynchronous first-round interviews candidates take on their own time",
      "Plain-English rationale for every score",
      "Human approval required before any candidate is progressed or rejected",
    ],
    features: [
      {
        title: "Screens in minutes, not weeks",
        body: "A 400-application posting is scored overnight, so your shortlist is waiting when you open the pipeline.",
        icon: "sparkles",
      },
      {
        title: "Consistent questions",
        body: "Every candidate gets the same structured interview, which makes comparison fair and defensible.",
        icon: "message",
      },
      {
        title: "Explainable scoring",
        body: "Each score cites the answer and the criterion behind it, so you can challenge or override it.",
        icon: "search",
      },
      {
        title: "Human in the loop",
        body: "The agent drafts and recommends. Progressing, rejecting and offering always require a person.",
        icon: "shield",
      },
    ],
    metrics: [
      { label: "Screening time cut", value: "75%" },
      { label: "Applications scored / hr", value: "600" },
      { label: "Candidate completion", value: "82%" },
    ],
    faqs: [
      {
        question: "Does the agent make hiring decisions?",
        answer:
          "No. It scores and recommends. Every progression, rejection and offer requires a person to approve it.",
      },
      {
        question: "How do you handle bias?",
        answer:
          "Scoring runs against role criteria only, blind screening can hide identifying fields, and the funnel is reportable by demographic so you can audit outcomes.",
      },
    ],
    relatedSlugs: ["hiring", "applicant-tracking-system", "find-candidates"],
  },
  {
    slug: "applicant-tracking-system",
    name: "Applicant Tracking System",
    category: "Hiring",
    tagline: "A centralised hiring hub",
    summary: "Cut costs and streamline hiring with pipelines, careers pages and scheduling in one place.",
    heroHeadline: "Every role, every candidate, one board",
    heroBody:
      "Build a branded careers page, multi-post to the boards you already use, and manage every applicant through a drag-and-drop pipeline that your hiring managers can actually follow.",
    bullets: [
      "Branded careers page with no developer required",
      "Drag-and-drop pipelines per role",
      "Scorecards, notes and @mentions for hiring panels",
      "EDI reporting across the funnel",
    ],
    features: [
      {
        title: "Careers page in your brand",
        body: "Publish roles to a hosted careers site that matches your colours, logo and tone.",
        icon: "globe",
      },
      {
        title: "Collaborative shortlisting",
        body: "Panel members leave scorecards and comments against the same candidate record, so feedback stops living in inboxes.",
        icon: "users",
      },
      {
        title: "Templates that speed you up",
        body: "Reusable job ads, interview kits, scorecards and rejection templates per role family.",
        icon: "workflow",
      },
      {
        title: "Reporting managers ask for",
        body: "Time-to-hire, source effectiveness, offer acceptance and drop-off by stage.",
        icon: "chart",
      },
    ],
    metrics: [
      { label: "Roles per hiring manager", value: "3x" },
      { label: "Drop-off reduction", value: "24%" },
      { label: "Setup time", value: "1 afternoon" },
    ],
    faqs: [
      {
        question: "Can I import candidates from my current ATS?",
        answer: "Yes — bring across active candidates by CSV, with resumes attached.",
      },
      {
        question: "Does it integrate with my calendar?",
        answer: "Google Calendar and Outlook two-way sync is included.",
      },
    ],
    relatedSlugs: ["hiring", "recruitment-agent", "find-candidates"],
  },
  {
    slug: "find-candidates",
    name: "Find candidates",
    category: "Hiring",
    tagline: "SmartMatch — instantly access 2.3M+ ready-to-work candidates",
    summary:
      "Match open roles against Australia's largest connected talent pool before you spend a dollar on advertising.",
    heroHeadline: "Stop advertising. Start matching.",
    heroBody:
      "SmartMatch reads your role and surfaces candidates from the Employment Hero talent pool who are available, in range and actually looking — often before the ad goes live.",
    bullets: [
      "2.3 million+ candidate profiles across Australia",
      "Availability, location and pay expectations up front",
      "One-tap apply from the Employment Hero Work app",
      "No per-ad cost on eligible plans",
    ],
    features: [
      {
        title: "Matching, not keyword search",
        body: "SmartMatch weighs skills, shift availability, travel distance and pay expectations together instead of matching a resume against a string.",
        icon: "search",
      },
      {
        title: "Candidates who answer",
        body: "Profiles come from people actively using the Work app, so contact rates beat cold-sourced lists.",
        icon: "message",
      },
      {
        title: "Volume hiring without the churn",
        body: "Fill a roster of casual roles from one shortlist and keep the rest of the pool warm for next season.",
        icon: "users",
      },
      {
        title: "Fair reach",
        body: "The Hero Foundation surfaces candidates from under-represented groups to employers who opt in.",
        icon: "heart",
      },
    ],
    metrics: [
      { label: "Candidate pool", value: "2.3M+" },
      { label: "Hiring cost saved", value: "$500K" },
      { label: "Time to shortlist", value: "under 24 hrs" },
    ],
    faqs: [
      {
        question: "Where do the candidates come from?",
        answer:
          "From people using Employment Hero Work and Employment Hero Jobs who have opted in to be matched with employers.",
      },
      {
        question: "Is SmartMatch included in my plan?",
        answer: "Matching is included from HR Engage upwards; volume campaigns are available as an add-on.",
      },
    ],
    relatedSlugs: ["hiring", "recruitment-agent", "work-app"],
  },
  {
    slug: "heroforce",
    name: "HeroForce",
    category: "Managed",
    tagline: "Employment, done for you",
    summary:
      "We become the legal employer on paper and run hiring, payroll and compliance end to end.",
    heroHeadline: "Hand employment over entirely",
    heroBody:
      "HeroForce is shared employment infrastructure. We are the legal employer on paper, we source and pay the team, and we carry the compliance obligations — you direct the work.",
    bullets: [
      "We are the employer of record for your team",
      "Sourcing, contracts, payroll and statutory obligations included",
      "Local and global coverage across 180+ countries",
      "A single monthly invoice instead of a payroll function",
    ],
    features: [
      {
        title: "No entity, no problem",
        body: "Hire in a state or country where you have no legal entity and stay compliant from day one.",
        icon: "globe",
      },
      {
        title: "Compliance carried for you",
        body: "Awards, superannuation, workers' compensation, leave accrual and terminations sit with us.",
        icon: "shield",
      },
      {
        title: "Sourced by Hero AI",
        body: "HeroForce roles draw on the same SmartMatch pool, so vacancies fill without an agency fee.",
        icon: "sparkles",
      },
      {
        title: "One invoice",
        body: "Wages, on-costs and service fee arrive as a single line you can forecast against.",
        icon: "wallet",
      },
    ],
    metrics: [
      { label: "Countries covered", value: "180+" },
      { label: "Time to first hire", value: "10 days" },
      { label: "Admin removed", value: "100%" },
    ],
    faqs: [
      {
        question: "Who manages the person day to day?",
        answer: "You do. We hold the employment relationship; you direct the work.",
      },
      {
        question: "Can I convert a HeroForce worker to my own payroll later?",
        answer: "Yes — conversion transfers the record, entitlements and history into your own Employment OS account.",
      },
    ],
    relatedSlugs: ["employer-of-record", "payroll-software", "employment-os"],
  },
  {
    slug: "employer-of-record",
    name: "Employer of Record",
    category: "Managed",
    tagline: "Hire compliantly in 180+ countries",
    summary: "Global teams without global entities — local contracts, payroll and benefits handled.",
    heroHeadline: "Build a global team without building global entities",
    heroBody:
      "Employ people in 180+ countries on locally compliant contracts, paid in local currency, with statutory benefits and remittances managed for you.",
    bullets: [
      "Locally compliant employment contracts",
      "Local-currency payroll and statutory remittances",
      "Benefits administration and HR advisory included",
      "Flat USD 399 per employee, per month",
    ],
    features: [
      {
        title: "Local contracts, reviewed locally",
        body: "Every contract is drafted against the employment law of the country you are hiring in, not a template.",
        icon: "shield",
      },
      {
        title: "Paid in local currency",
        body: "Employees are paid the way they expect, on the local cycle, with local payslips.",
        icon: "wallet",
      },
      {
        title: "Statutory benefits handled",
        body: "Pension, leave, insurance and public-holiday rules are applied per country automatically.",
        icon: "heart",
      },
      {
        title: "One console",
        body: "Your global team appears in the same Employment OS directory as your local team.",
        icon: "globe",
      },
    ],
    metrics: [
      { label: "Countries", value: "180+" },
      { label: "Price per employee", value: "USD $399/mo" },
      { label: "Onboarding", value: "under 2 weeks" },
    ],
    faqs: [
      {
        question: "How is this different from HeroForce?",
        answer:
          "Employer of Record covers the legal employment layer. HeroForce adds sourcing and day-to-day workforce management on top.",
      },
      {
        question: "What about contractors?",
        answer: "Contractor management and compliant classification checks are included in the same console.",
      },
    ],
    relatedSlugs: ["heroforce", "employment-os", "payroll-software"],
  },
  {
    slug: "work-app",
    name: "Employment Hero Work",
    category: "Benefits",
    tagline: "The world's first employment superapp",
    summary:
      "Work, money, career and benefits in one app your team will actually open — formerly Swag.",
    heroHeadline: "Employment, handled — in one app",
    heroBody:
      "Employment Hero Work rolls shifts, pay, savings and exclusive benefits into a single superapp. When you offer employment, we bring the benefits.",
    bullets: [
      "Work — shifts, clock-ins, leave and timesheets",
      "Money — payslips, Earned Wage Access and spending insights",
      "Career — profile, SmartMatch job offers and learning",
      "Benefits — everyday discounts and Hero Points",
    ],
    features: [
      {
        title: "Work",
        body: "Rosters, shift swaps, geo-verified clock-ins, leave requests and timesheets that flow straight into payroll.",
        icon: "clock",
      },
      {
        title: "Money",
        body: "Payslips, income statements, Earned Wage Access and a view of where the pay actually went.",
        icon: "wallet",
      },
      {
        title: "Career",
        body: "A portable employment profile, SmartMatch role suggestions and courses that build on the job.",
        icon: "graduation",
      },
      {
        title: "Benefits",
        body: "Discounts on groceries, fuel and insurance, plus Hero Points recognition from managers and peers.",
        icon: "heart",
      },
    ],
    metrics: [
      { label: "Monthly active employees", value: "1.4M" },
      { label: "Average annual saving", value: "$1,200" },
      { label: "App store rating", value: "4.6" },
    ],
    faqs: [
      {
        question: "Is this the app formerly known as Swag?",
        answer:
          "Yes. Swag became Employment Hero Work in January 2025. Existing accounts, payslips and benefits carried across.",
      },
      {
        question: "Does it cost employees anything?",
        answer: "No. Employees get the app free whenever their employer is on Employment Hero.",
      },
    ],
    relatedSlugs: ["earned-wage-access", "find-candidates", "employment-os"],
  },
  {
    slug: "earned-wage-access",
    name: "Earned Wage Access",
    category: "Benefits",
    tagline: "Pay that arrives when life does",
    summary: "Let your team access up to 50% of earned wages before payday, at no cost to you.",
    heroHeadline: "Wages your team can reach before payday",
    heroBody:
      "Earned Wage Access lets employees draw on wages they have already earned — up to 50% of weekly earnings, capped at $1,000 — without a loan, an interest rate or a cost to your business.",
    bullets: [
      "Up to 50% of weekly earnings, capped at $1,000",
      "No cost to the employer and no impact on your cash flow",
      "Not credit — employees only access what they have earned",
      "Reconciles automatically in the next pay run",
    ],
    features: [
      {
        title: "No employer cost",
        body: "Employment Hero funds the access and reconciles it against the next pay run.",
        icon: "wallet",
      },
      {
        title: "A retention lever",
        body: "Financial stress is a leading cause of turnover in shift-based industries. Access to earned pay is a benefit people stay for.",
        icon: "heart",
      },
      {
        title: "Transparent limits",
        body: "Employees see exactly what is available and what remains, before they draw.",
        icon: "shield",
      },
      {
        title: "Built into the Work app",
        body: "Access, spending insight and savings goals sit alongside payslips in one place.",
        icon: "chart",
      },
    ],
    metrics: [
      { label: "Access limit", value: "50% / $1,000" },
      { label: "Employer cost", value: "$0" },
      { label: "Turnover reduction", value: "18%" },
    ],
    faqs: [
      {
        question: "Is this a loan?",
        answer: "No. Employees only access wages they have already earned in the current pay cycle.",
      },
      {
        question: "Does it affect my cash flow?",
        answer: "No. The draw is funded by Employment Hero and reconciled in your normal pay run.",
      },
    ],
    relatedSlugs: ["work-app", "payroll-software", "employment-os"],
  },
  {
    slug: "learning-management-system",
    name: "Learning management",
    category: "Benefits",
    tagline: "Compliance and skills training, powered by Go1",
    summary: "250+ training providers, mandatory course tracking and completion reporting.",
    heroHeadline: "Training that proves itself",
    heroBody:
      "Assign mandatory compliance courses, let people pick from a library of 250+ providers, and report completion against the roles and sites that need it.",
    bullets: [
      "250+ content providers through Go1",
      "Mandatory courses assigned by role, site or award",
      "Automatic re-certification reminders",
      "Completion reporting your auditor will accept",
    ],
    features: [
      {
        title: "Compliance you can evidence",
        body: "Food safety, manual handling, RSA and child-safe modules tracked with expiry dates and reminders.",
        icon: "shield",
      },
      {
        title: "Learning in the flow of work",
        body: "Courses appear in the Work app, so people can complete them between shifts on their phone.",
        icon: "graduation",
      },
      {
        title: "Assigned by role",
        body: "New starters are enrolled automatically based on their position, site and award.",
        icon: "workflow",
      },
      {
        title: "Reporting by site",
        body: "See completion rates per venue, team or manager and chase only what is outstanding.",
        icon: "chart",
      },
    ],
    metrics: [
      { label: "Course library", value: "80,000+" },
      { label: "Providers", value: "250+" },
      { label: "Average completion", value: "91%" },
    ],
    faqs: [
      {
        question: "Can I upload my own content?",
        answer: "Yes — bring your own videos, documents and quizzes alongside the Go1 library.",
      },
      {
        question: "How is it priced?",
        answer:
          "A ten-course bundle is $8 per employee per month; the full LMS Plus library is $17 per employee per month.",
      },
    ],
    relatedSlugs: ["hr-software", "work-app", "employment-os"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function productsByCategory(category: Product["category"]): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export const PRODUCT_CATEGORIES: Product["category"][] = [
  "Hiring",
  "HR",
  "Payroll",
  "Benefits",
  "Managed",
];
