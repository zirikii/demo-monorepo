export interface Capability {
  slug: string;
  name: string;
  badge?: "NEW";
  group: "Create & manage" | "Search & discovery" | "Data & optimization" | "Connect & extend";
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
  icon: string; // lucide icon name resolved in components
  tagline: string;
  summary: string;
  heroTitle: string;
  heroCopy: string;
  features: { title: string; copy: string }[];
  faqs: { q: string; a: string }[];
}

export const capabilities: Capability[] = [
  {
    slug: "content-management",
    name: "Content Management",
    group: "Create & manage",
    tint: "mint",
    icon: "LayoutTemplate",
    tagline: "Low-code publishing for large teams",
    summary:
      "Create, edit, and launch pages with a visual drag-and-drop builder, backed by governance that keeps every site on-brand.",
    heroTitle: "A hybrid headless CMS built for speed and governance",
    heroCopy:
      "Give non-technical editors a visual page builder while developers keep full control of the component library. Approval workflows, role-based permissions, and scheduled publishing keep hundreds of sites compliant without slowing anyone down.",
    features: [
      {
        title: "Visual page builder",
        copy: "Drag pre-built components — heroes, galleries, CTAs, forms — into multi-column layouts and edit text or imagery inline. Changes preview instantly, and reusable templates make new launches a matter of minutes.",
      },
      {
        title: "Design-system components",
        copy: "Developers build each component once with brand styling baked in. Because components are locked to the design system, every page stays on-brand automatically — no manual reviews required.",
      },
      {
        title: "Multi-site governance",
        copy: "Run hundreds of sites from one platform. Share component libraries everywhere, push updates across whole portfolios at once, and scope permissions per site, section, or team.",
      },
      {
        title: "Hybrid headless delivery",
        copy: "Publish as a traditional website, or deliver the same structured content headlessly to apps, kiosks, portals, and signage from a single source of truth.",
      },
    ],
    faqs: [
      {
        q: "Do editors need developer help for day-to-day publishing?",
        a: "No. Once the component library is in place, marketing and content teams create, edit, and publish pages independently. Developers are only needed when new component types are required.",
      },
      {
        q: "Can we run multiple brands or departments on one instance?",
        a: "Yes — multi-site management is a core strength. Each site can have its own domains, themes, permissions, and workflows while sharing a central component library.",
      },
    ],
  },
  {
    slug: "conversational-search",
    name: "Conversational Search",
    group: "Search & discovery",
    tint: "blue",
    icon: "MessageSquareText",
    tagline: "AI answers grounded in your content",
    summary:
      "Turn site search into a chat-style experience that answers questions directly, using only your approved content as the source.",
    heroTitle: "Give every visitor a direct answer, not ten blue links",
    heroCopy:
      "Conversational Search sits on top of the Funnelback index and generates plain-language answers with citations back to your pages. Because responses are grounded exclusively in approved content, answers stay accurate and on-message.",
    features: [
      {
        title: "Grounded generation",
        copy: "Answers are composed only from indexed, approved pages — never from the open web — with linked citations so users can verify every claim.",
      },
      {
        title: "Conversation memory",
        copy: "Follow-up questions keep context, so a prospective student can move from “what courses do you offer?” to “what are the entry requirements?” naturally.",
      },
      {
        title: "Guardrails and tone controls",
        copy: "Set banned topics, escalation paths, and tone-of-voice rules. Review transcripts to spot content gaps and add answers where users hit dead ends.",
      },
      {
        title: "Analytics on questions",
        copy: "See exactly what your audience asks in their own words — a goldmine for content planning, service design, and SEO teams.",
      },
    ],
    faqs: [
      {
        q: "Will it invent answers?",
        a: "Responses are constrained to your indexed content. When the index has no good answer, the assistant says so and offers a handoff path instead of guessing.",
      },
      {
        q: "How is it deployed?",
        a: "As an embeddable widget or a full search-results experience. No CMS migration is required — it works alongside any existing website.",
      },
    ],
  },
  {
    slug: "keyword-search",
    name: "Keyword Search",
    group: "Search & discovery",
    tint: "blue",
    icon: "Search",
    tagline: "Enterprise search tuned for relevance",
    summary:
      "Enterprise-grade site search with dozens of ranking signals, synonyms, and best bets — indexing content from any source or format.",
    heroTitle: "Relevance-tuned search across every source you own",
    heroCopy:
      "Funnelback keyword search indexes web pages, PDFs, databases, and third-party systems into one results page. Machine-assisted tuning surfaces the right result first, so users get from question to answer faster.",
    features: [
      {
        title: "70+ ranking signals",
        copy: "Freshness, popularity, metadata quality, and click behaviour all feed the ranking model. Tune weights per collection without writing code.",
      },
      {
        title: "Federated indexing",
        copy: "Crawl websites, sync structured databases, and connect APIs. Results from every source appear in a single, consistently ranked list.",
      },
      {
        title: "Best bets and synonyms",
        copy: "Promote key pages for high-stakes queries and map the vocabulary your users actually type to the terms your content uses.",
      },
      {
        title: "Search analytics",
        copy: "Dashboards show top queries, zero-result searches, and click-through rates so teams can continuously close content gaps.",
      },
    ],
    faqs: [
      {
        q: "Does it only work with the Squiz CMS?",
        a: "No — keyword search is platform-agnostic. It crawls and indexes any website or repository regardless of the underlying CMS.",
      },
      {
        q: "How fresh is the index?",
        a: "Scheduled and on-demand crawls keep the index current, and push APIs update individual records in near real time.",
      },
    ],
  },
  {
    slug: "personalization",
    name: "Personalization",
    group: "Data & optimization",
    tint: "purple",
    icon: "UserRound",
    tagline: "Segment-driven experiences without code",
    summary:
      "Show different audiences different content — by segment, behaviour, or campaign — using visual rules instead of developer time.",
    heroTitle: "Personalize every journey without writing a line of code",
    heroCopy:
      "Define audience segments from CDP attributes and behaviour, then vary banners, calls to action, and whole page regions per segment. Preview as any audience before publishing, and measure lift per variation.",
    features: [
      {
        title: "Visual rule builder",
        copy: "Marketers compose conditions — location, referral source, past behaviour, segment membership — in a point-and-click editor.",
      },
      {
        title: "Segment preview",
        copy: "Preview any page as any segment before it goes live, so stakeholders can sign off on exactly what each audience will see.",
      },
      {
        title: "Native CDP integration",
        copy: "Segments built in the Customer Data Platform are available to target instantly — no exports, syncs, or engineering tickets.",
      },
      {
        title: "Measurement built in",
        copy: "Every personalized region reports impressions and conversions per variation, feeding optimization decisions with real data.",
      },
    ],
    faqs: [
      {
        q: "Does personalization slow the page down?",
        a: "Variations are resolved at the edge with cached fragments, so personalized pages ship with the same performance budget as static ones.",
      },
      {
        q: "How does consent work?",
        a: "Personalization respects the visitor's consent state. Anonymous defaults render for users who decline tracking.",
      },
    ],
  },
  {
    slug: "customer-data-platform",
    name: "Customer Data Platform",
    group: "Data & optimization",
    tint: "purple",
    icon: "Database",
    tagline: "One profile per person, activated everywhere",
    summary:
      "Unify behavioural, CRM, and campaign data into a single profile you can segment and activate across your digital channels.",
    heroTitle: "Break down data silos and act on what you know",
    heroCopy:
      "The CDP stitches website behaviour, form fills, CRM records, and email engagement into unified profiles. Build segments once and use them for personalization, campaigns, and reporting across the whole platform.",
    features: [
      {
        title: "Identity stitching",
        copy: "Anonymous visits merge into known profiles the moment a user identifies, preserving the full journey history.",
      },
      {
        title: "Real-time segmentation",
        copy: "Segments update as behaviour happens, so a prospect who views a program page three times can be targeted on the very next page load.",
      },
      {
        title: "Two-way CRM sync",
        copy: "Connectors keep the CDP and your CRM aligned — high-intent signals flow to sales, and CRM attributes power web targeting.",
      },
      {
        title: "Privacy-first design",
        copy: "Consent management, retention policies, and field-level controls are built in for GDPR-class compliance.",
      },
    ],
    faqs: [
      {
        q: "Do we need a data engineering team?",
        a: "No. Standard connectors and a tag-based collector cover most sources; a REST API handles anything custom.",
      },
      {
        q: "Where does the data live?",
        a: "In your managed Squiz tenancy, region-pinned to meet data-residency requirements.",
      },
    ],
  },
  {
    slug: "digital-asset-management",
    name: "Digital Asset Management",
    group: "Create & manage",
    tint: "mint",
    icon: "Images",
    tagline: "Every image, one library, always on-brand",
    summary:
      "A central library for images, video, and documents with automatic renditions, usage tracking, and rights management.",
    heroTitle: "One home for every asset your teams publish",
    heroCopy:
      "Store, tag, and search brand assets in a central library shared by every site. Automatic renditions serve the right size and format per device, and usage tracking shows exactly where each asset appears.",
    features: [
      {
        title: "Automatic renditions",
        copy: "Upload once and the DAM generates responsive sizes and next-gen formats, keeping pages fast without manual export work.",
      },
      {
        title: "Usage tracking",
        copy: "See every page an asset is used on before you replace or retire it — no more broken hero images after a cleanup.",
      },
      {
        title: "Rights and expiry",
        copy: "Attach licence terms and expiry dates to assets. The platform warns editors before rights lapse and can un-publish automatically.",
      },
      {
        title: "AI-assisted tagging",
        copy: "Suggested tags and alt text speed up ingestion and make the library genuinely searchable at scale.",
      },
    ],
    faqs: [
      {
        q: "Can multiple sites share one library?",
        a: "Yes — the DAM is shared across the whole tenancy with per-collection permissions, so brand teams control what each site can use.",
      },
      {
        q: "What file types are supported?",
        a: "Images, video, audio, and documents including PDF and Office formats, with preview support in the editing UI.",
      },
    ],
  },
  {
    slug: "component-service",
    name: "Component Service",
    group: "Create & manage",
    tint: "mint",
    icon: "Blocks",
    tagline: "Build once, render anywhere",
    summary:
      "A framework-agnostic component pipeline: developers write components once and marketers assemble them visually across every site.",
    heroTitle: "A component pipeline your developers will actually like",
    heroCopy:
      "Write components in modern JavaScript with any framework, define an editing schema, and publish them to the visual page builder. The service handles server-side rendering, versioning, and rollout across sites.",
    features: [
      {
        title: "Framework freedom",
        copy: "Author in React, Svelte, or plain templates. The service compiles and serves components uniformly, so teams keep their preferred tools.",
      },
      {
        title: "Schema-driven editing",
        copy: "Each component declares its editable fields. The page builder renders friendly controls automatically — no bespoke admin UI work.",
      },
      {
        title: "Versioned rollouts",
        copy: "Ship a new component version behind a preview flag, test it on staging sites, then roll it out portfolio-wide in one action.",
      },
      {
        title: "Local dev workflow",
        copy: "A CLI scaffolds, previews, and tests components locally with hot reload before anything is published.",
      },
    ],
    faqs: [
      {
        q: "How do we keep components consistent across sites?",
        a: "Components live in shared libraries with semantic versions. Sites subscribe to a library and receive updates on your chosen cadence.",
      },
      {
        q: "Can components fetch data?",
        a: "Yes — components can call approved APIs server-side at render time, with caching handled by the platform.",
      },
    ],
  },
  {
    slug: "advanced-forms",
    name: "Advanced Forms",
    group: "Create & manage",
    tint: "orange",
    icon: "ClipboardList",
    tagline: "Multi-step forms and service workflows",
    summary:
      "Build accessible multi-step forms with conditional logic, save-and-resume, payments hooks, and back-office routing.",
    heroTitle: "Digitize whole services, not just contact forms",
    heroCopy:
      "From program applications to permit requests, Advanced Forms handles conditional branching, file uploads, identity lookups, and submission routing — with accessibility and audit trails built in.",
    features: [
      {
        title: "Conditional logic",
        copy: "Show, hide, and validate fields based on earlier answers, keeping long forms short for each individual user.",
      },
      {
        title: "Save and resume",
        copy: "Users can leave and return without losing progress — essential for applications that need documents or third-party details.",
      },
      {
        title: "Routing and integrations",
        copy: "Send submissions to email, CRM, ticketing, or any API endpoint through the integrations layer, with per-branch routing rules.",
      },
      {
        title: "Accessible by default",
        copy: "Generated markup meets WCAG 2.2 AA, with proper labelling, error messaging, and keyboard behaviour out of the box.",
      },
    ],
    faqs: [
      {
        q: "Can non-developers build forms?",
        a: "Yes — the form builder is drag-and-drop, and logic rules are configured visually. Developers only get involved for custom integrations.",
      },
      {
        q: "Are submissions secure?",
        a: "Submissions are encrypted in transit and at rest, with configurable retention and full audit logging.",
      },
    ],
  },
  {
    slug: "integrations",
    name: "Integrations (iPaaS)",
    group: "Connect & extend",
    tint: "pink",
    icon: "Workflow",
    tagline: "Low-code workflows across your stack",
    summary:
      "A low-code integration platform that connects your CMS, CRM, student systems, and legacy APIs with visual workflows.",
    heroTitle: "Connect everything without another middleware project",
    heroCopy:
      "The integrations layer ships with connectors for common enterprise systems and a visual workflow editor for everything else. Sync records, transform payloads, and automate processes on schedules or events.",
    features: [
      {
        title: "Visual workflow editor",
        copy: "Chain triggers, transforms, and actions on a canvas. Test with sample payloads and inspect every run's logs.",
      },
      {
        title: "Connector library",
        copy: "Prebuilt connectors for CRMs, calendars, spreadsheets, messaging, and data platforms — plus generic REST and GraphQL steps.",
      },
      {
        title: "Event-driven sync",
        copy: "React to content publishes, form submissions, or external webhooks in seconds instead of overnight batch jobs.",
      },
      {
        title: "Observability",
        copy: "Run history, retries, and alerting are built in, so failures surface immediately rather than in next month's report.",
      },
    ],
    faqs: [
      {
        q: "Who maintains the integrations?",
        a: "Squiz maintains the connector library; your workflows are yours, built and owned by your team in the visual editor.",
      },
      {
        q: "Can it call our internal APIs?",
        a: "Yes — private endpoints are reachable through authenticated gateways with credentials stored in a managed secrets vault.",
      },
    ],
  },
  {
    slug: "optimization",
    name: "Optimization",
    group: "Data & optimization",
    tint: "purple",
    icon: "FlaskConical",
    tagline: "Test ideas, ship the winners",
    summary:
      "A/B testing, user journey mapping, and conversion tooling that lets marketing teams experiment without engineering support.",
    heroTitle: "Turn opinions into experiments",
    heroCopy:
      "Run A/B and multivariate tests on headlines, layouts, and calls to action directly from the page builder. Journey maps show where users stall, and results report significance without a statistics degree.",
    features: [
      {
        title: "Visual experiment setup",
        copy: "Duplicate a page region, change the variant, choose a goal, and launch. No tag managers or code snippets required.",
      },
      {
        title: "Journey analytics",
        copy: "Flow visualisations show the paths users actually take — and the exact steps where task completion breaks down.",
      },
      {
        title: "Goal tracking",
        copy: "Define conversions once — form submits, downloads, page reaches — and reuse them across every experiment and report.",
      },
      {
        title: "Automatic significance",
        copy: "Experiments report confidence levels and minimum sample guidance, preventing premature winner declarations.",
      },
    ],
    faqs: [
      {
        q: "How many visitors do we need for testing?",
        a: "The platform estimates the required sample per experiment up front, based on your traffic and the size of effect you want to detect.",
      },
      {
        q: "Does testing affect SEO?",
        a: "Variants are served without cloaking and follow search-engine testing guidelines, so experiments are SEO-safe.",
      },
    ],
  },
  {
    slug: "behavioral-analytics",
    name: "Behavioural Analytics",
    group: "Data & optimization",
    tint: "purple",
    icon: "ChartLine",
    tagline: "Understand what users actually do",
    summary:
      "Privacy-conscious analytics tuned for content teams: engagement, task completion, and content performance without the jargon.",
    heroTitle: "Analytics that answer content questions",
    heroCopy:
      "Instead of generic pageview charts, behavioural analytics reports on what content teams need: which pages help users finish tasks, which journeys stall, and which content earns engagement.",
    features: [
      {
        title: "Task-completion tracking",
        copy: "Define the tasks that matter — apply, enrol, pay, report — and see completion rates per audience and entry point.",
      },
      {
        title: "Content scorecards",
        copy: "Every page gets an engagement score combining depth, dwell, and downstream actions, so pruning decisions are data-backed.",
      },
      {
        title: "Segment lenses",
        copy: "Slice any report by CDP segment to compare how prospects, customers, and internal users experience the same content.",
      },
      {
        title: "Cookieless mode",
        copy: "A consent-friendly collection mode measures aggregate behaviour without personal identifiers.",
      },
    ],
    faqs: [
      {
        q: "Does it replace our analytics suite?",
        a: "It can, or it can run alongside one. Many teams keep a general-purpose tool for finance reporting and use behavioural analytics for content decisions.",
      },
      {
        q: "Is it GDPR compliant?",
        a: "Yes — consent-aware collection, configurable retention, and EU data residency options are standard.",
      },
    ],
  },
  {
    slug: "accessibility-auditor",
    name: "Accessibility Auditor",
    badge: "NEW",
    group: "Search & discovery",
    tint: "orange",
    icon: "Accessibility",
    tagline: "Find and fix WCAG issues at scale",
    summary:
      "Continuously scans your whole estate for WCAG issues, prioritizes them by user impact, and guides editors to the fix.",
    heroTitle: "Accessibility you can actually keep on top of",
    heroCopy:
      "The auditor crawls every page on a schedule, maps issues to WCAG 2.2 criteria, and ranks them by real user impact rather than raw counts. Fix guidance is written for editors, not just engineers.",
    features: [
      {
        title: "Whole-estate scanning",
        copy: "Audit hundreds of sites and tens of thousands of pages on a schedule, with trend lines showing progress over time.",
      },
      {
        title: "Impact-based priority",
        copy: "A missing label on your enrolment form outranks a contrast nit on an archive page. Prioritization reflects traffic and task criticality.",
      },
      {
        title: "Editor-friendly guidance",
        copy: "Each issue links to the exact element with a plain-language fix, plus deep links straight into the CMS edit screen.",
      },
      {
        title: "Compliance reporting",
        copy: "Exportable reports map findings to WCAG success criteria for audits, procurement, and legal requirements.",
      },
    ],
    faqs: [
      {
        q: "Does it work on non-Squiz sites?",
        a: "Yes — the auditor scans any public website, whatever CMS it runs on.",
      },
      {
        q: "Automated scans can't catch everything, right?",
        a: "Correct — automated checks cover roughly half of WCAG criteria. The auditor flags what needs human review and tracks manual findings alongside automated ones.",
      },
    ],
  },
  {
    slug: "ai-readiness-auditor",
    name: "AI Readiness Auditor",
    badge: "NEW",
    group: "Search & discovery",
    tint: "blue",
    icon: "Sparkles",
    tagline: "See how AI engines read your site",
    summary:
      "Analyses how AI search engines interpret your content, scores your visibility, and produces a prioritized improvement plan.",
    heroTitle: "Make your content unmissable to AI search",
    heroCopy:
      "More journeys now start in AI assistants than ever. The AI Readiness Auditor shows how machines parse your pages — structure, clarity, metadata, answerability — and tells you exactly what to improve first.",
    features: [
      {
        title: "AI visibility score",
        copy: "A per-page and per-site score reflecting how reliably AI engines can extract accurate answers from your content.",
      },
      {
        title: "Structure analysis",
        copy: "Flags missing headings, tangled markup, and unstructured data that stop machines (and screen readers) from understanding pages.",
      },
      {
        title: "Answerability testing",
        copy: "Runs your audience's real questions against your content and reports where answers are missing, buried, or contradictory.",
      },
      {
        title: "Prioritized roadmap",
        copy: "An ordered fix list weighted by traffic and query demand — no integrations or CMS changes required to get started.",
      },
    ],
    faqs: [
      {
        q: "Do we need to be a Squiz customer?",
        a: "No — the auditor analyses any public website and produces its report without platform changes.",
      },
      {
        q: "How is this different from SEO tooling?",
        a: "Classic SEO optimizes for ranked links. AI readiness optimizes for being quoted accurately inside generated answers — structure, clarity, and answerability matter far more than keywords.",
      },
    ],
  },
];

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}
