import { describe, expect, it } from "vitest";
import {
  articles,
  articlesByPillar,
  featuredArticles,
  findArticle,
  searchArticles,
} from "@/data/articles";
import { pillarOrder } from "@/data/pillars";
import { matches } from "@/data/scores";
import { decodeSession, encodeSession, loginWithCredentials, type DemoUser } from "@/lib/auth";
import { timeAgo, readTimeLabel } from "@/lib/format";

describe("article seed data", () => {
  it("ships a large, cross-pillar set", () => {
    expect(articles.length).toBeGreaterThanOrEqual(30);
    expect(featuredArticles().length).toBeGreaterThanOrEqual(6);
  });

  it("has at least four stories in every pillar", () => {
    for (const pillar of pillarOrder) {
      expect(articlesByPillar(pillar).length).toBeGreaterThanOrEqual(4);
    }
  });

  it("uses unique slugs", () => {
    const slugs = new Set(articles.map((a) => a.slug));
    expect(slugs.size).toBe(articles.length);
  });

  it("finds an article by slug", () => {
    const first = articles[0];
    expect(findArticle(first.slug)?.title).toBe(first.title);
    expect(findArticle("does-not-exist")).toBeUndefined();
  });
});

describe("search", () => {
  it("matches on title, tags and category", () => {
    expect(searchArticles("AFL").length).toBeGreaterThan(0);
    expect(searchArticles("")).toHaveLength(0);
    expect(searchArticles("zzzznope")).toHaveLength(0);
  });
});

describe("scores seed", () => {
  it("includes an upcoming fixture with no scores yet", () => {
    const upcoming = matches.find((m) => m.status === "Upcoming");
    expect(upcoming).toBeDefined();
    expect(upcoming?.scores).toBeUndefined();
  });
});

describe("auth", () => {
  it("round-trips a session", () => {
    const user: DemoUser = {
      email: "reader@example.com",
      name: "Reader",
      memberSince: "2025-08-19",
      plan: "Nine+",
    };
    expect(decodeSession(encodeSession(user))).toEqual(user);
    expect(decodeSession(null)).toBeNull();
    expect(decodeSession("not-valid")).toBeNull();
  });

  it("accepts any credentials in demo mode", () => {
    const user = loginWithCredentials("Someone@Example.com ", "whatever");
    expect(user.email).toBe("someone@example.com");
    expect(user.name).toBe("someone");
  });
});

describe("formatters", () => {
  it("formats relative time", () => {
    const now = new Date("2026-07-16T12:00:00+10:00");
    expect(timeAgo("2026-07-16T11:30:00+10:00", now)).toMatch(/30 minutes ago|min/);
    expect(readTimeLabel(4)).toBe("4 min read");
  });
});
