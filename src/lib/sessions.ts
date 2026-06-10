import { calculateStats } from "./stats/calculateStats";
import { getBiggestLosingHand, getBiggestWinningHand } from "./stats/summaryInsights";
import { isSplashPot } from "./stats/splashPots";
import type { PokerHand } from "../types";

export const DEFAULT_SESSION_GAP_MINUTES = 30;

const HAND_DATE_PATTERN = /^(\d{4})[/-](\d{2})[/-](\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/;
const MINUTE_MS = 60_000;

export interface PokerSession {
  readonly id: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly durationMinutes: number;
  readonly handCount: number;
  readonly hands: readonly PokerHand[];
  readonly profitAmount: number;
  readonly profitBb: number;
  readonly bbPer100: number;
  readonly vpip: number;
  readonly pfr: number;
  readonly threeBet: number;
  readonly wtsd: number;
  readonly wsd: number;
  readonly biggestWin: PokerHand | null;
  readonly biggestLoss: PokerHand | null;
  readonly splashPotCount: number;
  readonly estimatedTables: number;
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function parseHandDate(hand: PokerHand): Date | null {
  const match = hand.date.match(HAND_DATE_PATTERN);

  if (!match?.[1] || !match[2] || !match[3]) {
    return null;
  }

  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4] ?? 0),
    Number(match[5] ?? 0),
    Number(match[6] ?? 0),
  );
}

function getHandTimestamp(hand: PokerHand): number {
  return parseHandDate(hand)?.getTime() ?? 0;
}

function getSessionDurationMinutes(hands: readonly PokerHand[]): number {
  const firstHand = hands[0];
  const lastHand = hands.at(-1);

  if (firstHand === undefined || lastHand === undefined) {
    return 0;
  }

  return Math.max(
    0,
    roundStat((getHandTimestamp(lastHand) - getHandTimestamp(firstHand)) / MINUTE_MS),
  );
}

export function getEstimatedTableCount(hands: readonly PokerHand[]): number {
  const buckets = new Map<number, Set<string>>();

  for (const hand of hands) {
    if (hand.tableName === null) {
      continue;
    }

    const bucket = Math.floor(getHandTimestamp(hand) / MINUTE_MS);
    const tableNames = buckets.get(bucket) ?? new Set<string>();

    tableNames.add(hand.tableName);
    buckets.set(bucket, tableNames);
  }

  if (buckets.size === 0) {
    return 1;
  }

  return Math.max(1, ...Array.from(buckets.values(), (tableNames) => tableNames.size));
}

function createSession(hands: readonly PokerHand[], index: number): PokerSession {
  const stats = calculateStats(hands);
  const firstHand = hands[0];
  const lastHand = hands.at(-1);
  const startTime =
    firstHand === undefined ? new Date(0) : (parseHandDate(firstHand) ?? new Date(0));
  const endTime = lastHand === undefined ? new Date(0) : (parseHandDate(lastHand) ?? startTime);
  const normalWins = hands.filter((hand) => hand.heroNetResult > 0);
  const normalLosses = hands.filter((hand) => hand.heroNetResult < 0);

  return {
    id: `session-${index + 1}-${startTime.getTime()}`,
    startTime,
    endTime,
    durationMinutes: getSessionDurationMinutes(hands),
    handCount: hands.length,
    hands,
    profitAmount: stats.totalProfit,
    profitBb: stats.totalBigBlindsWon,
    bbPer100: stats.bbPer100,
    vpip: stats.vpip,
    pfr: stats.pfr,
    threeBet: stats.threeBet,
    wtsd: stats.wtsd,
    wsd: stats.wsd,
    biggestWin: getBiggestWinningHand(normalWins)?.hand ?? null,
    biggestLoss: getBiggestLosingHand(normalLosses)?.hand ?? null,
    splashPotCount: hands.filter(isSplashPot).length,
    estimatedTables: getEstimatedTableCount(hands),
  };
}

export function detectPokerSessions(
  hands: readonly PokerHand[],
  gapMinutes = DEFAULT_SESSION_GAP_MINUTES,
): PokerSession[] {
  const sortedHands = [...hands].sort(
    (left, right) => getHandTimestamp(left) - getHandTimestamp(right),
  );
  const sessionHands: PokerHand[][] = [];

  for (const hand of sortedHands) {
    const currentSession = sessionHands.at(-1);

    if (currentSession === undefined) {
      sessionHands.push([hand]);
      continue;
    }

    const previousHand = currentSession.at(-1);
    const gap =
      previousHand === undefined
        ? Number.POSITIVE_INFINITY
        : (getHandTimestamp(hand) - getHandTimestamp(previousHand)) / MINUTE_MS;

    if (gap <= gapMinutes) {
      currentSession.push(hand);
    } else {
      sessionHands.push([hand]);
    }
  }

  return sessionHands
    .map((session, index) => createSession(session, index))
    .sort((left, right) => right.startTime.getTime() - left.startTime.getTime());
}
