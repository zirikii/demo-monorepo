export const companyStats = [
  { stat: "1998", label: "founded in Sydney, Australia" },
  { stat: "500+", label: "people across three continents" },
  { stat: "1,000+", label: "organizations served worldwide" },
  { stat: "10k+", label: "websites running on the platform" },
];

export const companyValues = [
  {
    title: "Reduce complexity",
    copy: "Large organizations drown in digital complexity. Our job is to absorb it, so lean teams can deliver services that improve lives offline.",
    icon: "Minimize2",
  },
  {
    title: "Back the editors",
    copy: "The people closest to the content should be able to publish it. We build for the three thousand editors, not just the three developers.",
    icon: "UsersRound",
  },
  {
    title: "Earn trust continuously",
    copy: "Government and education run on trust. Security, accessibility, and reliability are engineering disciplines here, not marketing lines.",
    icon: "ShieldCheck",
  },
  {
    title: "Partner for the long haul",
    copy: "Replatforming is a relationship, not a transaction. We stay engaged from first demo through year-ten optimization.",
    icon: "Handshake",
  },
];

export const offices = [
  { city: "Sydney", country: "Australia", role: "Global HQ" },
  { city: "Melbourne", country: "Australia", role: "Engineering hub" },
  { city: "London", country: "United Kingdom", role: "EMEA HQ" },
  { city: "Edinburgh", country: "United Kingdom", role: "Search engineering" },
  { city: "New York", country: "United States", role: "Americas HQ" },
  { city: "Wellington", country: "New Zealand", role: "Customer success" },
];

export interface JobOpening {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Contract";
}

export const jobOpenings: JobOpening[] = [
  {
    id: "eng-senior-fe",
    title: "Senior Frontend Engineer — Page Builder",
    team: "Engineering",
    location: "Melbourne / Remote (AU)",
    type: "Full-time",
  },
  {
    id: "eng-search-ml",
    title: "Machine Learning Engineer — Search Relevance",
    team: "Engineering",
    location: "Edinburgh / Remote (UK)",
    type: "Full-time",
  },
  {
    id: "eng-platform-sre",
    title: "Site Reliability Engineer — Managed Cloud",
    team: "Engineering",
    location: "Sydney",
    type: "Full-time",
  },
  {
    id: "product-ci-pm",
    title: "Product Manager — Content Intelligence",
    team: "Product",
    location: "London",
    type: "Full-time",
  },
  {
    id: "cs-onboarding",
    title: "Customer Onboarding Specialist",
    team: "Customer Success",
    location: "New York",
    type: "Full-time",
  },
  {
    id: "sales-ae-gov",
    title: "Account Executive — Government",
    team: "Sales",
    location: "Wellington",
    type: "Full-time",
  },
  {
    id: "design-systems",
    title: "Design Systems Designer",
    team: "Design",
    location: "Remote (ANZ)",
    type: "Contract",
  },
  {
    id: "marketing-content",
    title: "Senior Content Marketer",
    team: "Marketing",
    location: "London / Hybrid",
    type: "Full-time",
  },
];

export const partnerTiers = [
  {
    name: "Implementation partners",
    copy: "Certified digital agencies that design, build, and launch Squiz-powered experiences for shared customers around the world.",
    examples: ["Northline Digital", "Fathom & Co", "Bright Harbor Agency", "Southpaw Studio"],
    icon: "Hammer",
  },
  {
    name: "Technology partners",
    copy: "Platforms we integrate with deeply — CRMs, analytics suites, identity providers, and student information systems.",
    examples: ["CRM platforms", "Identity providers", "Analytics suites", "Student systems"],
    icon: "Plug",
  },
  {
    name: "Consulting partners",
    copy: "Strategy and transformation firms that recommend and govern DXP programs for large public-sector and education clients.",
    examples: ["Sector transformation firms", "Digital strategy consultancies"],
    icon: "Lightbulb",
  },
];

export interface RoadmapItem {
  title: string;
  copy: string;
  product: string;
}

