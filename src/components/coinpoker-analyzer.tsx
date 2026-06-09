"use client";

import { useMemo, useState } from "react";

import { detectLeaks } from "@/src/lib/leaks/detectLeaks";
import { parseCoinPokerFile } from "@/src/lib/parser/parseCoinPokerFile";
import { calculateStats } from "@/src/lib/stats/calculateStats";
import {
  createHoleCardMatrix,
  getHoleCardSampleLabel,
  type HoleCardMatrixCell,
} from "@/src/lib/stats/holeCardMatrix";
import {
  getDisplayPositionStats,
  getPositionHighlights,
  getPositionSampleLabel,
} from "@/src/lib/stats/positionAnalysis";
import type { LeakResult, PokerHand, StatisticsResult } from "@/src/types";

interface AnalyzerResult {
  readonly fileName: string;
  readonly hands: readonly PokerHand[];
  readonly stats: StatisticsResult;
  readonly leaks: readonly LeakResult[];
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

export function CoinPokerAnalyzer() {
  const [result, setResult] = useState<AnalyzerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [selectedHoleCard, setSelectedHoleCard] = useState<string | null>(null);
  const [holeCardMatrixMetric, setHoleCardMatrixMetric] =
    useState<HoleCardMatrixMetric>("bbPer100");

  const firstHands = useMemo(() => result?.hands.slice(0, 10) ?? [], [result]);
  const holeCardMatrix = useMemo(
    () => (result === null ? null : createHoleCardMatrix(result.hands)),
    [result],
  );
  const selectedHoleCardCell =
    holeCardMatrix === null || selectedHoleCard === null
      ? null
      : (holeCardMatrix.cells[selectedHoleCard] ?? null);
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
                        <h3 className="text-lg font-semibold">{selectedHoleCardCell.notation}</h3>
                        <p className="mt-1 text-sm text-zinc-600">
                          {getHoleCardSampleLabel(selectedHoleCardCell.handsPlayed)}
                        </p>
                      </div>
                      <dl className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-5">
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-500">
                            Hands played
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
                            VPIP count
                          </dt>
                          <dd className="mt-1 font-semibold">
                            {formatNumber(selectedHoleCardCell.vpipCount)}
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
                            <th className="border-b border-zinc-200 px-3 py-2">Profit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedHoleCardCell.occurrences.length === 0 ? (
                            <tr>
                              <td
                                className="border-b border-zinc-100 px-3 py-3 text-zinc-600"
                                colSpan={4}
                              >
                                No occurrences for this hand in the imported sample.
                              </td>
                            </tr>
                          ) : (
                            selectedHoleCardCell.occurrences.map((occurrence) => (
                              <tr key={occurrence.handId} className="odd:bg-white even:bg-zinc-50">
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
                              </tr>
                            ))
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
              <h2 className="text-xl font-semibold">First 10 parsed hands</h2>
              <div className="overflow-x-auto border border-zinc-200 bg-white">
                <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                  <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                    <tr>
                      <th className="border-b border-zinc-200 px-3 py-2">Hand ID</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Date</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Table</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Blinds</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Hero seat</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Position</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Hero cards</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Board</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Pot</th>
                      <th className="border-b border-zinc-200 px-3 py-2">Hero net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstHands.map((hand) => (
                      <tr key={hand.id} className="odd:bg-white even:bg-zinc-50">
                        <td className="border-b border-zinc-100 px-3 py-2 font-medium">
                          {hand.handId}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">{hand.date}</td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {hand.tableName ?? "-"}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {formatCurrency(hand.stakes.smallBlind)} /{" "}
                          {formatCurrency(hand.stakes.bigBlind)}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {hand.heroSeat ?? "-"}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">{hand.heroPosition}</td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {formatCards(hand.heroCards)}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {formatBoard(hand) || "-"}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {hand.totalPot === null ? "-" : formatCurrency(hand.totalPot)}
                        </td>
                        <td className="border-b border-zinc-100 px-3 py-2">
                          {formatCurrency(hand.heroNetResult)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
