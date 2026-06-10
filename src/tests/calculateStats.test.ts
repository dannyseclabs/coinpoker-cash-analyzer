import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { parseCoinPokerFile } from "../lib/parser/parseCoinPokerFile";
import { calculateStats } from "../lib/stats/calculateStats";
import type { PokerHand } from "../types";

const fixturePath = join(process.cwd(), "src/tests/fixtures/coinpoker-v1-representative-hands.txt");
const fixture = readFileSync(fixturePath, "utf8");
const hands = parseCoinPokerFile(fixture);
const preflopAllInRunoutFixture = `CoinPoker Hand #64312100138: NLH (₮0.01/₮0.02) 2026/06/08 21:11:52 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: aba96d92 (₮1.11 in chips)
Seat 2: 6d82507f (₮0.74 in chips)
Seat 3: Hero (₮1.94 in chips)
Seat 4: 4270ccad (₮0.82 in chips)
Seat 5: 0d59e013 (₮2.36 in chips)
Seat 6: 368bfbf9 (₮2.23 in chips)
368bfbf9: posts small blind ₮0.01
aba96d92: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to aba96d92
Dealt to 6d82507f
Dealt to Hero [Js Jh]
Dealt to 4270ccad
Dealt to 0d59e013
Dealt to 368bfbf9
6d82507f: ALLIN ₮0.74
Hero: ALLIN ₮1.94
4270ccad: folds
0d59e013: folds
368bfbf9: folds
aba96d92: folds
Hero: RETURN ₮1.20
*** FLOP *** [5d Ah Kc]
*** TURN *** [5d Ah Kc] [Qh]
*** RIVER *** [5d Ah Kc Qh] [8h]
*** SHOWDOWN ***
6d82507f: shows [Qc 2c] (One Pair)
6d82507f collected ₮1.43 from pot
Hero: shows [Js Jh] (One Pair)
*** SUMMARY ***
Total pot ₮1.51 | Rake ₮0.08
Hand was run once
Board [ 5d Ah Kc Qh 8h ]
Game ended: 2026/06/08 21:12:25 CEST
Seat 1: aba96d92 folded before Flop (didn't bet)
Seat 2: 6d82507f showed [Qc 2c] and won (₮1.43) with One Pair
Seat 3: Hero showed [Js Jh] and lost with One Pair
Seat 4: 4270ccad folded before Flop (didn't bet)
Seat 5: 0d59e013 folded before Flop (didn't bet)
Seat 6: 368bfbf9 folded before Flop (didn't bet)`;

function findHand(handId: string): PokerHand {
  const hand = hands.find((candidate) => candidate.handId === handId);

  expect(hand).toBeDefined();

  return hand as PokerHand;
}

function parseSingleHand(rawHand: string): PokerHand {
  const [hand] = parseCoinPokerFile(rawHand);

  expect(hand).toBeDefined();

  return hand as PokerHand;
}

