import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { parseCoinPokerFile } from "../lib/parser/parseCoinPokerFile";
import type { PokerHand } from "../types";

const fixturePath = join(process.cwd(), "src/tests/fixtures/coinpoker-v1-representative-hands.txt");
const fixture = readFileSync(fixturePath, "utf8");
const hands = parseCoinPokerFile(fixture);

function findHand(handId: string): PokerHand {
  const hand = hands.find((candidate) => candidate.handId === handId);

  expect(hand).toBeDefined();

  return hand as PokerHand;
}

describe("CoinPoker V1 parser", () => {
  it("returns only NLH hands and ignores mixed PLO hands", () => {
    expect(Array.isArray(hands)).toBe(true);
    expect(hands).toHaveLength(10);
    expect(hands.map((hand) => hand.handId)).not.toContain("6345250344");
  });

  it("parses hand header, stakes, date, table, button, players, and Hero cards", () => {
    const hand = findHand("6347530307");

    expect(hand).toMatchObject({
      handId: "6347530307",
      gameType: "NLH",
      date: "2026/06/07 19:20:28 CEST",
      tableName: "200600",
      maxPlayers: 6,
      buttonSeat: 4,
      heroSeat: 6,
      heroCards: ["Jh", "5h"],
      heroPosition: "BB",
      totalPot: 1.07,
      rake: 0.05,
    });
    expect(hand.stakes).toEqual({
      smallBlind: 0.02,
      bigBlind: 0.05,
      currency: "₮",
    });
    expect(hand.players).toHaveLength(6);
    expect(hand.players.map((player) => player.name)).toContain("3c9a3cef");
  });

  it("assigns 6-max positions from the button seat", () => {
    const hand = findHand("6347530307");

    expect(
      Object.fromEntries(hand.players.map((player) => [player.seat, player.position])),
    ).toEqual({
      1: "UTG",
      2: "HJ",
      3: "CO",
      4: "BTN",
      5: "SB",
      6: "BB",
    });
    expect(hand.heroPosition).toBe("BB");
  });

  it("parses board cards and action streets including raises and returned bets", () => {
    const hand = findHand("6347530307");
    const preflopRaise = hand.actions.find(
      (action) => action.rawLine === "3c9a3cef: raises ₮0.07 to ₮0.12",
    );
    const riverReturn = hand.actions.find((action) => action.rawLine === "3c9a3cef: RETURN ₮1.35");

    expect(hand.board).toEqual({
      flop: ["7c", "3h", "Jc"],
      turn: "6h",
      river: "Ad",
    });
    expect(preflopRaise).toMatchObject({
      street: "preflop",
      playerName: "3c9a3cef",
      type: "raise",
      amount: 0.07,
      raiseTo: 0.12,
    });
    expect(riverReturn).toMatchObject({
      street: "river",
      playerName: "3c9a3cef",
      type: "return",
      amount: 1.35,
    });
    expect(hand.streetActions.flop).toHaveLength(2);
    expect(hand.streetActions.turn).toHaveLength(2);
    expect(hand.streetActions.river).toHaveLength(5);
  });

  it("parses preflop-only hands with empty boards", () => {
    const hand = findHand("6347530308");

    expect(hand.board).toEqual({
      flop: null,
      turn: null,
      river: null,
    });
    expect(hand.streetActions.flop).toHaveLength(0);
    expect(hand.totalPot).toBe(0.12);
    expect(hand.rake).toBe(0);
  });

  it("parses auto big blind actions", () => {
    const hand = findHand("6359930071");
    const heroAutoBlind = hand.actions.find(
      (action) => action.rawLine === "Hero: posts auto big blind ₮0.02",
    );

    expect(heroAutoBlind).toMatchObject({
      street: "preflop",
      playerName: "Hero",
      type: "post_auto_big_blind",
      amount: 0.02,
    });
  });

  it("parses Hero collect lines and does not count RETURN as extra profit", () => {
    const hand = findHand("6299122102");
    const heroCollect = hand.actions.find(
      (action) => action.rawLine === "Hero collected ₮0.39 from pot",
    );
    const heroReturn = hand.actions.find((action) => action.rawLine === "Hero: RETURN ₮0.20");

    expect(heroCollect).toMatchObject({
      type: "collect",
      amount: 0.39,
    });
    expect(heroReturn).toMatchObject({
      type: "return",
      amount: 0.2,
    });
    expect(hand.showdown?.winnerNames).toContain("Hero");
    expect(hand.heroNetResult).toBe(0.19);
  });

  it("parses Hero all-in winning hands with SPLASH lines tolerated", () => {
    const hand = findHand("6299122111");

    expect(hand.actions.some((action) => action.rawLine.startsWith("SPLASH"))).toBe(false);
    expect(hand.actions.find((action) => action.rawLine === "Hero: ALLIN ₮1.83")).toMatchObject({
      street: "river",
      type: "all_in",
      amount: 1.83,
    });
    expect(hand.actions.find((action) => action.rawLine === "Hero: RETURN ₮1.83")).toMatchObject({
      type: "return",
      amount: 1.83,
    });
    expect(
      hand.actions.find((action) => action.rawLine === "Hero collected ₮0.81 from pot"),
    ).toMatchObject({
      type: "collect",
      amount: 0.81,
    });
    expect(hand.heroNetResult).toBe(0.42);
  });

  it("parses Hero all-in losing hands and showdown cards", () => {
    const hand = findHand("6299122116");
    const heroShowdown = hand.showdown?.entries.find((entry) => entry.playerName === "Hero");

    expect(hand.actions.find((action) => action.rawLine === "Hero: ALLIN ₮2.75")).toMatchObject({
      street: "river",
      type: "all_in",
      amount: 2.75,
    });
    expect(hand.actions.find((action) => action.rawLine === "Hero: RETURN ₮2.39")).toMatchObject({
      type: "return",
      amount: 2.39,
    });
    expect(hand.showdown?.winnerNames).toContain("97a8e3a4");
    expect(heroShowdown).toMatchObject({
      cards: ["Ks", "9d"],
      handDescription: "One Pair",
      wonAmount: 0,
    });
    expect(hand.heroNetResult).toBe(-0.65);
  });
});
