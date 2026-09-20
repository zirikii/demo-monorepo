import { formatCompact, formatDate, formatNumber, readingTime, titleCase } from "@/lib/format";
import { parseFrontmatter } from "@/lib/content";
import { filterJobs } from "@/data/jobs";
import { isActivePath } from "@/data/nav";

describe("formatters", () => {
  it("formats numbers and compact counts", () => {
    expect(formatNumber(190000000)).toBe("190,000,000");
    expect(formatCompact(190000000)).toMatch(/190/);
  });

  it("formats ISO dates in en-GB", () => {
    expect(formatDate("2026-08-12")).toMatch(/Aug 2026/);
  });

  it("estimates reading time", () => {
    expect(readingTime("word ".repeat(180))).toBe("1 min read");
  });

  it("title-cases slugs", () => {
    expect(titleCase("take-home")).toBe("Take Home");
  });
});

describe("content + jobs + nav", () => {
  it("parses markdown frontmatter", () => {
    const doc = parseFrontmatter("---\ntitle: Hello\n---\nBody copy");
    expect(doc.title).toBe("Hello");
    expect(doc.body).toBe("Body copy");
  });

  it("filters careers by location and team", () => {
    const singaporeData = filterJobs("Singapore", "data");
    expect(singaporeData.length).toBeGreaterThan(0);
    expect(singaporeData.every((job) => job.location === "Singapore" && job.team === "data")).toBe(true);
  });

  it("marks nested blog routes as active", () => {
    expect(isActivePath("/blog/courier-is-now-open-source", "/blog")).toBe(true);
    expect(isActivePath("/", "/about")).toBe(false);
  });
});
