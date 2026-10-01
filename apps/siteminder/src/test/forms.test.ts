import { describe, expect, it } from "vitest";
import { describeRateChange, optionsFor, referenceFor, validateForm, forms, type FormContext } from "@/features/assistant/engine/forms";

const ctx: FormContext = {
  facts: { channelName: "Airbnb", eventName: "Bledisloe Cup", pms: "Mews" },
  rooms: ["Superior Queen", "Deluxe King"],
  teamEmails: ["ava.robinson@harbourlane.com.au"],
  today: "2026-10-01",
};

describe("assistant forms", () => {
  it("reconnects a channel only after it's re-authorised", () => {
    expect(validateForm("channel-credentials", { listingId: "4482917", confirm: "" }, ctx)).toMatchObject({ ok: false, errors: { confirm: expect.stringContaining("Re-authorise") } });
    expect(validateForm("channel-credentials", { listingId: "12", confirm: "Yes, I've re-authorised SiteMinder" }, ctx)).toMatchObject({ ok: false, errors: { listingId: expect.any(String) } });
    expect(validateForm("channel-credentials", { listingId: "4482917", confirm: "Yes, I've re-authorised SiteMinder" }, ctx)).toMatchObject({
      ok: true,
      facts: { credListingId: "4482917" },
      summary: expect.stringContaining("in Airbnb"),
    });
  });

  it("reads rate changes the way a revenue manager types them", () => {
    expect(describeRateChange("+10%")).toBe("up 10%");
    expect(describeRateChange("-$20")).toBe("down $20");
    expect(describeRateChange("$289")).toBe("set to $289");
    expect(describeRateChange("15%")).toBe("up 15%");
    expect(describeRateChange("$10%")).toBeNull();
    expect(describeRateChange("+95%")).toBeNull();
    expect(describeRateChange("lots")).toBeNull();
  });

  it("checks bulk rate updates and offers the property's own rooms", () => {
    expect(optionsFor(forms["bulk-rates"].fields[0]!, ctx)).toEqual(["All rooms", "Superior Queen", "Deluxe King"]);
    expect(validateForm("bulk-rates", { room: "Deluxe King", change: "lots", from: "2026-10-02", nights: "7 nights" }, ctx)).toMatchObject({ ok: false, errors: { change: expect.any(String) } });
    expect(validateForm("bulk-rates", { room: "Deluxe King", change: "+10%", from: "2026-09-01", nights: "7 nights" }, ctx)).toMatchObject({ ok: false, errors: { from: expect.any(String) } });
    expect(validateForm("bulk-rates", { room: "Deluxe King", change: "+10%", from: "2026-10-02", nights: "7 nights" }, ctx)).toMatchObject({
      ok: true,
      facts: { rateRoom: "Deluxe King", rateChange: "up 10%", rateRef: expect.stringMatching(/^RC-\d{6}$/) },
    });
  });

  it("keeps event pricing within sensible bounds", () => {
    expect(validateForm("event-pricing", { uplift: "0", minStay: "2" }, ctx)).toMatchObject({ ok: false });
    expect(validateForm("event-pricing", { uplift: "90", minStay: "2" }, ctx)).toMatchObject({ ok: false });
    expect(validateForm("event-pricing", { uplift: "55", minStay: "2" }, ctx)).toMatchObject({
      ok: true,
      facts: { planUplift: "55", planUpliftLabel: "55%", planMinStayLabel: "2-night" },
      summary: "Apply +55% with a 2-night minimum for Bledisloe Cup",
    });
  });

  it("only adds future events", () => {
    const event = { name: "Fred again..", date: "2026-11-20", venue: "Allianz Stadium", category: "Concert", crowd: "42000" };
    expect(validateForm("add-event", { ...event, date: "2026-09-20" }, ctx)).toMatchObject({ ok: false, errors: { date: expect.stringContaining("future") } });
    expect(validateForm("add-event", event, ctx)).toMatchObject({ ok: true, facts: { newEventCategory: "concert", newEventDate: "2026-11-20" } });
  });

  it("won't invite someone who already has access", () => {
    expect(validateForm("add-user", { name: "Ava", email: "Ava.Robinson@harbourlane.com.au", role: "Admin" }, ctx)).toMatchObject({ ok: false, errors: { email: "That person already has access" } });
    expect(validateForm("add-user", { name: "Alex Chen", email: "alex@harbourlane.com.au", role: "Revenue" }, ctx)).toMatchObject({ ok: true });
  });

  it("formats ABNs and rejects bad ones", () => {
    expect(validateForm("billing-details", { email: "accounts@harbourlane.com.au", abn: "41612908335" }, ctx)).toMatchObject({ ok: true, facts: { billingAbn: "41 612 908 335" } });
    expect(validateForm("billing-details", { email: "accounts@harbourlane.com.au", abn: "1234" }, ctx)).toMatchObject({ ok: false, errors: { abn: "ABNs are 11 digits" } });
  });

  it("won't switch to the PMS the property already uses", () => {
    expect(validateForm("switch-pms", { pms: "Mews", when: "Next week" }, ctx)).toMatchObject({ ok: false, errors: { pms: "You're already on Mews" } });
    expect(validateForm("switch-pms", { pms: "Cloudbeds", when: "Next week" }, ctx)).toMatchObject({ ok: true, facts: { newPms: "Cloudbeds", pmsGoLive: "next week" } });
  });

  it("needs an Australian number for a callback", () => {
    expect(validateForm("growth-callback", { product: "Demand Plus", phone: "12345", time: "This afternoon" }, ctx)).toMatchObject({ ok: false });
    expect(validateForm("growth-callback", { product: "Not sure yet", phone: "0412 555 019", time: "This afternoon" }, ctx)).toMatchObject({
      ok: true,
      facts: { growthProduct: "growing revenue", callbackTime: "this afternoon" },
    });
  });

  it("makes stable reference numbers", () => {
    expect(referenceFor("ONB", { a: "1" })).toBe(referenceFor("ONB", { a: "1" }));
    expect(referenceFor("ONB", { a: "1" })).not.toBe(referenceFor("ONB", { a: "2" }));
  });
});
