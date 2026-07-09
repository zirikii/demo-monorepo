export interface UseCase {
  slug: string;
  name: string;
  icon: string;
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
  summary: string;
  heroTitle: string;
  heroCopy: string;
  steps: { title: string; copy: string }[];
  capabilities: string[]; // capability slugs
}

export const useCases: UseCase[] = [
  {
    slug: "launch-and-scale-digital-experiences-independently",
    name: "Launch & scale digital experiences independently",
    icon: "Rocket",
    tint: "mint",
    summary:
      "Give marketing teams the tools to ship campaigns, pages, and whole sites without waiting on development queues.",
    heroTitle: "Ship this quarter's ideas this quarter",
    heroCopy:
      "When every landing page needs a ticket, momentum dies in the backlog. With a governed component library and visual page building, marketing launches independently while developers build what's genuinely new.",
    steps: [
      {
        title: "Developers curate the component library",
        copy: "Engineering builds brand-locked components once — heroes, cards, forms, embeds — each with an editing schema the page builder understands.",
      },
      {
        title: "Marketers assemble and launch",
        copy: "Campaign pages come together by dragging approved components into layouts, editing inline, and publishing on schedule.",
      },
      {
        title: "Templates multiply the wins",
        copy: "High-performing pages become reusable templates, so the next faculty, region, or product team starts from proven patterns.",
      },
      {
        title: "Governance keeps it safe",
        copy: "Roles, workflows, and locked design tokens mean speed never comes at the cost of brand or compliance.",
      },
    ],
    capabilities: ["content-management", "component-service", "digital-asset-management"],
  },
  {
    slug: "drive-conversion-through-personalization-and-optimization",
    name: "Drive conversion through personalization & optimization",
    icon: "Target",
    tint: "purple",
    summary:
      "Use unified audience data to tailor journeys, test relentlessly, and lift the metrics that matter.",
    heroTitle: "Stop showing everyone the same page",
    heroCopy:
      "Your audiences arrive with different goals — treat them that way. Segment-driven personalization plus built-in experimentation turns your website from a brochure into a conversion engine.",
    steps: [
      {
        title: "Unify audience data",
        copy: "The CDP stitches behaviour, CRM attributes, and campaign responses into segments you can actually target.",
      },
      {
        title: "Personalize the journey",
        copy: "Vary heroes, CTAs, and content blocks per segment with visual rules — previewed and approved before launch.",
      },
      {
        title: "Test what you believe",
        copy: "A/B test the variations that matter. Significance reporting keeps decisions honest.",
      },
      {
        title: "Compound the learning",
        copy: "Winning variations roll out portfolio-wide, and journey analytics reveal the next bottleneck to attack.",
      },
    ],
    capabilities: ["personalization", "customer-data-platform", "optimization"],
  },
  {
    slug: "be-discovered-wherever-your-audience-searches",
    name: "Be discovered wherever your audience searches",
    icon: "Compass",
    tint: "blue",
    summary:
      "Optimize for on-site search, Google, and AI assistants — because your next customer may never see your homepage.",
    heroTitle: "Win the answer, not just the ranking",
    heroCopy:
      "Journeys now start in search bars and AI chats. Make your content the source engines quote: structured, answerable, and continuously audited for machine readability.",
    steps: [
      {
        title: "Audit AI readiness",
        copy: "See how AI engines interpret your site today, and get a prioritized plan for structure, metadata, and answerability gaps.",
      },
      {
        title: "Fix the foundations",
        copy: "Clear headings, structured data, and accessible markup help every engine — and every user — understand your pages.",
      },
      {
        title: "Answer on your own site",
        copy: "Conversational search keeps question-askers on your domain, with answers grounded in approved content.",
      },
      {
        title: "Measure the questions",
        copy: "Query analytics reveal what audiences actually ask, feeding the content plan with real demand.",
      },
    ],
    capabilities: ["ai-readiness-auditor", "conversational-search", "keyword-search"],
  },
  {
    slug: "modernize-and-consolidate-your-tech-stack",
    name: "Modernize and consolidate your tech stack",
    icon: "Layers",
    tint: "pink",
    summary:
      "Replace an accumulation of point solutions and legacy CMSs with one governed, managed platform.",
    heroTitle: "Fewer platforms. Fewer invoices. Fewer 2am pages.",
    heroCopy:
      "Every extra system is a login, a licence, an integration, and a risk. Consolidating content, search, data, forms, and integrations onto one managed platform cuts cost and complexity in one program.",
    steps: [
      {
        title: "Map the estate",
        copy: "Inventory sites, systems, and integrations. Migration tooling analyses legacy content and estimates effort honestly.",
      },
      {
        title: "Migrate with automation",
        copy: "AI-assisted migration moves content, metadata, and design systems in weeks — not the multi-year rebuilds of the past.",
      },
      {
        title: "Retire and redirect",
        copy: "Legacy platforms wind down with full redirect maps, preserving SEO equity and bookmarks.",
      },
      {
        title: "Operate as SaaS",
        copy: "Upgrades, security patches, and scaling become Squiz's job. Your team gets its evenings back.",
      },
    ],
    capabilities: ["content-management", "integrations", "keyword-search"],
  },
  {
    slug: "boost-engagement-with-portals-and-self-service",
    name: "Boost engagement with portals and self-service",
    icon: "PanelsTopLeft",
    tint: "orange",
    summary:
      "Build student, member, and citizen portals that surface personal information and complete transactions online.",
    heroTitle: "Answer the question before it becomes a phone call",
    heroCopy:
      "Portals succeed when they know who the user is and what they need next. Combine authenticated experiences, integrations into core systems, and personalization to make self-service the easy path.",
    steps: [
      {
        title: "Connect the systems of record",
        copy: "Integrations pull timetables, balances, applications, and cases from the systems that own them.",
      },
      {
        title: "Compose a personal home",
        copy: "Each user sees their tasks, deadlines, and recommendations — assembled from components, not custom builds.",
      },
      {
        title: "Digitize the transactions",
        copy: "Advanced forms handle the requests users used to phone about, routed straight into back-office queues.",
      },
      {
        title: "Iterate on the data",
        copy: "Behavioural analytics show which self-service journeys work and which still push users to the contact centre.",
      },
    ],
    capabilities: ["integrations", "advanced-forms", "personalization", "behavioral-analytics"],
  },
  {
    slug: "make-data-driven-decisions-across-your-digital-experience",
    name: "Make data-driven decisions across your digital experience",
    icon: "ChartBar",
    tint: "purple",
    summary:
      "Replace instinct with evidence: unified analytics, experiment results, and content scorecards in one place.",
    heroTitle: "Know what's working. Prove it.",
    heroCopy:
      "Digital teams drown in dashboards but starve for decisions. Squiz unifies behavioural data, search analytics, and experiment results so every content and design choice has evidence behind it.",
    steps: [
      {
        title: "Instrument the estate",
        copy: "One collection layer across all sites feeds analytics, personalization, and the CDP consistently.",
      },
      {
        title: "Score the content",
        copy: "Engagement scorecards rank every page, giving pruning and improvement work an objective queue.",
      },
      {
        title: "Watch the journeys",
        copy: "Flow analysis exposes where tasks stall, turning vague 'improve UX' goals into specific fixes.",
      },
      {
        title: "Report with confidence",
        copy: "Exec-ready reporting ties digital work to outcomes — conversions, task completion, cost-to-serve — not vanity metrics.",
      },
    ],
    capabilities: ["behavioral-analytics", "optimization", "customer-data-platform"],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
