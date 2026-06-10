import type { HoleCardMatrixCell, HoleCardMatrixResult } from "./holeCardMatrix";
import { getHoleCardSampleLabel } from "./holeCardMatrix";
import { pickBestPosition, pickWorstPosition } from "./positionAnalysis";
import type { PokerHand, PositionStats } from "../../types";

const MIN_STARTING_HAND_INSIGHT_HANDS = 3;

export interface StartingHandInsight {
  readonly label: string;
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly bbPer100: number;
  readonly sampleLabel: string;
}

export interface HandInsight {
  readonly hand: PokerHand;
  readonly handId: string;
  readonly heroCards: PokerHand["heroCards"];
  readonly position: PokerHand["heroPosition"];
  readonly heroNet: number;
  readonly potSize: number | null;
}

export interface PositionInsight {
  readonly position: PositionStats["position"];
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly bbPer100: number;
}

function compareByNotation(left: HoleCardMatrixCell, right: HoleCardMatrixCell): number {
  return left.notation.localeCompare(right.notation);
}

function toStartingHandInsight(cell: HoleCardMatrixCell): StartingHandInsight {
  return {
    label: cell.notation,
    handsPlayed: cell.handsPlayed,
    totalProfit: cell.totalProfit,
    bbPer100: cell.bbPer100,
    sampleLabel: getHoleCardSampleLabel(cell.handsPlayed),
  };
}

function toHandInsight(hand: PokerHand): HandInsight {
  return {
    hand,
    handId: hand.handId,
    heroCards: hand.heroCards,
    position: hand.heroPosition,
    heroNet: hand.heroNetResult,
    potSize: hand.totalPot,
  };
}

function toPositionInsight(stats: PositionStats): PositionInsight {
  return {
    position: stats.position,
    handsPlayed: stats.handsPlayed,
    totalProfit: stats.totalProfit,
    bbPer100: stats.bbPer100,
  };
}

function getPlayedStartingHands(matrix: HoleCardMatrixResult): HoleCardMatrixCell[] {
  return Object.values(matrix.cells).filter((cell) => cell.handsPlayed > 0);
}

function getQualifiedStartingHands(matrix: HoleCardMatrixResult): HoleCardMatrixCell[] {
  return getPlayedStartingHands(matrix).filter(
    (cell) => cell.handsPlayed >= MIN_STARTING_HAND_INSIGHT_HANDS,
  );
}

export function getMostProfitableStartingHand(
  matrix: HoleCardMatrixResult,
): StartingHandInsight | null {
  const [best] = getQualifiedStartingHands(matrix).sort(
    (left, right) =>
      right.totalProfit - left.totalProfit ||
      right.handsPlayed - left.handsPlayed ||
      compareByNotation(left, right),
  );

  return best === undefined ? null : toStartingHandInsight(best);
}

export function getWorstStartingHand(matrix: HoleCardMatrixResult): StartingHandInsight | null {
  const [worst] = getQualifiedStartingHands(matrix).sort(
    (left, right) =>
      left.totalProfit - right.totalProfit ||
      right.handsPlayed - left.handsPlayed ||
      compareByNotation(left, right),
  );

  return worst === undefined ? null : toStartingHandInsight(worst);
}

export function getMostPlayedStartingHand(
  matrix: HoleCardMatrixResult,
): StartingHandInsight | null {
  const [mostPlayed] = getPlayedStartingHands(matrix).sort(
    (left, right) =>
      right.handsPlayed - left.handsPlayed ||
      right.totalProfit - left.totalProfit ||
      compareByNotation(left, right),
  );

  return mostPlayed === undefined ? null : toStartingHandInsight(mostPlayed);
}

export function getBiggestWinningHand(hands: readonly PokerHand[]): HandInsight | null {
  if (hands.length === 0) {
    return null;
  }

  const biggest = hands.reduce((best, current) =>
    current.heroNetResult > best.heroNetResult ? current : best,
  );

  return toHandInsight(biggest);
}

export function getBiggestLosingHand(hands: readonly PokerHand[]): HandInsight | null {
  if (hands.length === 0) {
    return null;
  }

  const biggest = hands.reduce((worst, current) =>
    current.heroNetResult < worst.heroNetResult ? current : worst,
  );

  return toHandInsight(biggest);
}

export function getBestPositionInsight(
  positionStats: readonly PositionStats[],
): PositionInsight | null {
  const best = pickBestPosition(positionStats);

  return best === null ? null : toPositionInsight(best);
}

export function getWorstPositionInsight(
  positionStats: readonly PositionStats[],
): PositionInsight | null {
  const worst = pickWorstPosition(positionStats);

  return worst === null ? null : toPositionInsight(worst);
}
