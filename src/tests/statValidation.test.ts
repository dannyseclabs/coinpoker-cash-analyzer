import { describe, expect, it } from "vitest";

import { getStatValidationWarnings } from "../lib/stats/statValidation";
import type { PokerPosition, PositionStats, StatisticsResult } from "../types";

const POSITIONS: readonly PokerPosition[] = ["UTG", "HJ", "CO", "BTN", "SB", "BB", "UNKNOWN"];

function createPositionStats(position: PokerPosition): PositionStats {
  return {
    position,
    handsPlayed: 0,
    totalProfit: 0,
    totalBigBlindsWon: 0,
    bbPer100: 0,
    vpip: 0,
    pfr: 0,
    wtsd: 0,
    wsd: 0,
  };
}

function createStats(overrides: Partial<StatisticsResult> = {}): StatisticsResult {
  return {
    handsPlayed: 500,
    totalProfit: 0,
    totalBigBlindsWon: 0,
    bbPer100: 0,
    vpip: 24,
    pfr: 19,
    threeBet: 7,
    foldToThreeBet: 45,
    limp: 2,
    cBetFlop: 55,
    foldToCBetFlop: 45,
    wtsd: 28,
    wsd: 52,
    positionStats: Object.fromEntries(
      POSITIONS.map((position) => [position, createPositionStats(position)]),
    ) as Readonly<Record<PokerPosition, PositionStats>>,
    sampleSizes: {
      hands: 500,
      threeBetOpportunities: 50,
      foldToThreeBetOpportunities: 30,
      cBetFlopOpportunities: 60,
      foldToCBetFlopOpportunities: 40,
      sawFlop: 180,
      wentToShowdown: 50,
    },
    ...overrides,
  };
}

describe("statValidation", () => {
  it("returns no warnings for ordinary tracker values", () => {
    expect(getStatValidationWarnings(createStats())).toEqual([]);
  });

  it("flags statistically suspicious showdown and preflop values", () => {
    const warnings = getStatValidationWarnings(
      createStats({
        vpip: 35,
        pfr: 20,
        wtsd: 51,
        wsd: 71,
      }),
    );

    expect(warnings.map((warning) => warning.id)).toEqual(
      expect.arrayContaining(["very-high-wtsd", "very-high-wsd", "wide-vpip-pfr-gap"]),
    );
  });

  it("flags very high BB/100 only on large samples", () => {
    expect(
      getStatValidationWarnings(createStats({ handsPlayed: 999, bbPer100: 31 })).map(
        (warning) => warning.id,
      ),
    ).not.toContain("high-bb-per-100-large-sample");
    expect(
      getStatValidationWarnings(createStats({ handsPlayed: 1000, bbPer100: 31 })).map(
        (warning) => warning.id,
      ),
    ).toContain("high-bb-per-100-large-sample");
  });
});
