import { calculateStats } from "./stats/calculateStats";
import type { PokerSession } from "./sessions";

export type SessionInsightClassification = "improved" | "similar" | "worse";

export type SessionInsightMetricFormat = "bb" | "bbPer100" | "count" | "duration" | "percent";

export interface SessionScorecardRow {
  readonly key: SessionInsightMetricKey;
  readonly label: string;
  readonly format: SessionInsightMetricFormat;
  readonly sessionValue: number;
  readonly averageValue: number;
  readonly delta: number;
  readonly classification: SessionInsightClassification;
}

export interface SessionInsightResult {
  readonly selectedSession: PokerSession | null;
  readonly baselineSessions: readonly PokerSession[];
  readonly lowConfidence: boolean;
  readonly lowConfidenceReason: string | null;
  readonly scorecardRows: readonly SessionScorecardRow[];
  readonly highlights: readonly string[];
  readonly trends: readonly string[];
}

type SessionInsightMetricKey =
  | "handCount"
  | "durationMinutes"
  | "profitBb"
  | "bbPer100"
  | "vpip"
  | "pfr"
  | "vpipPfrGap"
  | "threeBet"
  | "wtsd"
  | "wsd"
  | "btnProfitBb"
  | "bbProfitBb"
  | "sbProfitBb";

type ImprovementDirection = "higher" | "lower";

type SessionMetricSnapshot = Record<SessionInsightMetricKey, number>;

interface SessionMetricDefinition {
  readonly key: SessionInsightMetricKey;
  readonly label: string;
  readonly format: SessionInsightMetricFormat;
  readonly direction: ImprovementDirection;
  readonly threshold: number;
}

const MIN_CONFIDENT_SESSIONS = 3;
const MIN_CONFIDENT_HANDS = 500;

const SCORECARD_METRICS: readonly SessionMetricDefinition[] = [
  {
    key: "handCount",
    label: "Hands Played",
    format: "count",
    direction: "higher",
    threshold: 10,
  },
  {
    key: "durationMinutes",
    label: "Session Duration",
    format: "duration",
    direction: "higher",
    threshold: 15,
  },
  {
    key: "profitBb",
    label: "Profit BB",
    format: "bb",
    direction: "higher",
    threshold: 10,
  },
  {
    key: "bbPer100",
    label: "BB/100",
    format: "bbPer100",
    direction: "higher",
    threshold: 20,
  },
  {
    key: "vpip",
    label: "VPIP",
    format: "percent",
    direction: "lower",
    threshold: 5,
  },
  {
    key: "pfr",
    label: "PFR",
    format: "percent",
    direction: "higher",
    threshold: 5,
  },
  {
    key: "vpipPfrGap",
    label: "VPIP/PFR Gap",
    format: "percent",
    direction: "lower",
    threshold: 3,
  },
  {
    key: "threeBet",
    label: "3BET",
    format: "percent",
    direction: "higher",
    threshold: 3,
  },
  {
    key: "wtsd",
    label: "WTSD",
    format: "percent",
    direction: "lower",
    threshold: 5,
  },
  {
    key: "wsd",
    label: "W$SD",
    format: "percent",
    direction: "higher",
    threshold: 5,
  },
  {
    key: "btnProfitBb",
    label: "BTN Profit",
    format: "bb",
    direction: "higher",
    threshold: 10,
  },
  {
    key: "bbProfitBb",
    label: "BB Profit",
    format: "bb",
    direction: "higher",
    threshold: 10,
  },
  {
    key: "sbProfitBb",
    label: "SB Profit",
    format: "bb",
    direction: "higher",
    threshold: 10,
  },
];

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function createSessionSnapshot(session: PokerSession): SessionMetricSnapshot {
  const stats = calculateStats(session.hands);

  return {
    handCount: session.handCount,
    durationMinutes: session.durationMinutes,
    profitBb: session.profitBb,
    bbPer100: session.bbPer100,
    vpip: session.vpip,
    pfr: session.pfr,
    vpipPfrGap: Math.max(0, roundStat(session.vpip - session.pfr)),
    threeBet: session.threeBet,
    wtsd: session.wtsd,
    wsd: session.wsd,
    btnProfitBb: stats.positionStats.BTN.totalBigBlindsWon,
    bbProfitBb: stats.positionStats.BB.totalBigBlindsWon,
    sbProfitBb: stats.positionStats.SB.totalBigBlindsWon,
  };
}

function averageSnapshots(snapshots: readonly SessionMetricSnapshot[]): SessionMetricSnapshot {
  const divisor = snapshots.length || 1;
  const empty = Object.fromEntries(
    SCORECARD_METRICS.map((metric) => [metric.key, 0]),
  ) as SessionMetricSnapshot;

  const totals = snapshots.reduce<SessionMetricSnapshot>((accumulator, snapshot) => {
    SCORECARD_METRICS.forEach((metric) => {
      accumulator[metric.key] += snapshot[metric.key];
    });

    return accumulator;
  }, empty);

  return Object.fromEntries(
    SCORECARD_METRICS.map((metric) => [metric.key, roundStat(totals[metric.key] / divisor)]),
  ) as SessionMetricSnapshot;
}

function classifyDelta(
  delta: number,
  definition: SessionMetricDefinition,
): SessionInsightClassification {
  if (Math.abs(delta) < definition.threshold) {
    return "similar";
  }

  if (definition.direction === "higher") {
    return delta > 0 ? "improved" : "worse";
  }

  return delta < 0 ? "improved" : "worse";
}

