"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, UploadCloud } from "lucide-react";

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

type SummaryMetricLabel =
  | "Parsed hands"
  | "Total profit"
  | "BB/100"
  | "VPIP"
  | "PFR"
  | "3Bet"
  | "Limp"
  | "CBet Flop"
  | "WTSD"
  | "W$SD";

interface SummaryExplanation {
  readonly fullName: string;
  readonly explanation: string;
  readonly interpretation: string;
}

type MetricStatusTone = "green" | "blue" | "teal" | "amber" | "orange" | "red" | "neutral";

interface MetricStatus {
  readonly label: string;
  readonly tone: MetricStatusTone;
  readonly tooltip: string;
}

const SUMMARY_EXPLANATIONS: Readonly<Record<SummaryMetricLabel, SummaryExplanation>> = {
  "Parsed hands": {
    fullName: "Parsed Hands",
    explanation: "The number of supported CoinPoker hands found in the uploaded file.",
    interpretation: "More hands give more reliable stats; tiny samples can swing wildly.",
  },
  "Total profit": {
    fullName: "Total Profit",
    explanation: "Hero's total net result across all parsed hands.",
    interpretation: "Positive means Hero won overall; negative means Hero lost overall.",
  },
  "BB/100": {
    fullName: "Big Blinds per 100 Hands",
    explanation: "Hero's win rate normalized to 100 hands using the table big blind.",
    interpretation: "Higher is better; use large samples before trusting this number.",
  },
  VPIP: {
    fullName: "Voluntarily Put Money In Pot",
    explanation: "Shows how often Hero voluntarily plays a hand preflop.",
    interpretation: "Higher means looser; lower means tighter.",
  },
  PFR: {
    fullName: "Preflop Raise",
    explanation: "Shows how often Hero enters preflop with a raise.",
    interpretation: "Healthy PFR usually stays reasonably close to VPIP.",
  },
  "3Bet": {
    fullName: "Three-Bet",
    explanation: "Shows how often Hero re-raises after an earlier preflop raise.",
    interpretation: "Low can be too passive; high can be aggressive or opponent-dependent.",
  },
  Limp: {
    fullName: "Limp",
    explanation: "Shows how often Hero calls the big blind preflop instead of raising or folding.",
    interpretation: "Lower is usually better in most 6-max cash strategies.",
  },
  "CBet Flop": {
    fullName: "Continuation Bet Flop",
    explanation: "Shows how often Hero bets the flop after being the preflop raiser.",
    interpretation: "Too low can miss pressure spots; too high can become predictable.",
  },
  WTSD: {
    fullName: "Went To Showdown",
    explanation: "Shows how often Hero reaches showdown after seeing the flop.",
    interpretation: "Very high can mean calling too much with weak hands.",
  },
  W$SD: {
    fullName: "Won Money at Showdown",
    explanation: "Shows how often Hero wins money when reaching showdown.",
    interpretation: "Higher is better, but very high with low WTSD may mean over-folding.",
  },
};

const SECTION_GAP_CLASS = "flex flex-col gap-4";
const CARD_CLASS =
  "rounded-2xl border border-zinc-200/80 bg-white shadow-sm shadow-zinc-200/60 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/70";
const TABLE_CONTAINER_CLASS =
  "overflow-x-auto rounded-xl border border-zinc-200/80 bg-white shadow-sm shadow-zinc-200/50";
const TABLE_CLASS = "w-full border-collapse text-left text-sm";
const TABLE_HEAD_CLASS =
  "sticky top-0 z-10 border-b border-zinc-200 bg-zinc-100/90 text-[11px] font-semibold uppercase tracking-wide text-zinc-600 backdrop-blur";
const TABLE_HEADER_CELL_CLASS = "px-4 py-3 whitespace-nowrap";
const TABLE_CELL_CLASS = "border-b border-zinc-100 px-4 py-3 align-middle text-zinc-700";
const TABLE_NUMERIC_CELL_CLASS =
  "border-b border-zinc-100 px-4 py-3 text-right align-middle font-mono text-[13px] tabular-nums text-zinc-800";
