import { describe, expect, it } from "vitest";

import { detectLeaks } from "../lib/leaks/detectLeaks";
import type { LeakMetric, PokerPosition, PositionStats, StatisticsResult } from "../types";

const POSITIONS: readonly PokerPosition[] = ["UTG", "HJ", "CO", "BTN", "SB", "BB", "UNKNOWN"];

function createPositionStats(overrides: Partial<PositionStats> = {}): PositionStats {
  return {
    position: "UNKNOWN",
    handsPlayed: 0,
    totalProfit: 0,
    totalBigBlindsWon: 0,
    bbPer100: 0,
    vpip: 0,
    pfr: 0,
    wtsd: 0,
    wsd: 0,
    ...overrides,
  };
}

function createPositionStatsRecord(
  overrides: Partial<Record<PokerPosition, Partial<PositionStats>>> = {},
): Readonly<Record<PokerPosition, PositionStats>> {
  return Object.fromEntries(
    POSITIONS.map((position) => [
      position,
      createPositionStats({
        position,
        ...overrides[position],
      }),
    ]),
  ) as Readonly<Record<PokerPosition, PositionStats>>;
}

function createStats(overrides: Partial<StatisticsResult> = {}): StatisticsResult {
  return {
    handsPlayed: 150,
    totalProfit: 0,
    totalBigBlindsWon: 0,
    bbPer100: 0,
    vpip: 24,
    pfr: 18,
    threeBet: 7,
    foldToThreeBet: 45,
    limp: 1,
    cBetFlop: 55,
    foldToCBetFlop: 45,
    wtsd: 26,
    wsd: 52,
    positionStats: createPositionStatsRecord(),
    sampleSizes: {
      hands: 150,
      threeBetOpportunities: 40,
      foldToThreeBetOpportunities: 25,
      cBetFlopOpportunities: 30,
      foldToCBetFlopOpportunities: 30,
      sawFlop: 80,
      wentToShowdown: 30,
    },
    ...overrides,
  };
}

function leakMetrics(stats: StatisticsResult): LeakMetric[] {
  return detectLeaks(stats).map((leak) => leak.metric);
}

describe("detectLeaks", () => {
  it("does not show global leaks when the sample is too small", () => {
    const leaks = detectLeaks(
      createStats({
        handsPlayed: 99,
        vpip: 10,
        pfr: 1,
        limp: 20,
        sampleSizes: {
          hands: 99,
          threeBetOpportunities: 40,
          foldToThreeBetOpportunities: 25,
          cBetFlopOpportunities: 30,
          foldToCBetFlopOpportunities: 30,
          sawFlop: 80,
          wentToShowdown: 30,
        },
      }),
    );

    expect(leaks).toHaveLength(0);
  });

  it("detects too tight preflop", () => {
    const leak = detectLeaks(createStats({ vpip: 17 })).find(
      (candidate) => candidate.id === "too-tight-preflop",
    );

    expect(leak).toMatchObject({
      title: "Too Tight Preflop",
      severity: "medium",
      category: "preflop",
      metric: "vpip",
      value: 17,
      threshold: 18,
    });
  });

  it("detects too passive preflop", () => {
    expect(leakMetrics(createStats({ vpip: 28, pfr: 18 }))).toContain("vpip_pfr_gap");
  });

  it("detects low 3Bet when 3Bet opportunities exist", () => {
    expect(leakMetrics(createStats({ threeBet: 3 }))).toContain("three_bet");
  });

  it("does not detect low 3Bet without 3Bet opportunities", () => {
    expect(
      leakMetrics(
        createStats({
          threeBet: 0,
          sampleSizes: {
            hands: 150,
            threeBetOpportunities: 0,
            foldToThreeBetOpportunities: 25,
            cBetFlopOpportunities: 30,
            foldToCBetFlopOpportunities: 30,
            sawFlop: 80,
            wentToShowdown: 30,
          },
        }),
      ),
    ).not.toContain("three_bet");
  });

  it("detects too much limping", () => {
    expect(leakMetrics(createStats({ limp: 6 }))).toContain("limp");
  });

  it("detects low flop c-bet with enough c-bet opportunities", () => {
    expect(leakMetrics(createStats({ cBetFlop: 39 }))).toContain("c_bet_flop");
  });

  it("does not detect low flop c-bet with too few c-bet opportunities", () => {
    expect(
      leakMetrics(
        createStats({
          cBetFlop: 10,
          sampleSizes: {
            hands: 150,
            threeBetOpportunities: 40,
            foldToThreeBetOpportunities: 25,
            cBetFlopOpportunities: 19,
            foldToCBetFlopOpportunities: 30,
            sawFlop: 80,
            wentToShowdown: 30,
          },
        }),
      ),
    ).not.toContain("c_bet_flop");
  });

  it("detects showdown leaks", () => {
    const metrics = leakMetrics(
      createStats({
        wtsd: 33,
        wsd: 44,
      }),
    );

    expect(metrics).toContain("wtsd");
    expect(metrics).toContain("wsd");
  });

  it("detects heavy small blind losses", () => {
    const leaks = detectLeaks(
      createStats({
        positionStats: createPositionStatsRecord({
          SB: {
            handsPlayed: 1,
            bbPer100: -51,
          },
        }),
      }),
    );

    expect(leaks).toContainEqual(
      expect.objectContaining({
        id: "heavy-sb-losses",
        metric: "sb_bb_per100",
        threshold: -50,
      }),
    );
  });

  it("detects heavy big blind losses", () => {
    const metrics = leakMetrics(
      createStats({
        positionStats: createPositionStatsRecord({
          BB: {
            handsPlayed: 1,
            bbPer100: -71,
          },
        }),
      }),
    );

    expect(metrics).toContain("bb_bb_per100");
  });

  it("does not detect heavy big blind losses above the V1 threshold", () => {
    const metrics = leakMetrics(
      createStats({
        positionStats: createPositionStatsRecord({
          BB: {
            handsPlayed: 20,
            bbPer100: -69,
          },
        }),
      }),
    );

    expect(metrics).not.toContain("bb_bb_per100");
  });

  it("detects low button VPIP with enough button hands", () => {
    const metrics = leakMetrics(
      createStats({
        positionStats: createPositionStatsRecord({
          BTN: {
            handsPlayed: 20,
            vpip: 29,
          },
        }),
      }),
    );

    expect(metrics).toContain("btn_vpip");
  });

  it("detects low button PFR with enough button hands", () => {
    const metrics = leakMetrics(
      createStats({
        positionStats: createPositionStatsRecord({
          BTN: {
            handsPlayed: 20,
            pfr: 24,
          },
        }),
      }),
    );

    expect(metrics).toContain("btn_pfr");
  });

  it("does not detect position leaks with too few position hands", () => {
    const metrics = leakMetrics(
      createStats({
        positionStats: createPositionStatsRecord({
          BTN: {
            handsPlayed: 19,
            vpip: 10,
            pfr: 10,
          },
        }),
      }),
    );

    expect(metrics).not.toContain("btn_vpip");
    expect(metrics).not.toContain("btn_pfr");
  });
});
