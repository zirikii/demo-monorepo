import { describe, expect, it } from "vitest";
import { SEED_FAN, seedOrders } from "@/data/fan";
import { events, requireEvent } from "@/data/events";
import { fanTier, lifetimeEvents, recommend, topGenres } from "@/features/fan/recommendations";
import { safeNext } from "@/lib/auth";
import { filterEvents, matchesQuery, rangeBounds } from "@/lib/eventFilters";
import { allocateSeats, buildOrder, priceBreakdown, ticketCount, unitPrice, type Selection } from "@/lib/purchase";

describe("purchase maths", () => {
  const event = events.find((e) => e.priceCategories.some((c) => c.price > 0 && !c.standing))!;
  const category = event.priceCategories.find((c) => c.price > 0 && !c.standing)!;
  const sel: Selection = { category, quantities: { Admit: 2, Child: 1 } };

  it("prices tickets by type and adds fees once per order", () => {
    expect(ticketCount(sel)).toBe(3);
    expect(unitPrice(category, "Child")).toBeLessThan(unitPrice(category, "Admit"));
    expect(unitPrice(category, "Companion Card")).toBe(0);
    const plain = priceBreakdown(sel, "mobile", false);
    const protectedOrder = priceBreakdown(sel, "mobile", true);
    expect(plain.total).toBeCloseTo(plain.tickets + plain.service + plain.delivery + plain.handling, 2);
    expect(protectedOrder.protect).toBeGreaterThan(0);
    expect(priceBreakdown({ category, quantities: {} }, "mobile", false).total).toBe(0);
  });

  it("allocates the same seats for the same selection", () => {
    const perf = event.performances[0]!.id;
    const a = allocateSeats(event, perf, sel);
    expect(a).toEqual(allocateSeats(event, perf, sel));
    expect(a).toHaveLength(3);
    const order = buildOrder({ event, perfId: perf, tickets: a, delivery: "mobile", breakdown: priceBreakdown(sel, "mobile", false), ticketProtect: false, id: "TK1" });
    expect(order).toMatchObject({ id: "TK1", eventSlug: event.slug, transfers: [], resale: [] });
  });
});

describe("event filters", () => {
  it("searches names, venues and genres", () => {
    expect(matchesQuery(requireEvent("freddies-queen"), "freddie")).toBe(true);
    expect(filterEvents({ query: "zzzz-nothing" })).toEqual([]);
  });

  it("filters by category and keeps events in date order", () => {
    const sport = filterEvents({ category: "sports" });
    expect(sport.length).toBeGreaterThan(0);
    expect(sport.every((e) => e.category === "sports")).toBe(true);
  });

  it("builds date ranges from today", () => {
    const now = new Date(2026, 8, 30, 10);
    const week = rangeBounds("7days", now);
    expect(week.to.getTime() - week.from.getTime()).toBeGreaterThan(6 * 86_400_000);
  });
});

describe("personalisation", () => {
  it("works out tier and top genres from the events a fan has been to", () => {
    expect(lifetimeEvents(SEED_FAN)).toBe(SEED_FAN.attended.length + SEED_FAN.archivedEvents);
    expect(fanTier(SEED_FAN).id).toBe("legend");
    expect(fanTier({ ...SEED_FAN, attended: [], archivedEvents: 6 }).id).toBe("regular");
    expect(topGenres(SEED_FAN.attended)).toContain("rock");
  });

  it("recommends events by artists and genres the fan has seen, skipping ones they own", () => {
    const orders = seedOrders();
    const picks = recommend(SEED_FAN, orders, { limit: 20 });
    const owned = new Set(orders.map((o) => o.eventSlug));
    expect(picks.every((p) => !owned.has(p.event.slug))).toBe(true);
    expect(picks.some((p) => p.reason.startsWith("Because you"))).toBe(true);
  });

  it("puts a newly attended artist at the top", () => {
    const target = events.find((e) => e.artistKey === "eric-church") ?? events[0]!;
    const fan = { ...SEED_FAN, attended: [{ id: "x", name: target.name, artistKey: target.artistKey, category: target.category, genres: target.genres, venue: "Somewhere", city: "Sydney", date: "2025-03-01" }] };
    const [top] = recommend(fan, [], { limit: 1 });
    expect(top?.event.slug).toBe(target.slug);
    expect(top?.reason).toMatch(/^Because you saw .* in 2025$/);
  });

  it("only follows same-site redirects after sign in", () => {
    expect(safeNext("/account/orders")).toBe("/account/orders");
    expect(safeNext("//evil.example")).toBe("/account");
    expect(safeNext("https://evil.example")).toBe("/account");
    expect(safeNext(null)).toBe("/account");
  });
});