const CONTROL_CLASS =
  "h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 shadow-sm transition focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:opacity-50";
const BUTTON_CLASS =
  "inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950/15 disabled:cursor-not-allowed disabled:opacity-45";
const SMALL_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950/15 disabled:cursor-not-allowed disabled:opacity-45";

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

function createMetricStatus(label: string, tone: MetricStatusTone, tooltip: string): MetricStatus {
  return {
    label,
    tone,
    tooltip,
  };
}

function getStatusToneClass(tone: MetricStatusTone): string {
  if (tone === "green") {
    return "border-emerald-400 bg-emerald-100 text-emerald-950 shadow-emerald-900/5";
  }

  if (tone === "blue") {
    return "border-blue-300 bg-blue-100 text-blue-950 shadow-blue-900/5";
  }

  if (tone === "teal") {
    return "border-cyan-300 bg-cyan-100 text-cyan-950 shadow-cyan-900/5";
  }

  if (tone === "amber") {
    return "border-amber-300 bg-amber-100 text-amber-950 shadow-amber-900/5";
  }

  if (tone === "orange") {
    return "border-orange-300 bg-orange-100 text-orange-950 shadow-orange-900/5";
  }

  if (tone === "neutral") {
    return "border-zinc-300 bg-zinc-100 text-zinc-800 shadow-zinc-900/5";
  }

  return "border-red-300 bg-red-100 text-red-950 shadow-red-900/5";
}

function getBbPer100Status(bbPer100: number): MetricStatus {
  if (bbPer100 < -1) {
    return createMetricStatus(
      "Losing",
      "red",
      "BB/100 below -1 means Hero is currently losing more than one big blind per 100 hands.",
    );
  }

  if (bbPer100 < 1) {
    return createMetricStatus(
      "Breakeven",
      "neutral",
      "BB/100 between -1 and 1 is roughly breakeven; sample size can easily move it.",
    );
  }

  if (bbPer100 < 8) {
    return createMetricStatus(
      "Winning",
      "blue",
      "BB/100 from 1 to 8 suggests Hero is winning, assuming the sample is large enough.",
    );
  }

  return createMetricStatus(
    "Crushing",
    "green",
    "BB/100 above 8 is a very strong win rate; confirm it with a large hand sample.",
  );
}

function getVpipStatus(vpip: number): MetricStatus {
  if (vpip < 20) {
    return createMetricStatus(
      "Tight",
      "teal",
      "VPIP below 20% is tight for 6-max cash and may mean Hero is passing up playable hands.",
    );
  }

  if (vpip <= 28) {
    return createMetricStatus(
      "Normal",
      "blue",
      "VPIP from 20% to 28% is a common healthy 6-max cash range.",
    );
  }

  if (vpip <= 35) {
    return createMetricStatus(
      "Loose",
      "orange",
      "VPIP from 28% to 35% is loose and needs disciplined postflop play.",
    );
  }

  return createMetricStatus(
    "Very Loose",
    "red",
    "VPIP above 35% is very loose and often means Hero is playing too many weak hands.",
  );
}

function getPfrStatus(pfr: number): MetricStatus {
  if (pfr < 15) {
    return createMetricStatus(
      "Passive",
      "amber",
      "PFR below 15% is passive for 6-max cash and can mean too much calling preflop.",
    );
  }

  if (pfr <= 24) {
    return createMetricStatus(
      "Normal",
      "blue",
      "PFR from 15% to 24% is a common healthy 6-max cash range.",
    );
  }

  return createMetricStatus(
    "Aggressive",
    "orange",
    "PFR above 24% is aggressive and can be profitable only with good hand selection.",
  );
}

function getThreeBetStatus(threeBet: number): MetricStatus {
  if (threeBet < 5) {
    return createMetricStatus(
      "Low",
      "teal",
      "3Bet below 5% is low and may indicate Hero is not re-raising enough strong hands.",
    );
  }

  if (threeBet <= 10) {
    return createMetricStatus(
      "Normal",
      "blue",
      "3Bet from 5% to 10% is a common solid 6-max cash range.",
    );
  }

  return createMetricStatus(
    "High",
    "orange",
    "3Bet above 10% is high and needs good opponent selection to avoid over-aggression.",
  );
}

