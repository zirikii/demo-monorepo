export interface CustomerStory {
  slug: string;
  customer: string;
  industrySlug: string;
  industryLabel: string;
  title: string;
  summary: string;
  products: string[];
  heroStat: { stat: string; label: string };
  stats: { stat: string; label: string }[];
  quote: { text: string; name: string; role: string };
  body: { heading: string; paragraphs: string[] }[];
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
}

/**
 * Fictionalized customer stories written for this demo. Organizations and
 * people are invented; metrics are illustrative.
 */
export const stories: CustomerStory[] = [
  {
    slug: "southbank-university",
    customer: "Southbank University",
    industrySlug: "higher-education",
    industryLabel: "Higher Education",
    title: "Southbank University tripled user satisfaction after leaving its legacy CMS",
    summary:
      "A 140-site portfolio, six-person digital team, and a legacy CMS at end-of-life. Here's how Southbank replatformed in one academic year.",
    products: ["Content Management", "Funnelback Search", "Personalization"],
    heroStat: { stat: "3x", label: "user satisfaction score" },
    stats: [
      { stat: "3x", label: "user satisfaction score" },
      { stat: "140", label: "sites consolidated" },
      { stat: "9 mo", label: "from kickoff to full launch" },
      { stat: "41%", label: "more course-page conversions" },
    ],
    quote: {
      text: "We went from apologising for our website to demoing it at sector conferences. The difference is that our editors can finally move at the speed of their ideas.",
      name: "Maya Lindqvist",
      role: "Director of Digital, Southbank University",
    },
    body: [
      {
        heading: "The challenge",
        paragraphs: [
          "Southbank's digital estate had grown organically for fifteen years: 140 sites across faculties, research centres, and events, running on a legacy CMS the vendor had stopped developing. Every design change needed a developer, every faculty invented its own navigation, and search returned committee minutes ahead of course pages.",
          "With a team of six serving forty thousand students and three thousand editors, the university needed governance and self-service in equal measure.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "The team started with the component library: thirty brand-locked components covering every pattern the old sites used. AI-assisted migration then moved content faculty by faculty, with automated redirect maps preserving years of SEO equity.",
          "Funnelback search launched in parallel with course-finder tuning, synonym maps for program names, and best bets for high-stakes queries like clearing and scholarships.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "Nine months after kickoff, all 140 sites were live on Squiz DXP. Post-launch surveys showed satisfaction up threefold, course-page conversion rose 41%, and the six-person team now ships campaign pages in hours instead of sprint cycles.",
          "Next up: personalized journeys for international applicants, powered by segments the CDP is already collecting.",
        ],
      },
    ],
    tint: "mint",
  },
  {
    slug: "harbour-city-council",
    customer: "Harbour City Council",
    industrySlug: "government",
    industryLabel: "Government",
    title: "An award-winning council website lifted recycling participation 16%",
    summary:
      "Harbour City Council rebuilt its digital services around citizen tasks — and watched service uptake climb across the board.",
    products: ["Content Management", "Advanced Forms", "Keyword Search", "Integrations"],
    heroStat: { stat: "16%", label: "increase in recycling participation" },
    stats: [
      { stat: "16%", label: "increase in recycling participation" },
      { stat: "70%", label: "of top services completed online" },
      { stat: "-32%", label: "contact-centre volume" },
      { stat: "AA", label: "WCAG 2.2 conformance maintained" },
    ],
    quote: {
      text: "We stopped organising the website around our org chart and started organising it around what residents are trying to do. The platform made that shift practical.",
      name: "Ben Okafor",
      role: "Customer Experience Lead, Harbour City Council",
    },
    body: [
      {
        heading: "The challenge",
        paragraphs: [
          "The council's old site mirrored its internal structure — departments, divisions, PDFs. Residents couldn't find bin days, waste rules were buried in policy documents, and every service request ended in a phone call.",
          "The CX team wanted a task-first website with online transactions, but the incumbent CMS offered content management and nothing else.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "Working from contact-centre data, the team identified the fifty tasks residents attempt most and rebuilt each as a dedicated journey. Advanced Forms replaced paper processes for waste collection bookings, permits, and rebates, routing submissions straight into back-office queues via the integrations layer.",
          "An address-aware search connects 'when is my bin day' to the right collection calendar in one step.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "Within a year, seventy percent of top services were completed online end-to-end, contact volume fell by a third, and a recycling campaign built on personalized content lifted participation 16% — a result that won the council a national digital-service award.",
        ],
      },
    ],
    tint: "blue",
  },
  {
    slug: "greenfield-university-conversational-search",
    customer: "Greenfield University",
    industrySlug: "higher-education",
    industryLabel: "Higher Education",
    title: "Conversational search transformed how students get answers at Greenfield",
    summary:
      "Instead of ten blue links, students now get direct answers with citations — and the university gets a live map of what students actually need.",
    products: ["Conversational Search", "Funnelback Search"],
    heroStat: { stat: "45%", label: "fewer search-related support tickets" },
    stats: [
      { stat: "45%", label: "fewer search-related support tickets" },
      { stat: "82%", label: "of questions answered without a click-through" },
      { stat: "6 wks", label: "from contract to launch" },
      { stat: "12k", label: "questions answered in month one" },
    ],
    quote: {
      text: "The transcripts are the most honest user research we've ever had. Students ask in their own words, and we can see exactly where our content wasn't answering.",
      name: "Dr. Alice Munro",
      role: "Head of Digital Experience, Greenfield University",
    },
    body: [
      {
        heading: "The challenge",
        paragraphs: [
          "Greenfield's search logs told a frustrating story: students searched for 'how do I defer an exam' and got a results page of policy PDFs. The service desk absorbed the difference, answering thousands of questions the website technically already covered.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "Conversational Search launched on top of the existing Funnelback index — no content migration required. Answers are generated only from approved university pages, with citations linking back to the source, and guardrails route sensitive wellbeing queries directly to support services.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "In the first month the assistant answered twelve thousand questions, resolving 82% without a further click. Search-related tickets fell 45%, and the content team now runs a weekly ritual: read the unanswered questions, fix the content, watch the answer rate climb.",
        ],
      },
    ],
    tint: "purple",
  },
  {
    slug: "meridian-partners",
    customer: "Meridian Partners",
    industrySlug: "professional-services",
    industryLabel: "Professional Services",
    title: "Meridian Partners turned its insight hub into a pipeline engine",
    summary:
      "A global advisory firm connected content, data, and CRM — and gave partners the signals to call at exactly the right moment.",
    products: ["Customer Data Platform", "Personalization", "Behavioural Analytics"],
    heroStat: { stat: "2.4x", label: "more qualified enquiries" },
    stats: [
      { stat: "2.4x", label: "more qualified enquiries" },
      { stat: "38%", label: "faster insight publication" },
      { stat: "12", label: "regional sites on one platform" },
      { stat: "64%", label: "of enquiries preceded by tracked content journeys" },
    ],
    quote: {
      text: "Marketing used to report on downloads. Now we walk into partner meetings with a list of accounts reading our restructuring content this week. That changes the conversation entirely.",
      name: "Priya Raghavan",
      role: "CMO, Meridian Partners",
    },
    body: [
      {
        heading: "The challenge",
        paragraphs: [
          "Meridian published excellent thought leadership into the void: no view of who read it, no connection to CRM, and a publication process that took two weeks per article across twelve regional sites.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "The firm consolidated its regional sites onto Squiz DXP with a shared component library and localized content layers. The CDP stitched anonymous reading behaviour to known contacts as they converted, and a two-way CRM sync pushed high-intent signals — an account reading five insolvency articles in a week — straight to the relevant partner.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "Qualified enquiries more than doubled year on year, and nearly two-thirds now arrive with a visible content journey behind them, letting partners open conversations already knowing what the client cares about.",
        ],
      },
    ],
    tint: "pink",
  },
  {
    slug: "cornerstone-mutual",
    customer: "Cornerstone Mutual",
    industrySlug: "financial-and-insurance-services",
    industryLabel: "Financial Services",
    title: "Cornerstone Mutual grew online applications 31% under full compliance",
    summary:
      "A member-owned bank proved that governed publishing and growth marketing aren't opposites.",
    products: ["Content Management", "Optimization", "Advanced Forms"],
    heroStat: { stat: "31%", label: "growth in online applications" },
    stats: [
      { stat: "31%", label: "growth in online applications" },
      { stat: "50%", label: "fewer compliance review cycles" },
      { stat: "19", label: "A/B tests shipped in the first year" },
      { stat: "100%", label: "of changes with audit trails" },
    ],
    quote: {
      text: "Compliance used to be the reason we couldn't test anything. Now every experiment ships with its approval trail attached, and our risk team signs off in days, not weeks.",
      name: "Tomás Herrera",
      role: "Head of Digital Channels, Cornerstone Mutual",
    },
    body: [
      {
        heading: "The challenge",
        paragraphs: [
          "Every rate change at Cornerstone triggered a scramble: content updates in one system, disclosures in another, and a compliance review thread held together by email. Testing new acquisition journeys was effectively impossible.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "Squiz DXP unified product pages, calculators, and application forms with approval workflows that capture who approved what, when. Rate tables became structured content published once and rendered everywhere. With governance automated, the team unlocked the optimization suite and began testing headlines, form lengths, and CTA placement.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "Nineteen experiments in the first year drove a 31% lift in completed online applications, while compliance review cycles halved because every change now carries its own audit trail.",
        ],
      },
    ],
    tint: "orange",
  },
  {
    slug: "voltgrid-energy",
    customer: "VoltGrid Energy",
    industrySlug: "utilities",
    industryLabel: "Utilities",
    title: "VoltGrid stayed online through a record storm season",
    summary:
      "When 400,000 customers lost power, VoltGrid's website served nine million page views without breaking stride.",
    products: ["Content Management", "Integrations", "Behavioural Analytics"],
    heroStat: { stat: "99.99%", label: "availability during peak events" },
    stats: [
      { stat: "99.99%", label: "availability during peak events" },
      { stat: "9M", label: "page views in one storm week" },
      { stat: "8 min", label: "average time to publish emergency updates" },
      { stat: "-48%", label: "outage-related call volume" },
    ],
    quote: {
      text: "Our old site fell over the moment customers needed it most. This storm season, the website was our best-performing channel — the call centre could focus on the vulnerable customers who really needed a human.",
      name: "Sarah Whitmore",
      role: "GM Customer Operations, VoltGrid Energy",
    },
    body: [
      {
        heading: "The challenge",
        paragraphs: [
          "VoltGrid's self-hosted website had a habit of failing during major outages — precisely when hundreds of thousands of customers needed restoration times. Emergency updates required a developer to deploy, adding hours of delay.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "The utility moved to Squiz's managed SaaS platform with an outage centre integrated to its network management system. Emergency banners and status updates are published by the comms team from a phone, and the integrations layer refreshes outage data every two minutes.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "Through a record storm season the site absorbed nine million weekly page views at 99.99% availability. Customers self-served restoration times, cutting outage-related calls nearly in half.",
        ],
      },
    ],
    tint: "blue",
  },
];

export function getStory(slug: string): CustomerStory | undefined {
  return stories.find((s) => s.slug === slug);
}
