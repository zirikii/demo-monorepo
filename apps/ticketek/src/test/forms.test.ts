import { describe, expect, it } from "vitest";
import { referenceFor, validateForm, type FormContext } from "@/features/assistant/engine/forms";

const ctx: FormContext = {
  facts: { email: "jordan.mitchell@example.com", orderTickets: "4", orderFaceValue: "99.9" },
  vouchers: [{ code: "GV-7F3K-92QD", balance: 75 }],
};

describe("assistant forms", () => {
  it("transfers all tickets or just one", () => {
    const all = validateForm("transfer-tickets", { friendName: "Sam Taylor", friendEmail: "sam@example.com", amount: "All tickets in the order" }, ctx);
    expect(all).toMatchObject({ ok: true, facts: { transferQuantity: "4", transferCount: "4 tickets" } });
    const one = validateForm("transfer-tickets", { friendName: "Sam Taylor", friendEmail: "sam@example.com", amount: "Just 1 ticket" }, ctx);
    expect(one).toMatchObject({ ok: true, facts: { transferQuantity: "1", transferCount: "1 ticket" } });
  });

  it("won't transfer to the fan's own email", () => {
    const result = validateForm("transfer-tickets", { friendName: "Me", friendEmail: "Jordan.Mitchell@example.com", amount: "Just 1 ticket" }, ctx);
    expect(result).toMatchObject({ ok: false, errors: { friendEmail: expect.stringContaining("your own email") } });
  });

  it("caps Marketplace resale at the original price", () => {
    expect(validateForm("resale-price", { price: "120" }, ctx)).toMatchObject({ ok: false, errors: { price: expect.stringContaining("$99.90") } });
    expect(validateForm("resale-price", { price: "0.50" }, ctx)).toMatchObject({ ok: false });
    expect(validateForm("resale-price", { price: "$95" }, ctx)).toMatchObject({ ok: true, facts: { resaleAmount: "95", resalePrice: "$95.00" } });
  });

  it("checks gift vouchers, using the fan's real balance when known", () => {
    expect(validateForm("voucher-balance", { code: "gv 7f3k 92qd" }, ctx)).toMatchObject({ ok: true, facts: { voucherCode: "GV-7F3K-92QD", voucherBalance: "$75.00" } });
    expect(validateForm("voucher-balance", { code: "hello" }, ctx)).toMatchObject({ ok: false });
  });

  it("needs 10 or more for a group booking", () => {
    expect(validateForm("group-enquiry", { event: "MJ The Musical", size: "6", date: "March" }, ctx)).toMatchObject({ ok: false, errors: { size: expect.any(String) } });
    expect(validateForm("group-enquiry", { event: "MJ The Musical", size: "24", date: "March" }, ctx)).toMatchObject({ ok: true, facts: { requestRef: expect.stringMatching(/^GRP-\d{6}$/) } });
  });

  it("requires explicit confirmation to erase data", () => {
    expect(validateForm("data-erasure", { email: "jordan.mitchell@example.com", confirm: "" }, ctx)).toMatchObject({ ok: false, errors: { confirm: "Please confirm" } });
  });

  it("makes stable reference numbers", () => {
    expect(referenceFor("ACC", { a: "1" })).toBe(referenceFor("ACC", { a: "1" }));
    expect(referenceFor("ACC", { a: "1" })).not.toBe(referenceFor("ACC", { a: "2" }));
  });
});
