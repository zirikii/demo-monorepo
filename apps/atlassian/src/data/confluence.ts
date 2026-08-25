export interface ConfluenceComment {
  id: string;
  author: string;
  body: string;
  created: string;
}

export interface ConfluencePage {
  id: string;
  title: string;
  space: string;
  author: string;
  updated: string;
  body: string;
  comments: ConfluenceComment[];
}

export const CONFLUENCE_SPACE = {
  key: "NLINE",
  name: "Northline",
} as const;

export const CONFLUENCE_PAGES: ConfluencePage[] = [
  {
    id: "strategy-brief",
    title: "Portal 2.0 strategy brief",
    space: CONFLUENCE_SPACE.name,
    author: "Priya Raman",
    updated: "2026-08-15",
    body: "Account microsite v2 is the Q3 bet. Partner-channel customers skip the default wizard, so PORTAL-142 is the delivery spine. The Safari login banner (PORTAL-161) is the current release risk.",
    comments: [
      {
        id: "p1c1",
        author: "Maya Chen",
        body: "Rovo's draft still cites last week's partner calls — I'll refresh the goals section.",
        created: "2026-08-16",
      },
    ],
  },
  {
    id: "safari-banner",
    title: "Safari login banner notes",
    space: CONFLUENCE_SPACE.name,
    author: "Nadia Fischer",
    updated: "2026-08-20",
    body: "The service-config key is read as BannerEnabled in one bundle and bannerEnabled in another. Safari 18 paints both. Fix belongs with PORTAL-161.",
    comments: [],
  },
  {
    id: "partner-playbook",
    title: "Partner onboarding playbook",
    space: CONFLUENCE_SPACE.name,
    author: "Maya Chen",
    updated: "2026-08-18",
    body: "Partners should land on the 300k-account path, not the consumer wizard. Keep the same account record shape so finance reports stay honest.",
    comments: [],
  },
  {
    id: "q3-marketing",
    title: "Q3 campaign landing brief",
    space: CONFLUENCE_SPACE.name,
    author: "Nadia Fischer",
    updated: "2026-08-16",
    body: "Creative goes live Monday. PORTAL-170 is the public signup page refresh. Do not ship while the Safari banner is still double-rendering.",
    comments: [],
  },
];

export function getConfluencePage(id: string, pages = CONFLUENCE_PAGES): ConfluencePage | undefined {
  return pages.find((page) => page.id === id);
}