describe("calculateStats", () => {
  it("calculates hand count, profit, and BB/100 with each hand's big blind size", () => {
    const stats = calculateStats(hands);

    expect(stats.handsPlayed).toBe(10);
    expect(stats.totalProfit).toBeCloseTo(-0.05);
    expect(stats.totalBigBlindsWon).toBeCloseTo(-0.4);
    expect(stats.bbPer100).toBeCloseTo(-4);
  });

  it("counts VPIP for Hero voluntary preflop calls and raises", () => {
    const stats = calculateStats([
      findHand("6299122101"),
      findHand("6299122102"),
      findHand("6347530308"),
    ]);

    expect(stats.vpip).toBeCloseTo(66.67);
  });

  it("does not count blinds alone as VPIP", () => {
    expect(calculateStats([findHand("6347530308")]).vpip).toBe(0);
  });

  it("counts PFR for Hero preflop raises", () => {
    expect(calculateStats([findHand("6299122116")]).pfr).toBe(100);
  });

  it("counts Hero 3-bets as re-raises after a raise", () => {
    expect(calculateStats([findHand("6343041028")]).threeBet).toBe(100);
  });

  it("counts limp when Hero calls as first voluntary preflop action without a prior raise", () => {
    const stats = calculateStats([findHand("6299122101")]);

    expect(stats.vpip).toBe(100);
    expect(stats.limp).toBe(100);
    expect(stats.pfr).toBe(0);
  });

  it("counts flop c-bets when Hero bets as the preflop aggressor", () => {
    const stats = calculateStats([findHand("6299122116")]);

    expect(stats.sampleSizes.cBetFlopOpportunities).toBe(1);
    expect(stats.cBetFlop).toBe(100);
  });

  it("does not count all-in preflop runouts as flop c-bet opportunities", () => {
    const stats = calculateStats([parseSingleHand(preflopAllInRunoutFixture)]);

    expect(stats.sampleSizes.cBetFlopOpportunities).toBe(0);
    expect(stats.cBetFlop).toBe(0);
  });

  it("keeps normal c-bet opportunities when mixed with all-in preflop runouts", () => {
    const stats = calculateStats([
      findHand("6299122116"),
      parseSingleHand(preflopAllInRunoutFixture),
    ]);

    expect(stats.sampleSizes.cBetFlopOpportunities).toBe(1);
    expect(stats.cBetFlop).toBe(100);
  });

  it("counts fold to flop c-bet when Hero folds facing the preflop aggressor's flop bet", () => {
    expect(calculateStats([findHand("6375710066")]).foldToCBetFlop).toBe(100);
  });

  it("counts WTSD when Hero reaches showdown after seeing a flop", () => {
    expect(calculateStats([findHand("6299122116")]).wtsd).toBe(100);
  });

  it("counts W$SD when Hero wins at showdown", () => {
    expect(calculateStats([findHand("6299122102")]).wsd).toBe(100);
    expect(calculateStats([findHand("6299122116")]).wsd).toBe(0);
  });

  it("aggregates position stats from parsed Hero positions", () => {
    const stats = calculateStats(hands);

    expect(stats.positionStats.UTG.handsPlayed).toBe(1);
    expect(stats.positionStats.HJ.handsPlayed).toBe(0);
    expect(stats.positionStats.CO.handsPlayed).toBe(1);
    expect(stats.positionStats.BTN.handsPlayed).toBeGreaterThan(0);
    expect(stats.positionStats.BTN.totalProfit).toBeCloseTo(-0.46);
    expect(stats.positionStats.BTN.totalBigBlindsWon).toBeCloseTo(-23);
    expect(stats.positionStats.BTN.bbPer100).toBeCloseTo(-1150);
    expect(stats.positionStats.BTN.vpip).toBeGreaterThan(0);
    expect(stats.positionStats.BTN.pfr).toBe(100);
    expect(stats.positionStats.BTN.wtsd).toBe(100);
    expect(stats.positionStats.BTN.wsd).toBe(50);
  });

  it("calculates profit by position with each hand's big blind size", () => {
    const stats = calculateStats([findHand("6347530307"), findHand("6375710066")]);

    expect(stats.positionStats.BB.handsPlayed).toBe(2);
    expect(stats.positionStats.BB.totalProfit).toBeCloseTo(-0.12);
    expect(stats.positionStats.BB.totalBigBlindsWon).toBeCloseTo(-4.5);
    expect(stats.positionStats.BB.bbPer100).toBeCloseTo(-225);
  });

  it("calculates VPIP and PFR by position", () => {
    const stats = calculateStats([
      findHand("6347530308"),
      findHand("6299122111"),
      findHand("6299122101"),
      findHand("6343041028"),
    ]);

    expect(stats.positionStats.SB.handsPlayed).toBe(4);
    expect(stats.positionStats.SB.vpip).toBe(75);
    expect(stats.positionStats.SB.pfr).toBe(25);
  });

  it("exposes sample sizes for leak detection guards", () => {
    const stats = calculateStats(hands);

    expect(stats.sampleSizes).toMatchObject({
      hands: 10,
      threeBetOpportunities: 6,
      cBetFlopOpportunities: 2,
      foldToCBetFlopOpportunities: 2,
      sawFlop: 6,
      wentToShowdown: 4,
    });
  });
});