function getLimpStatus(limp: number): MetricStatus {
  if (limp < 3) {
    return createMetricStatus(
      "Low",
      "green",
      "Limp below 3% is low, which is usually healthy in 6-max cash games.",
    );
  }

  if (limp <= 8) {
    return createMetricStatus(
      "Moderate",
      "amber",
      "Limp from 3% to 8% is moderate; check whether calls should be raises or folds.",
    );
  }

  return createMetricStatus(
    "High",
    "red",
    "Limp above 8% is high and often indicates too much passive preflop play.",
  );
}

function getCBetFlopStatus(cBetFlop: number): MetricStatus {
  if (cBetFlop < 45) {
    return createMetricStatus(
      "Low",
      "teal",
      "Flop CBet below 45% is low and may mean Hero is missing profitable pressure spots.",
    );
  }

  if (cBetFlop <= 65) {
    return createMetricStatus(
      "Normal",
      "blue",
      "Flop CBet from 45% to 65% is a common balanced cash-game range.",
    );
  }

  if (cBetFlop <= 80) {
    return createMetricStatus(
      "High",
      "orange",
      "Flop CBet from 65% to 80% is high and may become exploitable against callers.",
    );
  }

  return createMetricStatus(
    "Overcbetting",
    "red",
    "Flop CBet above 80% often means Hero is betting too many weak flops.",
  );
}

function getWtsdStatus(wtsd: number): MetricStatus {
  if (wtsd < 22) {
    return createMetricStatus(
      "Low",
      "teal",
      "WTSD below 22% can mean Hero is folding too often before showdown.",
    );
  }

  if (wtsd <= 30) {
    return createMetricStatus(
      "Normal",
      "blue",
      "WTSD from 22% to 30% is a common healthy cash-game range.",
    );
  }

  if (wtsd <= 50) {
    return createMetricStatus(
      "High",
      "orange",
      "WTSD from 30% to 50% is high and can indicate too much showdown curiosity.",
    );
  }

  return createMetricStatus(
    "Very High",
    "red",
    "WTSD above 50% often indicates calling too many marginal hands to showdown.",
  );
}

