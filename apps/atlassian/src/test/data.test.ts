import { describe, expect, it } from "vitest";
import { PRODUCT_APPS } from "@/data/apps";
import { COLLECTIONS, getCollection } from "@/data/collections";
import { BOARD_COLUMNS, ISSUES, getIssue, issuesByStatus, replyToRovo } from "@/data/jira";
import { FOOTER_COLUMNS, LOGIN_OPTIONS, MEGA_MENUS } from "@/data/nav";
import { PRICING_PLANS } from "@/data/pricing";
import { PRODUCTS, getProduct } from "@/data/products";
import { getResource } from "@/data/resources";
import { getSolution } from "@/data/solutions";
import { getStory } from "@/data/stories";

describe("product catalogue", () => {
  it("exposes a unique slug for every product", () => {
    const slugs = PRODUCTS.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks a product up by slug", () => {
    expect(getProduct("jira")?.name).toBe("Jira");
    expect(getProduct("nope")).toBeUndefined();
  });

  it("only points related links at products that exist", () => {
    for (const product of PRODUCTS) {
      for (const slug of product.relatedSlugs) {
        expect(getProduct(slug), `${product.slug} → ${slug}`).toBeDefined();
      }
    }
  });
});

describe("pricing", () => {
  it("has exactly one highlighted plan", () => {
    expect(PRICING_PLANS.filter((plan) => plan.highlight)).toHaveLength(1);
  });
});

describe("navigation", () => {
  it("uses absolute in-app paths everywhere", () => {
    const links = [
      ...MEGA_MENUS.flatMap((menu) => menu.columns.flatMap((column) => column.links)),
      ...MEGA_MENUS.flatMap((menu) => menu.footerLinks ?? []),
      ...FOOTER_COLUMNS.flatMap((column) => column.links),
      ...LOGIN_OPTIONS,
    ];
    expect(links.length).toBeGreaterThan(20);
    for (const link of links) {
      expect(link.to.startsWith("/")).toBe(true);
    }
  });

  it("points every /software/{slug} product link at a real product", () => {
    const links = [
      ...MEGA_MENUS.flatMap((menu) => menu.columns.flatMap((column) => column.links)),
      ...MEGA_MENUS.flatMap((menu) => menu.footerLinks ?? []),
      ...FOOTER_COLUMNS.flatMap((column) => column.links),
    ];
    const productLinks = links.filter((link) => /^\/software\/[^/]+$/.test(link.to));
    expect(productLinks.length).toBeGreaterThan(0);
    for (const link of productLinks) {
      const slug = link.to.replace("/software/", "");
      expect(getProduct(slug), link.to).toBeDefined();
    }
  });
});

describe("content collections", () => {
  it("resolves collections by slug", () => {
    expect(getCollection("teamwork")?.name).toBe("Teamwork");
    expect(getCollection("nope")).toBeUndefined();
  });

  it("shows the same apps in includes and tiles", () => {
    for (const collection of COLLECTIONS) {
      const names = collection.productSlugs.map((slug) => getProduct(slug)?.name);
      expect(names).toEqual(collection.includes);
    }
  });

  it("resolves solutions by slug", () => {
    expect(getSolution("software")?.audience).toBe("Developers");
    expect(getSolution("nope")).toBeUndefined();
  });

  it("resolves customer stories by slug", () => {
    expect(getStory("northline-payments")?.company).toBe("Northline Payments");
    expect(getStory("nope")).toBeUndefined();
  });

  it("resolves resources by slug", () => {
    expect(getResource("state-of-teams-2026")?.type).toBe("Report");
    expect(getResource("nope")).toBeUndefined();
  });
});

describe("product workspaces", () => {
  it("registers a unique portal, slug, and path for every app", () => {
    const portals = PRODUCT_APPS.map((app) => app.portal);
    const slugs = PRODUCT_APPS.map((app) => app.slug);
    const paths = PRODUCT_APPS.map((app) => app.path);
    expect(new Set(portals).size).toBe(portals.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe("jira seed data", () => {
  it("gives every work item a unique key", () => {
    const keys = ISSUES.map((issue) => issue.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("looks an issue up case-insensitively", () => {
    expect(getIssue("portal-142")?.key).toBe("PORTAL-142");
    expect(getIssue("nope")).toBeUndefined();
  });

  it("covers every board column", () => {
    const assigned = BOARD_COLUMNS.flatMap((status) => issuesByStatus(status));
    expect(assigned).toHaveLength(ISSUES.length);
    for (const status of BOARD_COLUMNS) {
      expect(issuesByStatus(status).length).toBeGreaterThan(0);
    }
  });

  it("answers a blocker prompt with PORTAL-161", () => {
    expect(replyToRovo("what's blocked?")).toContain("PORTAL-161");
  });

  it("summarises a work item by key", () => {
    expect(replyToRovo("PORTAL-142")).toContain("PORTAL-142");
  });
});
