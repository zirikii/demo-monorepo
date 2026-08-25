import { PRODUCT_APPS } from "./apps";
import type { MegaMenu, NavColumn, NavLink } from "./types";

export const PRODUCTS_MENU: MegaMenu = {
  label: "Products",
  to: "/software",
  feature: {
    eyebrow: "Featured app · Jira",
    title: "Great outcomes start with Jira",
    body: "AI-powered project management that removes the work around work. Keep teams in sync and on track.",
    to: "/software/jira",
    cta: "Explore Jira",
  },
  columns: [
    {
      heading: "Recommended",
      links: [
        {
          label: "Jira",
          to: "/software/jira",
          description: "Plan, track, and deliver work with your team and agents",
        },
        {
          label: "Confluence",
          to: "/software/confluence",
          description: "The AI workspace for knowledge and collaboration",
        },
        {
          label: "Rovo",
          to: "/software/rovo",
          description: "Search, chat, and agents across your system of work",
          badge: "AI",
        },
        {
          label: "Loom",
          to: "/software/loom",
          description: "Async video and AI meeting recaps that move work forward",
        },
      ],
    },
    {
      heading: "For specialists",
      links: [
        {
          label: "Jira Service Management",
          to: "/software/jira-service-management",
          description: "AI-powered service at scale",
        },
        {
          label: "Jira Product Discovery",
          to: "/software/jira-product-discovery",
          description: "Capture ideas and ship the right thing",
        },
        {
          label: "Bitbucket",
          to: "/software/bitbucket",
          description: "Git collaboration, pull requests, and Pipelines",
        },
        {
          label: "Trello",
          to: "/software/trello",
          description: "Visual boards for any kind of work",
        },
      ],
    },
    {
      heading: "Collections",
      links: [
        {
          label: "Teamwork Collection",
          to: "/collections/teamwork",
          description: "Jira, Confluence, Loom",
        },
        {
          label: "Strategy Collection",
          to: "/collections/strategy",
          description: "Focus, Talent, Align",
        },
        {
          label: "Service Collection",
          to: "/collections/service",
          description: "JSM, CSM, Assets",
        },
        {
          label: "Software Collection",
          to: "/collections/software",
          description: "Rovo Dev, DX, Pipelines",
        },
        {
          label: "Product Collection",
          to: "/collections/product",
          description: "JPD, Feedback, Rovo",
        },
      ],
    },
  ],
  footerLinks: [
    { label: "See all products", to: "/software" },
    { label: "Marketplace", to: "/marketplace" },
    { label: "Get started with Jira", to: "/try" },
  ],
};

export const SOLUTIONS_MENU: MegaMenu = {
  label: "Solutions",
  to: "/solutions",
  feature: {
    eyebrow: "By team",
    title: "Built for how real teams work",
    body: "Software, IT, product, and business teams share one system of work — with agents in the loop.",
    to: "/solutions",
    cta: "Explore solutions",
  },
  columns: [
    {
      heading: "By team",
      links: [
        {
          label: "Software teams",
          to: "/solutions/software",
          description: "Plan, build, and ship together",
        },
        { label: "IT teams", to: "/solutions/it", description: "Service, incidents, and assets" },
        {
          label: "Product managers",
          to: "/solutions/product",
          description: "Discovery through delivery",
        },
        {
          label: "Business teams",
          to: "/solutions/business",
          description: "Marketing, HR, legal, finance",
        },
        {
          label: "Leadership",
          to: "/solutions/leadership",
          description: "Strategy connected to execution",
        },
      ],
    },
    {
      heading: "By need",
      links: [
        {
          label: "Agile & DevOps",
          to: "/solutions/software",
          description: "Boards, roadmaps, CI/CD",
        },
        { label: "ITSM", to: "/solutions/it", description: "Requests, changes, and SLAs" },
        {
          label: "Knowledge management",
          to: "/software/confluence",
          description: "Docs, whiteboards, search",
        },
        { label: "Work management", to: "/software/jira", description: "Projects for every team" },
      ],
    },
  ],
  footerLinks: [{ label: "Customer stories", to: "/customers" }],
};

export const RESOURCES_MENU: MegaMenu = {
  label: "Resources",
  to: "/resources",
  feature: {
    eyebrow: "State of Teams 2026",
    title: "How top teams avoid the AI fragmentation tax",
    body: "Research on how leading organisations keep context together instead of scattering it across tools.",
    to: "/resources/state-of-teams-2026",
    cta: "Read the report",
  },
  columns: [
    {
      heading: "Learn",
      links: [
        { label: "Resource library", to: "/resources", description: "Reports, ebooks, and events" },
        {
          label: "Customer stories",
          to: "/customers",
          description: "How teams ship faster with AI",
        },
        { label: "Community", to: "/community", description: "Ask, learn, and share" },
        { label: "Partners", to: "/partners", description: "Consulting and customization" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Atlassian", to: "/company", description: "Team, values, and locations" },
        { label: "Careers", to: "/careers", description: "Join the team" },
        { label: "Trust", to: "/trust", description: "Security, compliance, reliability" },
        { label: "Contact", to: "/contact", description: "Talk to sales or support" },
      ],
    },
  ],
};

export const MEGA_MENUS: MegaMenu[] = [PRODUCTS_MENU, SOLUTIONS_MENU, RESOURCES_MENU];

export const SIMPLE_NAV: NavLink[] = [{ label: "Enterprise", to: "/enterprise" }];

export const LOGIN_OPTIONS: NavLink[] = PRODUCT_APPS.map((app) => ({
  label: app.name,
  to: `/login?portal=${app.portal}`,
  description: app.blurb,
}));

export const FOOTER_COLUMNS: NavColumn[] = [
  {
    heading: "Products",
    links: [
      { label: "Jira", to: "/software/jira" },
      { label: "Confluence", to: "/software/confluence" },
      { label: "Jira Service Management", to: "/software/jira-service-management" },
      { label: "Rovo", to: "/software/rovo" },
      { label: "Loom", to: "/software/loom" },
      { label: "Bitbucket", to: "/software/bitbucket" },
      { label: "Trello", to: "/software/trello" },
      { label: "Jira Product Discovery", to: "/software/jira-product-discovery" },
      { label: "See all products", to: "/software" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", to: "/resources" },
      { label: "Community", to: "/community" },
      { label: "Marketplace", to: "/marketplace" },
      { label: "Partners", to: "/partners" },
      { label: "Customer stories", to: "/customers" },
      { label: "Support", to: "/support" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
      { label: "Trust", to: "/trust" },
      { label: "Contact", to: "/contact" },
      { label: "Enterprise", to: "/enterprise" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", to: "/legal/privacy" },
      { label: "Terms of use", to: "/legal/terms" },
      { label: "Copyright", to: "/legal/copyright" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", to: "/legal/privacy" },
  { label: "Terms", to: "/legal/terms" },
  { label: "Copyright", to: "/legal/copyright" },
];
