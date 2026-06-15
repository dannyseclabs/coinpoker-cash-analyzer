import type { StatisticsResult } from "../../types";

export type StatValidationWarningId =
  | "very-high-wtsd"
  | "very-high-wsd"
  | "wide-vpip-pfr-gap"
  | "high-bb-per-100-large-sample";

export interface StatValidationWarning {
  readonly id: StatValidationWarningId;
  readonly metric: "wtsd" | "wsd" | "vpip_pfr_gap" | "bb_per_100";
  readonly value: number;
  readonly threshold: number;
  readonly message: string;
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getStatValidationWarnings(stats: StatisticsResult): StatValidationWarning[] {
  const warnings: StatValidationWarning[] = [];
  const vpipPfrGap = roundStat(stats.vpip - stats.pfr);

  if (stats.sampleSizes.sawFlop > 0 && stats.wtsd > 50) {
    warnings.push({
      id: "very-high-wtsd",
      metric: "wtsd",
      value: stats.wtsd,
      threshold: 50,
      message:
        "WTSD above 50% is statistically suspicious and may indicate loose showdown counting or too many marginal continues.",
    });
  }

  if (stats.sampleSizes.wentToShowdown > 0 && stats.wsd > 70) {
    warnings.push({
      id: "very-high-wsd",
      metric: "wsd",
      value: stats.wsd,
      threshold: 70,
      message:
        "W$SD above 70% is unusually high and should be checked against showdown sample size and parsed winners.",
    });
  }

  if (stats.handsPlayed > 0 && vpipPfrGap > 10) {
    warnings.push({
      id: "wide-vpip-pfr-gap",
      metric: "vpip_pfr_gap",
      value: vpipPfrGap,
      threshold: 10,
      message:
        "VPIP/PFR gap above 10 points is suspicious for passive preflop play or formula drift.",
    });
  }

  if (stats.handsPlayed >= 1000 && stats.bbPer100 > 30) {
    warnings.push({
      id: "high-bb-per-100-large-sample",
      metric: "bb_per_100",
      value: stats.bbPer100,
      threshold: 30,
      message:
        "BB/100 above 30 over a large sample is rare enough to warrant validation of profit and blind conversion.",
    });
  }

  return warnings;
}
