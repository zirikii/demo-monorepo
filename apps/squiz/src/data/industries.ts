export interface Industry {
  slug: string;
  name: string;
  icon: string;
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
  tagline: string;
  summary: string;
  heroTitle: string;
  heroCopy: string;
  challenges: { title: string; copy: string }[];
  outcomes: { stat: string; label: string }[];
  capabilities: string[]; // capability slugs
  storySlug?: string;
}

export const industries: Industry[] = [
  {
    slug: "higher-education",
    name: "Higher Education",
    icon: "GraduationCap",
    tint: "mint",
    tagline: "From first search to enrolment and beyond",
    summary:
      "Course finders, student portals, and hundreds of faculty microsites — managed by lean digital teams and thousands of content editors.",
    heroTitle: "Digital experiences that win students and keep them",
    heroCopy:
      "Prospective students compare you in a browser tab against every other institution. Squiz helps university teams unify sprawling site portfolios, answer applicants' questions instantly, and personalize journeys from first visit through to alumni engagement.",
    challenges: [
      {
        title: "Sprawling site portfolios",
        copy: "Faculties, schools, research centres, and events each want their own presence. Multi-site governance keeps them on-brand from one platform without multiplying headcount.",
      },
      {
        title: "Course discovery",
        copy: "Program pages are your highest-value content. Search that understands synonyms, prerequisites, and intent gets applicants to the right course first time.",
      },
      {
        title: "Student self-service",
        copy: "Portals that surface timetables, results, and support services cut contact-centre load and improve retention.",
      },
      {
        title: "Devolved publishing",
        copy: "Thousands of editors across departments need to publish safely. Workflows and locked components keep quality high without central bottlenecks.",
      },
    ],
    outcomes: [
      { stat: "3x", label: "user satisfaction after replatforming a legacy CMS" },
      { stat: "45%", label: "fewer search-related support enquiries" },
      { stat: "120+", label: "sites managed by a digital team of six" },
    ],
    capabilities: [
      "content-management",
      "conversational-search",
      "personalization",
      "advanced-forms",
    ],
    storySlug: "southbank-university",
  },
  {
    slug: "government",
    name: "Government",
    icon: "Landmark",
    tint: "blue",
    tagline: "Citizen services that actually get used",
    summary:
      "Accessible, secure, multilingual digital services for councils, agencies, and departments — with compliance built in, not bolted on.",
    heroTitle: "Make every government service easy to find and finish",
    heroCopy:
      "Citizens don't browse government websites — they arrive with a task. Squiz helps agencies consolidate legacy sites, meet accessibility obligations continuously, and turn paper processes into accessible online services.",
    challenges: [
      {
        title: "Accessibility obligations",
        copy: "WCAG compliance is law, not aspiration. Continuous auditing and accessible-by-default components keep whole estates compliant between formal audits.",
      },
      {
        title: "Legacy consolidation",
        copy: "Decades of microsites confuse citizens and drain budgets. Migration tooling moves content into a governed platform in weeks, not years.",
      },
      {
        title: "Task completion",
        copy: "Journey analytics show exactly where citizens abandon forms and processes, so teams fix the step that's failing rather than guessing.",
      },
      {
        title: "Security and sovereignty",
        copy: "Region-pinned hosting, hardened infrastructure, and audited processes meet public-sector procurement requirements.",
      },
    ],
    outcomes: [
      { stat: "16%", label: "lift in service uptake after a citizen-centred redesign" },
      { stat: "60%", label: "reduction in sites after portfolio consolidation" },
      { stat: "24/7", label: "self-service availability for top citizen tasks" },
    ],
    capabilities: [
      "accessibility-auditor",
      "advanced-forms",
      "keyword-search",
      "content-management",
    ],
    storySlug: "harbour-city-council",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "Briefcase",
    tint: "purple",
    tagline: "Turn expertise into pipeline",
    summary:
      "Insight hubs, practice pages, and gated resources that convert readers into conversations for consulting, legal, and advisory firms.",
    heroTitle: "Your expertise is the product. Make it discoverable.",
    heroCopy:
      "Buyers research advisors long before the first call. Squiz helps firms publish insights fast, personalize by industry and role, and hand marketing the behavioural signals that tell partners exactly when to reach out.",
    challenges: [
      {
        title: "Insight velocity",
        copy: "Thought leadership only works when it ships while the topic is hot. Low-code publishing removes the queue between authors and the site.",
      },
      {
        title: "Buyer intelligence",
        copy: "Unified profiles reveal which organisations are reading which practice pages — high-intent signals your business development team can act on.",
      },
      {
        title: "Personalized journeys",
        copy: "A general counsel and a CFO should not see the same homepage. Segment-driven content lifts engagement without doubling the content workload.",
      },
      {
        title: "Global consistency",
        copy: "Offices across regions need local relevance under one brand. Multi-site tooling delivers both without parallel platforms.",
      },
    ],
    outcomes: [
      { stat: "2.4x", label: "more qualified enquiries from insight content" },
      { stat: "38%", label: "faster publication of thought leadership" },
      { stat: "12", label: "regional sites consolidated onto one platform" },
    ],
    capabilities: [
      "customer-data-platform",
      "personalization",
      "conversational-search",
      "behavioral-analytics",
    ],
    storySlug: "meridian-partners",
  },
  {
    slug: "financial-and-insurance-services",
    name: "Financial & Insurance Services",
    icon: "ShieldCheck",
    tint: "pink",
    tagline: "Compliant experiences that still convert",
    summary:
      "Product pages, calculators, and secure member portals that satisfy both compliance teams and conversion targets.",
    heroTitle: "Move fast without breaking compliance",
    heroCopy:
      "Every rate change and disclosure update has a deadline. Squiz gives financial brands governed publishing with full audit trails, plus the personalization and testing tools to keep digital acquisition growing.",
    challenges: [
      {
        title: "Governed change",
        copy: "Approval workflows, scheduled publishing, and complete version history make regulated content changes fast and provable.",
      },
      {
        title: "Product findability",
        copy: "Members and prospects need the right product, rate, or form immediately. Tuned search and clear journeys reduce abandonment and calls.",
      },
      {
        title: "Personalized acquisition",
        copy: "Show first-home buyers, retirees, and business owners different journeys — compliantly — with segment-based personalization.",
      },
      {
        title: "Trust and security",
        copy: "Enterprise-grade hosting, penetration-tested releases, and detailed permissions protect both brand and customer data.",
      },
    ],
    outcomes: [
      { stat: "31%", label: "increase in online applications year on year" },
      { stat: "100%", label: "of content changes with a full audit trail" },
      { stat: "50%", label: "fewer compliance review cycles per release" },
    ],
    capabilities: ["content-management", "personalization", "optimization", "advanced-forms"],
    storySlug: "cornerstone-mutual",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    tint: "orange",
    tagline: "Help people find care, fast",
    summary:
      "Service finders, patient information, and referral pathways that work for stressed users on any device.",
    heroTitle: "When users are anxious, clarity is care",
    heroCopy:
      "People arrive at health websites worried and in a hurry. Squiz helps providers structure services and locations for instant findability, keep clinical content current through governed workflows, and meet accessibility needs for every patient.",
    challenges: [
      {
        title: "Service findability",
        copy: "Location-aware search connects symptoms and service names in plain language to the right clinic, specialist, or emergency guidance.",
      },
      {
        title: "Clinical content governance",
        copy: "Clinical review workflows with expiry dates keep patient information accurate and flag stale guidance automatically.",
      },
      {
        title: "Accessibility for everyone",
        copy: "Patients of all abilities and language backgrounds must be able to use your services. Continuous auditing keeps the bar high.",
      },
      {
        title: "Connected systems",
        copy: "Integrations link appointment systems, provider directories, and campaign tools without brittle custom code.",
      },
    ],
    outcomes: [
      { stat: "52%", label: "faster time-to-service-page from search" },
      { stat: "0", label: "expired clinical pages after governance rollout" },
      { stat: "AA", label: "WCAG 2.2 conformance maintained continuously" },
    ],
    capabilities: [
      "keyword-search",
      "accessibility-auditor",
      "content-management",
      "integrations",
    ],
  },
  {
    slug: "utilities",
    name: "Utilities",
    icon: "Zap",
    tint: "blue",
    tagline: "Self-service that scales with demand",
    summary:
      "Outage communications, account self-service, and rebate applications for energy and water providers.",
    heroTitle: "Be brilliant on your customers' worst day",
    heroCopy:
      "When the power is out, your website is the front line. Squiz helps utilities publish outage updates instantly, scale under traffic spikes, and move routine transactions online where they cost cents instead of dollars.",
    challenges: [
      {
        title: "Surge resilience",
        copy: "Managed SaaS infrastructure absorbs outage-day traffic spikes that would flatten self-hosted platforms.",
      },
      {
        title: "Instant communications",
        copy: "Emergency banners, outage maps, and status pages update in seconds from any device — no developer on call required.",
      },
      {
        title: "Digital transactions",
        copy: "Connections, disconnections, rebates, and concessions become online forms with routing into back-office systems.",
      },
      {
        title: "Regulated publishing",
        copy: "Pricing and hardship policy updates land on deadline with approvals and version history intact.",
      },
    ],
    outcomes: [
      { stat: "99.99%", label: "availability through peak outage events" },
      { stat: "70%", label: "of routine transactions completed online" },
      { stat: "8 min", label: "average time to publish emergency updates" },
    ],
    capabilities: ["content-management", "advanced-forms", "integrations", "behavioral-analytics"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
