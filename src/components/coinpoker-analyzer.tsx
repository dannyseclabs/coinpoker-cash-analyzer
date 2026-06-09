"use client";

import { useMemo, useState } from "react";

import {
  didHeroReachShowdown,
  getFilteredAndSortedHands,
  getHandExplorerSummary,
  paginateHands,
  sortHands,
  type HandExplorerDateRangeFilter,
  type HandExplorerFilters,
  type HandExplorerPageSize,
  type HandExplorerPositionFilter,
  type HandExplorerResultFilter,
  type HandExplorerShowdownFilter,
  type HandExplorerSort,
  type HandExplorerSortDirection,
  type HandExplorerSortKey,
} from "@/src/lib/handExplorer";
import { detectLeaks } from "@/src/lib/leaks/detectLeaks";
import { parseCoinPokerFile } from "@/src/lib/parser/parseCoinPokerFile";
import { calculateStats } from "@/src/lib/stats/calculateStats";
import {
  createHoleCardMatrix,
  getHoleCardSampleLabel,
  type HoleCardOccurrence,
  type HoleCardMatrixCell,
} from "@/src/lib/stats/holeCardMatrix";
import {
  getDisplayPositionStats,
  getPositionHighlights,
  getPositionSampleLabel,
} from "@/src/lib/stats/positionAnalysis";
import type { HandAction, LeakResult, PokerHand, PokerStreet, StatisticsResult } from "@/src/types";

interface AnalyzerResult {
  readonly fileName: string;
  readonly hands: readonly PokerHand[];
  readonly stats: StatisticsResult;
  readonly leaks: readonly LeakResult[];
}

interface SelectedHoleCardOccurrenceRow {
  readonly occurrence: HoleCardOccurrence;
  readonly hand: PokerHand | null;
}

type HoleCardMatrixMetric = "bbPer100" | "totalProfit" | "handsPlayed" | "vpipFrequency";

const HOLE_CARD_MATRIX_METRICS: readonly {
  readonly label: string;
  readonly value: HoleCardMatrixMetric;
}[] = [
  { label: "BB/100", value: "bbPer100" },
  { label: "Total Profit", value: "totalProfit" },
  { label: "Hands Played", value: "handsPlayed" },
  { label: "VPIP Frequency", value: "vpipFrequency" },
];

const HOLE_CARD_LEGEND = [
  {
    className: "border-emerald-700 bg-emerald-800",
    label: "Dark Green = Strong Positive",
  },
  {
    className: "border-emerald-200 bg-emerald-100",
    label: "Light Green = Positive",
  },
  {
    className: "border-zinc-200 bg-zinc-100",
    label: "Grey = No Sample",
  },
  {
    className: "border-red-200 bg-red-100",
    label: "Light Red = Negative",
  },
  {
    className: "border-red-700 bg-red-800",
    label: "Dark Red = Strong Negative",
  },
] as const;

const DEFAULT_HAND_EXPLORER_FILTERS: HandExplorerFilters = {
  position: "All",
  result: "All",
  showdown: "All",
  dateRange: "All hands",
  heroCardsSearch: "",
};

