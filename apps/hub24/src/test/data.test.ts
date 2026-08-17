import { describe, expect, it } from "vitest";
import { AUDIENCES } from "@/data/audiences";
import { AWARDS, FAQS, findFaqs } from "@/data/awards";
import { BDMS, JOBS, LEADERS, LEGAL_PAGES, GROUP_BRANDS } from "@/data/company";
import { PRODUCT_DOCUMENTS } from "@/data/documents";
import { CPD_MODULES, INSIGHTS } from "@/data/insights";
import { FOOTER_COLUMNS, LEGAL_LINKS, LOGIN_OPTIONS, MEGA_MENUS, SIMPLE_NAV } from "@/data/nav";
import { ACCOUNTS, CLIENTS, HOLDINGS, MODELS, STATEMENTS, TRANSACTIONS } from "@/data/platform";
import { INVESTMENT_MENUS, PLATFORM_FEATURES, PRODUCTS } from "@/data/products";
import { ANNOUNCEMENTS, FINANCIAL_HISTORY } from "@/data/shareholder";

function unique<T>(values: T[]): boolean {
  return new Set(values).size === values.length;
}

describe("identifier integrity", () => {
  it("has unique keys across every seed collection", () => {
    expect(unique(PRODUCTS.map((product) => product.slug))).toBe(true);
    expect(unique(INSIGHTS.map((insight) => insight.slug))).toBe(true);
    expect(unique(AUDIENCES.map((audience) => audience.slug))).toBe(true);
    expect(unique(AUDIENCES.map((audience) => audience.path))).toBe(true);
    expect(unique(PRODUCT_DOCUMENTS.map((document) => document.id))).toBe(true);
    expect(unique(CPD_MODULES.map((module) => module.id))).toBe(true);
    expect(unique(JOBS.map((job) => job.id))).toBe(true);
    expect(unique(LEADERS.map((leader) => leader.id))).toBe(true);
    expect(unique(BDMS.map((bdm) => bdm.id))).toBe(true);
    expect(unique(ANNOUNCEMENTS.map((announcement) => announcement.id))).toBe(true);
    expect(unique(CLIENTS.map((client) => client.id))).toBe(true);
    expect(unique(HOLDINGS.map((holding) => holding.id))).toBe(true);
    expect(unique(TRANSACTIONS.map((transaction) => transaction.id))).toBe(true);
    expect(unique(MODELS.map((model) => model.code))).toBe(true);
    expect(unique(ACCOUNTS.map((account) => account.id))).toBe(true);
    expect(unique(STATEMENTS.map((statement) => statement.id))).toBe(true);
    expect(unique(LEGAL_PAGES.map((page) => page.slug))).toBe(true);
    expect(unique(GROUP_BRANDS.map((brand) => brand.slug))).toBe(true);
    expect(unique(FAQS.map((faq) => faq.id))).toBe(true);
  });
});

describe("referential integrity", () => {
  it("resolves every related product slug", () => {
    const slugs = new Set(PRODUCTS.map((product) => product.slug));
    for (const product of PRODUCTS) {
      for (const related of product.relatedSlugs) {
        expect(slugs.has(related), `${product.slug} references missing product ${related}`).toBe(true);
      }
      expect(product.relatedSlugs).not.toContain(product.slug);
    }
  });

  it("resolves every FAQ id referenced by an audience", () => {
    for (const audience of AUDIENCES) {
      expect(findFaqs(audience.faqIds)).toHaveLength(audience.faqIds.length);
    }
  });

  it("points every product audience at a real audience page", () => {
    const slugs = new Set(AUDIENCES.map((audience) => audience.slug));
    for (const product of PRODUCTS) {
      for (const audience of product.audience) {
        expect(slugs.has(audience)).toBe(true);
      }
    }
  });

  it("attaches every holding, transaction and statement to a real account", () => {
    const ids = new Set(ACCOUNTS.map((account) => account.id));
    for (const holding of HOLDINGS) expect(ids.has(holding.accountId)).toBe(true);
    for (const transaction of TRANSACTIONS) expect(ids.has(transaction.accountId)).toBe(true);
    for (const statement of STATEMENTS) expect(ids.has(statement.accountId)).toBe(true);
  });

  it("matches every managed portfolio holding to a published model", () => {
    const codes = new Set(MODELS.map((model) => model.code));
    for (const holding of HOLDINGS.filter((entry) => entry.kind === "Managed portfolio")) {
      expect(codes.has(holding.code), `no model published for ${holding.code}`).toBe(true);
    }
  });
});

