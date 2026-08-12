import { describe, expect, it } from "vitest";
import { BLOG_CATEGORIES, BLOG_POSTS, getPost } from "@/data/blog";
import { CASE_STUDIES, getCaseStudy } from "@/data/caseStudies";
import { JOB_CATEGORIES, JOB_LISTINGS, getJob } from "@/data/jobs";
import { FOOTER_COLUMNS, LOGIN_OPTIONS, MEGA_MENUS } from "@/data/nav";
import { PRICING_ADD_ONS, PRICING_PLANS } from "@/data/pricing";
import { PRODUCTS, getProduct, productsByCategory } from "@/data/products";
import { EMPLOYEES, LEAVE_REQUESTS, PAY_RUNS, getEmployee } from "@/data/platform";
import { BUSINESS_SIZES, INDUSTRIES, getBusinessSize, getIndustry } from "@/data/solutions";

describe("product catalogue", () => {
  it("exposes a unique slug for every product", () => {
    const slugs = PRODUCTS.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks a product up by slug", () => {
    expect(getProduct("payroll-software")?.name).toBe("Payroll software");
    expect(getProduct("nope")).toBeUndefined();
  });

  it("filters by category", () => {
    const hiring = productsByCategory("Hiring");
    expect(hiring.length).toBeGreaterThan(0);
    expect(hiring.every((product) => product.category === "Hiring")).toBe(true);
  });

  it("only points related links at products that exist", () => {
    const slugs = new Set(PRODUCTS.map((product) => product.slug));
    for (const product of PRODUCTS) {
      for (const related of product.relatedSlugs) {
        expect(slugs.has(related)).toBe(true);
      }
    }
  });
});

describe("pricing", () => {
  it("has exactly one highlighted plan", () => {
    expect(PRICING_PLANS.filter((plan) => plan.highlight)).toHaveLength(1);
  });

  it("gives every add-on a price and a minimum", () => {
    for (const addOn of PRICING_ADD_ONS) {
      expect(addOn.price).toMatch(/^\$\d+$/);
      expect(addOn.minimum).toContain("minimum");
    }
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
    expect(links.length).toBeGreaterThan(30);
    for (const link of links) {
      expect(link.to.startsWith("/")).toBe(true);
    }
  });

  it("points every product menu link at a real product page", () => {
    const productLinks = MEGA_MENUS[0]!.columns.flatMap((column) => column.links).filter((link) =>
      link.to.startsWith("/products/"),
    );
    const slugs = new Set(PRODUCTS.map((product) => product.slug));
    for (const link of productLinks) {
      expect(slugs.has(link.to.replace("/products/", ""))).toBe(true);
    }
  });
});

describe("content collections", () => {
  it("resolves blog posts by slug and lists their categories", () => {
    expect(getPost(BLOG_POSTS[0]!.slug)?.title).toBe(BLOG_POSTS[0]!.title);
    expect(BLOG_CATEGORIES.length).toBeGreaterThan(1);
  });

  it("resolves case studies and links only to real products", () => {
    const slugs = new Set(PRODUCTS.map((product) => product.slug));
    for (const study of CASE_STUDIES) {
      expect(getCaseStudy(study.slug)).toBe(study);
      expect(study.results).toHaveLength(3);
      for (const productSlug of study.products) {
        expect(slugs.has(productSlug)).toBe(true);
      }
    }
  });

  it("resolves jobs and derives categories from the listings", () => {
    expect(getJob(JOB_LISTINGS[0]!.id)).toBe(JOB_LISTINGS[0]);
    expect(JOB_CATEGORIES).toContain("Hospitality");
  });

  it("resolves industries and business sizes", () => {
    expect(getIndustry(INDUSTRIES[0]!.slug)).toBe(INDUSTRIES[0]);
    expect(getBusinessSize(BUSINESS_SIZES[0]!.slug)).toBe(BUSINESS_SIZES[0]);
    expect(getIndustry("mining")).toBeUndefined();
  });
});

describe("platform seed data", () => {
  it("gives every employee a unique id and a manager", () => {
    const ids = EMPLOYEES.map((employee) => employee.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(EMPLOYEES.every((employee) => employee.manager.length > 0)).toBe(true);
  });

  it("resolves an employee by id", () => {
    expect(getEmployee("emp-001")?.name).toBe("Sam Okafor");
    expect(getEmployee("emp-999")).toBeUndefined();
  });

  it("keeps pay run totals internally consistent", () => {
    for (const run of PAY_RUNS) {
      expect(Math.abs(run.gross - run.tax - run.net)).toBeLessThan(1);
    }
  });

  it("orders the draft pay run first", () => {
    expect(PAY_RUNS[0]!.status).toBe("Draft");
  });

  it("records a note against every leave request", () => {
    expect(LEAVE_REQUESTS.every((request) => request.note.length > 10)).toBe(true);
  });
});
