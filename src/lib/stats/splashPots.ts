import type { PokerHand } from "../../types";

export const SPLASH_POT_CANDIDATE_THRESHOLD_BB = 300;
export const SPLASH_POT_THRESHOLD_BB = 500;

export interface SplashPotClassification {
  readonly potBb: number | null;
  readonly isSplashPotCandidate: boolean;
  readonly isSplashPot: boolean;
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getPotBb(hand: PokerHand): number | null {
  if (hand.totalPot === null || hand.stakes.bigBlind <= 0) {
    return null;
  }

  return roundStat(hand.totalPot / hand.stakes.bigBlind);
}

export function classifySplashPot(hand: PokerHand): SplashPotClassification {
  const potBb = getPotBb(hand);

  return {
    potBb,
    isSplashPotCandidate: potBb !== null && potBb >= SPLASH_POT_CANDIDATE_THRESHOLD_BB,
    isSplashPot: potBb !== null && potBb >= SPLASH_POT_THRESHOLD_BB,
  };
}

export function isSplashPot(hand: PokerHand): boolean {
  return classifySplashPot(hand).isSplashPot;
}
