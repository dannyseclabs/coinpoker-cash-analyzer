import type { PokerPosition, PositionStats, StatisticsResult } from "../../types";

export const DISPLAY_POSITIONS: readonly PokerPosition[] = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];

export const MIN_RELIABLE_HIGHLIGHT_HANDS = 30;

export type PositionSampleLabel = "Small sample" | "Medium sample" | "Reliable sample";

export interface PositionHighlights {
  readonly best: PositionStats | null;
  readonly worst: PositionStats | null;
  readonly mostActive: PositionStats | null;
}

export function getDisplayPositionStats(stats: StatisticsResult): PositionStats[] {
  return DISPLAY_POSITIONS.map((position) => stats.positionStats[position]);
}

export function getPositionSampleLabel(handsPlayed: number): PositionSampleLabel {
  if (handsPlayed < 30) {
    return "Small sample";
  }

  if (handsPlayed < 100) {
    return "Medium sample";
  }

  return "Reliable sample";
}

export function pickBestPosition(positionStats: readonly PositionStats[]): PositionStats | null {
  const candidates = positionStats.filter(
    (stats) => stats.handsPlayed >= MIN_RELIABLE_HIGHLIGHT_HANDS,
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.reduce((best, current) => (current.bbPer100 > best.bbPer100 ? current : best));
}

export function pickWorstPosition(positionStats: readonly PositionStats[]): PositionStats | null {
  const candidates = positionStats.filter(
    (stats) => stats.handsPlayed >= MIN_RELIABLE_HIGHLIGHT_HANDS,
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.reduce((worst, current) =>
    current.bbPer100 < worst.bbPer100 ? current : worst,
  );
}

export function pickMostActivePosition(
  positionStats: readonly PositionStats[],
): PositionStats | null {
  const candidates = positionStats.filter((stats) => stats.handsPlayed > 0);

  if (candidates.length === 0) {
    return null;
  }

  return candidates.reduce((mostActive, current) =>
    current.vpip > mostActive.vpip ? current : mostActive,
  );
}

export function getPositionHighlights(positionStats: readonly PositionStats[]): PositionHighlights {
  return {
    best: pickBestPosition(positionStats),
    worst: pickWorstPosition(positionStats),
    mostActive: pickMostActivePosition(positionStats),
  };
}
