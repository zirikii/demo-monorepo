import type { ProductDocument } from "./types";

export const PRODUCT_DOCUMENTS: ProductDocument[] = [
  { id: "doc-001", name: "HUB24 Invest IDPS Guide (Part I)", product: "HUB24 Invest", type: "IDPS Guide", updated: "2026-08-11", sizeKb: 1840 },
  { id: "doc-002", name: "HUB24 Invest IDPS Guide (Part II) — Fees and costs", product: "HUB24 Invest", type: "IDPS Guide", updated: "2026-08-11", sizeKb: 960 },
  { id: "doc-003", name: "HUB24 Invest IDPS Guide (Part III) — Investment options", product: "HUB24 Invest", type: "IDPS Guide", updated: "2026-08-11", sizeKb: 2240 },
  { id: "doc-004", name: "HUB24 Invest Target Market Determination", product: "HUB24 Invest", type: "TMD", updated: "2026-08-11", sizeKb: 420 },
  { id: "doc-005", name: "HUB24 Invest / SMSF Access Product Update Notice", product: "HUB24 Invest", type: "Update Notice", updated: "2026-03-19", sizeKb: 310 },
  { id: "doc-006", name: "HUB24 Super Product Disclosure Statement", product: "HUB24 Super", type: "PDS", updated: "2026-07-01", sizeKb: 1620 },
  { id: "doc-007", name: "HUB24 Super Target Market Determination", product: "HUB24 Super", type: "TMD", updated: "2026-07-01", sizeKb: 405 },
  { id: "doc-008", name: "HUB24 Super Investment Booklet — Discover menu", product: "HUB24 Super", type: "Investment Booklet", updated: "2026-07-01", sizeKb: 780 },
  { id: "doc-009", name: "HUB24 Super Investment Booklet — Core menu", product: "HUB24 Super", type: "Investment Booklet", updated: "2026-07-01", sizeKb: 1320 },
  { id: "doc-010", name: "HUB24 Super Investment Booklet — Choice menu", product: "HUB24 Super", type: "Investment Booklet", updated: "2026-07-01", sizeKb: 3180 },
  { id: "doc-011", name: "HUB24 Invest Investment Booklet — Discover menu", product: "HUB24 Invest", type: "Investment Booklet", updated: "2026-07-01", sizeKb: 760 },
  { id: "doc-012", name: "HUB24 Invest Investment Booklet — Core menu", product: "HUB24 Invest", type: "Investment Booklet", updated: "2026-07-01", sizeKb: 1290 },
  { id: "doc-013", name: "HUB24 Invest Investment Booklet — Choice menu", product: "HUB24 Invest", type: "Investment Booklet", updated: "2026-07-01", sizeKb: 3120 },
  { id: "doc-014", name: "HUB24 Managed Portfolio Service PDS", product: "Managed Portfolios", type: "PDS", updated: "2026-06-16", sizeKb: 1450 },
  { id: "doc-015", name: "HUB24 Managed Portfolio Service TMD", product: "Managed Portfolios", type: "TMD", updated: "2026-06-16", sizeKb: 390 },
  { id: "doc-016", name: "HUB24 Financial Services Guide", product: "HUB24 Group", type: "FSG", updated: "2026-05-30", sizeKb: 540 },
  { id: "doc-017", name: "HUB24 SMSF Establishment Service Guide", product: "SMSF Access", type: "IDPS Guide", updated: "2026-04-22", sizeKb: 870 },
  { id: "doc-018", name: "SMSF Access Target Market Determination", product: "SMSF Access", type: "TMD", updated: "2026-04-22", sizeKb: 380 },
  { id: "doc-019", name: "HUB24 Private Invest Service Guide", product: "Private Invest", type: "IDPS Guide", updated: "2026-04-08", sizeKb: 1120 },
  { id: "doc-020", name: "Private Invest Target Market Determination", product: "Private Invest", type: "TMD", updated: "2026-04-08", sizeKb: 360 },
  { id: "doc-021", name: "Application form — HUB24 Invest (individual and joint)", product: "HUB24 Invest", type: "Form", updated: "2026-02-14", sizeKb: 290 },
  { id: "doc-022", name: "Application form — HUB24 Super", product: "HUB24 Super", type: "Form", updated: "2026-02-14", sizeKb: 310 },
  { id: "doc-023", name: "Application form — Account-based pension", product: "HUB24 Super", type: "Form", updated: "2026-02-14", sizeKb: 285 },
  { id: "doc-024", name: "Rollover request form", product: "HUB24 Super", type: "Form", updated: "2026-01-30", sizeKb: 210 },
  { id: "doc-025", name: "Third-party payment authority form", product: "Private Invest", type: "Form", updated: "2026-01-30", sizeKb: 195 },
  { id: "doc-026", name: "Change of adviser form", product: "HUB24 Group", type: "Form", updated: "2025-12-12", sizeKb: 180 },
  { id: "doc-027", name: "Binding death benefit nomination form", product: "HUB24 Super", type: "Form", updated: "2025-12-12", sizeKb: 205 },
  { id: "doc-028", name: "HUB24 Discover Product Update Notice", product: "HUB24 Discover", type: "Update Notice", updated: "2025-11-18", sizeKb: 240 },
  { id: "doc-029", name: "Engage reporting service description", product: "Engage", type: "IDPS Guide", updated: "2025-10-27", sizeKb: 640 },
  { id: "doc-030", name: "Foreign currency account terms", product: "Private Invest", type: "Update Notice", updated: "2025-09-15", sizeKb: 320 },
];

export const DOCUMENT_TYPES = [
  "PDS",
  "IDPS Guide",
  "TMD",
  "Investment Booklet",
  "FSG",
  "Form",
  "Update Notice",
] as const;

export const DOCUMENT_PRODUCTS = Array.from(
  new Set(PRODUCT_DOCUMENTS.map((document) => document.product)),
).sort();