const POSITION_FILTER_OPTIONS: readonly HandExplorerPositionFilter[] = [
  "All",
  "UTG",
  "HJ",
  "CO",
  "BTN",
  "SB",
  "BB",
];
const RESULT_FILTER_OPTIONS: readonly HandExplorerResultFilter[] = [
  "All",
  "Won",
  "Lost",
  "Break-even",
];
const SHOWDOWN_FILTER_OPTIONS: readonly HandExplorerShowdownFilter[] = [
  "All",
  "Showdown",
  "No Showdown",
];
const DATE_RANGE_FILTER_OPTIONS: readonly HandExplorerDateRangeFilter[] = [
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 30 days",
  "All hands",
];
const HAND_EXPLORER_SORT_OPTIONS: readonly {
  readonly label: string;
  readonly value: HandExplorerSortKey;
}[] = [
  { label: "Date", value: "date" },
  { label: "Hero Net", value: "heroNet" },
  { label: "Pot", value: "pot" },
  { label: "Position", value: "position" },
];
const HAND_EXPLORER_SORT_DIRECTION_OPTIONS: readonly {
  readonly label: string;
  readonly value: HandExplorerSortDirection;
}[] = [
  { label: "↓ Descending", value: "desc" },
  { label: "↑ Ascending", value: "asc" },
];
const HAND_EXPLORER_PAGE_SIZE_OPTIONS: readonly HandExplorerPageSize[] = [25, 50, 100];
const STREET_LABELS: Readonly<Record<PokerStreet, string>> = {
  preflop: "Preflop",
  flop: "Flop",
  turn: "Turn",
  river: "River",
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

function formatCurrency(value: number): string {
  return `₮${formatNumber(value)}`;
}

function formatSignedNumber(value: number): string {
  return `${value >= 0 ? "+" : ""}${formatNumber(value)}`;
}

function formatSignedCurrency(value: number): string {
  return `${value >= 0 ? "+" : ""}${formatCurrency(value)}`;
}

function formatPercent(value: number): string {
  return `${formatNumber(value)}%`;
}

function formatCards(cards: readonly string[] | null): string {
  return cards?.join(" ") ?? "-";
}

function formatBoard(hand: PokerHand): string {
  return [
    ...(hand.board.flop ?? []),
    ...(hand.board.turn === null ? [] : [hand.board.turn]),
    ...(hand.board.river === null ? [] : [hand.board.river]),
  ].join(" ");
}

function formatStakes(hand: PokerHand): string {
  return `${formatCurrency(hand.stakes.smallBlind)} / ${formatCurrency(hand.stakes.bigBlind)}`;
}

function formatNullableCurrency(value: number | null): string {
  return value === null ? "-" : formatCurrency(value);
}

function formatHeroShowdownStatus(hand: PokerHand): string {
  return didHeroReachShowdown(hand) ? "Yes" : "No";
}

function formatActionType(type: HandAction["type"]): string {
  return type.replaceAll("_", " ");
}

function formatActionDetail(action: HandAction): string {
  const details = [
    action.amount === null ? null : `Amount ${formatCurrency(action.amount)}`,
    action.raiseTo === null ? null : `Raise to ${formatCurrency(action.raiseTo)}`,
  ].filter((value): value is string => value !== null);

  return details.length === 0 ? "-" : details.join(" | ");
}

function getShowdownResult(hand: PokerHand, playerName: string, wonAmount: number): string {
  if (wonAmount > 0 || hand.showdown?.winnerNames.includes(playerName)) {
    return "Won";
  }

  return "Lost";
}

function getWinRate(cell: HoleCardMatrixCell): number {
  if (cell.handsPlayed === 0) {
    return 0;
  }

  return (cell.winCount / cell.handsPlayed) * 100;
}

function getVpipFrequency(cell: HoleCardMatrixCell): number {
  if (cell.handsPlayed === 0) {
    return 0;
  }

  return (cell.vpipCount / cell.handsPlayed) * 100;
}

function formatConfidentBbPer100(cell: HoleCardMatrixCell): string {
  return cell.handsPlayed >= 30 ? formatSignedNumber(cell.bbPer100) : "Not enough sample";
}

function getSampleSizeName(cell: HoleCardMatrixCell): string {
  return getHoleCardSampleLabel(cell.handsPlayed).replace(" Sample", "");
}

function getHoleCardMetricValue(cell: HoleCardMatrixCell, metric: HoleCardMatrixMetric): number {
  if (metric === "totalProfit") {
    return cell.totalBigBlindsWon;
  }

  if (metric === "handsPlayed") {
    return cell.handsPlayed;
  }

  if (metric === "vpipFrequency") {
    return getVpipFrequency(cell);
  }

  return cell.bbPer100;
}

function getHoleCardTone(cell: HoleCardMatrixCell, metric: HoleCardMatrixMetric): string {
  if (cell.handsPlayed === 0) {
    return "border-zinc-200 bg-zinc-100 text-zinc-400 hover:bg-zinc-200";
  }

  const value = getHoleCardMetricValue(cell, metric);

  if (metric === "handsPlayed") {
    if (value >= 30) {
      return "border-emerald-700 bg-emerald-800 text-white hover:bg-emerald-700";
    }

    if (value >= 10) {
      return "border-emerald-200 bg-emerald-100 text-emerald-950 hover:bg-emerald-200";
    }

    return "border-red-200 bg-red-100 text-red-950 hover:bg-red-200";
  }

  if (metric === "vpipFrequency") {
    if (value >= 75) {
      return "border-emerald-700 bg-emerald-800 text-white hover:bg-emerald-700";
    }

    if (value > 0) {
      return "border-emerald-200 bg-emerald-100 text-emerald-950 hover:bg-emerald-200";
    }

    return "border-zinc-200 bg-zinc-100 text-zinc-500 hover:bg-zinc-200";
  }

  if (value >= 50) {
    return "border-emerald-700 bg-emerald-800 text-white hover:bg-emerald-700";
  }

  if (value > 0) {
    return "border-emerald-200 bg-emerald-100 text-emerald-950 hover:bg-emerald-200";
  }

  if (value <= -50) {
    return "border-red-700 bg-red-800 text-white hover:bg-red-700";
  }

  return "border-red-200 bg-red-100 text-red-950 hover:bg-red-200";
}

function getHoleCardTooltip(cell: HoleCardMatrixCell): string {
  return [
    `Hand: ${cell.notation}`,
    "",
    `Hands Played: ${cell.handsPlayed}`,
    "",
    `Profit: ${formatSignedNumber(cell.totalBigBlindsWon)} BB`,
    "",
    `BB/100: ${formatSignedNumber(cell.bbPer100)}`,
    "",
    `Sample Size:`,
    getSampleSizeName(cell),
  ].join("\n");
}

function validateFileContent(file: File, text: string): string | null {
  if (!file.name.toLowerCase().endsWith(".txt")) {
    return "Upload a .txt CoinPoker hand history file.";
  }

  if (!text.includes("CoinPoker Hand")) {
    return "This file does not look like a CoinPoker hand history.";
  }

  if (!text.includes("NLH")) {
    return "No NLH hands were found in this file.";
  }

  if (!text.includes("Hero")) {
    return "No Hero entries were found in this file.";
  }

  return null;
}

function StatTile({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div className="border border-zinc-200 bg-white p-4">
      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-2 text-2xl font-semibold text-zinc-950">{value}</dd>
    </div>
  );
}

function PositionHighlight({
  label,
  title,
  value,
}: Readonly<{
  label: string;
  title: string;
  value: string | undefined;
}>) {
  return (
    <div className="border border-zinc-200 bg-white p-4">
      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-2 flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-zinc-950">{title}</span>
        {value === undefined ? null : (
          <span className="text-sm font-medium text-zinc-600">{value}</span>
        )}
      </dd>
    </div>
  );
}

function HandDetailPanel({
  hand,
  onClose,
}: Readonly<{
  hand: PokerHand;
  onClose: () => void;
}>) {
  const boardCards = formatBoard(hand);

  return (
    <div
      aria-label={`Hand ${hand.handId} detail`}
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/40"
      role="dialog"
    >
      <div className="flex h-full w-full max-w-4xl flex-col overflow-y-auto bg-white shadow-xl">
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Hand Detail
              </p>
              <h2 className="mt-1 text-xl font-semibold text-zinc-950">{hand.handId}</h2>
              <p className="mt-1 text-sm text-zinc-600">{hand.date}</p>
            </div>
            <button
              className="border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Stakes</dt>
              <dd className="mt-1 font-semibold">{formatStakes(hand)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Table</dt>
              <dd className="mt-1 font-semibold">{hand.tableName ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Hero cards</dt>
              <dd className="mt-1 font-semibold">{formatCards(hand.heroCards)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Hero position</dt>
              <dd className="mt-1 font-semibold">{hand.heroPosition}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Hero net</dt>
              <dd className="mt-1 font-semibold">{formatSignedCurrency(hand.heroNetResult)}</dd>
            </div>
          </dl>
        </header>

        <div className="flex flex-col gap-6 px-5 py-5">
          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Players</h3>
            <div className="overflow-x-auto border border-zinc-200">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                  <tr>
                    <th className="border-b border-zinc-200 px-3 py-2">Seat</th>
                    <th className="border-b border-zinc-200 px-3 py-2">Player</th>
                    <th className="border-b border-zinc-200 px-3 py-2">Stack</th>
                    <th className="border-b border-zinc-200 px-3 py-2">Hero</th>
                  </tr>
                </thead>
                <tbody>
                  {hand.players.map((player) => (
                    <tr key={player.seat} className="odd:bg-white even:bg-zinc-50">
                      <td className="border-b border-zinc-100 px-3 py-2">{player.seat}</td>
                      <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                        {player.name}
                      </td>
                      <td className="border-b border-zinc-100 px-3 py-2">
                        {formatCurrency(player.startingStack)}
                      </td>
                      <td className="border-b border-zinc-100 px-3 py-2">
                        {player.isHero ? "Hero" : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Board</h3>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="border border-zinc-200 bg-zinc-50 p-3">
                <dt className="text-xs uppercase tracking-wide text-zinc-500">Flop</dt>
                <dd className="mt-1 font-semibold">{formatCards(hand.board.flop)}</dd>
              </div>
              <div className="border border-zinc-200 bg-zinc-50 p-3">
                <dt className="text-xs uppercase tracking-wide text-zinc-500">Turn</dt>
                <dd className="mt-1 font-semibold">{hand.board.turn ?? "-"}</dd>
              </div>
              <div className="border border-zinc-200 bg-zinc-50 p-3">
                <dt className="text-xs uppercase tracking-wide text-zinc-500">River</dt>
                <dd className="mt-1 font-semibold">{hand.board.river ?? "-"}</dd>
              </div>
            </div>
            <p className="text-sm text-zinc-600">Full board: {boardCards || "-"}</p>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Action Timeline</h3>
            {(["preflop", "flop", "turn", "river"] as const).map((street) => (
              <div key={street} className="border border-zinc-200">
                <h4 className="border-b border-zinc-200 bg-zinc-100 px-3 py-2 text-sm font-semibold">
                  {STREET_LABELS[street]}
                </h4>
                {hand.streetActions[street].length === 0 ? (
                  <p className="px-3 py-3 text-sm text-zinc-600">No actions recorded.</p>
                ) : (
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="text-xs uppercase tracking-wide text-zinc-500">
                      <tr>
                        <th className="border-b border-zinc-100 px-3 py-2">Player</th>
                        <th className="border-b border-zinc-100 px-3 py-2">Action</th>
                        <th className="border-b border-zinc-100 px-3 py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hand.streetActions[street].map((action) => (
                        <tr
                          key={`${action.street}-${action.order}`}
                          className="odd:bg-white even:bg-zinc-50"
                        >
                          <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                            {action.playerName}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2 capitalize">
                            {formatActionType(action.type)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatActionDetail(action)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Showdown</h3>
            {hand.showdown === null || hand.showdown.entries.length === 0 ? (
              <p className="border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
                No visible showdown entries.
              </p>
            ) : (
              <div className="overflow-x-auto border border-zinc-200">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                    <tr>
                      <th className="border-b border-zinc-200 px-3 py-2">Player</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Cards</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Result</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hand.showdown.entries.map((entry) => (
                      <tr key={entry.playerName} className="odd:bg-white even:bg-zinc-50">
                        <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                          {entry.playerName}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {formatCards(entry.cards)}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {getShowdownResult(hand, entry.playerName, entry.wonAmount)}
                          {entry.handDescription === null ? "" : ` (${entry.handDescription})`}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {formatCurrency(entry.wonAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export function CoinPokerAnalyzer() {
  const [result, setResult] = useState<AnalyzerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [selectedHoleCard, setSelectedHoleCard] = useState<string | null>(null);
  const [selectedHand, setSelectedHand] = useState<PokerHand | null>(null);
  const [handExplorerFilters, setHandExplorerFilters] = useState<HandExplorerFilters>(
    DEFAULT_HAND_EXPLORER_FILTERS,
  );
  const [handExplorerSort, setHandExplorerSort] = useState<HandExplorerSort>({
    key: "date",
    direction: "desc",
  });
  const [handExplorerPage, setHandExplorerPage] = useState(1);
  const [handExplorerPageSize, setHandExplorerPageSize] = useState<HandExplorerPageSize>(25);
  const [holeCardMatrixMetric, setHoleCardMatrixMetric] =
    useState<HoleCardMatrixMetric>("bbPer100");

  const filteredAndSortedHands = useMemo(
    () =>
      result === null
        ? []
        : getFilteredAndSortedHands(result.hands, handExplorerFilters, handExplorerSort),
    [handExplorerFilters, handExplorerSort, result],
  );
  const handExplorerSummary = useMemo(
    () => getHandExplorerSummary(filteredAndSortedHands),
    [filteredAndSortedHands],
  );
  const handExplorerPageResult = useMemo(
    () =>
      paginateHands(filteredAndSortedHands, {
        page: handExplorerPage,
        pageSize: handExplorerPageSize,
      }),
    [filteredAndSortedHands, handExplorerPage, handExplorerPageSize],
  );
  const visibleHands = handExplorerPageResult.hands;
  const holeCardMatrix = useMemo(
    () => (result === null ? null : createHoleCardMatrix(result.hands)),
    [result],
  );
  const selectedHoleCardCell =
    holeCardMatrix === null || selectedHoleCard === null
      ? null
      : (holeCardMatrix.cells[selectedHoleCard] ?? null);
  const selectedHoleCardOccurrences = useMemo<readonly SelectedHoleCardOccurrenceRow[]>(() => {
    if (result === null || selectedHoleCardCell === null) {
      return [];
    }

    const occurrenceByHandId = new Map(
      selectedHoleCardCell.occurrences.map((occurrence) => [occurrence.handId, occurrence]),
    );
    const sortedHands = sortHands(
      result.hands.filter((hand) => occurrenceByHandId.has(hand.handId)),
      { key: "date", direction: "desc" },
    );
    const sortedHandIds = new Set(sortedHands.map((hand) => hand.handId));
    const sortedRows = sortedHands.flatMap((hand): SelectedHoleCardOccurrenceRow[] => {
      const occurrence = occurrenceByHandId.get(hand.handId);

      return occurrence === undefined ? [] : [{ occurrence, hand }];
    });
    const missingRows = selectedHoleCardCell.occurrences
      .filter((occurrence) => !sortedHandIds.has(occurrence.handId))
      .map((occurrence) => ({ occurrence, hand: null }));

    return [...sortedRows, ...missingRows];
  }, [result, selectedHoleCardCell]);
  const positionStats = useMemo(
    () => (result === null ? [] : getDisplayPositionStats(result.stats)),
    [result],
  );
  const positionHighlights = useMemo(() => {
    if (positionStats.length === 0) {
      return null;
    }

    return getPositionHighlights(positionStats);
  }, [positionStats]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setError(null);
    setResult(null);
    setSelectedHoleCard(null);
    setSelectedHand(null);
    setHandExplorerFilters(DEFAULT_HAND_EXPLORER_FILTERS);
    setHandExplorerSort({ key: "date", direction: "desc" });
    setHandExplorerPage(1);
    setHandExplorerPageSize(25);

    if (file === undefined) {
      return;
    }

    setIsReading(true);

    try {
      const text = await file.text();
      const validationError = validateFileContent(file, text);

      if (validationError !== null) {
        setError(validationError);
        return;
      }

      const hands = parseCoinPokerFile(text);

      if (hands.length === 0) {
        setError("The parser did not find any supported CoinPoker NLH cash hands.");
        return;
      }

      const stats = calculateStats(hands);
      const leaks = detectLeaks(stats);

      setResult({
        fileName: file.name,
        hands,
        stats,
        leaks,
      });
    } catch {
      setError("Could not read or parse this file.");
    } finally {
      setIsReading(false);
      event.target.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            CoinPoker Cash Analyzer V1
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Local hand history tester</h1>
        </header>

        <section className="border border-dashed border-zinc-300 bg-white p-6">
          <label className="flex cursor-pointer flex-col gap-3">
            <span className="text-sm font-medium text-zinc-700">
              Upload a CoinPoker `.txt` hand history export
            </span>
            <input
              accept=".txt,text/plain"
              className="block w-full text-sm text-zinc-700 file:mr-4 file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-zinc-800"
              disabled={isReading}
              type="file"
              onChange={handleFileChange}
            />
          </label>
          {isReading ? <p className="mt-4 text-sm text-zinc-600">Reading file...</p> : null}
          {error !== null ? (
            <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
          ) : null}
        </section>

        {result !== null ? (
          <>
            <section className="flex flex-col gap-3">
              <div>
                <h2 className="text-xl font-semibold">Summary</h2>
                <p className="text-sm text-zinc-600">{result.fileName}</p>
              </div>
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <StatTile label="Parsed hands" value={formatNumber(result.stats.handsPlayed)} />
                <StatTile label="Total profit" value={formatCurrency(result.stats.totalProfit)} />
                <StatTile label="BB/100" value={formatNumber(result.stats.bbPer100)} />
                <StatTile label="VPIP" value={formatPercent(result.stats.vpip)} />
                <StatTile label="PFR" value={formatPercent(result.stats.pfr)} />
                <StatTile label="3Bet" value={formatPercent(result.stats.threeBet)} />
                <StatTile label="Limp" value={formatPercent(result.stats.limp)} />
                <StatTile label="CBet Flop" value={formatPercent(result.stats.cBetFlop)} />
                <StatTile label="WTSD" value={formatPercent(result.stats.wtsd)} />
                <StatTile label="W$SD" value={formatPercent(result.stats.wsd)} />
              </dl>
            </section>

            {positionHighlights !== null ? (
              <section className="flex flex-col gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Position Analysis</h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    Position results are noisy on small samples. Use at least 1,000+ hands for
                    meaningful winrate conclusions.
                  </p>
                </div>
                <dl className="grid gap-3 md:grid-cols-3">
                  <PositionHighlight
                    label="Best Position"
                    title={positionHighlights.best?.position ?? "Not enough sample"}
                    value={
                      positionHighlights.best === null
                        ? undefined
                        : `${formatSignedNumber(positionHighlights.best.bbPer100)} BB/100`
                    }
                  />
                  <PositionHighlight
                    label="Worst Position"
                    title={positionHighlights.worst?.position ?? "Not enough sample"}
                    value={
                      positionHighlights.worst === null
                        ? undefined
                        : `${formatSignedNumber(positionHighlights.worst.bbPer100)} BB/100`
                    }
                  />
                  <PositionHighlight
                    label="Most Active Position"
                    title={positionHighlights.mostActive?.position ?? "Not enough sample"}
                    value={
                      positionHighlights.mostActive === null
                        ? undefined
                        : `VPIP ${formatPercent(positionHighlights.mostActive.vpip)}`
                    }
                  />
                </dl>
                <div className="overflow-x-auto border border-zinc-200 bg-white">
                  <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                    <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                      <tr>
                        <th className="border-b border-zinc-200 px-3 py-2">Position</th>
                        <th className="border-b border-zinc-200 px-3 py-2">Hands</th>
                        <th className="border-b border-zinc-200 px-3 py-2">Sample</th>
                        <th className="border-b border-zinc-200 px-3 py-2">VPIP</th>
                        <th className="border-b border-zinc-200 px-3 py-2">PFR</th>
                        <th className="border-b border-zinc-200 px-3 py-2">Profit</th>
                        <th className="border-b border-zinc-200 px-3 py-2">BB/100</th>
                        <th className="border-b border-zinc-200 px-3 py-2">WTSD</th>
                        <th className="border-b border-zinc-200 px-3 py-2">W$SD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positionStats.map((stats) => (
                        <tr key={stats.position} className="odd:bg-white even:bg-zinc-50">
                          <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                            {stats.position}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatNumber(stats.handsPlayed)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2 text-zinc-600">
                            {getPositionSampleLabel(stats.handsPlayed)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatPercent(stats.vpip)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatPercent(stats.pfr)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatCurrency(stats.totalProfit)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatNumber(stats.bbPer100)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatPercent(stats.wtsd)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatPercent(stats.wsd)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {holeCardMatrix !== null ? (
              <section className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Hole Card Matrix</h2>
                    <p className="mt-1 text-sm text-zinc-600">
                      Starting hand performance is noisy on small samples. BB/100 is shown
                      confidently from 30+ hands.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      View Metric
                    </span>
                    <div className="flex flex-wrap gap-1 border border-zinc-200 bg-white p-1">
                      {HOLE_CARD_MATRIX_METRICS.map((metric) => (
                        <button
                          key={metric.value}
                          className={`px-3 py-1.5 text-xs font-medium transition ${
                            holeCardMatrixMetric === metric.value
                              ? "bg-zinc-950 text-white"
                              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                          }`}
                          type="button"
                          onClick={() => setHoleCardMatrixMetric(metric.value)}
                        >
                          {metric.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-zinc-600">
                  {HOLE_CARD_LEGEND.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <span className={`h-3 w-3 border ${item.className}`} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto border border-zinc-200 bg-white px-2 py-3">
                  <div
                    className="mx-auto grid w-fit min-w-[520px] gap-0.5"
                    style={{ gridTemplateColumns: "repeat(13, minmax(38px, 44px))" }}
                  >
                    {holeCardMatrix.rows.flat().map((cell) => (
                      <button
                        key={cell.notation}
                        aria-label={`Show ${cell.notation} details`}
                        className={`flex aspect-square items-center justify-center border text-center text-[11px] font-semibold leading-none transition focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-1 ${getHoleCardTone(
                          cell,
                          holeCardMatrixMetric,
                        )}`}
                        title={getHoleCardTooltip(cell)}
                        type="button"
                        onClick={() => setSelectedHoleCard(cell.notation)}
                      >
                        {cell.notation}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedHoleCardCell === null ? (
                  <p className="border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
                    Select a starting hand to inspect its occurrences.
                  </p>
                ) : (
                  <div className="border border-zinc-200 bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Selected Hand: {selectedHoleCardCell.notation}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-600">
                          {getHoleCardSampleLabel(selectedHoleCardCell.handsPlayed)}
                        </p>
                      </div>
                      <dl className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">
                            Hands Played
                          </dt>
                          <dd className="mt-1 font-semibold">
                            {formatNumber(selectedHoleCardCell.handsPlayed)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">Profit</dt>
                          <dd className="mt-1 font-semibold">
                            {formatSignedCurrency(selectedHoleCardCell.totalProfit)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">BB/100</dt>
                          <dd className="mt-1 font-semibold">
                            {formatConfidentBbPer100(selectedHoleCardCell)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">
                            Win Rate
                          </dt>
                          <dd className="mt-1 font-semibold">
                            {formatPercent(getWinRate(selectedHoleCardCell))}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-4 overflow-x-auto border border-zinc-200">
                      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                          <tr>
                            <th className="border-b border-zinc-200 px-3 py-2">Hand ID</th>
                            <th className="border-b border-zinc-200 px-3 py-2">Date</th>
                            <th className="border-b border-zinc-200 px-3 py-2">Position</th>
                            <th className="border-b border-zinc-200 px-3 py-2">Hero Net</th>
                            <th className="border-b border-zinc-200 px-3 py-2">Hero Showdown</th>
                            <th className="border-b border-zinc-200 px-3 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedHoleCardOccurrences.length === 0 ? (
                            <tr>
                              <td
                                className="border-b border-zinc-100 px-3 py-3 text-zinc-600"
                                colSpan={6}
                              >
                                No occurrences for this hand in the imported sample.
                              </td>
                            </tr>
                          ) : (
                            selectedHoleCardOccurrences.map(({ occurrence, hand }) => {
                              return (
                                <tr
                                  key={occurrence.handId}
                                  className="odd:bg-white even:bg-zinc-50"
                                >
                                  <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                                    {occurrence.handId}
                                  </td>
                                  <td className="border-b border-zinc-100 px-3 py-2">
                                    {occurrence.date}
                                  </td>
                                  <td className="border-b border-zinc-100 px-3 py-2">
                                    {occurrence.position}
                                  </td>
                                  <td className="border-b border-zinc-100 px-3 py-2">
                                    {formatSignedCurrency(occurrence.profit)}
                                  </td>
                                  <td className="border-b border-zinc-100 px-3 py-2">
                                    {hand === null ? "-" : formatHeroShowdownStatus(hand)}
                                  </td>
                                  <td className="border-b border-zinc-100 px-3 py-2">
                                    <button
                                      className="border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50"
                                      disabled={hand === null}
                                      type="button"
                                      onClick={() => {
                                        if (hand !== null) {
                                          setSelectedHand(hand);
                                        }
                                      }}
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            ) : null}

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Leaks</h2>
              {result.leaks.length > 0 ? (
                <ul className="grid gap-3">
                  {result.leaks.map((leak) => (
                    <li key={leak.id} className="border border-zinc-200 bg-white p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{leak.title}</h3>
                        <span className="bg-zinc-100 px-2 py-1 text-xs uppercase text-zinc-600">
                          {leak.severity}
                        </span>
                        <span className="bg-zinc-100 px-2 py-1 text-xs uppercase text-zinc-600">
                          {leak.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-700">
                        {leak.metric}: {formatNumber(leak.value)} / threshold{" "}
                        {formatNumber(leak.threshold)}
                      </p>
                      <p className="mt-2 text-sm text-zinc-600">{leak.explanation}</p>
                      <p className="mt-1 text-sm font-medium text-zinc-800">
                        {leak.recommendation}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
                  No V1 leaks detected, or the sample is too small for guarded leak rules.
                </p>
              )}
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Hand Explorer</h2>
                <p className="text-sm text-zinc-600">
                  Showing {formatNumber(visibleHands.length)} of{" "}
                  {formatNumber(filteredAndSortedHands.length)} filtered hands.
                </p>
              </div>
              <dl className="grid gap-3 sm:grid-cols-3">
                <StatTile
                  label="Filtered hands"
                  value={formatNumber(handExplorerSummary.handsCount)}
                />
                <StatTile
                  label="Filtered profit"
                  value={formatSignedCurrency(handExplorerSummary.totalProfit)}
                />
                <StatTile
                  label="Average filtered BB/100"
                  value={formatSignedNumber(handExplorerSummary.bbPer100)}
                />
              </dl>
              <div className="grid gap-3 border border-zinc-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-7">
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Position
                  </span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    value={handExplorerFilters.position}
                    onChange={(event) => {
                      setHandExplorerFilters((filters) => ({
                        ...filters,
                        position: event.target.value as HandExplorerPositionFilter,
                      }));
                      setHandExplorerPage(1);
                    }}
                  >
                    {POSITION_FILTER_OPTIONS.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Result
                  </span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    value={handExplorerFilters.result}
                    onChange={(event) => {
                      setHandExplorerFilters((filters) => ({
                        ...filters,
                        result: event.target.value as HandExplorerResultFilter,
                      }));
                      setHandExplorerPage(1);
                    }}
                  >
                    {RESULT_FILTER_OPTIONS.map((resultFilter) => (
                      <option key={resultFilter} value={resultFilter}>
                        {resultFilter}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Hero Showdown
                  </span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    value={handExplorerFilters.showdown}
                    onChange={(event) => {
                      setHandExplorerFilters((filters) => ({
                        ...filters,
                        showdown: event.target.value as HandExplorerShowdownFilter,
                      }));
                      setHandExplorerPage(1);
                    }}
                  >
                    {SHOWDOWN_FILTER_OPTIONS.map((showdownFilter) => (
                      <option key={showdownFilter} value={showdownFilter}>
                        {showdownFilter}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Hero Cards
                  </span>
                  <input
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    placeholder="AA, AKs, AKo, KJ"
                    type="text"
                    value={handExplorerFilters.heroCardsSearch}
                    onChange={(event) => {
                      setHandExplorerFilters((filters) => ({
                        ...filters,
                        heroCardsSearch: event.target.value,
                      }));
                      setHandExplorerPage(1);
                    }}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Date
                  </span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    value={handExplorerFilters.dateRange}
                    onChange={(event) => {
                      setHandExplorerFilters((filters) => ({
                        ...filters,
                        dateRange: event.target.value as HandExplorerDateRangeFilter,
                      }));
                      setHandExplorerPage(1);
                    }}
                  >
                    {DATE_RANGE_FILTER_OPTIONS.map((dateRange) => (
                      <option key={dateRange} value={dateRange}>
                        {dateRange}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Sort By
                  </span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    value={handExplorerSort.key}
                    onChange={(event) => {
                      setHandExplorerSort((sort) => ({
                        ...sort,
                        key: event.target.value as HandExplorerSortKey,
                      }));
                      setHandExplorerPage(1);
                    }}
                  >
                    {HAND_EXPLORER_SORT_OPTIONS.map((sortOption) => (
                      <option key={sortOption.value} value={sortOption.value}>
                        {sortOption.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Direction
                  </span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-2 text-sm"
                    value={handExplorerSort.direction}
                    onChange={(event) => {
                      setHandExplorerSort((sort) => ({
                        ...sort,
                        direction: event.target.value as HandExplorerSortDirection,
                      }));
                      setHandExplorerPage(1);
                    }}
                  >
                    {HAND_EXPLORER_SORT_DIRECTION_OPTIONS.map((sortDirection) => (
                      <option key={sortDirection.value} value={sortDirection.value}>
                        {sortDirection.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border border-zinc-200 bg-white px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    className="border border-zinc-300 px-3 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={handExplorerPageResult.page <= 1}
                    type="button"
                    onClick={() => setHandExplorerPage((page) => Math.max(1, page - 1))}
                  >
                    Previous
                  </button>
                  <span className="text-zinc-600">
                    Page {formatNumber(handExplorerPageResult.page)} of{" "}
                    {formatNumber(handExplorerPageResult.pageCount)}
                  </span>
                  <button
                    className="border border-zinc-300 px-3 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={handExplorerPageResult.page >= handExplorerPageResult.pageCount}
                    type="button"
                    onClick={() =>
                      setHandExplorerPage((page) =>
                        Math.min(handExplorerPageResult.pageCount, page + 1),
                      )
                    }
                  >
                    Next
                  </button>
                </div>
                <label className="flex items-center gap-2 text-zinc-600">
                  <span>Rows</span>
                  <select
                    className="border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-950"
                    value={handExplorerPageSize}
                    onChange={(event) => {
                      setHandExplorerPageSize(Number(event.target.value) as HandExplorerPageSize);
                      setHandExplorerPage(1);
                    }}
                  >
                    {HAND_EXPLORER_PAGE_SIZE_OPTIONS.map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="overflow-x-auto border border-zinc-200 bg-white">
                <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                  <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                    <tr>
                      <th className="border-b border-zinc-200 px-3 py-2">Hand ID</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Date</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Table</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Blinds</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Position</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Hero Cards</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Board</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Pot</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Hero Net</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Hero Showdown</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleHands.length === 0 ? (
                      <tr>
                        <td
                          className="border-b border-zinc-100 px-3 py-3 text-zinc-600"
                          colSpan={11}
                        >
                          No hands match the current filters.
                        </td>
                      </tr>
                    ) : (
                      visibleHands.map((hand) => (
                        <tr key={hand.id} className="odd:bg-white even:bg-zinc-50">
                          <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                            {hand.handId}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">{hand.date}</td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {hand.tableName ?? "-"}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatStakes(hand)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {hand.heroPosition}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatCards(hand.heroCards)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatBoard(hand) || "-"}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatNullableCurrency(hand.totalPot)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatSignedCurrency(hand.heroNetResult)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            {formatHeroShowdownStatus(hand)}
                          </td>
                          <td className="border-b border-zinc-100 px-3 py-2">
                            <button
                              className="border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                              type="button"
                              onClick={() => setSelectedHand(hand)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </div>
      {selectedHand === null ? null : (
        <HandDetailPanel hand={selectedHand} onClose={() => setSelectedHand(null)} />
      )}
    </main>
  );
}
