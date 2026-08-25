export const DEMO_PORTALS = [
  "jira",
  "confluence",
  "jsm",
  "jpd",
  "bitbucket",
  "trello",
  "loom",
  "rovo",
  "admin",
] as const;

export type DemoPortal = (typeof DEMO_PORTALS)[number];

export interface ProductApp {
  portal: DemoPortal;
  slug: string;
  name: string;
  blurb: string;
  path: string;
  mark: string;
}

const JIRA: ProductApp = {
  portal: "jira",
  slug: "jira",
  name: "Jira",
  blurb: "Boards, backlog, and work items",
  path: "/jira",
  mark: "jira",
};

const CONFLUENCE: ProductApp = {
  portal: "confluence",
  slug: "confluence",
  name: "Confluence",
  blurb: "Pages, spaces, and comments",
  path: "/confluence",
  mark: "confluence",
};

const JSM: ProductApp = {
  portal: "jsm",
  slug: "jira-service-management",
  name: "Jira Service Management",
  blurb: "Queues, requests, and SLAs",
  path: "/jsm",
  mark: "jira-service-management",
};

const JPD: ProductApp = {
  portal: "jpd",
  slug: "jira-product-discovery",
  name: "Jira Product Discovery",
  blurb: "Ideas, scoring, and roadmaps",
  path: "/jpd",
  mark: "jira-product-discovery",
};

const BITBUCKET: ProductApp = {
  portal: "bitbucket",
  slug: "bitbucket",
  name: "Bitbucket",
  blurb: "Repositories and pull requests",
  path: "/bitbucket",
  mark: "bitbucket",
};

const TRELLO: ProductApp = {
  portal: "trello",
  slug: "trello",
  name: "Trello",
  blurb: "Visual boards and cards",
  path: "/trello",
  mark: "trello",
};

const LOOM: ProductApp = {
  portal: "loom",
  slug: "loom",
  name: "Loom",
  blurb: "Async video and recaps",
  path: "/loom",
  mark: "loom",
};

const ROVO: ProductApp = {
  portal: "rovo",
  slug: "rovo",
  name: "Rovo",
  blurb: "Search, chat, and agents",
  path: "/rovo",
  mark: "rovo",
};

const ADMIN: ProductApp = {
  portal: "admin",
  slug: "admin",
  name: "Admin",
  blurb: "Site administration and policies",
  path: "/admin",
  mark: "jira",
};

export const PRODUCT_APPS: ProductApp[] = [
  JIRA,
  CONFLUENCE,
  JSM,
  JPD,
  BITBUCKET,
  TRELLO,
  LOOM,
  ROVO,
  ADMIN,
];

export const PRODUCT_APP_BY_PORTAL: Record<DemoPortal, ProductApp> = {
  jira: JIRA,
  confluence: CONFLUENCE,
  jsm: JSM,
  jpd: JPD,
  bitbucket: BITBUCKET,
  trello: TRELLO,
  loom: LOOM,
  rovo: ROVO,
  admin: ADMIN,
};

const PORTAL_SET = new Set<string>(DEMO_PORTALS);

export function isDemoPortal(value: string | null | undefined): value is DemoPortal {
  return Boolean(value && PORTAL_SET.has(value));
}

export function getProductApp(portal: DemoPortal): ProductApp {
  return PRODUCT_APP_BY_PORTAL[portal];
}

export function appForProductSlug(slug: string): ProductApp | undefined {
  return PRODUCT_APPS.find((app) => app.slug === slug);
}

export function portalFromPath(pathname: string): DemoPortal {
  const first = pathname.split("/").find(Boolean);
  if (first === "jira") return "jira";
  if (isDemoPortal(first)) return first;
  return "jira";
}
