import { describe, expect, it } from "vitest";

import { filterHands, type HandExplorerFilters } from "../lib/handExplorer";
import {
  DEFAULT_SESSION_GAP_MINUTES,
  detectPokerSessions,
  getEstimatedTableCount,
} from "../lib/sessions";
import type { Card, PokerHand, PokerPosition } from "../types";

const DEFAULT_FILTERS: HandExplorerFilters = {
  position: "All",
  result: "All",
  showdown: "All",
  splashPots: "All",
  dateRange: "All hands",
  heroCardsSearch: "",
};

function createHand({
  handId,
  date,
  tableName = "table-1",
  heroPosition = "BTN",
  heroCards = ["Ah", "Kh"],
  heroNetResult = 0,
  totalPot = 1,
  bigBlind = 0.02,
}: Readonly<{
  handId: string;
  date: string;
  tableName?: string | null;
  heroPosition?: PokerPosition;
  heroCards?: readonly [Card, Card];
  heroNetResult?: number;
  totalPot?: number | null;
  bigBlind?: number;
}>): PokerHand {
  return {
    id: handId,
    handId,
    rawText: "",
    gameType: "NLH",
    gameFormat: "cash",
    date,
    tableName,
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
    totalPot,
    rake: null,
    heroNetResult,
  };
}

describe("sessions", () => {
  it("groups hands within the session gap into one session", () => {
    const sessions = detectPokerSessions([
      createHand({ handId: "1", date: "2026/06/09 10:00:00 CEST" }),
      createHand({ handId: "2", date: "2026/06/09 10:30:00 CEST" }),
    ]);

    expect(DEFAULT_SESSION_GAP_MINUTES).toBe(30);
    expect(sessions).toHaveLength(1);
    expect(sessions[0]?.hands.map((hand) => hand.handId)).toEqual(["1", "2"]);
  });

  it("creates a new session when the gap is greater than the threshold", () => {
    const sessions = detectPokerSessions([
      createHand({ handId: "1", date: "2026/06/09 10:00:00 CEST" }),
      createHand({ handId: "2", date: "2026/06/09 10:31:00 CEST" }),
    ]);

    expect(sessions).toHaveLength(2);
  });

  it("returns sessions newest first", () => {
    const sessions = detectPokerSessions([
      createHand({ handId: "old", date: "2026/06/09 10:00:00 CEST" }),
      createHand({ handId: "new", date: "2026/06/09 12:00:00 CEST" }),
    ]);

    expect(sessions.map((session) => session.hands[0]?.handId)).toEqual(["new", "old"]);
  });

  it("calculates session profit in currency, BB, and BB/100", () => {
    const [session] = detectPokerSessions([
      createHand({
        handId: "1",
        date: "2026/06/09 10:00:00 CEST",
        heroNetResult: 0.42,
      }),
      createHand({
        handId: "2",
        date: "2026/06/09 10:05:00 CEST",
        heroNetResult: -0.2,
      }),
    ]);

    expect(session?.profitAmount).toBeCloseTo(0.22);
    expect(session?.profitBb).toBeCloseTo(11);
    expect(session?.bbPer100).toBeCloseTo(550);
  });

  it("estimates table count from distinct table names in 60-second buckets", () => {
    const hands = [
      createHand({ handId: "1", date: "2026/06/09 10:00:00 CEST", tableName: "A" }),
      createHand({ handId: "2", date: "2026/06/09 10:00:20 CEST", tableName: "B" }),
      createHand({ handId: "3", date: "2026/06/09 10:00:40 CEST", tableName: "C" }),
      createHand({ handId: "4", date: "2026/06/09 10:01:10 CEST", tableName: "A" }),
    ];

    expect(getEstimatedTableCount(hands)).toBe(3);
    expect(getEstimatedTableCount(hands.map((hand) => ({ ...hand, tableName: null })))).toBe(1);
  });

  it("counts splash pots without removing them from session profit", () => {
    const [session] = detectPokerSessions([
      createHand({
        handId: "normal",
        date: "2026/06/09 10:00:00 CEST",
        heroNetResult: 0.5,
        totalPot: 1,
      }),
      createHand({
        handId: "splash",
        date: "2026/06/09 10:01:00 CEST",
        heroNetResult: -2.19,
        totalPot: 10,
      }),
    ]);

    expect(session?.splashPotCount).toBe(1);
    expect(session?.profitAmount).toBeCloseTo(-1.69);
    expect(session?.profitBb).toBeCloseTo(-84.5);
  });

  it("excludes splash pots from biggest normal wins and losses", () => {
    const [session] = detectPokerSessions([
      createHand({
        handId: "normal-win",
        date: "2026/06/09 10:00:00 CEST",
        heroNetResult: 0.5,
        totalPot: 1,
      }),
      createHand({
        handId: "splash-win",
        date: "2026/06/09 10:01:00 CEST",
        heroNetResult: 5,
        totalPot: 20,
      }),
      createHand({
        handId: "normal-loss",
        date: "2026/06/09 10:02:00 CEST",
        heroNetResult: -0.2,
        totalPot: 1,
      }),
      createHand({
        handId: "splash-loss",
        date: "2026/06/09 10:03:00 CEST",
        heroNetResult: -2.19,
        totalPot: 10,
      }),
    ]);

    expect(session?.biggestWin?.handId).toBe("normal-win");
    expect(session?.biggestLoss?.handId).toBe("normal-loss");
  });

  it("lets Hand Explorer filters run against selected session hands", () => {
    const sessions = detectPokerSessions([
      createHand({
        handId: "session-1-btn",
        date: "2026/06/09 10:00:00 CEST",
        heroPosition: "BTN",
      }),
      createHand({
        handId: "session-1-bb",
        date: "2026/06/09 10:01:00 CEST",
        heroPosition: "BB",
      }),
      createHand({
        handId: "session-2-btn",
        date: "2026/06/09 11:00:00 CEST",
        heroPosition: "BTN",
      }),
    ]);
    const olderSession = sessions.find((session) =>
      session.hands.some((hand) => hand.handId === "session-1-btn"),
    );

    expect(
      filterHands(olderSession?.hands ?? [], {
        ...DEFAULT_FILTERS,
        position: "BTN",
      }).map((hand) => hand.handId),
    ).toEqual(["session-1-btn"]);
  });
});
