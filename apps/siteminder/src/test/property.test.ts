import { describe, expect, it } from "vitest";
import { seedProperty } from "@/data/property";
import { applyEffect } from "@/features/property/effects";
import {
  categoryStats,
  comparables,
  eventsLine,
  forecast,
  insightLines,
  nextEvent,
  pastEvents,
  upcomingEvents,
} from "@/features/property/insights";
import { overdueDays, parityRows } from "@/features/property/views";
import { toLocalIso } from "@/lib/clock";

const now = new Date(2026, 9, 1, 10);
const seed = () => seedProperty(now);

describe("property effects", () => {
  it("fixes a mapping error and restarts the sync", () => {
    const next = applyEffect(seed(), "fix-mapping", { channelId: "exp" }, now);
    expect(next.channels.find((c) => c.id === "exp")).toMatchObject({
      status: "connected",
      issueRoom: undefined,
      lastSync: toLocalIso(now),
    });
  });

  it("reconnects and resumes channels", () => {
    expect(
      applyEffect(seed(), "reconnect-channel", { channelId: "abnb" }, now).channels.find(
        (c) => c.id === "abnb",
      )?.status,
    ).toBe("connected");
    expect(
      applyEffect(seed(), "resume-channel", { channelId: "trip" }, now).channels.find(
        (c) => c.id === "trip",
      )?.status,
    ).toBe("connected");
  });

  it("closes out the overbooked room on the arrival date, once", () => {
    const once = applyEffect(seed(), "close-out", { bookingId: "BDC-4821937" }, now);
    expect(once.stopSell).toEqual([`DK@${toLocalIso(now).slice(0, 10)}`]);
    expect(once.rateLog[0]?.summary).toContain("Stop sell on Deluxe King");
    expect(applyEffect(once, "close-out", { bookingId: "BDC-4821937" }, now)).toBe(once);
  });

  it("writes bulk rate prices onto the nights the grid shows, and logs the change", () => {
    const start = "2026-10-01";
    const next = applyEffect(
      seed(),
      "bulk-rates",
      {
        rateRoom: "Deluxe King",
        rateChange: "up 10%",
        rateFrom: "Thu 1 Oct",
        rateFromDate: start,
        rateNights: "3 nights",
      },
      now,
    );
    expect(next.property.roomTypes.find((r) => r.name === "Deluxe King")?.rates).toEqual({
      "2026-10-01": 307,
      "2026-10-02": 307,
      "2026-10-03": 307,
    });
    expect(next.property.roomTypes.find((r) => r.name === "Superior Queen")?.rates).toBeUndefined();
    expect(next.rateLog[0]?.summary).toBe(
      "Deluxe King up 10% from Thu 1 Oct for 3 nights (Sophie Tran via Support)",
    );

    const all = applyEffect(
      seed(),
      "bulk-rates",
      { rateRoom: "All rooms", rateChange: "down $20", rateFromDate: start, rateNights: "1 night" },
      now,
    );
    expect(all.property.roomTypes.map((r) => r.rates?.[start])).toEqual([219, 259, 329, 229, 509]);

    const set = applyEffect(
      seed(),
      "bulk-rates",
      {
        rateRoom: "Harbour View King",
        rateChange: "set to $289",
        rateFromDate: start,
        rateNights: "1 night",
      },
      now,
    );
    expect(set.property.roomTypes.find((r) => r.id === "HV")?.rates).toEqual({ [start]: 289 });
    expect(set.property.roomTypes.find((r) => r.id === "DK")?.rates).toBeUndefined();
    expect(set.rateLog[0]?.summary).toContain("Harbour View King set to $289");
  });

  it("stores event pricing against the event and logs it", () => {
    const next = applyEffect(
      seed(),
      "event-plan",
      { eventId: "evt-bledisloe", planUplift: "55", planMinStay: "2" },
      now,
    );
    expect(next.events.find((e) => e.id === "evt-bledisloe")?.plan).toMatchObject({
      upliftPct: 55,
      minStay: 2,
    });
    expect(next.rateLog[0]?.summary).toBe(
      "Event pricing for Wallabies v All Blacks — Bledisloe Cup: +55% on all rooms, 2-night minimum (Sophie Tran via Support)",
    );
  });

  it("pays, extends and splits invoices", () => {
    const state = seed();
    const id = state.invoices[0]!.id;
    expect(applyEffect(state, "pay-invoice", { invoiceId: id }, now).invoices[0]?.status).toBe(
      "paid",
    );
    const extended = applyEffect(state, "extension", { invoiceId: id }, now).invoices[0]!;
    expect(extended.status).toBe("extended");
    expect(new Date(extended.due).getTime() - new Date(state.invoices[0]!.due).getTime()).toBe(
      14 * 86_400_000,
    );
    expect(applyEffect(state, "instalment", { invoiceId: id }, now).invoices[0]?.status).toBe(
      "instalments",
    );
  });

  it("adds demand events from the assistant, ignoring bad dates", () => {
    const values = {
      newEventName: "Fred again..",
      newEventDate: "2026-11-20",
      newEventVenue: "Allianz Stadium",
      newEventCategory: "concert",
      newEventCrowd: "42000",
    };
    const added = applyEffect(seed(), "add-event", values, now).events.at(-1)!;
    expect(added).toMatchObject({
      name: "Fred again..",
      category: "concert",
      attendance: 42_000,
      source: "manual",
      start: "2026-11-20T19:00:00",
    });
    const state = seed();
    expect(applyEffect(state, "add-event", { ...values, newEventDate: "soon" }, now)).toBe(state);
  });

  it("won't invite someone who already has access", () => {
    const state = seed();
    expect(
      applyEffect(state, "add-user", { newUserEmail: "AVA.ROBINSON@harbourlane.com.au" }, now),
    ).toBe(state);
    expect(
      applyEffect(
        state,
        "add-user",
        {
          newUserName: "Alex Chen",
          newUserEmail: "alex@harbourlane.com.au",
          newUserRole: "Revenue",
        },
        now,
      ).team.at(-1),
    ).toMatchObject({
      role: "Revenue",
      lastActive: "Invited",
    });
  });

  it("only switches to a real plan", () => {
    expect(applyEffect(seed(), "change-plan", { newPlan: "groups" }, now).property.plan).toBe(
      "groups",
    );
    expect(applyEffect(seed(), "change-plan", { newPlan: "platinum" }, now).property.plan).toBe(
      "plus",
    );
  });
});

