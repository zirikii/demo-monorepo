export interface BlogPost {
  slug: string;
  title: string;
  category: "AI & Search" | "Accessibility" | "DXP Strategy" | "Content" | "Product";
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
  date: string;
  readMinutes: number;
  author: { name: string; role: string };
  excerpt: string;
  sections: { heading: string; paragraphs: string[] }[];
}

/** Original demo articles on the themes squiz.net writes about. */
export const posts: BlogPost[] = [
  {
    slug: "conversational-ai-search-for-professional-services",
    title: "Five ways conversational AI search pays off for professional services firms",
    category: "AI & Search",
    tint: "blue",
    date: "2026-06-18",
    readMinutes: 7,
    author: { name: "Elena Marsh", role: "Search Practice Lead" },
    excerpt:
      "Advisory firms sit on deep expertise that buyers can't find. Here's what changes when your site answers questions instead of listing links.",
    sections: [
      {
        heading: "Buyers ask questions; websites list pages",
        paragraphs: [
          "A prospective client rarely wants your practice-area page. They want to know whether their situation has a solution, what it might cost, and whether your firm has handled it before. Traditional site search makes them translate those questions into keywords, then assemble answers from whatever pages rank.",
          "Conversational search collapses that work. The visitor asks in plain language and receives a direct answer, grounded in your published insights, with citations they can verify.",
        ],
      },
      {
        heading: "Five concrete payoffs",
        paragraphs: [
          "First, longer sessions: visitors who get an answer ask a follow-up instead of bouncing to a competitor. Second, honest demand data — transcripts show the exact questions your market is asking this quarter. Third, content leverage: a decade of thought leadership becomes queryable rather than buried in archives. Fourth, faster qualification: answer journeys reveal intent long before a contact form does. Fifth, differentiation — most firms still ship a keyword box from 2015.",
        ],
      },
      {
        heading: "Keeping answers safe",
        paragraphs: [
          "The non-negotiable is grounding. Answers must be generated exclusively from your approved content, decline gracefully when the content doesn't cover a question, and route regulated topics to a human. Treat transcripts as user research, not surveillance: aggregate them, mine the gaps, and publish what's missing.",
        ],
      },
    ],
  },
  {
    slug: "rise-of-ai-search-digital-strategy",
    title: "What the rise of AI search means for your digital strategy",
    category: "AI & Search",
    tint: "mint",
    date: "2026-06-02",
    readMinutes: 9,
    author: { name: "David Chen", role: "VP Strategy" },
    excerpt:
      "A growing share of journeys now starts — and often ends — inside an AI assistant. The playbook that won you Google rankings won't win you citations.",
    sections: [
      {
        heading: "The click is no longer guaranteed",
        paragraphs: [
          "For twenty years, digital strategy assumed a simple contract: rank well, earn the click, convert the visit. AI assistants break that contract. They synthesize answers from multiple sources and often satisfy the user without a single click-through.",
          "That's not a catastrophe — it's a channel shift. The new goal is to be the source the answer is built from, cited by name, with your facts represented accurately.",
        ],
      },
      {
        heading: "What machines reward",
        paragraphs: [
          "AI engines favour content that is structured, current, unambiguous, and answerable. A page with clear headings, one topic per section, honest dates, and structured data is dramatically easier to quote correctly than a 4,000-word PDF scan.",
          "Notice the overlap: everything that helps a language model parse your page also helps a screen-reader user and a stressed human skimming on a phone. AI readiness and accessibility are the same discipline wearing different badges.",
        ],
      },
      {
        heading: "A pragmatic response",
        paragraphs: [
          "Audit how engines read your site today. Fix the structural debt first — headings, metadata, duplication. Publish direct answers to the questions your audience actually asks. And measure differently: track citations and answer accuracy alongside classic sessions and rankings.",
        ],
      },
    ],
  },
  {
    slug: "complete-introduction-to-web-accessibility",
    title: "A working introduction to web accessibility",
    category: "Accessibility",
    tint: "orange",
    date: "2026-05-21",
    readMinutes: 11,
    author: { name: "Ruth Adeyemi", role: "Accessibility Principal" },
    excerpt:
      "Accessibility isn't a compliance checkbox — it's the difference between a service people can use and one they can't. Here's the practical foundation.",
    sections: [
      {
        heading: "Who accessibility is for",
        paragraphs: [
          "Roughly one in six people lives with a disability, and that's before you count temporary and situational limits: a broken wrist, a bright car park, a noisy train. Accessible design serves all of them — and consistently improves the experience for everyone else too.",
        ],
      },
      {
        heading: "The four principles",
        paragraphs: [
          "WCAG organizes accessibility around four ideas. Content must be perceivable (text alternatives, captions, sufficient contrast), operable (keyboard access, enough time, no seizure-inducing flashes), understandable (readable language, predictable behaviour, helpful errors), and robust (markup that assistive technology can parse reliably).",
          "Most failures in the wild are mundane: missing form labels, images without alternatives, poor contrast, and keyboard traps. None require heroics to fix — they require someone to notice.",
        ],
      },
      {
        heading: "Making it stick",
        paragraphs: [
          "One-off audits decay the moment content changes. Sustainable accessibility comes from accessible-by-default components, editor training, automated scanning between audits, and impact-based prioritization so the enrolment form outranks the archive page in the fix queue.",
        ],
      },
    ],
  },
  {
    slug: "dxp-migration-strategy-and-timeline",
    title: "DXP migration strategy and timeline: a practical guide",
    category: "DXP Strategy",
    tint: "purple",
    date: "2026-05-05",
    readMinutes: 10,
    author: { name: "Marcus Bell", role: "Migration Practice Director" },
    excerpt:
      "Replatforming has a reputation for multi-year pain. With honest scoping and modern tooling, most organizations can do it in one planning cycle.",
    sections: [
      {
        heading: "Why migrations blow out",
        paragraphs: [
          "The classic failure mode is treating migration as a copy job. Teams lift fifteen years of content — duplicates, orphans, and all — onto a new platform, then wonder why nothing improved. The blowout isn't the technology; it's the refusal to make content decisions.",
        ],
      },
      {
        heading: "A four-phase shape",
        paragraphs: [
          "Phase one, audit: crawl the estate, score every page on traffic and value, and mark the (typically large) share that should be retired rather than moved. Phase two, foundations: design system, component library, information architecture, governance model. Phase three, migrate: automated tooling moves the keepers with metadata and redirects intact; editors review by exception. Phase four, harden: accessibility and performance checks, search tuning, launch.",
          "On this shape, a mid-size portfolio lands in a single academic or fiscal year — often much faster.",
        ],
      },
      {
        heading: "What to demand from tooling",
        paragraphs: [
          "Insist on automated content extraction with metadata preservation, redirect-map generation, and progress reporting per site. Migration effort should be dominated by decisions, not data entry.",
        ],
      },
    ],
  },
  {
    slug: "five-mistakes-keeping-your-site-out-of-ai-search",
    title: "Five mistakes keeping your website out of AI search results",
    category: "AI & Search",
    tint: "pink",
    date: "2026-04-22",
    readMinutes: 6,
    author: { name: "Elena Marsh", role: "Search Practice Lead" },
    excerpt:
      "If assistants never cite you, the cause is usually one of five fixable problems — and none of them is 'we need more keywords.'",
    sections: [
      {
        heading: "The five mistakes",
        paragraphs: [
          "One: answers locked in PDFs, where extraction is unreliable and context is lost. Two: heading structures that lie — decorative H3s, skipped levels, and pages with no headings at all. Three: duplicated and contradictory content across microsites, which makes engines distrust every version. Four: missing dates and authorship, leaving freshness ambiguous. Five: burying the answer — pages that take six hundred words to say what a table could say in ten.",
        ],
      },
      {
        heading: "How to find yours",
        paragraphs: [
          "Run your audience's top fifty questions through the assistants they use and record who gets cited. Then audit the losing pages against the five mistakes above. In our experience the fix list is shorter — and more structural — than teams expect.",
        ],
      },
    ],
  },
  {
    slug: "dxp-vs-cms-whats-the-difference",
    title: "DXP or CMS? What's actually different",
    category: "DXP Strategy",
    tint: "mint",
    date: "2026-04-08",
    readMinutes: 8,
    author: { name: "David Chen", role: "VP Strategy" },
    excerpt:
      "Every vendor claims the acronym du jour. Here's a working definition you can use in procurement without rolling your eyes.",
    sections: [
      {
        heading: "A CMS manages content",
        paragraphs: [
          "A content management system does one job: create, organize, and publish content. A good one does it with strong governance and a pleasant editing experience. For a single brochure site with modest ambitions, a CMS is genuinely all you need.",
        ],
      },
      {
        heading: "A DXP manages experiences",
        paragraphs: [
          "A digital experience platform wraps the CMS with the capabilities experiences actually require: search that spans sources, a data layer that remembers who users are, personalization that acts on it, experimentation to test what works, and integrations to connect the systems of record. The point isn't the feature list — it's that these pieces share one data model instead of being stitched together with duct tape and tag managers.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Count your audiences, sites, and systems. If the answer to each is 'one', buy a CMS. If you're running a portfolio of sites for distinct audiences with data spread across a dozen systems, a platform approach pays for itself in retired point solutions alone.",
        ],
      },
    ],
  },
  {
    slug: "content-governance-at-scale",
    title: "Content governance at scale: how big teams stay on-brand",
    category: "Content",
    tint: "purple",
    date: "2026-03-19",
    readMinutes: 7,
    author: { name: "Hannah Vogel", role: "Content Strategy Lead" },
    excerpt:
      "Three thousand editors, one brand. Governance that works is invisible — it's built into the tools, not enforced by email.",
    sections: [
      {
        heading: "Policy documents don't govern",
        paragraphs: [
          "Every large organization has a style guide nobody opens. Real governance lives in the publishing tools: components that can't go off-brand, workflows that route sensitive pages to review, permissions that match responsibility, and expiry dates that flag stale content automatically.",
        ],
      },
      {
        heading: "The governance stack",
        paragraphs: [
          "Layer one is the design system — locked components make brand compliance the default. Layer two is workflow — approval chains scoped to risk, so a news post ships instantly while a fees page gets legal eyes. Layer three is monitoring — automated accessibility and quality scans that catch drift between audits. Layer four is analytics — scorecards that make content owners accountable for outcomes, not output.",
        ],
      },
      {
        heading: "Devolve with confidence",
        paragraphs: [
          "The payoff is devolution: subject-matter experts publish directly because the system makes the safe path the easy path. Central teams stop being bottlenecks and start being enablers.",
        ],
      },
    ],
  },
  {
    slug: "personalization-without-the-creepiness",
    title: "Personalization without the creepiness",
    category: "Content",
    tint: "blue",
    date: "2026-03-03",
    readMinutes: 6,
    author: { name: "Priya Nair", role: "Optimization Consultant" },
    excerpt:
      "Users love relevance and hate surveillance. The line between them is clearer than most teams think.",
    sections: [
      {
        heading: "Relevance vs. surveillance",
        paragraphs: [
          "Showing a returning postgraduate visitor the postgraduate open-day banner is relevance. Greeting an anonymous visitor by the company name you inferred from their IP address is surveillance. The difference is whether the personalization serves the user's goal or merely demonstrates what you know.",
        ],
      },
      {
        heading: "Practical guardrails",
        paragraphs: [
          "Personalize categories, not identities: 'people exploring undergraduate courses' rather than 'Jane from Acme'. Respect consent as a feature, not an obstacle — anonymous defaults should be excellent. Always let users see the unpersonalized view. And measure lift honestly: if a personalization doesn't improve task completion, retire it.",
        ],
      },
      {
        heading: "Start with the journey, not the tech",
        paragraphs: [
          "The best first personalizations are boring: remember a visitor's campus, surface the application they started, localize deadlines. Ship those, earn trust, and expand from evidence.",
        ],
      },
    ],
  },
  {
    slug: "introducing-content-intelligence",
    title: "Introducing Content Intelligence: see your site the way AI does",
    category: "Product",
    tint: "mint",
    date: "2026-02-12",
    readMinutes: 5,
    author: { name: "The Squiz Product Team", role: "Product" },
    excerpt:
      "Our newest product audits your entire estate for AI readiness and accessibility, then hands you a prioritized plan — no integrations required.",
    sections: [
      {
        heading: "Why we built it",
        paragraphs: [
          "Digital teams kept asking the same two questions: 'why don't AI assistants cite us?' and 'how do we stay accessible between audits?' Both come down to how machines read your pages — and until now, answering them meant stitching together crawlers, spreadsheets, and consultants.",
        ],
      },
      {
        heading: "What it does",
        paragraphs: [
          "Content Intelligence crawls your estate on a schedule and scores every page for AI readability and WCAG conformance. Findings are ranked by user impact — traffic, task criticality, query demand — so your team always knows the next most valuable fix. Editor-friendly guidance links each issue to the exact element, and trend lines show leadership the progress curve.",
          "It works on any website, whatever CMS you run. No integrations, no tags, no migration.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