describe("navigation", () => {
  it("uses in-app paths everywhere", () => {
    const links = [
      ...MEGA_MENUS.flatMap((menu) => [
        { to: menu.to },
        ...menu.columns.flatMap((column) => column.links),
        ...(menu.footerLinks ?? []),
        ...(menu.feature ? [{ to: menu.feature.to }] : []),
      ]),
      ...SIMPLE_NAV,
      ...LOGIN_OPTIONS,
      ...FOOTER_COLUMNS.flatMap((column) => column.links),
      ...LEGAL_LINKS,
    ];

    expect(links.length).toBeGreaterThan(30);
    for (const link of links) {
      expect(link.to.startsWith("/"), `${link.to} is not an in-app path`).toBe(true);
    }
  });

  it("exposes one login option per portal", () => {
    expect(LOGIN_OPTIONS.map((option) => option.to)).toEqual([
      "/login?portal=investor",
      "/login?portal=adviser",
      "/login?portal=manager",
    ]);
  });
});

describe("content shape", () => {
  it("gives every insight a body and an excerpt", () => {
    for (const insight of INSIGHTS) {
      expect(insight.body.length).toBeGreaterThanOrEqual(3);
      expect(insight.excerpt.length).toBeGreaterThan(30);
    }
  });

  it("gives every audience the pillars and proof points its page renders", () => {
    for (const audience of AUDIENCES) {
      expect(audience.pillars.length).toBeGreaterThanOrEqual(4);
      expect(audience.proofPoints).toHaveLength(3);
      expect(audience.heroPoints.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("describes the same six investment options on every menu", () => {
    const labels = INVESTMENT_MENUS.map((menu) => menu.options.map((option) => option.label));
    expect(labels[0]).toHaveLength(6);
    for (const set of labels) expect(set).toEqual(labels[0]);
  });

  it("widens investment access from Discover through to Choice", () => {
    const included = INVESTMENT_MENUS.map(
      (menu) => menu.options.filter((option) => option.included).length,
    );
    expect(included[0]!).toBeLessThan(included[1]!);
    expect(included[1]!).toBeLessThan(included[2]!);
  });

  it("gives every platform feature a bullet list", () => {
    for (const feature of PLATFORM_FEATURES) {
      expect(feature.bullets.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("weights every model allocation to 100%", () => {
    for (const model of MODELS) {
      const total = model.allocation.reduce((sum, slice) => sum + slice.weight, 0);
      expect(total, `${model.code} allocation does not total 100`).toBe(100);
    }
  });

  it("keeps at least 25 clients so the book filters are meaningful", () => {
    expect(CLIENTS.length).toBeGreaterThanOrEqual(25);
  });

  it("keeps at least 25 product documents so the library filters are meaningful", () => {
    expect(PRODUCT_DOCUMENTS.length).toBeGreaterThanOrEqual(25);
  });
});

describe("shareholder figures", () => {
  it("reconciles platform and PARS FUA to the total each year", () => {
    for (const year of FINANCIAL_HISTORY) {
      expect(year.platformFua + year.parsFua).toBeCloseTo(year.totalFua, -8);
    }
  });

  it("reports FUA and adviser numbers growing year on year", () => {
    for (let index = 1; index < FINANCIAL_HISTORY.length; index += 1) {
      const previous = FINANCIAL_HISTORY[index - 1]!;
      const current = FINANCIAL_HISTORY[index]!;
      expect(current.totalFua).toBeGreaterThan(previous.totalFua);
      expect(current.advisers).toBeGreaterThan(previous.advisers);
    }
  });

  it("orders announcements newest first", () => {
    const dates = ANNOUNCEMENTS.map((announcement) => announcement.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("records an awarder for every award", () => {
    for (const award of AWARDS) {
      expect(award.awarder.length).toBeGreaterThan(3);
      expect(award.year).toBeGreaterThanOrEqual(2024);
    }
  });
});
