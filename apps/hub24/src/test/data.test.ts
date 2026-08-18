import { describe, expect, it } from "vitest";
import {
  CLIENTS,
  MANAGED_PORTFOLIOS,
  PENDING_TRADES,
  allocationFor,
  bookValue,
  clientBalance,
  clientById,
  portfolioBySlug,
} from "@/data/adviser";
import { PRODUCT_DOCUMENTS, filterDocuments } from "@/data/documents";
import { INSIGHTS, insightBySlug, insightsByCategory } from "@/data/insights";
import { PRODUCTS, productBySlug, productsByCategory } from "@/data/products";
import { SOLUTIONS, solutionBySlug } from "@/data/solutions";
import { FEATURE_BENEFITS, INVESTMENT_MENUS } from "@/data/features";
import { FOOTER_COLUMNS, MEGA_MENUS } from "@/data/nav";

describe("product catalogue", () => {
  it("has unique slugs", () => {
    const slugs = PRODUCTS.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every related product", () => {
    for (const product of PRODUCTS) {
      for (const slug of product.related) {
        expect(productBySlug(slug), `${product.slug} → ${slug}`).toBeDefined();
      }
    }
  });

  it("never lists itself as related", () => {
    for (const product of PRODUCTS) {
      expect(product.related).not.toContain(product.slug);
    }
  });

  it("filters by category", () => {
    expect(productsByCategory("platform").length).toBeGreaterThan(0);
    expect(productsByCategory("platform").every((product) => product.category === "platform")).toBe(
      true,
    );
  });
});

describe("solutions", () => {
  it("resolves every referenced product", () => {
    for (const solution of SOLUTIONS) {
      for (const slug of solution.products) {
        expect(productBySlug(slug), `${solution.slug} → ${slug}`).toBeDefined();
      }
    }
  });

  it("looks up by slug", () => {
    expect(solutionBySlug("advisers")?.audience).toBe("Advisers");
    expect(solutionBySlug("nope")).toBeUndefined();
  });
});

describe("navigation", () => {
  it("only links to product routes that exist", () => {
    const links = [
      ...MEGA_MENUS.flatMap((menu) => menu.columns.flatMap((column) => column.links)),
      ...FOOTER_COLUMNS.flatMap((column) => column.links),
    ];
    const productLinks = links.filter((link) => link.to.startsWith("/product/"));
    expect(productLinks.length).toBeGreaterThan(0);
    for (const link of productLinks) {
      expect(productBySlug(link.to.replace("/product/", "")), link.to).toBeDefined();
    }
  });

  it("only links to solution routes that exist", () => {
    const links = FOOTER_COLUMNS.flatMap((column) => column.links).filter((link) =>
      link.to.startsWith("/solutions/"),
    );
    for (const link of links) {
      expect(solutionBySlug(link.to.replace("/solutions/", "")), link.to).toBeDefined();
    }
  });
});

describe("features and investment menus", () => {
  it("numbers the ten productivity features sequentially", () => {
    expect(FEATURE_BENEFITS).toHaveLength(10);
    expect(FEATURE_BENEFITS.map((feature) => feature.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("describes all three investment menus", () => {
    expect(INVESTMENT_MENUS.map((menu) => menu.name)).toEqual(["Discover", "Core", "Choice"]);
    expect(INVESTMENT_MENUS[0]?.adminFee).toBe("$0");
  });
});

describe("insights", () => {
  it("returns everything for the All category", () => {
    expect(insightsByCategory("All")).toHaveLength(INSIGHTS.length);
  });

  it("filters by category", () => {
    const releases = insightsByCategory("Media release");
    expect(releases.length).toBeGreaterThan(0);
    expect(releases.every((insight) => insight.category === "Media release")).toBe(true);
  });

  it("looks up by slug", () => {
    expect(insightBySlug("record-net-inflows-fy26")?.category).toBe("Media release");
    expect(insightBySlug("missing")).toBeUndefined();
  });
});

describe("product documents", () => {
  it("returns the full library when unfiltered", () => {
    expect(filterDocuments("All", "All", "")).toHaveLength(PRODUCT_DOCUMENTS.length);
  });

  it("filters by kind and product together", () => {
    const results = filterDocuments("PDS", "HUB24 Super", "");
    expect(results).toHaveLength(1);
    expect(results[0]?.title).toContain("HUB24 Super");
  });

  it("searches case-insensitively", () => {
    expect(filterDocuments("All", "All", "managed portfolios").length).toBeGreaterThan(0);
    expect(filterDocuments("All", "All", "zzzz")).toHaveLength(0);
  });
});

describe("adviser book", () => {
  it("sums account balances per client", () => {
    const client = clientById("cl-10241");
    expect(client).toBeDefined();
    expect(clientBalance(client!)).toBe(
      client!.accounts.reduce((total, account) => total + account.balance, 0),
    );
  });

  it("totals the whole book", () => {
    expect(bookValue()).toBe(CLIENTS.reduce((total, client) => total + clientBalance(client), 0));
  });

  it("aggregates allocation across accounts, largest first", () => {
    const allocation = allocationFor(clientById("cl-10241")!);
    expect(allocation.length).toBeGreaterThan(1);
    const values = allocation.map((entry) => entry.value);
    expect([...values].sort((a, b) => b - a)).toEqual(values);
  });

  it("keeps every pending trade pointed at a real client account", () => {
    const accountIds = new Set(
      CLIENTS.flatMap((client) => client.accounts.map((account) => account.id)),
    );
    for (const trade of PENDING_TRADES) {
      expect(accountIds.has(trade.accountId), trade.id).toBe(true);
    }
  });

  it("keeps managed portfolio allocations at 100%", () => {
    for (const portfolio of MANAGED_PORTFOLIOS) {
      const total = portfolio.allocation.reduce((sum, entry) => sum + entry.weight, 0);
      expect(total, portfolio.slug).toBe(100);
    }
  });

  it("looks up portfolios by slug", () => {
    expect(portfolioBySlug("meridian-growth")?.manager).toBe("Meridian Asset Management");
    expect(portfolioBySlug("nope")).toBeUndefined();
  });
});
