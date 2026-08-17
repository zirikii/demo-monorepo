import type { ProductDocument } from "./types";

export const PRODUCT_DOCUMENTS: ProductDocument[] = [
  {
    id: "doc-001",
    title: "HUB24 Invest Product Disclosure Statement",
    product: "HUB24 Invest",
    kind: "PDS",
    updated: "2026-07-01",
    size: "1.4 MB",
  },
  {
    id: "doc-002",
    title: "HUB24 Invest Target Market Determination",
    product: "HUB24 Invest",
    kind: "TMD",
    updated: "2026-07-01",
    size: "480 KB",
  },
  {
    id: "doc-003",
    title: "HUB24 Super Product Disclosure Statement",
    product: "HUB24 Super",
    kind: "PDS",
    updated: "2026-07-01",
    size: "1.6 MB",
  },
  {
    id: "doc-004",
    title: "HUB24 Super Target Market Determination",
    product: "HUB24 Super",
    kind: "TMD",
    updated: "2026-07-01",
    size: "512 KB",
  },
  {
    id: "doc-005",
    title: "Managed Portfolios Booklet — Choice menu",
    product: "Managed portfolios",
    kind: "Guide",
    updated: "2026-06-14",
    size: "2.8 MB",
  },
  {
    id: "doc-006",
    title: "Managed Portfolios Booklet — Discover menu",
    product: "HUB24 Discover",
    kind: "Guide",
    updated: "2026-06-14",
    size: "1.1 MB",
  },
  {
    id: "doc-007",
    title: "Investment menu comparison fact sheet",
    product: "HUB24 Platform",
    kind: "Fact sheet",
    updated: "2026-05-02",
    size: "320 KB",
  },
  {
    id: "doc-008",
    title: "Account application form — individual and joint",
    product: "HUB24 Invest",
    kind: "Form",
    updated: "2026-04-19",
    size: "260 KB",
  },
  {
    id: "doc-009",
    title: "Rollover request form",
    product: "HUB24 Super",
    kind: "Form",
    updated: "2026-04-19",
    size: "180 KB",
  },
  {
    id: "doc-010",
    title: "Notice of intent to claim a deduction",
    product: "HUB24 Super",
    kind: "Form",
    updated: "2026-04-19",
    size: "150 KB",
  },
  {
    id: "doc-011",
    title: "HUB24 Private Invest wholesale information memorandum",
    product: "HUB24 Private Invest",
    kind: "Guide",
    updated: "2026-03-28",
    size: "2.1 MB",
  },
  {
    id: "doc-012",
    title: "SMSF Access guide for accountants",
    product: "SMSF Access",
    kind: "Guide",
    updated: "2026-03-05",
    size: "890 KB",
  },
  {
    id: "doc-013",
    title: "Engage reporting user guide",
    product: "Engage",
    kind: "Guide",
    updated: "2026-02-27",
    size: "1.2 MB",
  },
  {
    id: "doc-014",
    title: "Annual report to members",
    product: "HUB24 Super",
    kind: "Report",
    updated: "2025-12-18",
    size: "3.4 MB",
  },
  {
    id: "doc-015",
    title: "Fees and costs summary",
    product: "HUB24 Platform",
    kind: "Fact sheet",
    updated: "2025-11-30",
    size: "410 KB",
  },
  {
    id: "doc-016",
    title: "Cyber security and data handling overview",
    product: "HUB24 Platform",
    kind: "Fact sheet",
    updated: "2025-11-04",
    size: "600 KB",
  },
];

export const DOCUMENT_KINDS = [
  "All",
  "PDS",
  "TMD",
  "Guide",
  "Form",
  "Report",
  "Fact sheet",
] as const;

export const DOCUMENT_PRODUCTS = [
  "All",
  ...Array.from(new Set(PRODUCT_DOCUMENTS.map((doc) => doc.product))).sort(),
] as const;

export function filterDocuments(kind: string, product: string, query: string): ProductDocument[] {
  const needle = query.trim().toLowerCase();
  return PRODUCT_DOCUMENTS.filter((doc) => {
    if (kind !== "All" && doc.kind !== kind) return false;
    if (product !== "All" && doc.product !== product) return false;
    if (needle && !`${doc.title} ${doc.product}`.toLowerCase().includes(needle)) return false;
    return true;
  });
}
