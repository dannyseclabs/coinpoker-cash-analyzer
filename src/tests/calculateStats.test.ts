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
const heroWinsActualShowdownFixture = `CoinPoker Hand #7000000001: NLH (₮0.01/₮0.02) 2026/06/09 12:00:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: bb (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: hj (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
bb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ah Kh]
utg: folds
hj: folds
co: folds
Hero: raises ₮0.04 to ₮0.06
sb: folds
bb: calls ₮0.04
*** FLOP *** [Ks 7d 2c]
bb: checks
Hero: bets ₮0.10
bb: calls ₮0.10
*** TURN *** [Ks 7d 2c] [4h]
bb: checks
Hero: checks
*** RIVER *** [Ks 7d 2c 4h] [9s]
bb: checks
Hero: checks
*** SHOWDOWN ***
Hero: shows [Ah Kh] (One Pair)
bb: shows [Kc Qd] (One Pair)
Hero collected ₮0.33 from pot
*** SUMMARY ***
Total pot ₮0.35 | Rake ₮0.02
Hand was run once
Board [ Ks 7d 2c 4h 9s ]
Game ended: 2026/06/09 12:01:00 CEST
Seat 1: Hero showed [Ah Kh] and won (₮0.33) with One Pair
Seat 2: sb folded before Flop (didn't bet)
Seat 3: bb showed [Kc Qd] and lost with One Pair
Seat 4: utg folded before Flop (didn't bet)
Seat 5: hj folded before Flop (didn't bet)
Seat 6: co folded before Flop (didn't bet)`;
const villainDonksIntoPreflopAggressorFixture = `CoinPoker Hand #7000000002: NLH (₮0.01/₮0.02) 2026/06/09 12:05:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: bb (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: hj (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
bb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [As Qs]
utg: folds
hj: folds
co: folds
Hero: raises ₮0.04 to ₮0.06
sb: folds
bb: calls ₮0.04
*** FLOP *** [Qh 8d 3c]
bb: bets ₮0.08
Hero: calls ₮0.08
*** TURN *** [Qh 8d 3c] [2s]
bb: bets ₮0.12
Hero: folds
bb: RETURN ₮0.12
*** SHOWDOWN ***
bb collected ₮0.27 from pot
*** SUMMARY ***
Total pot ₮0.28 | Rake ₮0.01
Hand was run once
Board [ Qh 8d 3c 2s ]
Game ended: 2026/06/09 12:05:42 CEST
Seat 1: Hero folded on the Turn
Seat 2: sb folded before Flop (didn't bet)
Seat 3: bb won (₮0.27)
Seat 4: utg folded before Flop (didn't bet)
Seat 5: hj folded before Flop (didn't bet)
Seat 6: co folded before Flop (didn't bet)`;
const heroFoldsBigBlindFixture = `CoinPoker Hand #7000000010: NLH (₮0.01/₮0.02) 2026/06/09 13:00:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: btn (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: hj (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [7d 2c]
utg: folds
hj: folds
co: folds
btn: raises ₮0.04 to ₮0.06
sb: folds
Hero: folds
btn: RETURN ₮0.04
*** SHOWDOWN ***
btn collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/09 13:00:30 CEST
Seat 1: btn won (₮0.05)
Seat 2: sb folded before Flop
Seat 3: Hero folded before Flop
Seat 4: utg folded before Flop
Seat 5: hj folded before Flop
Seat 6: co folded before Flop`;
const heroOpensAndFoldsPostflopFixture = `CoinPoker Hand #7000000011: NLH (₮0.01/₮0.02) 2026/06/09 13:05:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: bb (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: hj (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
bb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ac Kd]
utg: folds
hj: folds
co: folds
Hero: raises ₮0.04 to ₮0.06
sb: folds
bb: calls ₮0.04
*** FLOP *** [Ks 8h 3d]
bb: checks
Hero: bets ₮0.08
bb: raises ₮0.16 to ₮0.24
Hero: folds
bb: RETURN ₮0.16
*** SHOWDOWN ***
bb collected ₮0.27 from pot
*** SUMMARY ***
Total pot ₮0.28 | Rake ₮0.01
Hand was run once
Board [ Ks 8h 3d ]
Game ended: 2026/06/09 13:05:45 CEST
Seat 1: Hero folded on the Flop
Seat 2: sb folded before Flop
Seat 3: bb won (₮0.27)
Seat 4: utg folded before Flop
Seat 5: hj folded before Flop
Seat 6: co folded before Flop`;
const heroLosesActualShowdownFixture = `CoinPoker Hand #7000000012: NLH (₮0.01/₮0.02) 2026/06/09 13:10:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: bb (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: hj (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
bb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qh Js]
utg: folds
hj: folds
co: folds
Hero: raises ₮0.04 to ₮0.06
sb: folds
bb: calls ₮0.04
*** FLOP *** [Qs 7d 2c]
bb: checks
Hero: checks
*** TURN *** [Qs 7d 2c] [4h]
bb: checks
Hero: checks
*** RIVER *** [Qs 7d 2c 4h] [9s]
bb: checks
Hero: checks
*** SHOWDOWN ***
bb: shows [Ah Qd] (One Pair)
bb collected ₮0.13 from pot
Hero: shows [Qh Js] (One Pair)
*** SUMMARY ***
Total pot ₮0.13 | Rake ₮0
Hand was run once
Board [ Qs 7d 2c 4h 9s ]
Game ended: 2026/06/09 13:11:00 CEST
Seat 1: Hero showed [Qh Js] and lost with One Pair
Seat 2: sb folded before Flop
Seat 3: bb showed [Ah Qd] and won (₮0.13) with One Pair
Seat 4: utg folded before Flop
Seat 5: hj folded before Flop
Seat 6: co folded before Flop`;
const heroThreeBetFixture = `CoinPoker Hand #7000000013: NLH (₮0.01/₮0.02) 2026/06/09 13:15:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: bb (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: hj (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
bb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [As Ah]
utg: folds
hj: folds
co: raises ₮0.04 to ₮0.06
Hero: raises ₮0.12 to ₮0.18
sb: folds
bb: folds
co: folds
Hero: RETURN ₮0.12
*** SHOWDOWN ***
Hero collected ₮0.15 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/09 13:15:30 CEST
Seat 1: Hero won (₮0.15)
Seat 2: sb folded before Flop
Seat 3: bb folded before Flop
Seat 4: utg folded before Flop
Seat 5: hj folded before Flop
Seat 6: co folded before Flop`;
const multiwayShowdownFixture = `CoinPoker Hand #7000000014: NLH (₮0.01/₮0.02) 2026/06/09 13:20:00 CEST
Table 'audit' 6-max Seat #1 is the button
Seat 1: btn (₮2 in chips)
Seat 2: sb (₮2 in chips)
Seat 3: bb (₮2 in chips)
Seat 4: utg (₮2 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: co (₮2 in chips)
sb: posts small blind ₮0.01
bb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Kd Qd]
utg: raises ₮0.04 to ₮0.06
Hero: calls ₮0.06
co: folds
btn: calls ₮0.06
sb: folds
bb: folds
*** FLOP *** [Kh 9d 2c]
utg: checks
Hero: checks
btn: checks
*** TURN *** [Kh 9d 2c] [4s]
utg: checks
Hero: checks
btn: checks
*** RIVER *** [Kh 9d 2c 4s] [3c]
utg: checks
Hero: checks
btn: checks
*** SHOWDOWN ***
utg: shows [Ah Ac] (One Pair)
Hero: shows [Kd Qd] (One Pair)
btn: shows [Ks Js] (One Pair)
utg collected ₮0.21 from pot
*** SUMMARY ***
Total pot ₮0.21 | Rake ₮0
Hand was run once
Board [ Kh 9d 2c 4s 3c ]
Game ended: 2026/06/09 13:21:00 CEST
Seat 1: btn showed [Ks Js] and lost with One Pair
Seat 2: sb folded before Flop
Seat 3: bb folded before Flop
Seat 4: utg showed [Ah Ac] and won (₮0.21) with One Pair
Seat 5: Hero showed [Kd Qd] and lost with One Pair
Seat 6: co folded before Flop`;

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
  it("Fixture A: Hero folds every hand without VPIP/PFR/showdown", () => {
    const stats = calculateStats([parseSingleHand(heroFoldsBigBlindFixture)]);

    expect(stats).toMatchObject({
      handsPlayed: 1,
      totalProfit: -0.02,
      totalBigBlindsWon: -1,
      bbPer100: -100,
      vpip: 0,
      pfr: 0,
      threeBet: 0,
      wtsd: 0,
      wsd: 0,
    });
  });

  it("Fixture B: Hero opens and folds postflop with known VPIP/PFR/CBet", () => {
    const stats = calculateStats([parseSingleHand(heroOpensAndFoldsPostflopFixture)]);

    expect(stats).toMatchObject({
      handsPlayed: 1,
      totalProfit: -0.14,
      totalBigBlindsWon: -7,
      bbPer100: -700,
      vpip: 100,
      pfr: 100,
      cBetFlop: 100,
      wtsd: 0,
      wsd: 0,
    });
    expect(stats.sampleSizes.cBetFlopOpportunities).toBe(1);
  });

  it("Fixture C: Hero reaches showdown and wins", () => {
    const stats = calculateStats([parseSingleHand(heroWinsActualShowdownFixture)]);

    expect(stats).toMatchObject({
      handsPlayed: 1,
      totalProfit: 0.17,
      totalBigBlindsWon: 8.5,
      bbPer100: 850,
      vpip: 100,
      pfr: 100,
      wtsd: 100,
      wsd: 100,
    });
    expect(stats.sampleSizes.wentToShowdown).toBe(1);
  });

  it("Fixture D: Hero reaches showdown and loses", () => {
    const stats = calculateStats([parseSingleHand(heroLosesActualShowdownFixture)]);

    expect(stats).toMatchObject({
      handsPlayed: 1,
      totalProfit: -0.06,
      totalBigBlindsWon: -3,
      bbPer100: -300,
      vpip: 100,
      pfr: 100,
      wtsd: 100,
      wsd: 0,
    });
    expect(stats.sampleSizes.wentToShowdown).toBe(1);
  });

  it("Fixture E: Hero 3bets only when facing one prior raise", () => {
    const stats = calculateStats([parseSingleHand(heroThreeBetFixture)]);

    expect(stats).toMatchObject({
      handsPlayed: 1,
      totalProfit: 0.09,
      totalBigBlindsWon: 4.5,
      bbPer100: 450,
      vpip: 100,
      pfr: 100,
      threeBet: 100,
      wtsd: 0,
      wsd: 0,
    });
    expect(stats.sampleSizes.threeBetOpportunities).toBe(1);
  });

  it("Fixture F: multiway pots count a single Hero showdown", () => {
    const stats = calculateStats([parseSingleHand(multiwayShowdownFixture)]);

    expect(stats).toMatchObject({
      handsPlayed: 1,
      totalProfit: -0.06,
      totalBigBlindsWon: -3,
      bbPer100: -300,
      vpip: 100,
      pfr: 0,
      threeBet: 0,
      wtsd: 100,
      wsd: 0,
    });
    expect(stats.sampleSizes.threeBetOpportunities).toBe(1);
    expect(stats.sampleSizes.wentToShowdown).toBe(1);
  });

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

  it("does not count donk-bet flops as Hero c-bet opportunities", () => {
    const stats = calculateStats([parseSingleHand(villainDonksIntoPreflopAggressorFixture)]);

    expect(stats.sampleSizes.cBetFlopOpportunities).toBe(0);
    expect(stats.cBetFlop).toBe(0);
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
    expect(calculateStats([parseSingleHand(heroWinsActualShowdownFixture)]).wsd).toBe(100);
    expect(calculateStats([findHand("6299122116")]).wsd).toBe(0);
  });

  it("does not count postflop pots collected after folds as WTSD or W$SD", () => {
    const stats = calculateStats([findHand("6299122102")]);

    expect(stats.sampleSizes.sawFlop).toBe(1);
    expect(stats.sampleSizes.wentToShowdown).toBe(0);
    expect(stats.wtsd).toBe(0);
    expect(stats.wsd).toBe(0);
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
    expect(stats.positionStats.BTN.wtsd).toBe(50);
    expect(stats.positionStats.BTN.wsd).toBe(0);
  });

  it("calculates profit by position with each hand's big blind size", () => {
    const stats = calculateStats([findHand("6347530307"), findHand("6375710066")]);

    expect(stats.positionStats.BB.handsPlayed).toBe(2);
    expect(stats.positionStats.BB.totalProfit).toBeCloseTo(-0.12);
    expect(stats.positionStats.BB.totalBigBlindsWon).toBeCloseTo(-4.5);
    expect(stats.positionStats.BB.bbPer100).toBeCloseTo(-225);
  });

  it("keeps position aggregates equal to global hand, profit, and BB totals", () => {
    const stats = calculateStats(hands);
    const positionStats = Object.values(stats.positionStats);

    expect(positionStats.reduce((total, position) => total + position.handsPlayed, 0)).toBe(
      stats.handsPlayed,
    );
    expect(positionStats.reduce((total, position) => total + position.totalProfit, 0)).toBeCloseTo(
      stats.totalProfit,
    );
    expect(
      positionStats.reduce((total, position) => total + position.totalBigBlindsWon, 0),
    ).toBeCloseTo(stats.totalBigBlindsWon);
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
      wentToShowdown: 1,
    });
  });
});
