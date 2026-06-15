import { describe, expect, it } from "vitest";

import { getSessionInsights } from "../lib/sessionInsights";
import type { PokerSession } from "../lib/sessions";
import type { PokerHand, PokerPosition } from "../types";

function createHand({
  handId,
  heroPosition = "CO",
  heroNetResult = 0,
}: Readonly<{
  handId: string;
  heroPosition?: PokerPosition;
  heroNetResult?: number;
}>): PokerHand {
  return {
    id: handId,
    handId,
    rawText: "",
    gameType: "NLH",
    gameFormat: "cash",
    date: "2026/06/09 10:00:00 CEST",
    tableName: "table-1",
    maxPlayers: 6,
    buttonSeat: 1,
    stakes: {
      smallBlind: 0.5,
      bigBlind: 1,
      currency: "₮",
    },
    players: [],
    heroName: "Hero",
    heroSeat: 1,
    heroCards: ["Ah", "Kh"],
    heroPosition,
    actions: [],
    streetActions: {
      preflop: [],
      flop: [],
      turn: [],
      river: [],
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

function createHands({
  prefix,
  count,
  btnProfitBb = 0,
  bbProfitBb = 0,
  sbProfitBb = 0,
}: Readonly<{
  prefix: string;
  count: number;
  btnProfitBb?: number;
  bbProfitBb?: number;
  sbProfitBb?: number;
}>): PokerHand[] {
  const hands = [
    createHand({
      handId: `${prefix}-btn`,
      heroPosition: "BTN",
      heroNetResult: btnProfitBb,
    }),
    createHand({
      handId: `${prefix}-bb`,
      heroPosition: "BB",
      heroNetResult: bbProfitBb,
    }),
    createHand({
      handId: `${prefix}-sb`,
      heroPosition: "SB",
      heroNetResult: sbProfitBb,
    }),
  ];

  for (let index = hands.length; index < count; index += 1) {
    hands.push(createHand({ handId: `${prefix}-${index}`, heroPosition: "CO" }));
  }

  return hands;
}

function createSession({
  id,
  handCount = 200,
  profitBb = 0,
  bbPer100 = 0,
  vpip = 30,
  pfr = 24,
  threeBet = 8,
  wtsd = 35,
  wsd = 50,
  durationMinutes = 120,
  btnProfitBb = 0,
  bbProfitBb = 0,
  sbProfitBb = 0,
}: Readonly<{
  id: string;
  handCount?: number;
  profitBb?: number;
  bbPer100?: number;
  vpip?: number;
  pfr?: number;
  threeBet?: number;
  wtsd?: number;
  wsd?: number;
  durationMinutes?: number;
  btnProfitBb?: number;
  bbProfitBb?: number;
  sbProfitBb?: number;
}>): PokerSession {
  const hands = createHands({
    prefix: id,
    count: handCount,
    btnProfitBb,
    bbProfitBb,
    sbProfitBb,
  });

  return {
    id,
    startTime: new Date("2026-06-09T10:00:00"),
    endTime: new Date("2026-06-09T12:00:00"),
    durationMinutes,
    handCount,
    hands,
    profitAmount: profitBb,
    profitBb,
    bbPer100,
    vpip,
    pfr,
    threeBet,
    wtsd,
    wsd,
    biggestWin: null,
    biggestLoss: null,
    splashPotCount: 0,
    estimatedTables: 1,
  };
}

function getRow(result: ReturnType<typeof getSessionInsights>, label: string) {
  const row = result.scorecardRows.find((candidate) => candidate.label === label);

  if (row === undefined) {
    throw new Error(`Expected ${label} row.`);
  }

  return row;
}

describe("session insights", () => {
  it("calculates historical averages from baseline sessions", () => {
    const result = getSessionInsights(
      [
        createSession({ id: "selected", profitBb: 50 }),
        createSession({ id: "baseline-1", profitBb: 10 }),
        createSession({ id: "baseline-2", profitBb: 30 }),
      ],
      "selected",
    );

    expect(getRow(result, "Profit BB")).toMatchObject({
      sessionValue: 50,
      averageValue: 20,
      delta: 30,
    });
  });

  it("excludes the selected session from the baseline", () => {
    const result = getSessionInsights(
      [
        createSession({ id: "selected", vpip: 80 }),
        createSession({ id: "baseline-1", vpip: 30 }),
        createSession({ id: "baseline-2", vpip: 34 }),
      ],
      "selected",
    );

    expect(result.baselineSessions.map((session) => session.id)).toEqual([
      "baseline-1",
      "baseline-2",
    ]);
    expect(getRow(result, "VPIP").averageValue).toBe(32);
  });

  it("detects VPIP improvement when the selected session is tighter", () => {
    const result = getSessionInsights(
      [
        createSession({ id: "selected", vpip: 26 }),
        createSession({ id: "baseline-1", vpip: 32 }),
        createSession({ id: "baseline-2", vpip: 32 }),
      ],
      "selected",
    );

    expect(getRow(result, "VPIP")).toMatchObject({
      delta: -6,
      classification: "improved",
    });
  });

  it("detects WTSD improvement when showdown frequency drops", () => {
    const result = getSessionInsights(
      [
        createSession({ id: "selected", wtsd: 41 }),
        createSession({ id: "baseline-1", wtsd: 58 }),
        createSession({ id: "baseline-2", wtsd: 58 }),
      ],
      "selected",
    );

    expect(getRow(result, "WTSD")).toMatchObject({
      delta: -17,
      classification: "improved",
    });
  });

  it("detects Big Blind defense improvement from position profit", () => {
    const result = getSessionInsights(
      [
        createSession({ id: "selected", bbProfitBb: -35 }),
        createSession({ id: "baseline-1", bbProfitBb: -72 }),
        createSession({ id: "baseline-2", bbProfitBb: -72 }),
      ],
      "selected",
    );

    expect(getRow(result, "BB Profit")).toMatchObject({
      sessionValue: -35,
      averageValue: -72,
      delta: 37,
      classification: "improved",
    });
  });

  it("marks limited histories as low confidence", () => {
    const result = getSessionInsights(
      [
        createSession({ id: "selected", handCount: 50 }),
        createSession({ id: "baseline", handCount: 50 }),
      ],
      "selected",
    );

    expect(result.lowConfidence).toBe(true);
    expect(result.lowConfidenceReason).toBe("Low confidence due to limited history.");
    expect(result.trends).toEqual([]);
  });

  it("generates objective highlights", () => {
    const result = getSessionInsights(
      [
        createSession({
          id: "selected",
          vpip: 24,
          pfr: 22,
          btnProfitBb: 41,
          bbProfitBb: -35,
        }),
        createSession({
          id: "baseline-1",
          vpip: 32,
          pfr: 24,
          btnProfitBb: 4,
          bbProfitBb: -72,
        }),
        createSession({
          id: "baseline-2",
          vpip: 32,
          pfr: 24,
          btnProfitBb: 4,
          bbProfitBb: -72,
        }),
      ],
      "selected",
    );

    expect(result.highlights).toEqual([
      "Lower VPIP/PFR gap than average.",
      "Best BB defense so far.",
      "Highest BTN profit so far.",
    ]);
  });

  it("generates supported trend summaries with enough history", () => {
    const result = getSessionInsights(
      [
        createSession({
          id: "selected",
          vpip: 26,
          wtsd: 41,
          btnProfitBb: 41,
          bbProfitBb: -35,
        }),
        createSession({
          id: "baseline-1",
          vpip: 32,
          wtsd: 58,
          btnProfitBb: 4,
          bbProfitBb: -72,
        }),
        createSession({
          id: "baseline-2",
          vpip: 32,
          wtsd: 58,
          btnProfitBb: 4,
          bbProfitBb: -72,
        }),
      ],
      "selected",
    );

    expect(result.lowConfidence).toBe(false);
    expect(result.trends).toEqual([
      "You are becoming tighter preflop.",
      "You are reaching showdown less often.",
      "Your blind losses are improving.",
      "Button profitability is increasing.",
    ]);
  });
});