function createScorecardRows(
  sessionSnapshot: SessionMetricSnapshot,
  baselineSnapshot: SessionMetricSnapshot,
): SessionScorecardRow[] {
  return SCORECARD_METRICS.map((definition) => {
    const sessionValue = sessionSnapshot[definition.key];
    const averageValue = baselineSnapshot[definition.key];
    const delta = roundStat(sessionValue - averageValue);

    return {
      key: definition.key,
      label: definition.label,
      format: definition.format,
      sessionValue,
      averageValue,
      delta,
      classification: classifyDelta(delta, definition),
    };
  });
}

function getRow(
  rows: readonly SessionScorecardRow[],
  key: SessionInsightMetricKey,
): SessionScorecardRow | null {
  return rows.find((row) => row.key === key) ?? null;
}

function getBestSessionValue(
  sessions: readonly PokerSession[],
  key: SessionInsightMetricKey,
): number {
  return Math.max(...sessions.map((session) => createSessionSnapshot(session)[key]));
}

function createHighlights(
  rows: readonly SessionScorecardRow[],
  sessions: readonly PokerSession[],
  selectedSession: PokerSession,
): string[] {
  const highlights: string[] = [];
  const vpipPfrGap = getRow(rows, "vpipPfrGap");
  const wtsd = getRow(rows, "wtsd");
  const bbProfit = getRow(rows, "bbProfitBb");
  const btnProfit = getRow(rows, "btnProfitBb");
  const profitBb = getRow(rows, "profitBb");
  const selectedSnapshot = createSessionSnapshot(selectedSession);

  if (vpipPfrGap?.classification === "improved") {
    highlights.push("Lower VPIP/PFR gap than average.");
  }

  if (wtsd?.classification === "worse") {
    highlights.push("WTSD increased significantly versus average.");
  }

  if (
    bbProfit?.classification === "improved" &&
    selectedSnapshot.bbProfitBb >= getBestSessionValue(sessions, "bbProfitBb")
  ) {
    highlights.push("Best BB defense so far.");
  } else if (bbProfit?.classification === "improved") {
    highlights.push("Big Blind losses were lower than average.");
  }

  if (
    btnProfit?.classification === "improved" &&
    selectedSnapshot.btnProfitBb >= getBestSessionValue(sessions, "btnProfitBb")
  ) {
    highlights.push("Highest BTN profit so far.");
  } else if (btnProfit?.classification === "improved") {
    highlights.push("Button performance improved versus average.");
  }

  if (profitBb?.classification === "worse") {
    highlights.push("Session result was below average.");
  }

  return highlights.slice(0, 3);
}

function createTrends(rows: readonly SessionScorecardRow[], lowConfidence: boolean): string[] {
  if (lowConfidence) {
    return [];
  }

  const trends: string[] = [];
  const vpip = getRow(rows, "vpip");
  const wtsd = getRow(rows, "wtsd");
  const bbProfit = getRow(rows, "bbProfitBb");
  const btnProfit = getRow(rows, "btnProfitBb");

  if (vpip?.classification === "improved") {
    trends.push("You are becoming tighter preflop.");
  }

  if (wtsd?.classification === "improved") {
    trends.push("You are reaching showdown less often.");
  }

  if (bbProfit?.classification === "improved") {
    trends.push("Your blind losses are improving.");
  }

  if (btnProfit?.classification === "improved") {
    trends.push("Button profitability is increasing.");
  }

  return trends;
}

function getLowConfidenceReason(sessions: readonly PokerSession[]): string | null {
  const totalHands = sessions.reduce((sum, session) => sum + session.handCount, 0);

  if (sessions.length < MIN_CONFIDENT_SESSIONS || totalHands < MIN_CONFIDENT_HANDS) {
    return "Low confidence due to limited history.";
  }

  return null;
}

export function getSessionInsights(
  sessions: readonly PokerSession[],
  selectedSessionId: string | null,
): SessionInsightResult {
  const selectedSession =
    sessions.find((session) => session.id === selectedSessionId) ?? sessions[0] ?? null;

  if (selectedSession === null) {
    return {
      selectedSession: null,
      baselineSessions: [],
      lowConfidence: true,
      lowConfidenceReason: "Not enough session history yet.",
      scorecardRows: [],
      highlights: [],
      trends: [],
    };
  }

  const baselineSessions = sessions.filter((session) => session.id !== selectedSession.id);

  if (baselineSessions.length === 0) {
    return {
      selectedSession,
      baselineSessions,
      lowConfidence: true,
      lowConfidenceReason: "Not enough session history yet.",
      scorecardRows: [],
      highlights: [],
      trends: [],
    };
  }

  const lowConfidenceReason = getLowConfidenceReason(sessions);
  const lowConfidence = lowConfidenceReason !== null;
  const sessionSnapshot = createSessionSnapshot(selectedSession);
  const baselineSnapshot = averageSnapshots(baselineSessions.map(createSessionSnapshot));
  const scorecardRows = createScorecardRows(sessionSnapshot, baselineSnapshot);

  return {
    selectedSession,
    baselineSessions,
    lowConfidence,
    lowConfidenceReason,
    scorecardRows,
    highlights: createHighlights(scorecardRows, sessions, selectedSession),
    trends: createTrends(scorecardRows, lowConfidence),
  };
}
