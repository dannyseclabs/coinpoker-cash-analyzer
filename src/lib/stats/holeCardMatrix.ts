import type { Card, PokerHand, PokerPosition } from "../../types";

export const HOLE_CARD_RANKS = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

export type HoleCardRank = (typeof HOLE_CARD_RANKS)[number];

export type HoleCardSampleLabel =
  | "Very small sample"
  | "Small Sample"
  | "Medium Sample"
  | "Reliable Sample";

export interface HoleCardOccurrence {
  readonly handId: string;
  readonly date: string;
  readonly position: PokerPosition;
  readonly profit: number;
  readonly bigBlindsWon: number;
}

export interface HoleCardMatrixCell {
  readonly notation: string;
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly totalBigBlindsWon: number;
  readonly bbPer100: number;
  readonly vpipCount: number;
  readonly winCount: number;
  readonly lossCount: number;
  readonly occurrences: readonly HoleCardOccurrence[];
}

export interface HoleCardMatrixResult {
  readonly cells: Readonly<Record<string, HoleCardMatrixCell>>;
  readonly rows: readonly (readonly HoleCardMatrixCell[])[];
}

interface HoleCardAccumulator {
  readonly notation: string;
  handsPlayed: number;
  totalProfit: number;
  totalBigBlindsWon: number;
  vpipCount: number;
  winCount: number;
  lossCount: number;
  occurrences: HoleCardOccurrence[];
}

const HERO_NAME = "Hero";

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function getCardRank(card: Card): HoleCardRank {
  return card[0] as HoleCardRank;
}

function getCardSuit(card: Card): string {
  return card[1] ?? "";
}

function compareRanks(left: HoleCardRank, right: HoleCardRank): number {
  return HOLE_CARD_RANKS.indexOf(left) - HOLE_CARD_RANKS.indexOf(right);
}

function sortRanksHighToLow(
  left: HoleCardRank,
  right: HoleCardRank,
): readonly [HoleCardRank, HoleCardRank] {
  return compareRanks(left, right) <= 0 ? [left, right] : [right, left];
}

function isHeroVoluntaryPreflopAction(hand: PokerHand): boolean {
  return hand.streetActions.preflop.some(
    (action) =>
      action.playerName === HERO_NAME && ["all_in", "bet", "call", "raise"].includes(action.type),
  );
}

function createAccumulator(notation: string): HoleCardAccumulator {
  return {
    notation,
    handsPlayed: 0,
    totalProfit: 0,
    totalBigBlindsWon: 0,
    vpipCount: 0,
    winCount: 0,
    lossCount: 0,
    occurrences: [],
  };
}

function finalizeAccumulator(accumulator: HoleCardAccumulator): HoleCardMatrixCell {
  return {
    notation: accumulator.notation,
    handsPlayed: accumulator.handsPlayed,
    totalProfit: roundStat(accumulator.totalProfit),
    totalBigBlindsWon: roundStat(accumulator.totalBigBlindsWon),
    bbPer100:
      accumulator.handsPlayed === 0
        ? 0
        : roundStat((accumulator.totalBigBlindsWon / accumulator.handsPlayed) * 100),
    vpipCount: accumulator.vpipCount,
    winCount: accumulator.winCount,
    lossCount: accumulator.lossCount,
    occurrences: accumulator.occurrences,
  };
}

function getExistingCell(
  cells: Readonly<Record<string, HoleCardMatrixCell>>,
  notation: string,
): HoleCardMatrixCell {
  const cell = cells[notation];

  if (cell === undefined) {
    throw new Error(`Missing hole card matrix cell: ${notation}`);
  }

  return cell;
}

export function normalizeHoleCards(cards: readonly [Card, Card] | null): string | null {
  if (cards === null) {
    return null;
  }

  const [firstCard, secondCard] = cards;
  const firstRank = getCardRank(firstCard);
  const secondRank = getCardRank(secondCard);

  if (firstRank === secondRank) {
    return `${firstRank}${secondRank}`;
  }

  const [highRank, lowRank] = sortRanksHighToLow(firstRank, secondRank);
  const suitedness = getCardSuit(firstCard) === getCardSuit(secondCard) ? "s" : "o";

  return `${highRank}${lowRank}${suitedness}`;
}

export function getMatrixNotation(rowRank: HoleCardRank, columnRank: HoleCardRank): string {
  if (rowRank === columnRank) {
    return `${rowRank}${columnRank}`;
  }

  const [highRank, lowRank] = sortRanksHighToLow(rowRank, columnRank);
  const suitedness = compareRanks(rowRank, columnRank) < 0 ? "s" : "o";

  return `${highRank}${lowRank}${suitedness}`;
}

export function getHoleCardSampleLabel(handsPlayed: number): HoleCardSampleLabel {
  if (handsPlayed < 5) {
    return "Very small sample";
  }

  if (handsPlayed < 10) {
    return "Small Sample";
  }

  if (handsPlayed < 30) {
    return "Medium Sample";
  }

  return "Reliable Sample";
}

export function createHoleCardMatrix(hands: readonly PokerHand[]): HoleCardMatrixResult {
  const accumulators = Object.fromEntries(
    HOLE_CARD_RANKS.flatMap((rowRank) =>
      HOLE_CARD_RANKS.map((columnRank) => {
        const notation = getMatrixNotation(rowRank, columnRank);

        return [notation, createAccumulator(notation)] as const;
      }),
    ),
  ) as Record<string, HoleCardAccumulator>;

  for (const hand of hands) {
    const notation = normalizeHoleCards(hand.heroCards);

    if (notation === null) {
      continue;
    }

    const accumulator = accumulators[notation];

    if (accumulator === undefined) {
      continue;
    }

    const bigBlindsWon = hand.stakes.bigBlind > 0 ? hand.heroNetResult / hand.stakes.bigBlind : 0;

    accumulator.handsPlayed += 1;
    accumulator.totalProfit += hand.heroNetResult;
    accumulator.totalBigBlindsWon += bigBlindsWon;

    if (isHeroVoluntaryPreflopAction(hand)) {
      accumulator.vpipCount += 1;
    }

    if (hand.heroNetResult > 0) {
      accumulator.winCount += 1;
    }

    if (hand.heroNetResult < 0) {
      accumulator.lossCount += 1;
    }

    accumulator.occurrences.push({
      handId: hand.handId,
      date: hand.date,
      position: hand.heroPosition,
      profit: roundStat(hand.heroNetResult),
      bigBlindsWon: roundStat(bigBlindsWon),
    });
  }

  const cells = Object.fromEntries(
    Object.entries(accumulators).map(([notation, accumulator]) => [
      notation,
      finalizeAccumulator(accumulator),
    ]),
  ) as Readonly<Record<string, HoleCardMatrixCell>>;
  const rows = HOLE_CARD_RANKS.map((rowRank) =>
    HOLE_CARD_RANKS.map((columnRank) =>
      getExistingCell(cells, getMatrixNotation(rowRank, columnRank)),
    ),
  );

  return {
    cells,
    rows,
  };
}
