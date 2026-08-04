import { describe, expect, it } from "vitest";
import { applyTransfer, type BankingState } from "@/hooks/useBanking";
import { seedAccounts, seedCards, seedTransactions } from "@/data/netbank";

function draft(): BankingState {
  return {
    accounts: seedAccounts.map((account) => ({ ...account })),
    transactions: [...seedTransactions],
    cards: seedCards.map((card) => ({ ...card })),
  };
}

describe("applyTransfer", () => {
  it("moves money between two deposit accounts and records both legs", () => {
    const state = draft();
    const before = state.transactions.length;

    const result = applyTransfer(state, {
      fromId: "smart-access",
      toId: "netbank-saver",
      amount: 250,
      description: "Savings top-up",
    });

    expect(result.ok).toBe(true);

    const from = state.accounts.find((account) => account.id === "smart-access")!;
    const to = state.accounts.find((account) => account.id === "netbank-saver")!;

    expect(from.balance).toBeCloseTo(4218.63 - 250, 5);
    expect(from.available).toBeCloseTo(from.balance, 5);
    expect(to.balance).toBeCloseTo(18450.2 + 250, 5);
    expect(state.transactions).toHaveLength(before + 2);
    expect(state.transactions[0]?.description).toBe("Savings top-up");
    expect(state.transactions[0]?.amount).toBe(-250);
    expect(state.transactions[1]?.amount).toBe(250);
  });

  it("derives available balance from the limit when paying down a credit card", () => {
    const state = draft();

    const result = applyTransfer(state, {
      fromId: "smart-access",
      toId: "awards-card",
      amount: 284.55,
      description: "",
    });

    expect(result.ok).toBe(true);
    const card = state.accounts.find((account) => account.id === "awards-card")!;
    expect(card.balance).toBeCloseTo(-1000, 5);
    expect(card.available).toBeCloseTo(9000, 5);
  });

  it("falls back to a generated description when none is given", () => {
    const state = draft();
    applyTransfer(state, {
      fromId: "smart-access",
      toId: "goalsaver",
      amount: 10,
      description: "",
    });
    expect(state.transactions[0]?.description).toBe("Transfer to GoalSaver — House deposit");
  });

  it("rejects a transfer larger than the available balance", () => {
    const state = draft();
    const result = applyTransfer(state, {
      fromId: "smart-access",
      toId: "netbank-saver",
      amount: 999999,
      description: "",
    });

    expect(result).toEqual({
      ok: false,
      error: "There isn't enough available balance in that account.",
    });
    expect(state.accounts.find((account) => account.id === "smart-access")!.balance).toBe(4218.63);
  });

  it("rejects a zero or negative amount", () => {
    const state = draft();
    expect(
      applyTransfer(state, {
        fromId: "smart-access",
        toId: "goalsaver",
        amount: 0,
        description: "",
      }),
    ).toEqual({ ok: false, error: "Enter an amount greater than $0." });
    expect(
      applyTransfer(state, {
        fromId: "smart-access",
        toId: "goalsaver",
        amount: -5,
        description: "",
      }),
    ).toEqual({ ok: false, error: "Enter an amount greater than $0." });
  });

  it("rejects a transfer to the same account", () => {
    const state = draft();
    expect(
      applyTransfer(state, {
        fromId: "smart-access",
        toId: "smart-access",
        amount: 10,
        description: "",
      }),
    ).toEqual({ ok: false, error: "Choose two different accounts." });
  });

  it("rejects transferring out of superannuation", () => {
    const state = draft();
    expect(
      applyTransfer(state, {
        fromId: "essential-super",
        toId: "smart-access",
        amount: 10,
        description: "",
      }),
    ).toEqual({ ok: false, error: "You can't transfer out of super." });
  });

  it("rejects an unknown account", () => {
    const state = draft();
    expect(
      applyTransfer(state, { fromId: "smart-access", toId: "nope", amount: 10, description: "" }),
    ).toEqual({ ok: false, error: "Select both a from and a to account." });
  });
});
