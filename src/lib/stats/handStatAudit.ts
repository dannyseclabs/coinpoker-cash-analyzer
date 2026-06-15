import { didHeroReachTrackedShowdown, didHeroWinTrackedShowdown } from "../showdown";
import type { Card, PokerHand, PokerStreet } from "../../types";

const HERO_NAME = "Hero";
const STREET_ORDER: readonly PokerStreet[] = ["preflop", "flop", "turn", "river"];

export interface HandStatAudit {
  readonly handId: string;
  readonly heroSawFlop: boolean;
  readonly heroSawTurn: boolean;
  readonly heroSawRiver: boolean;
  readonly heroReachedShowdown: boolean;
  readonly heroWonShowdown: boolean;
  readonly heroFoldedStreet: PokerStreet | null;
  readonly heroNetBB: number;
  readonly board: string;
  readonly showdownPlayers: readonly string[];
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function getStreetIndex(street: PokerStreet): number {
  return STREET_ORDER.indexOf(street);
}

function didHeroFoldBeforeStreet(
  heroFoldedStreet: PokerStreet | null,
  street: Exclude<PokerStreet, "preflop">,
): boolean {
  if (heroFoldedStreet === null) {
    return false;
  }

  return getStreetIndex(heroFoldedStreet) < getStreetIndex(street);
}

function getHeroFoldedStreet(hand: PokerHand): PokerStreet | null {
  return (
    hand.actions.find((action) => action.playerName === HERO_NAME && action.type === "fold")
      ?.street ?? null
  );
}

function getBoardText(hand: PokerHand): string {
  const cards: Card[] = [];

  if (hand.board.flop !== null) {
    cards.push(...hand.board.flop);
  }

  if (hand.board.turn !== null) {
    cards.push(hand.board.turn);
  }

  if (hand.board.river !== null) {
    cards.push(hand.board.river);
  }

  return cards.join(" ");
}

export function getHandStatAudit(hand: PokerHand): HandStatAudit {
  const heroFoldedStreet = getHeroFoldedStreet(hand);
  const heroSawFlop =
    hand.board.flop !== null && !didHeroFoldBeforeStreet(heroFoldedStreet, "flop");
  const heroSawTurn =
    hand.board.turn !== null && !didHeroFoldBeforeStreet(heroFoldedStreet, "turn");
  const heroSawRiver =
    hand.board.river !== null && !didHeroFoldBeforeStreet(heroFoldedStreet, "river");
  const heroReachedShowdown =
    heroSawFlop && heroFoldedStreet === null && didHeroReachTrackedShowdown(hand);

  return {
    handId: hand.handId,
    heroSawFlop,
    heroSawTurn,
    heroSawRiver,
    heroReachedShowdown,
    heroWonShowdown: heroReachedShowdown && didHeroWinTrackedShowdown(hand),
    heroFoldedStreet,
    heroNetBB: hand.stakes.bigBlind > 0 ? roundStat(hand.heroNetResult / hand.stakes.bigBlind) : 0,
    board: getBoardText(hand),
    showdownPlayers: hand.showdown?.entries.map((entry) => entry.playerName) ?? [],
  };
}
