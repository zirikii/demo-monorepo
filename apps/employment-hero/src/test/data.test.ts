import { describe, expect, it } from "vitest";
import { getArticle, articles } from "@/data/articles";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { getIndustry, industries, getSolution, solutions } from "@/data/industries";
import { getJob, jobs } from "@/data/jobs";
import { getProduct, products } from "@/data/products";
import { planFamilies } from "@/data/pricing";
import { footerGroups, loginOptions, navAudiences } from "@/data/nav";
import { searchSite } from "@/lib/search";

/**
 * Every internal link in the header and footer has to resolve to a route App.tsx declares.
 * These patterns mirror that route table; a link added to the nav without a matching route
 * would otherwise only surface as a 404 during manual clicking.
 */
const routePatterns: RegExp[] = [
  /^\/$/,
  /^\/products$/,
  /^\/products\/[a-z-]+$/,
  /^\/products\/swag-spend-account\/earned-wage-access$/,
  /^\/solutions$/,
  /^\/solutions\/[a-z-]+$/,
  /^\/industry$/,
  /^\/industry\/[a-z-]+$/,
  /^\/pricing$/,
  /^\/integrations$/,
  /^\/ai$/,
  /^\/work$/,
  /^\/jobs$/,
  /^\/jobs\/[a-z-]+$/,
  /^\/resources$/,
  /^\/resources\/[a-z-]+$/,
  /^\/blog$/,
  /^\/blog\/[a-z-]+$/,
  /^\/compliance-corner$/,
  /^\/news$/,
  /^\/webinars$/,
  /^\/case-studies$/,
  /^\/case-studies\/[a-z-]+$/,
  /^\/partner-network$/,
  /^\/partner-network\/[a-z-]+$/,
  /^\/partner-directory$/,
  /^\/about-us$/,
  /^\/careers$/,
  /^\/hero-foundation$/,
  /^\/media-centre$/,
  /^\/contact$/,
  /^\/request-a-demo$/,
  /^\/support$/,
  /^\/implementation-hub$/,
  /^\/legals\/(privacy|terms)$/,
  /^\/accessibility$/,
  /^\/search$/,
  /^\/login(\?.*)?$/,
  /^\/start-free$/,
];

function isRoutable(to: string): boolean {
  return routePatterns.some((pattern) => pattern.test(to));
}

describe("navigation data", () => {
  const navLinks = navAudiences.flatMap((audience) => [
    audience.cta.to,
    audience.featured.to,
    ...audience.columns.flatMap((column) => column.links.map((link) => link.to)),
  ]);
  const footerLinks = footerGroups.flatMap((group) => group.links.map((link) => link.to));
  const allLinks = [...navLinks, ...footerLinks, ...loginOptions.map((option) => option.to)];

  it.each(allLinks)("%s resolves to a declared route", (to) => {
    expect(isRoutable(to)).toBe(true);
  });

  it("offers the four audience mega-menus", () => {
    expect(navAudiences.map((audience) => audience.id)).toEqual([
      "businesses",
      "partners",
      "employees",
      "job-seekers",
    ]);
  });

  it("points every log-in option at a lower-case portal query value", () => {
    expect(loginOptions.map((option) => option.to)).toEqual([
      "/login?portal=employer",
      "/login?portal=employee",
      "/login?portal=payroll",
    ]);
  });
});

describe("content fixtures", () => {
  it("has a unique slug for every product, article, case study and job", () => {
    const slugs = [
      ...products.map((item) => `product:${item.slug}`),
      ...articles.map((item) => `article:${item.slug}`),
      ...caseStudies.map((item) => `case:${item.slug}`),
      ...jobs.map((item) => `job:${item.slug}`),
      ...industries.map((item) => `industry:${item.slug}`),
      ...solutions.map((item) => `solution:${item.slug}`),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks up each fixture type by slug", () => {
    expect(getProduct("payroll-software")?.name).toBe("Payroll");
    expect(getArticle("payday-super-employer-guide")?.category).toBe("Payroll & Compliance");
    expect(getCaseStudy("el-jannah")?.industry).toBe("Hospitality");
    expect(getJob("payroll-officer-brightpath-sydney")?.workType).toBe("Full time");
    expect(getIndustry("hospitality")?.name).toBe("Hospitality");
    expect(getSolution("onboarding-software")?.name).toBe("Onboarding software");
  });

  it("returns undefined for a slug that does not exist", () => {
    expect(getProduct("does-not-exist")).toBeUndefined();
    expect(getCaseStudy("does-not-exist")).toBeUndefined();
  });

  it("only references products that exist from solutions and case studies", () => {
    const referenced = [
      ...solutions.flatMap((solution) => solution.relatedProducts),
      ...caseStudies.flatMap((study) => study.products),
    ];
    for (const slug of referenced) {
      expect(getProduct(slug), `${slug} should be a real product`).toBeDefined();
    }
  });

  it("marks exactly one plan as most popular in each family", () => {
    for (const family of planFamilies) {
      const highlighted = family.plans.filter((plan) => plan.highlighted);
      expect(highlighted, `${family.label} should highlight one plan`).toHaveLength(1);
    }
  });
});

describe("site search", () => {
  it("returns nothing for an empty query", () => {
    expect(searchSite("   ")).toEqual([]);
  });

  it("finds a product by name", () => {
    const results = searchSite("payroll");
    expect(results.some((result) => result.to === "/products/payroll-software")).toBe(true);
  });

  it("matches on every word in the query, not just one", () => {
    expect(searchSite("hospitality el jannah").map((result) => result.to)).toContain(
      "/case-studies/el-jannah",
    );
    expect(searchSite("payroll zzzzz")).toEqual([]);
  });

  it("is case insensitive", () => {
    expect(searchSite("SMARTMATCH").length).toBeGreaterThan(0);
  });
});
