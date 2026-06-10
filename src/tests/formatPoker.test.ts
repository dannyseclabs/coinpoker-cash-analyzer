import { describe, expect, it } from "vitest";

import {
  formatBBAmount,
  formatBigBlindCount,
  formatCurrency,
  formatMoneyWithBB,
  formatPokerResult,
} from "../lib/formatPoker";

describe("formatPoker", () => {
  it("formats NL2 currency amounts as big blinds", () => {
    expect(formatBBAmount(2, 0.02)).toBe("100 BB");
  });

  it("formats NL5 currency amounts as big blinds", () => {
    expect(formatBBAmount(5, 0.05)).toBe("100 BB");
  });

  it("formats negative amounts as negative big blinds", () => {
    expect(formatBBAmount(-0.37, 0.02)).toBe("-18.5 BB");
  });

  it("formats positive BB results with a sign", () => {
    expect(formatBBAmount(3.32, 0.02, { signed: true })).toBe("+166 BB");
  });

  it("formats negative BB results with a sign", () => {
    expect(formatBBAmount(-0.09, 0.02, { signed: true })).toBe("-4.5 BB");
  });

  it("formats zero BB results without a positive sign", () => {
    expect(formatBBAmount(0, 0.02, { signed: true })).toBe("0 BB");
    expect(formatBigBlindCount(0, { signed: true })).toBe("0 BB");
  });

  it("formats currency with the CoinPoker symbol", () => {
    expect(formatCurrency(-0.37)).toBe("₮-0.37");
  });

  it("formats money with both BB and currency", () => {
    expect(formatMoneyWithBB(0.12, 0.02, { signed: true })).toEqual({
      bb: "+6 BB",
      currency: "₮0.12",
    });
  });

  it("formats poker results with BB first labels and currency second labels", () => {
    expect(formatPokerResult(3.32, 0.02)).toEqual({
      bbLabel: "+166 BB",
      currencyLabel: "₮3.32",
      sign: "positive",
    });
    expect(formatPokerResult(-0.09, 0.02)).toEqual({
      bbLabel: "-4.5 BB",
      currencyLabel: "₮-0.09",
      sign: "negative",
    });
    expect(formatPokerResult(0, 0.02)).toEqual({
      bbLabel: "0 BB",
      currencyLabel: "₮0",
      sign: "neutral",
    });
  });
});
