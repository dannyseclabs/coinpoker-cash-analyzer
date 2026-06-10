import { describe, expect, it } from "vitest";

import {
  createHoleCardMatrix,
  getHoleCardSampleLabel,
  getMatrixNotation,
  normalizeHoleCards,
} from "../lib/stats/holeCardMatrix";
import type { Card, HandAction, PokerHand } from "../types";

const EMPTY_STREET_ACTIONS = {
  preflop: [],
  flop: [],
  turn: [],
  river: [],
};

function createHeroPreflopAction(type: HandAction["type"]): HandAction {
  return {
    street: "preflop",
    order: 0,
    playerName: "Hero",
    type,
    amount: null,
    raiseTo: null,
    cards: null,
    handDescription: null,
    rawLine: `Hero: ${type}`,
  };
}

function createHand({
  handId,
  heroCards,
  heroNetResult,
  bigBlind = 1,
  vpip = false,
}: Readonly<{
  handId: string;
  heroCards: readonly [Card, Card];
  heroNetResult: number;
  bigBlind?: number;
  vpip?: boolean;
}>): PokerHand {
  const preflop = vpip ? [createHeroPreflopAction("call")] : [];

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
    heroPosition: "BTN",
    actions: preflop,
    streetActions: {
      ...EMPTY_STREET_ACTIONS,
      preflop,
    },
    board: {
      flop: null,
      turn: null,
      river: null,
    },
    showdown: null,
    totalPot: null,
    rake: null,
    heroNetResult,
  };
}

function getCell(matrix: ReturnType<typeof createHoleCardMatrix>, notation: string) {
  const cell = matrix.cells[notation];

  if (cell === undefined) {
    throw new Error(`Missing test matrix cell: ${notation}`);
  }

  return cell;
}

describe("holeCardMatrix", () => {
  it("normalizes pocket pairs", () => {
    expect(normalizeHoleCards(["Ah", "Ac"])).toBe("AA");
    expect(normalizeHoleCards(["7d", "7c"])).toBe("77");
  });

  it("normalizes suited broadway and connector hands", () => {
    expect(normalizeHoleCards(["Ah", "Kh"])).toBe("AKs");
    expect(normalizeHoleCards(["Kh", "Ah"])).toBe("AKs");
    expect(normalizeHoleCards(["7c", "6c"])).toBe("76s");
  });

  it("normalizes offsuit hands", () => {
    expect(normalizeHoleCards(["Ah", "Kd"])).toBe("AKo");
    expect(normalizeHoleCards(["6d", "7c"])).toBe("76o");
  });

  it("uses standard poker matrix notation", () => {
    expect(getMatrixNotation("A", "A")).toBe("AA");
    expect(getMatrixNotation("A", "K")).toBe("AKs");
    expect(getMatrixNotation("K", "A")).toBe("AKo");
  });

  it("creates all 169 starting hand cells", () => {
    const matrix = createHoleCardMatrix([]);

    expect(matrix.rows).toHaveLength(13);
    expect(matrix.rows.every((row) => row.length === 13)).toBe(true);
    expect(Object.keys(matrix.cells)).toHaveLength(169);
  });

  it("labels tiny starting-hand samples as low confidence", () => {
    expect(getHoleCardSampleLabel(0)).toBe("Very Small Sample");
    expect(getHoleCardSampleLabel(4)).toBe("Very Small Sample");
    expect(getHoleCardSampleLabel(5)).toBe("Low Confidence");
    expect(getHoleCardSampleLabel(29)).toBe("Low Confidence");
    expect(getHoleCardSampleLabel(30)).toBe("Medium Confidence");
    expect(getHoleCardSampleLabel(99)).toBe("Medium Confidence");
    expect(getHoleCardSampleLabel(100)).toBe("Reliable Sample");
  });

  it("aggregates matrix stats by normalized hand", () => {
    const matrix = createHoleCardMatrix([
      createHand({
        handId: "1",
        heroCards: ["Ah", "Kh"],
        heroNetResult: 2,
        vpip: true,
      }),
      createHand({
        handId: "2",
        heroCards: ["Kd", "Ad"],
        heroNetResult: -1,
      }),
    ]);
    const aks = getCell(matrix, "AKs");

    expect(aks.handsPlayed).toBe(2);
    expect(aks.totalProfit).toBe(1);
    expect(aks.totalBigBlindsWon).toBe(1);
    expect(aks.bbPer100).toBe(50);
    expect(aks.vpipCount).toBe(1);
    expect(aks.winCount).toBe(1);
    expect(aks.lossCount).toBe(1);
    expect(aks.occurrences.map((occurrence) => occurrence.handId)).toEqual(["1", "2"]);
  });

  it("calculates BB/100 using each hand's big blind size", () => {
    const matrix = createHoleCardMatrix([
      createHand({
        handId: "1",
        heroCards: ["7c", "6d"],
        heroNetResult: 0.1,
        bigBlind: 0.02,
      }),
      createHand({
        handId: "2",
        heroCards: ["7h", "6s"],
        heroNetResult: -0.05,
        bigBlind: 0.05,
      }),
    ]);

    const offsuitConnector = getCell(matrix, "76o");

    expect(offsuitConnector.handsPlayed).toBe(2);
    expect(offsuitConnector.totalBigBlindsWon).toBe(4);
    expect(offsuitConnector.bbPer100).toBe(200);
  });
});
