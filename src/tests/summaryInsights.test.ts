import { describe, expect, it } from "vitest";

import { createHoleCardMatrix } from "../lib/stats/holeCardMatrix";
import {
  getBestPositionInsight,
  getBiggestLosingHand,
  getBiggestWinningHand,
  getMostPlayedStartingHand,
  getMostProfitableStartingHand,
  getWorstPositionInsight,
  getWorstStartingHand,
} from "../lib/stats/summaryInsights";
import type { Card, PokerHand, PokerPosition, PositionStats } from "../types";

const EMPTY_STREET_ACTIONS = {
  preflop: [],
  flop: [],
  turn: [],
  river: [],
};

function createHand({
  handId,
  heroCards,
  heroNetResult,
  totalPot = 1,
  heroPosition = "BTN",
  bigBlind = 0.02,
}: Readonly<{
  handId: string;
  heroCards: readonly [Card, Card];
  heroNetResult: number;
  totalPot?: number | null;
  heroPosition?: PokerPosition;
  bigBlind?: number;
}>): PokerHand {
  return {
    id: handId,
    handId,
    rawText: "",
    gameType: "NLH",
    gameFormat: "cash",
    date: "2026/06/09 12:00:00 CEST",
    tableName: "test",
    maxPlayers: 6,
    buttonSeat: 1,
    stakes: {
      smallBlind: bigBlind / 2,
      bigBlind,
      currency: "₮",
    },
    players: [],
    heroName: "Hero",
    heroSeat: 1,
    heroCards,
    heroPosition,
    actions: [],
    streetActions: EMPTY_STREET_ACTIONS,
    board: {
      flop: null,
      turn: null,
      river: null,
    },
    showdown: null,
    totalPot,
    rake: null,
    heroNetResult,
  };
}

function repeatHands(
  count: number,
  create: (index: number) => Omit<Parameters<typeof createHand>[0], "handId">,
): PokerHand[] {
  return Array.from({ length: count }, (_, index) =>
    createHand({
      handId: String(index + 1),
      ...create(index),
    }),
  );
}

function createPositionStats(
  position: PokerPosition,
  overrides: Partial<PositionStats> = {},
): PositionStats {
  return {
    position,
    handsPlayed: 0,
    totalProfit: 0,
    bbPer100: 0,
    vpip: 0,
    pfr: 0,
    wtsd: 0,
    wsd: 0,
    ...overrides,
  };
}

describe("summaryInsights", () => {
  it("selects the most profitable starting hand with at least three samples", () => {
    const matrix = createHoleCardMatrix([
      ...repeatHands(3, () => ({
        heroCards: ["Kh", "Qh"],
        heroNetResult: 0.5,
      })),
      ...repeatHands(2, () => ({
        heroCards: ["Ah", "Ad"],
        heroNetResult: 5,
      })),
    ]);

    expect(getMostProfitableStartingHand(matrix)).toMatchObject({
      label: "KQs",
      handsPlayed: 3,
      totalProfit: 1.5,
      sampleLabel: "Small Sample",
    });
  });

  it("selects the worst starting hand with at least three samples", () => {
    const matrix = createHoleCardMatrix([
      ...repeatHands(3, () => ({
        heroCards: ["Ah", "4d"],
        heroNetResult: -0.4,
      })),
      ...repeatHands(2, () => ({
        heroCards: ["Kc", "Qd"],
        heroNetResult: -4,
      })),
    ]);

    expect(getWorstStartingHand(matrix)).toMatchObject({
      label: "A4o",
      handsPlayed: 3,
      totalProfit: -1.2,
    });
  });

  it("selects the most played starting hand without the three-sample guard", () => {
    const matrix = createHoleCardMatrix([
      ...repeatHands(4, () => ({
        heroCards: ["Ah", "Kd"],
        heroNetResult: 0.1,
      })),
      ...repeatHands(3, () => ({
        heroCards: ["Ac", "Ad"],
        heroNetResult: 1,
      })),
    ]);

    expect(getMostPlayedStartingHand(matrix)).toMatchObject({
      label: "AKo",
      handsPlayed: 4,
    });
  });

  it("selects the biggest winning and losing individual hands", () => {
    const hands = [
      createHand({
        handId: "100",
        heroCards: ["Ac", "Ad"],
        heroNetResult: 1.2,
        totalPot: 2.5,
        heroPosition: "CO",
      }),
      createHand({
        handId: "200",
        heroCards: ["5c", "5d"],
        heroNetResult: 3.4,
        totalPot: 6.8,
        heroPosition: "BTN",
      }),
      createHand({
        handId: "300",
        heroCards: ["7h", "2d"],
        heroNetResult: -2.1,
        totalPot: 4.2,
        heroPosition: "BB",
      }),
    ];

    expect(getBiggestWinningHand(hands)).toMatchObject({
      handId: "200",
      heroNet: 3.4,
      potSize: 6.8,
      position: "BTN",
    });
    expect(getBiggestLosingHand(hands)).toMatchObject({
      handId: "300",
      heroNet: -2.1,
      potSize: 4.2,
      position: "BB",
    });
  });

  it("selects position insights with the minimum sample guard", () => {
    const positionStats = [
      createPositionStats("BTN", {
        handsPlayed: 29,
        bbPer100: 200,
      }),
      createPositionStats("CO", {
        handsPlayed: 30,
        totalProfit: 3,
        bbPer100: 25,
      }),
      createPositionStats("SB", {
        handsPlayed: 30,
        totalProfit: -4,
        bbPer100: -40,
      }),
    ];

    expect(getBestPositionInsight(positionStats)).toMatchObject({
      position: "CO",
      handsPlayed: 30,
      bbPer100: 25,
    });
    expect(getWorstPositionInsight(positionStats)).toMatchObject({
      position: "SB",
      handsPlayed: 30,
      bbPer100: -40,
    });
  });

  it("returns no insight when samples do not qualify", () => {
    const matrix = createHoleCardMatrix([
      createHand({
        handId: "1",
        heroCards: ["Ah", "Kh"],
        heroNetResult: 1,
      }),
      createHand({
        handId: "2",
        heroCards: ["Ad", "Kd"],
        heroNetResult: -1,
      }),
    ]);
    const positionStats = [
      createPositionStats("BTN", {
        handsPlayed: 29,
        bbPer100: 50,
      }),
    ];

    expect(getMostProfitableStartingHand(matrix)).toBeNull();
    expect(getWorstStartingHand(matrix)).toBeNull();
    expect(getBestPositionInsight(positionStats)).toBeNull();
    expect(getWorstPositionInsight(positionStats)).toBeNull();
  });
});
