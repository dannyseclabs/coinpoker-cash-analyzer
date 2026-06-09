import type {
  LeakCategory,
  LeakMetric,
  LeakResult,
  LeakSeverity,
  StatisticsResult,
} from "../../types";

const GLOBAL_MIN_HANDS = 100;
const POSTFLOP_MIN_OPPORTUNITIES = 20;
const SHOWDOWN_MIN_SAW_FLOP = 20;
const SHOWDOWN_MIN_SHOWDOWNS = 20;
const POSITION_MIN_HANDS = 20;

interface LeakDefinition {
  readonly id: string;
  readonly title: string;
  readonly severity: LeakSeverity;
  readonly category: LeakCategory;
  readonly metric: LeakMetric;
  readonly value: number;
  readonly threshold: number;
  readonly explanation: string;
  readonly recommendation: string;
}

function roundLeakValue(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function createLeak(definition: LeakDefinition): LeakResult {
  return {
    ...definition,
    value: roundLeakValue(definition.value),
  };
}

function hasGlobalSample(stats: StatisticsResult): boolean {
  return stats.handsPlayed >= GLOBAL_MIN_HANDS;
}

export function detectLeaks(stats: StatisticsResult): LeakResult[] {
  const leaks: LeakResult[] = [];

  if (hasGlobalSample(stats)) {
    if (stats.vpip < 18) {
      leaks.push(
        createLeak({
          id: "too-tight-preflop",
          title: "Too Tight Preflop",
          severity: "medium",
          category: "preflop",
          metric: "vpip",
          value: stats.vpip,
          threshold: 18,
          explanation:
            "VPIP is below the V1 minimum range, which can mean Hero is passing up too many playable spots.",
          recommendation:
            "Review unopened late-position and blind-defense ranges before widening early-position ranges.",
        }),
      );
    }

    const vpipPfrGap = stats.vpip - stats.pfr;

    if (vpipPfrGap > 8) {
      leaks.push(
        createLeak({
          id: "too-passive-preflop",
          title: "Too Passive Preflop",
          severity: "medium",
          category: "preflop",
          metric: "vpip_pfr_gap",
          value: vpipPfrGap,
          threshold: 8,
          explanation:
            "The gap between VPIP and PFR is wide, suggesting too much calling relative to raising.",
          recommendation:
            "Prefer raise-or-fold decisions in many preflop spots and review cold-call ranges.",
        }),
      );
    }

    if (stats.sampleSizes.threeBetOpportunities > 0 && stats.threeBet < 4) {
      leaks.push(
        createLeak({
          id: "low-3bet",
          title: "Low 3Bet",
          severity: "medium",
          category: "preflop",
          metric: "three_bet",
          value: stats.threeBet,
          threshold: 4,
          explanation:
            "3Bet frequency is below the V1 threshold when Hero had opportunities to re-raise.",
          recommendation:
            "Review value 3-bets and add selective bluff 3-bets versus steal-heavy positions.",
        }),
      );
    }

    if (stats.limp > 5) {
      leaks.push(
        createLeak({
          id: "too-much-limping",
          title: "Too Much Limping",
          severity: "medium",
          category: "preflop",
          metric: "limp",
          value: stats.limp,
          threshold: 5,
          explanation:
            "Limping is above the V1 threshold, which usually weakens range advantage and initiative.",
          recommendation:
            "Convert open-limps into raises or folds, especially outside blind-completion spots.",
        }),
      );
    }
  }

  if (
    hasGlobalSample(stats) &&
    stats.sampleSizes.cBetFlopOpportunities >= POSTFLOP_MIN_OPPORTUNITIES &&
    stats.cBetFlop < 40
  ) {
    leaks.push(
      createLeak({
        id: "low-flop-cbet",
        title: "Low Flop CBet",
        severity: "medium",
        category: "postflop",
        metric: "c_bet_flop",
        value: stats.cBetFlop,
        threshold: 40,
        explanation: "Hero is continuation betting too rarely after being the preflop aggressor.",
        recommendation:
          "Review missed c-bet spots on favorable boards and simplify flop betting strategy.",
      }),
    );
  }

  if (
    hasGlobalSample(stats) &&
    stats.sampleSizes.sawFlop >= SHOWDOWN_MIN_SAW_FLOP &&
    stats.wtsd > 32
  ) {
    leaks.push(
      createLeak({
        id: "high-wtsd",
        title: "High WTSD",
        severity: "medium",
        category: "showdown",
        metric: "wtsd",
        value: stats.wtsd,
        threshold: 32,
        explanation:
          "WTSD is above the V1 threshold, suggesting Hero may be taking too many marginal hands to showdown.",
        recommendation:
          "Review turn and river calls, especially bluff-catchers without blockers or strong pot odds.",
      }),
    );
  }

  if (
    hasGlobalSample(stats) &&
    stats.sampleSizes.wentToShowdown >= SHOWDOWN_MIN_SHOWDOWNS &&
    stats.wsd < 45
  ) {
    leaks.push(
      createLeak({
        id: "low-wsd",
        title: "Low W$SD",
        severity: "medium",
        category: "showdown",
        metric: "wsd",
        value: stats.wsd,
        threshold: 45,
        explanation:
          "Hero is winning too few showdowns, which often pairs with loose calls or thin value mistakes.",
        recommendation:
          "Audit showdown losses and tighten river continue ranges where villains under-bluff.",
      }),
    );
  }

  const smallBlindStats = stats.positionStats.SB;

  if (smallBlindStats.bbPer100 < -50) {
    leaks.push(
      createLeak({
        id: "heavy-sb-losses",
        title: "Heavy SB Losses",
        severity: "high",
        category: "position",
        metric: "sb_bb_per100",
        value: smallBlindStats.bbPer100,
        threshold: -50,
        explanation:
          "Small blind winrate is below the V1 threshold, which often points to over-completing, loose 3-bets, or weak out-of-position calls.",
        recommendation:
          "Review small blind opens, completes, and calls; tighten marginal continues and prefer stronger raise-or-fold decisions.",
      }),
    );
  }

  const bigBlindStats = stats.positionStats.BB;

  if (bigBlindStats.bbPer100 < -70) {
    leaks.push(
      createLeak({
        id: "heavy-bb-losses",
        title: "Heavy BB Losses",
        severity: "high",
        category: "position",
        metric: "bb_bb_per100",
        value: bigBlindStats.bbPer100,
        threshold: -70,
        explanation:
          "Big blind winrate is below the V1 threshold for a sustainable defense strategy.",
        recommendation:
          "Review big blind defense frequencies, dominated calls, and postflop plans out of position.",
      }),
    );
  }

  const buttonStats = stats.positionStats.BTN;

  if (buttonStats.handsPlayed >= POSITION_MIN_HANDS && buttonStats.vpip < 30) {
    leaks.push(
      createLeak({
        id: "low-btn-vpip",
        title: "Low BTN VPIP",
        severity: "low",
        category: "position",
        metric: "btn_vpip",
        value: buttonStats.vpip,
        threshold: 30,
        explanation: "Button VPIP is below the V1 threshold despite enough button hands.",
        recommendation:
          "Review unopened button ranges and look for profitable steals versus tight blinds.",
      }),
    );
  }

  if (buttonStats.handsPlayed >= POSITION_MIN_HANDS && buttonStats.pfr < 25) {
    leaks.push(
      createLeak({
        id: "low-btn-pfr",
        title: "Low BTN PFR",
        severity: "low",
        category: "position",
        metric: "btn_pfr",
        value: buttonStats.pfr,
        threshold: 25,
        explanation: "Button PFR is below the V1 threshold despite enough button hands.",
        recommendation:
          "Review unopened button raising ranges and reduce passive calls when stealing is available.",
      }),
    );
  }

  return leaks;
}