function getWsdStatus(wsd: number): MetricStatus {
  if (wsd < 45) {
    return createMetricStatus(
      "Poor",
      "red",
      "W$SD below 45% means Hero is losing too often when reaching showdown.",
    );
  }

  if (wsd <= 55) {
    return createMetricStatus(
      "Normal",
      "blue",
      "W$SD from 45% to 55% is a common normal showdown result range.",
    );
  }

  if (wsd <= 60) {
    return createMetricStatus(
      "Strong",
      "green",
      "W$SD from 55% to 60% is strong, especially with a normal WTSD.",
    );
  }

  return createMetricStatus(
    "Elite",
    "green",
    "W$SD above 60% is elite, but may also reflect a small sample or very selective showdowns.",
  );
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

function SectionHeader({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">{title}</h2>
      {description === undefined ? null : (
        <p className="max-w-3xl text-sm leading-6 text-zinc-600">{description}</p>
      )}
    </div>
  );
}

function StatTile({
  label,
  value,
  explanation,
  status,
}: Readonly<{
  label: string;
  value: string;
  explanation?: SummaryExplanation;
  status?: MetricStatus;
}>) {
  return (
    <div className={`${CARD_CLASS} p-4`}>
      <dt className="flex items-start justify-between gap-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
        <span>{label}</span>
        {status === undefined ? null : (
          <span
            className={`rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusToneClass(
              status.tone,
            )}`}
            title={status.tooltip}
          >
            {status.label}
          </span>
        )}
      </dt>
      <dd className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 tabular-nums">
        {value}
      </dd>
      {explanation === undefined ? null : (
        <details className="group mt-4 rounded-lg border border-zinc-100 bg-zinc-50/80 text-xs text-zinc-600 open:border-zinc-200 open:bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 font-medium text-zinc-700 transition hover:text-zinc-950 group-open:border-b group-open:border-zinc-100 [&::-webkit-details-marker]:hidden">
            <span>What this means</span>
            <span className="text-zinc-400 transition group-open:rotate-90">›</span>
          </summary>
          <div className="space-y-2 px-3 py-3 leading-5">
            <p className="font-semibold text-zinc-900">{explanation.fullName}</p>
            <p className="text-zinc-600">{explanation.explanation}</p>
            <p className="text-zinc-700">{explanation.interpretation}</p>
          </div>
        </details>
      )}
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
    <div className={`${CARD_CLASS} p-4`}>
      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-2 flex items-baseline gap-3">
        <span className="text-2xl font-semibold tracking-tight text-zinc-950">{title}</span>
        {value === undefined ? null : (
          <span className="font-mono text-sm font-medium tabular-nums text-zinc-600">{value}</span>
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
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/45 backdrop-blur-sm"
      role="dialog"
    >
      <div className="flex h-full w-full max-w-4xl flex-col overflow-y-auto bg-zinc-50 shadow-2xl">
        <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Hand Detail
              </p>
              <h2 className="mt-1 font-mono text-xl font-semibold tracking-tight text-zinc-950">
                {hand.handId}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">{hand.date}</p>
            </div>
            <button className={BUTTON_CLASS} type="button" onClick={onClose}>
              Close
            </button>
          </div>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Stakes</dt>
              <dd className="mt-1 font-mono font-semibold tabular-nums">{formatStakes(hand)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Table</dt>
              <dd className="mt-1 font-semibold">{hand.tableName ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Hero cards</dt>
              <dd className="mt-1 font-mono font-semibold">{formatCards(hand.heroCards)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Hero position</dt>
              <dd className="mt-1 font-semibold">{hand.heroPosition}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Hero net</dt>
              <dd className="mt-1 font-mono font-semibold tabular-nums">
                {formatSignedCurrency(hand.heroNetResult)}
              </dd>
            </div>
          </dl>
        </header>

        <div className="flex flex-col gap-5 px-5 py-5">
          <section className={SECTION_GAP_CLASS}>
            <h3 className="text-base font-semibold text-zinc-950">Players</h3>
            <div className={TABLE_CONTAINER_CLASS}>
              <table className={`${TABLE_CLASS} min-w-[560px]`}>
                <thead className={TABLE_HEAD_CLASS}>
                  <tr>
                    <th className={TABLE_HEADER_CELL_CLASS}>Seat</th>
                    <th className={TABLE_HEADER_CELL_CLASS}>Player</th>
                    <th className={TABLE_HEADER_CELL_CLASS}>Stack</th>
                    <th className={TABLE_HEADER_CELL_CLASS}>Hero</th>
                  </tr>
                </thead>
                <tbody>
                  {hand.players.map((player) => (
                    <tr key={player.seat} className="odd:bg-white even:bg-zinc-50/80">
                      <td className={TABLE_CELL_CLASS}>{player.seat}</td>
                      <td className={`${TABLE_CELL_CLASS} font-medium text-zinc-950`}>
                        {player.name}
                      </td>
                      <td className={TABLE_NUMERIC_CELL_CLASS}>
                        {formatCurrency(player.startingStack)}
                      </td>
                      <td className={TABLE_CELL_CLASS}>{player.isHero ? "Hero" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={SECTION_GAP_CLASS}>
            <h3 className="text-base font-semibold text-zinc-950">Board</h3>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div className={`${CARD_CLASS} p-3`}>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">Flop</dt>
                <dd className="mt-1 font-mono font-semibold">{formatCards(hand.board.flop)}</dd>
              </div>
              <div className={`${CARD_CLASS} p-3`}>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">Turn</dt>
                <dd className="mt-1 font-mono font-semibold">{hand.board.turn ?? "-"}</dd>
              </div>
              <div className={`${CARD_CLASS} p-3`}>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">River</dt>
                <dd className="mt-1 font-mono font-semibold">{hand.board.river ?? "-"}</dd>
              </div>
            </div>
            <p className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-700">
              Full board: {boardCards || "-"}
            </p>
          </section>

          <section className={SECTION_GAP_CLASS}>
            <h3 className="text-base font-semibold text-zinc-950">Action Timeline</h3>
            {(["preflop", "flop", "turn", "river"] as const).map((street) => (
              <div
                key={street}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white"
              >
                <h4 className="border-b border-zinc-200 bg-zinc-100/80 px-4 py-3 text-sm font-semibold">
                  {STREET_LABELS[street]}
                </h4>
                {hand.streetActions[street].length === 0 ? (
                  <p className="px-4 py-4 text-sm text-zinc-600">No actions recorded.</p>
                ) : (
                  <table className={TABLE_CLASS}>
                    <thead className="text-[11px] uppercase tracking-wide text-zinc-500">
                      <tr>
                        <th className={TABLE_HEADER_CELL_CLASS}>Player</th>
                        <th className={TABLE_HEADER_CELL_CLASS}>Action</th>
                        <th className={TABLE_HEADER_CELL_CLASS}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hand.streetActions[street].map((action) => (
                        <tr
                          key={`${action.street}-${action.order}`}
                          className="odd:bg-white even:bg-zinc-50/80"
                        >
                          <td className={`${TABLE_CELL_CLASS} font-medium text-zinc-950`}>
                            {action.playerName}
                          </td>
                          <td className={`${TABLE_CELL_CLASS} capitalize`}>
                            {formatActionType(action.type)}
                          </td>
                          <td className={TABLE_CELL_CLASS}>{formatActionDetail(action)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </section>

          <section className={SECTION_GAP_CLASS}>
            <h3 className="text-base font-semibold text-zinc-950">Showdown</h3>
            {hand.showdown === null || hand.showdown.entries.length === 0 ? (
              <p className={`${CARD_CLASS} p-4 text-sm text-zinc-600`}>
                No visible showdown entries.
              </p>
            ) : (
              <div className={TABLE_CONTAINER_CLASS}>
                <table className={`${TABLE_CLASS} min-w-[640px]`}>
                  <thead className={TABLE_HEAD_CLASS}>
                    <tr>
                      <th className={TABLE_HEADER_CELL_CLASS}>Player</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Cards</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Result</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hand.showdown.entries.map((entry) => (
                      <tr key={entry.playerName} className="odd:bg-white even:bg-zinc-50/80">
                        <td className={`${TABLE_CELL_CLASS} font-medium text-zinc-950`}>
                          {entry.playerName}
                        </td>
                        <td className={`${TABLE_CELL_CLASS} font-mono`}>
                          {formatCards(entry.cards)}
                        </td>
                        <td className={TABLE_CELL_CLASS}>
                          {getShowdownResult(hand, entry.playerName, entry.wonAmount)}
                          {entry.handDescription === null ? "" : ` (${entry.handDescription})`}
                        </td>
                        <td className={TABLE_NUMERIC_CELL_CLASS}>
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_32rem),linear-gradient(180deg,#fafafa,#f4f4f5)] px-4 py-6 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7">
        <header className="flex flex-col gap-2 rounded-2xl border border-zinc-200/70 bg-white/80 px-5 py-5 shadow-sm shadow-zinc-200/50 backdrop-blur sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            CoinPoker Cash Analyzer V1
          </p>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
                Local hand history tester
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                Import a CoinPoker cash-game hand history and inspect the core tracker stats, leaks,
                positions, starting hands, and individual hands locally.
              </p>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-dashed border-zinc-300 bg-white/90 p-3 shadow-sm shadow-zinc-200/50">
          <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-transparent px-4 py-5 transition hover:border-emerald-200 hover:bg-emerald-50/40 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-950/10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm transition group-hover:scale-105 group-hover:bg-emerald-100">
              <UploadCloud aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-base font-semibold text-zinc-950">
                Drop CoinPoker hand history here
              </span>
              <span className="text-sm text-zinc-600">or click to browse</span>
              <span className="text-xs font-medium text-zinc-400">
                Accepts `.txt` CoinPoker NLH cash exports with Hero hands.
              </span>
            </span>
            <input
              accept=".txt,text/plain"
              className="sr-only"
              disabled={isReading}
              type="file"
              onChange={handleFileChange}
            />
          </label>
          {isReading ? (
            <p className="mt-4 text-sm font-medium text-zinc-600">Reading file...</p>
          ) : null}
          {error !== null ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
        </section>

        {result !== null ? (
          <>
            <section className={SECTION_GAP_CLASS}>
              <SectionHeader title="Summary" description={result.fileName} />
              <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS["Parsed hands"]}
                  label="Parsed hands"
                  value={formatNumber(result.stats.handsPlayed)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS["Total profit"]}
                  label="Total profit"
                  value={formatCurrency(result.stats.totalProfit)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS["BB/100"]}
                  label="BB/100"
                  status={getBbPer100Status(result.stats.bbPer100)}
                  value={formatNumber(result.stats.bbPer100)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS.VPIP}
                  label="VPIP"
                  status={getVpipStatus(result.stats.vpip)}
                  value={formatPercent(result.stats.vpip)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS.PFR}
                  label="PFR"
                  status={getPfrStatus(result.stats.pfr)}
                  value={formatPercent(result.stats.pfr)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS["3Bet"]}
                  label="3Bet"
                  status={getThreeBetStatus(result.stats.threeBet)}
                  value={formatPercent(result.stats.threeBet)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS.Limp}
                  label="Limp"
                  status={getLimpStatus(result.stats.limp)}
                  value={formatPercent(result.stats.limp)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS["CBet Flop"]}
                  label="CBet Flop"
                  status={getCBetFlopStatus(result.stats.cBetFlop)}
                  value={formatPercent(result.stats.cBetFlop)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS.WTSD}
                  label="WTSD"
                  status={getWtsdStatus(result.stats.wtsd)}
                  value={formatPercent(result.stats.wtsd)}
                />
                <StatTile
                  explanation={SUMMARY_EXPLANATIONS["W$SD"]}
                  label="W$SD"
                  status={getWsdStatus(result.stats.wsd)}
                  value={formatPercent(result.stats.wsd)}
                />
              </dl>
            </section>

            {positionHighlights !== null ? (
              <section className={SECTION_GAP_CLASS}>
                <SectionHeader
                  title="Position Analysis"
                  description="Position results are noisy on small samples. Use at least 1,000+ hands for meaningful winrate conclusions."
                />
                <dl className="grid gap-4 md:grid-cols-3">
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
                <div className={TABLE_CONTAINER_CLASS}>
                  <table className={`${TABLE_CLASS} min-w-[860px]`}>
                    <thead className={TABLE_HEAD_CLASS}>
                      <tr>
                        <th className={TABLE_HEADER_CELL_CLASS}>Position</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>Hands</th>
                        <th className={TABLE_HEADER_CELL_CLASS}>Sample</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>VPIP</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>PFR</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>Profit</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>BB/100</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>WTSD</th>
                        <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>W$SD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positionStats.map((stats) => (
                        <tr
                          key={stats.position}
                          className="odd:bg-white even:bg-zinc-50/80 hover:bg-emerald-50/50"
                        >
                          <td className={`${TABLE_CELL_CLASS} font-semibold text-zinc-950`}>
                            {stats.position}
                          </td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>
                            {formatNumber(stats.handsPlayed)}
                          </td>
                          <td className={TABLE_CELL_CLASS}>
                            {getPositionSampleLabel(stats.handsPlayed)}
                          </td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>{formatPercent(stats.vpip)}</td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>{formatPercent(stats.pfr)}</td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>
                            {formatCurrency(stats.totalProfit)}
                          </td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>
                            {formatNumber(stats.bbPer100)}
                          </td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>{formatPercent(stats.wtsd)}</td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>{formatPercent(stats.wsd)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {holeCardMatrix !== null ? (
              <section className={SECTION_GAP_CLASS}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <SectionHeader
                    title="Hole Card Matrix"
                    description="Starting hand performance is noisy on small samples. BB/100 is shown confidently from 30+ hands."
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      View Metric
                    </span>
                    <div className="flex flex-wrap gap-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
                      {HOLE_CARD_MATRIX_METRICS.map((metric) => (
                        <button
                          key={metric.value}
                          className={`rounded-lg px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-zinc-950/15 ${
                            holeCardMatrixMetric === metric.value
                              ? "bg-zinc-950 text-white shadow-sm"
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
                <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 shadow-sm">
                  {HOLE_CARD_LEGEND.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
                    >
                      <span className={`h-3 w-3 rounded-sm border ${item.className}`} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white px-3 py-4 shadow-sm shadow-zinc-200/60">
                  <div
                    className="mx-auto grid w-fit min-w-[520px] gap-1"
                    style={{ gridTemplateColumns: "repeat(13, minmax(38px, 44px))" }}
                  >
                    {holeCardMatrix.rows.flat().map((cell) => (
                      <button
                        key={cell.notation}
                        aria-label={`Show ${cell.notation} details`}
                        className={`flex aspect-square items-center justify-center rounded-md border text-center text-[11px] font-semibold leading-none shadow-sm transition hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-1 ${
                          selectedHoleCard === cell.notation
                            ? "ring-2 ring-zinc-950 ring-offset-2"
                            : ""
                        } ${getHoleCardTone(cell, holeCardMatrixMetric)}`}
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
                  <p className={`${CARD_CLASS} p-4 text-sm text-zinc-600`}>
                    Select a starting hand to inspect its occurrences.
                  </p>
                ) : (
                  <div className={`${CARD_CLASS} p-4`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">
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
                          <dd className="mt-1 font-mono font-semibold tabular-nums">
                            {formatNumber(selectedHoleCardCell.handsPlayed)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">Profit</dt>
                          <dd className="mt-1 font-mono font-semibold tabular-nums">
                            {formatSignedCurrency(selectedHoleCardCell.totalProfit)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">BB/100</dt>
                          <dd className="mt-1 font-mono font-semibold tabular-nums">
                            {formatConfidentBbPer100(selectedHoleCardCell)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">
                            Win Rate
                          </dt>
                          <dd className="mt-1 font-mono font-semibold tabular-nums">
                            {formatPercent(getWinRate(selectedHoleCardCell))}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className={`mt-4 ${TABLE_CONTAINER_CLASS}`}>
                      <table className={`${TABLE_CLASS} min-w-[700px]`}>
                        <thead className={TABLE_HEAD_CLASS}>
                          <tr>
                            <th className={TABLE_HEADER_CELL_CLASS}>Hand ID</th>
                            <th className={TABLE_HEADER_CELL_CLASS}>Date</th>
                            <th className={TABLE_HEADER_CELL_CLASS}>Position</th>
                            <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>Hero Net</th>
                            <th className={TABLE_HEADER_CELL_CLASS}>Hero Showdown</th>
                            <th className={TABLE_HEADER_CELL_CLASS}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedHoleCardOccurrences.length === 0 ? (
                            <tr>
                              <td
                                className="border-b border-zinc-100 px-4 py-4 text-zinc-600"
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
                                  className="odd:bg-white even:bg-zinc-50/80 hover:bg-emerald-50/50"
                                >
                                  <td className={`${TABLE_CELL_CLASS} font-mono font-medium`}>
                                    {occurrence.handId}
                                  </td>
                                  <td className={TABLE_CELL_CLASS}>{occurrence.date}</td>
                                  <td className={TABLE_CELL_CLASS}>{occurrence.position}</td>
                                  <td className={TABLE_NUMERIC_CELL_CLASS}>
                                    {formatSignedCurrency(occurrence.profit)}
                                  </td>
                                  <td className={TABLE_CELL_CLASS}>
                                    {hand === null ? "-" : formatHeroShowdownStatus(hand)}
                                  </td>
                                  <td className={TABLE_CELL_CLASS}>
                                    <button
                                      className={SMALL_BUTTON_CLASS}
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

            <section className={SECTION_GAP_CLASS}>
              <SectionHeader title="Leaks" />
              {result.leaks.length > 0 ? (
                <ul className="grid gap-3">
                  {result.leaks.map((leak) => (
                    <li key={leak.id} className={`${CARD_CLASS} overflow-hidden`}>
                      <div className="flex gap-4 p-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-100 text-amber-800">
                          <AlertTriangle aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-zinc-950">{leak.title}</h3>
                            <span className="rounded-md bg-amber-100 px-2 py-1 text-[11px] font-bold uppercase text-amber-900 ring-1 ring-amber-200">
                              Severity: {leak.severity}
                            </span>
                            <span className="rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-bold uppercase text-zinc-600 ring-1 ring-zinc-200">
                              {leak.category}
                            </span>
                          </div>
                          <p className="mt-3 font-mono text-sm text-zinc-700">
                            {leak.metric}: {formatNumber(leak.value)} / threshold{" "}
                            {formatNumber(leak.threshold)}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-zinc-600">{leak.explanation}</p>
                          <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Recommendation
                            </p>
                            <p className="mt-1 text-sm font-semibold leading-6 text-zinc-900">
                              {leak.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`${CARD_CLASS} p-4 text-sm text-zinc-600`}>
                  No V1 leaks detected, or the sample is too small for guarded leak rules.
                </p>
              )}
            </section>

            <section className={SECTION_GAP_CLASS}>
              <SectionHeader
                title="Hand Explorer"
                description={`Showing ${formatNumber(visibleHands.length)} of ${formatNumber(
                  filteredAndSortedHands.length,
                )} filtered hands.`}
              />
              <dl className="grid gap-4 sm:grid-cols-3">
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
              <div className={`${CARD_CLASS} grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-7`}>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Position
                  </span>
                  <select
                    className={CONTROL_CLASS}
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
                    className={CONTROL_CLASS}
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
                    className={CONTROL_CLASS}
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
                    className={CONTROL_CLASS}
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
                    className={CONTROL_CLASS}
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
                    className={CONTROL_CLASS}
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
                    className={CONTROL_CLASS}
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
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm">
                <div className="flex items-center gap-2">
                  <button
                    className={BUTTON_CLASS}
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
                    className={BUTTON_CLASS}
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
                    className={`${CONTROL_CLASS} h-9 py-0`}
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
              <div className={TABLE_CONTAINER_CLASS}>
                <table className={`${TABLE_CLASS} min-w-[1180px]`}>
                  <thead className={TABLE_HEAD_CLASS}>
                    <tr>
                      <th className={TABLE_HEADER_CELL_CLASS}>Hand ID</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Date</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Table</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Blinds</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Position</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Hero Cards</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Board</th>
                      <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>Pot</th>
                      <th className={`${TABLE_HEADER_CELL_CLASS} text-right`}>Hero Net</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Hero Showdown</th>
                      <th className={TABLE_HEADER_CELL_CLASS}>Actions</th>
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
                        <tr
                          key={hand.id}
                          className="odd:bg-white even:bg-zinc-50/80 hover:bg-emerald-50/50"
                        >
                          <td className={`${TABLE_CELL_CLASS} font-mono font-medium`}>
                            {hand.handId}
                          </td>
                          <td className={TABLE_CELL_CLASS}>{hand.date}</td>
                          <td className={TABLE_CELL_CLASS}>{hand.tableName ?? "-"}</td>
                          <td className={`${TABLE_CELL_CLASS} font-mono tabular-nums`}>
                            {formatStakes(hand)}
                          </td>
                          <td className={TABLE_CELL_CLASS}>{hand.heroPosition}</td>
                          <td className={`${TABLE_CELL_CLASS} font-mono`}>
                            {formatCards(hand.heroCards)}
                          </td>
                          <td className={`${TABLE_CELL_CLASS} font-mono`}>
                            {formatBoard(hand) || "-"}
                          </td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>
                            {formatNullableCurrency(hand.totalPot)}
                          </td>
                          <td className={TABLE_NUMERIC_CELL_CLASS}>
                            {formatSignedCurrency(hand.heroNetResult)}
                          </td>
                          <td className={TABLE_CELL_CLASS}>{formatHeroShowdownStatus(hand)}</td>
                          <td className={TABLE_CELL_CLASS}>
                            <button
                              className={SMALL_BUTTON_CLASS}
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