describe("events store insights", () => {
  it("splits upcoming and past events", () => {
    const { events } = seed();
    expect(nextEvent(events, now)?.id).toBe("evt-bledisloe");
    expect(upcomingEvents(events, now).every((e) => !e.outcome)).toBe(true);
    expect(pastEvents(events)[0]?.id).toBe("evt-mardi-gras-2026");
    expect(eventsLine(events)).toBe("10 past events in your demand history");
  });

  it("compares an event with the most similar past events", () => {
    const { events } = seed();
    const bledisloe = events.find((e) => e.id === "evt-bledisloe")!;
    expect(comparables(bledisloe, events).map((e) => e.id)).toEqual([
      "evt-nrl-gf-2025",
      "evt-lions-2025",
    ]);
    const neon = events.find((e) => e.id === "evt-neon-harbour")!;
    expect(comparables(neon, events).every((e) => e.category === "concert")).toBe(true);
  });

  it("re-plans when the history changes", () => {
    const { events } = seed();
    const bledisloe = events.find((e) => e.id === "evt-bledisloe")!;
    expect(forecast(bledisloe, events, now)).toMatchObject({
      upliftPct: 55,
      minStay: 2,
      daysOut: 5,
    });
    const withoutGrandFinal = events.filter((e) => e.id !== "evt-nrl-gf-2025");
    expect(forecast(bledisloe, withoutGrandFinal, now)).toMatchObject({
      upliftPct: 60,
      minStay: 2,
    });
    expect(forecast(bledisloe, upcomingEvents(events, now), now).advice).toContain(
      "no comparable event",
    );
  });

  it("turns the history into lessons, including pricing too late", () => {
    const { events } = seed();
    const lines = insightLines(events);
    expect(lines[0]).toMatch(/^Holiday events sell out about 64 days out/);
    expect(lines[1]).toContain("Taylor Swift | The Eras Tour rates went up too late");
    expect(categoryStats(events).find((s) => s.category === "concert")).toMatchObject({
      count: 3,
      occupancy: 98,
    });
  });
});

describe("account views", () => {
  it("counts days overdue only for unpaid invoices", () => {
    const invoice = {
      ...seed().invoices[0]!,
      due: toLocalIso(new Date(now.getTime() - 20 * 86_400_000)),
    };
    expect(overdueDays(invoice, now)).toBe(20);
    expect(overdueDays({ ...invoice, status: "paid" }, now)).toBe(0);
  });

  it("compares channel rates with the booking engine", () => {
    const { rows } = parityRows(seed());
    expect(rows.find((r) => r.channelId === "direct")?.diffPct).toBe(0);
    expect(rows.some((r) => r.diffPct < 0)).toBe(true);
  });
});
