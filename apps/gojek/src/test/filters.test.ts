import { describe, expect, it } from "vitest";
import { JOBS, findJob } from "@/data/jobs";
import { POSTS, findPost } from "@/data/posts";
import { PRODUCTS, findProduct, productsByCategory } from "@/data/products";
import {
  JOBS_PER_PAGE,
  countByTeam,
  filterJobs,
  pageCount,
  paginate,
  relatedJobs,
  sortJobsByRecency,
} from "@/lib/jobs";
import { allTags, filterPosts, latestPosts, relatedPosts, sortPostsByDate } from "@/lib/posts";

describe("filterJobs", () => {
  it("returns everything with no filters", () => {
    expect(filterJobs({})).toHaveLength(JOBS.length);
  });

  it("matches on title, stack, and summary text", () => {
    const byStack = filterJobs({ query: "kotlin" });
    expect(byStack.length).toBeGreaterThan(0);
    expect(byStack.every((job) => JSON.stringify(job).toLowerCase().includes("kotlin"))).toBe(true);
  });

  it("narrows by team, location, and type together", () => {
    const results = filterJobs({ team: "Design", type: "Internship" });
    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe("product-designer-intern");
  });

  it("returns nothing for a combination no role satisfies", () => {
    expect(filterJobs({ team: "Security", location: "Yogyakarta" })).toHaveLength(0);
  });
});

describe("sortJobsByRecency", () => {
  it("puts the newest posting first without mutating the input", () => {
    const input = [...JOBS];
    const sorted = sortJobsByRecency(input);
    expect(sorted[0]?.postedOn).toBe("2026-09-08");
    expect(input).toEqual(JOBS);
  });
});

describe("pagination", () => {
  it("reports at least one page even when empty", () => {
    expect(pageCount(0)).toBe(1);
  });

  it("splits jobs into pages of the configured size", () => {
    expect(paginate(JOBS, 1)).toHaveLength(JOBS_PER_PAGE);
    expect(pageCount(JOBS.length)).toBe(Math.ceil(JOBS.length / JOBS_PER_PAGE));
  });

  it("clamps an out-of-range page to the last one", () => {
    const last = paginate(JOBS, 99);
    expect(last.length).toBeGreaterThan(0);
    expect(last.at(-1)).toEqual(JOBS.at(-1));
  });
});

describe("countByTeam", () => {
  it("counts every role exactly once", () => {
    const counts = countByTeam();
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    expect(total).toBe(JOBS.length);
  });
});

describe("relatedJobs", () => {
  it("suggests roles sharing a team or stack, never the role itself", () => {
    const job = findJob("senior-backend-engineer-allocation");
    expect(job).toBeDefined();
    const related = relatedJobs(job!);
    expect(related.length).toBeGreaterThan(0);
    expect(related.some((entry) => entry.slug === job!.slug)).toBe(false);
  });
});

describe("filterPosts", () => {
  it("narrows by category", () => {
    const engineering = filterPosts({ category: "Engineering" });
    expect(engineering.every((post) => post.category === "Engineering")).toBe(true);
  });

  it("matches on tag and free text", () => {
    expect(filterPosts({ tag: "payments" }).length).toBeGreaterThan(0);
    expect(filterPosts({ query: "ledger" }).length).toBeGreaterThan(0);
    expect(filterPosts({ query: "zzzz" })).toHaveLength(0);
  });
});

describe("post helpers", () => {
  it("sorts newest first", () => {
    const sorted = sortPostsByDate(POSTS);
    expect(sorted[0]?.publishedOn).toBe("2026-08-18");
  });

  it("returns the requested number of latest posts", () => {
    expect(latestPosts(3)).toHaveLength(3);
  });

  it("collects a sorted, de-duplicated tag list", () => {
    const tags = allTags();
    expect(new Set(tags).size).toBe(tags.length);
    expect([...tags].sort((a, b) => a.localeCompare(b))).toEqual(tags);
  });

  it("relates posts by category and tag overlap", () => {
    const post = findPost("ledger-that-never-lies");
    expect(post).toBeDefined();
    const related = relatedPosts(post!);
    expect(related.some((entry) => entry.slug === post!.slug)).toBe(false);
  });
});

describe("product data", () => {
  it("assigns every product to a known category", () => {
    const categories = new Set(PRODUCTS.map((product) => product.category));
    for (const category of categories) {
      expect(productsByCategory(category).length).toBeGreaterThan(0);
    }
  });

  it("keeps slugs unique and resolvable", () => {
    const slugs = PRODUCTS.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(findProduct("gofood")?.name).toBe("GoFood");
    expect(findProduct("nope")).toBeUndefined();
  });
});