export const roadmap: { horizon: string; caption: string; items: RoadmapItem[] }[] = [
  {
    horizon: "Now",
    caption: "In active development",
    items: [
      {
        title: "AI-assisted page building",
        copy: "Describe the page you need and get a draft assembled from your approved component library.",
        product: "Content Management",
      },
      {
        title: "Content Intelligence remediation queue",
        copy: "Assign accessibility and AI-readiness fixes to editors with progress tracking.",
        product: "Content Intelligence",
      },
      {
        title: "Conversational search analytics v2",
        copy: "Topic clustering and answer-quality scoring across every transcript.",
        product: "Funnelback Search",
      },
    ],
  },
  {
    horizon: "Next",
    caption: "Planned for upcoming releases",
    items: [
      {
        title: "AI-powered A/B testing",
        copy: "Automatic variant generation and traffic allocation tuned toward your conversion goals.",
        product: "Optimization",
      },
      {
        title: "Per-site segment scoping",
        copy: "Scope personalization assets and segments to individual sites in large portfolios.",
        product: "Personalization",
      },
      {
        title: "Expanded connector library",
        copy: "New integration connectors for calendar, data-warehouse, and messaging platforms.",
        product: "Integrations",
      },
    ],
  },
  {
    horizon: "Later",
    caption: "On the research horizon",
    items: [
      {
        title: "'Fix it for me' remediation",
        copy: "One-click application of suggested content fixes, with human review built into the workflow.",
        product: "Content Intelligence",
      },
      {
        title: "Conversational page building",
        copy: "Iterate on layouts and copy through dialogue with the page builder.",
        product: "Content Management",
      },
      {
        title: "Journey orchestration",
        copy: "Cross-channel journey design connecting web personalization with email and SMS.",
        product: "Customer Data Platform",
      },
    ],
  },
];

export interface DemoVideo {
  id: string;
  title: string;
  copy: string;
  duration: string;
  product: string;
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
}

export const demoVideos: DemoVideo[] = [
  {
    id: "vpb-tour",
    title: "Visual Page Builder in five minutes",
    copy: "Build a campaign landing page from approved components, edit inline, and publish.",
    duration: "5:12",
    product: "Content Management",
    tint: "mint",
  },
  {
    id: "conv-search",
    title: "Conversational Search walkthrough",
    copy: "See grounded answers, citations, and the analytics behind every question.",
    duration: "7:48",
    product: "Funnelback Search",
    tint: "blue",
  },
  {
    id: "ci-audit",
    title: "Running your first Content Intelligence audit",
    copy: "From crawl to prioritized fix list in one session — no integrations needed.",
    duration: "6:03",
    product: "Content Intelligence",
    tint: "purple",
  },
  {
    id: "personalization-101",
    title: "Personalization rules, end to end",
    copy: "Define a segment, vary a hero, preview as any audience, and measure the lift.",
    duration: "8:21",
    product: "Personalization",
    tint: "pink",
  },
  {
    id: "forms-workflow",
    title: "Digitizing a service with Advanced Forms",
    copy: "Conditional logic, save-and-resume, and routing into a back-office queue.",
    duration: "9:35",
    product: "Advanced Forms",
    tint: "orange",
  },
  {
    id: "multisite-gov",
    title: "Multi-site governance for large portfolios",
    copy: "Shared components, scoped permissions, and portfolio-wide updates in action.",
    duration: "6:54",
    product: "Content Management",
    tint: "mint",
  },
];

export const homeTestimonial = {
  text: "Squiz has made a real impact. It's genuinely rewarding to build something together that plays such a meaningful role in our customer experience.",
  name: "Jordan Reyes",
  role: "Digital Product Owner",
  company: "Meridian Partners",
};

export const trustedByLogos = [
  "Southbank University",
  "Harbour City Council",
  "Greenfield University",
  "Meridian Partners",
  "Cornerstone Mutual",
  "VoltGrid Energy",
  "Northshore Health",
  "Capital Transit",
];
