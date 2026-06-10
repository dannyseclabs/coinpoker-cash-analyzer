import type { HoleCardMatrixCell, HoleCardMatrixResult } from "./holeCardMatrix";
import { getHoleCardSampleLabel } from "./holeCardMatrix";
import { pickBestPosition, pickWorstPosition } from "./positionAnalysis";
import { classifySplashPot, isSplashPot } from "./splashPots";
import type { PokerHand, PositionStats } from "../../types";

const MIN_STARTING_HAND_INSIGHT_HANDS = 3;

export interface StartingHandInsight {
  readonly label: string;
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly totalBigBlindsWon: number;
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
  readonly potBb: number | null;
  readonly isSplashPotCandidate: boolean;
  readonly isSplashPot: boolean;
}

export interface PositionInsight {
  readonly position: PositionStats["position"];
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly totalBigBlindsWon: number;
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
    totalBigBlindsWon: cell.totalBigBlindsWon,
    bbPer100: cell.bbPer100,
    sampleLabel: getHoleCardSampleLabel(cell.handsPlayed),
  };
}

function toHandInsight(hand: PokerHand): HandInsight {
  const splashPot = classifySplashPot(hand);

  return {
    hand,
    handId: hand.handId,
    heroCards: hand.heroCards,
    position: hand.heroPosition,
    heroNet: hand.heroNetResult,
    potSize: hand.totalPot,
    potBb: splashPot.potBb,
    isSplashPotCandidate: splashPot.isSplashPotCandidate,
    isSplashPot: splashPot.isSplashPot,
  };
}

function toPositionInsight(stats: PositionStats): PositionInsight {
  return {
    position: stats.position,
    handsPlayed: stats.handsPlayed,
    totalProfit: stats.totalProfit,
    totalBigBlindsWon: stats.totalBigBlindsWon,
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

export function getNormalSummaryHands(hands: readonly PokerHand[]): PokerHand[] {
  return hands.filter((hand) => !isSplashPot(hand));
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
  const normalHands = hands.filter((hand) => !isSplashPot(hand));

  if (normalHands.length === 0) {
    return null;
  }

  const biggest = normalHands.reduce((best, current) =>
    current.heroNetResult > best.heroNetResult ? current : best,
  );

  return toHandInsight(biggest);
}

export function getBiggestLosingHand(hands: readonly PokerHand[]): HandInsight | null {
  const normalHands = hands.filter((hand) => !isSplashPot(hand));

  if (normalHands.length === 0) {
    return null;
  }

  const biggest = normalHands.reduce((worst, current) =>
    current.heroNetResult < worst.heroNetResult ? current : worst,
  );

  return toHandInsight(biggest);
}

export function getBiggestSplashPotWinningHand(hands: readonly PokerHand[]): HandInsight | null {
  const winningSplashPots = hands.filter((hand) => isSplashPot(hand) && hand.heroNetResult > 0);

  if (winningSplashPots.length === 0) {
    return null;
  }

  const biggest = winningSplashPots.reduce((best, current) =>
    current.heroNetResult > best.heroNetResult ? current : best,
  );

  return toHandInsight(biggest);
}

export function getBiggestSplashPotLosingHand(hands: readonly PokerHand[]): HandInsight | null {
  const losingSplashPots = hands.filter((hand) => isSplashPot(hand) && hand.heroNetResult < 0);

  if (losingSplashPots.length === 0) {
    return null;
  }

  const biggest = losingSplashPots.reduce((worst, current) =>
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
