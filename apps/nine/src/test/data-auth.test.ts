import { describe, expect, it } from "vitest";
import { formatRelativeTime, formatLongDate } from "@/lib/format";
import {
  decodeSession,
  encodeSession,
  loginWithCredentials,
  clearSession,
  readSession,
} from "@/lib/auth";
import { getArticle, getByPillar, searchArticles } from "@/data/articles";

describe("formatRelativeTime", () => {
  it("formats recent hours", () => {
    const now = Date.parse("2026-07-16T03:00:00.000Z");
    const iso = new Date(now - 2 * 3_600_000).toISOString();
    expect(formatRelativeTime(iso, now)).toBe("2h ago");
  });

  it("returns NaN hours ago for invalid input", () => {
    expect(formatRelativeTime("16/07/2026")).toBe("NaN hours ago");
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

  it("returns sport newest-first", () => {
    const sport = getByPillar("sport");
    expect(sport.length).toBeGreaterThan(2);
    expect(sport[0]!.publishedAt >= sport[1]!.publishedAt).toBe(true);
    expect(sport[0]!.publishedAt >= sport[sport.length - 1]!.publishedAt).toBe(true);
  });

  it("searches by title", () => {
    expect(searchArticles("Origin").some((a) => a.slug.includes("origin"))).toBe(true);
  });
});
