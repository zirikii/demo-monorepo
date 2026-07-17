import { describe, expect, it } from "vitest";
import { formatRelativeTime, formatLongDate } from "@/lib/format";
import {
  decodeSession,
  encodeSession,
  loginWithCredentials,
  clearSession,
  readSession,
} from "@/lib/auth";
import {
  getArticle,
  getByPillar,
  getSportArticlesBuggyLatest,
  searchArticles,
} from "@/data/articles";

describe("formatRelativeTime", () => {
  it("formats recent hours", () => {
    const now = Date.parse("2026-07-16T03:00:00.000Z");
    const iso = new Date(now - 2 * 3_600_000).toISOString();
    expect(formatRelativeTime(iso, now)).toBe("2h ago");
  });

  it("returns an invalid date label for invalid input", () => {
    expect(formatRelativeTime("16/07/2026")).toBe("Invalid date");
  });
});

describe("formatLongDate", () => {
  it("formats ISO dates for en-AU", () => {
    expect(formatLongDate("2026-07-16T01:00:00.000Z")).toMatch(/2026/);
  });
});

describe("auth session", () => {
  it("round-trips encode/decode", () => {
    const user = {
      email: "reader@example.com",
      name: "Reader",
      memberSince: "2025-06-01",
      savedCount: 3,
    };
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("login writes session", () => {
    clearSession();
    const user = loginWithCredentials("demo@nine.test", "x", "Demo");
    expect(user.email).toBe("demo@nine.test");
    expect(readSession()?.name).toBe("Demo");
    clearSession();
  });
});

describe("articles data", () => {
  it("resolves known slug", () => {
    expect(getArticle("state-of-origin-blues-boilover")?.pillar).toBe("sport");
  });

  it("returns news newest-first", () => {
    const news = getByPillar("news");
    expect(news.length).toBeGreaterThan(2);
    expect(news[0].publishedAt >= news[1].publishedAt).toBe(true);
  });

  it("documents intentional Sport Latest bug (oldest first)", () => {
    const buggy = getSportArticlesBuggyLatest();
    const correct = getByPillar("sport");
    expect(buggy.length).toBe(correct.length);
    expect(buggy[0].slug).not.toBe(correct[0].slug);
    expect(buggy[0].publishedAt <= buggy[buggy.length - 1].publishedAt).toBe(true);
  });

  it("searches by title", () => {
    expect(searchArticles("Origin").some((a) => a.slug.includes("origin"))).toBe(true);
  });
});
