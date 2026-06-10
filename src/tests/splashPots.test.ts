import { describe, expect, it } from "vitest";

import {
  classifySplashPot,
  getPotBb,
  SPLASH_POT_CANDIDATE_THRESHOLD_BB,
  SPLASH_POT_THRESHOLD_BB,
} from "../lib/stats/splashPots";
import type { PokerHand } from "../types";

function createHand(totalPot: number | null, bigBlind = 0.02): PokerHand {
  return {
    id: "test",
    handId: "test",
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
    heroCards: ["Ah", "Kh"],
    heroPosition: "BTN",
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
    heroNetResult: 0,
  };
}

describe("splashPots", () => {
  it("calculates pot size in big blinds", () => {
    expect(getPotBb(createHand(38.15))).toBe(1907.5);
    expect(getPotBb(createHand(null))).toBeNull();
    expect(getPotBb(createHand(1, 0))).toBeNull();
  });

  it("marks splash pot candidates at the candidate threshold", () => {
    const below = classifySplashPot(createHand((SPLASH_POT_CANDIDATE_THRESHOLD_BB - 0.5) * 0.02));
    const candidate = classifySplashPot(createHand(SPLASH_POT_CANDIDATE_THRESHOLD_BB * 0.02));

    expect(below).toMatchObject({
      isSplashPotCandidate: false,
      isSplashPot: false,
    });
    expect(candidate).toMatchObject({
      potBb: SPLASH_POT_CANDIDATE_THRESHOLD_BB,
      isSplashPotCandidate: true,
      isSplashPot: false,
    });
  });

  it("marks splash pots at the splash threshold", () => {
    const splash = classifySplashPot(createHand(SPLASH_POT_THRESHOLD_BB * 0.02));

    expect(splash).toMatchObject({
      potBb: SPLASH_POT_THRESHOLD_BB,
      isSplashPotCandidate: true,
      isSplashPot: true,
    });
  });
});
