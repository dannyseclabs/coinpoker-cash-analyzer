import type {
  HandAction,
  PokerHand,
  PokerPosition,
  PositionStats,
  StatisticsResult,
} from "../../types";

const POSITIONS: readonly PokerPosition[] = ["UTG", "HJ", "CO", "BTN", "SB", "BB", "UNKNOWN"];
const HERO_NAME = "Hero";

interface PositionAccumulator {
  readonly position: PokerPosition;
  handsPlayed: number;
  totalProfit: number;
  bigBlindsWon: number;
  vpipCount: number;
  pfrCount: number;
  sawFlopCount: number;
  wentToShowdownCount: number;
  wonAtShowdownCount: number;
}

interface PreflopStats {
  readonly vpip: boolean;
  readonly pfr: boolean;
  readonly threeBetOpportunity: boolean;
  readonly threeBet: boolean;
  readonly foldToThreeBetOpportunity: boolean;
  readonly foldToThreeBet: boolean;
  readonly limp: boolean;
}

interface FlopStats {
  readonly cBetOpportunity: boolean;
  readonly cBet: boolean;
  readonly foldToCBetOpportunity: boolean;
  readonly foldToCBet: boolean;
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function asPercent(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return roundStat((numerator / denominator) * 100);
}

function isHeroAction(action: HandAction): boolean {
  return action.playerName === HERO_NAME;
}

function isVoluntaryPreflopAction(action: HandAction): boolean {
  return ["all_in", "bet", "call", "raise"].includes(action.type);
}

function isPreflopRaiseAction(action: HandAction): boolean {
  return action.type === "all_in" || action.type === "raise";
}

function isPreflopDecisionAction(action: HandAction): boolean {
  return ["all_in", "call", "fold", "raise"].includes(action.type);
}

function isFlopAggressiveAction(action: HandAction): boolean {
  return ["all_in", "bet", "raise"].includes(action.type);
}

function isFlopBetLikeAction(action: HandAction): boolean {
  return action.type === "all_in" || action.type === "bet";
}

function isFlopResponseAction(action: HandAction): boolean {
  return ["all_in", "call", "fold", "raise"].includes(action.type);
}

function isFlopDecisionAction(action: HandAction): boolean {
  return ["all_in", "bet", "call", "check", "fold", "raise"].includes(action.type);
}

function didHeroFoldPreflop(hand: PokerHand): boolean {
  return hand.streetActions.preflop.some(
    (action) => isHeroAction(action) && action.type === "fold",
  );
}

function didHeroSeeFlop(hand: PokerHand): boolean {
  return hand.board.flop !== null && !didHeroFoldPreflop(hand);
}

function getPreflopAggressor(hand: PokerHand): string | null {
  const aggressiveActions = hand.streetActions.preflop.filter(isPreflopRaiseAction);
  const lastAggressiveAction = aggressiveActions.at(-1);

  return lastAggressiveAction?.playerName ?? null;
}

function didHeroMoveAllInPreflop(hand: PokerHand): boolean {
  return hand.streetActions.preflop.some(
    (action) => isHeroAction(action) && action.type === "all_in",
  );
}

function didHeroHaveFlopDecision(hand: PokerHand): boolean {
  return hand.streetActions.flop.some(
    (action) => isHeroAction(action) && isFlopDecisionAction(action),
  );
}

function analyzePreflop(hand: PokerHand): PreflopStats {
  let vpip = false;
  let pfr = false;
  let limp = false;
  let heroOpenRaised = false;
  let priorOpponentRaiseCount = 0;
  let countedHeroFirstVoluntary = false;
  let countedThreeBetOpportunity = false;
  let threeBetOpportunity = false;
  let threeBet = false;
  let waitingForHeroResponseToThreeBet = false;
  let foldToThreeBetOpportunity = false;
  let foldToThreeBet = false;

  for (const action of hand.streetActions.preflop) {
    if (isHeroAction(action)) {
      if (!countedHeroFirstVoluntary && isVoluntaryPreflopAction(action)) {
        countedHeroFirstVoluntary = true;
        vpip = true;
        limp = action.type === "call" && priorOpponentRaiseCount === 0;
      }

      if (
        !countedThreeBetOpportunity &&
        isPreflopDecisionAction(action) &&
        priorOpponentRaiseCount === 1
      ) {
        countedThreeBetOpportunity = true;
        threeBetOpportunity = true;
        threeBet = isPreflopRaiseAction(action);
      }

      if (waitingForHeroResponseToThreeBet && isPreflopDecisionAction(action)) {
        waitingForHeroResponseToThreeBet = false;
        foldToThreeBetOpportunity = true;
        foldToThreeBet = action.type === "fold";
      }

      if (isPreflopRaiseAction(action)) {
        pfr = true;

        if (priorOpponentRaiseCount === 0) {
          heroOpenRaised = true;
        }
      }

      continue;
    }

    if (isPreflopRaiseAction(action)) {
      if (heroOpenRaised && !foldToThreeBetOpportunity) {
        waitingForHeroResponseToThreeBet = true;
      }

      priorOpponentRaiseCount += 1;
    }
  }

  return {
    vpip,
    pfr,
    threeBetOpportunity,
    threeBet,
    foldToThreeBetOpportunity,
    foldToThreeBet,
    limp,
  };
}

function analyzeFlop(hand: PokerHand): FlopStats {
  const sawFlop = didHeroSeeFlop(hand);
  const preflopAggressor = getPreflopAggressor(hand);
  const cBetOpportunity =
    sawFlop &&
    preflopAggressor === HERO_NAME &&
    !didHeroMoveAllInPreflop(hand) &&
    didHeroHaveFlopDecision(hand);
  const firstFlopAggressiveAction = hand.streetActions.flop.find(isFlopAggressiveAction);
  const cBet =
    cBetOpportunity &&
    firstFlopAggressiveAction !== undefined &&
    isHeroAction(firstFlopAggressiveAction) &&
    isFlopBetLikeAction(firstFlopAggressiveAction);
  let foldToCBetOpportunity = false;
  let foldToCBet = false;
  let waitingForHeroResponseToCBet = false;

  if (sawFlop && preflopAggressor !== null && preflopAggressor !== HERO_NAME) {
    for (const action of hand.streetActions.flop) {
      if (
        !waitingForHeroResponseToCBet &&
        action.playerName === preflopAggressor &&
        isFlopBetLikeAction(action)
      ) {
        waitingForHeroResponseToCBet = true;
        continue;
      }

      if (waitingForHeroResponseToCBet && isHeroAction(action) && isFlopResponseAction(action)) {
        foldToCBetOpportunity = true;
        foldToCBet = action.type === "fold";
        break;
      }
    }
  }

  return {
    cBetOpportunity,
    cBet,
    foldToCBetOpportunity,
    foldToCBet,
  };
}

function didHeroReachShowdown(hand: PokerHand): boolean {
  if (!didHeroSeeFlop(hand) || hand.showdown === null) {
    return false;
  }

  return (
    hand.showdown.entries.some((entry) => entry.playerName === HERO_NAME) ||
    hand.showdown.winnerNames.includes(HERO_NAME)
  );
}

function didHeroWinAtShowdown(hand: PokerHand): boolean {
  if (!didHeroReachShowdown(hand) || hand.showdown === null) {
    return false;
  }

  return (
    hand.showdown.winnerNames.includes(HERO_NAME) ||
    hand.showdown.entries.some((entry) => entry.playerName === HERO_NAME && entry.wonAmount > 0)
  );
}

function createPositionAccumulator(position: PokerPosition): PositionAccumulator {
  return {
    position,
    handsPlayed: 0,
    totalProfit: 0,
    bigBlindsWon: 0,
    vpipCount: 0,
    pfrCount: 0,
    sawFlopCount: 0,
    wentToShowdownCount: 0,
    wonAtShowdownCount: 0,
  };
}

function createEmptyPositionStats(position: PokerPosition): PositionStats {
  return {
    position,
    handsPlayed: 0,
    totalProfit: 0,
    bbPer100: 0,
    vpip: 0,
    pfr: 0,
    wtsd: 0,
    wsd: 0,
  };
}

function finalizePositionStats(accumulator: PositionAccumulator): PositionStats {
  if (accumulator.handsPlayed === 0) {
    return createEmptyPositionStats(accumulator.position);
  }

  return {
    position: accumulator.position,
    handsPlayed: accumulator.handsPlayed,
    totalProfit: roundStat(accumulator.totalProfit),
    bbPer100: roundStat((accumulator.bigBlindsWon / accumulator.handsPlayed) * 100),
    vpip: asPercent(accumulator.vpipCount, accumulator.handsPlayed),
    pfr: asPercent(accumulator.pfrCount, accumulator.handsPlayed),
    wtsd: asPercent(accumulator.wentToShowdownCount, accumulator.sawFlopCount),
    wsd: asPercent(accumulator.wonAtShowdownCount, accumulator.wentToShowdownCount),
  };
}

export function calculateStats(hands: readonly PokerHand[]): StatisticsResult {
  const positionAccumulators = Object.fromEntries(
    POSITIONS.map((position) => [position, createPositionAccumulator(position)]),
  ) as Record<PokerPosition, PositionAccumulator>;
  let totalProfit = 0;
  let totalBigBlindsWon = 0;
  let vpipCount = 0;
  let pfrCount = 0;
  let threeBetOpportunityCount = 0;
  let threeBetCount = 0;
  let foldToThreeBetOpportunityCount = 0;
  let foldToThreeBetCount = 0;
  let limpCount = 0;
  let cBetOpportunityCount = 0;
  let cBetCount = 0;
  let foldToCBetOpportunityCount = 0;
  let foldToCBetCount = 0;
  let sawFlopCount = 0;
  let wentToShowdownCount = 0;
  let wonAtShowdownCount = 0;

  for (const hand of hands) {
    const handBigBlindsWon =
      hand.stakes.bigBlind > 0 ? hand.heroNetResult / hand.stakes.bigBlind : 0;
    const preflopStats = analyzePreflop(hand);
    const flopStats = analyzeFlop(hand);
    const sawFlop = didHeroSeeFlop(hand);
    const reachedShowdown = didHeroReachShowdown(hand);
    const wonAtShowdown = didHeroWinAtShowdown(hand);
    const positionAccumulator = positionAccumulators[hand.heroPosition];

    totalProfit += hand.heroNetResult;
    totalBigBlindsWon += handBigBlindsWon;
    positionAccumulator.handsPlayed += 1;
    positionAccumulator.totalProfit += hand.heroNetResult;
    positionAccumulator.bigBlindsWon += handBigBlindsWon;

    if (preflopStats.vpip) {
      vpipCount += 1;
      positionAccumulator.vpipCount += 1;
    }

    if (preflopStats.pfr) {
      pfrCount += 1;
      positionAccumulator.pfrCount += 1;
    }

    if (preflopStats.threeBetOpportunity) {
      threeBetOpportunityCount += 1;
    }

    if (preflopStats.threeBet) {
      threeBetCount += 1;
    }

    if (preflopStats.foldToThreeBetOpportunity) {
      foldToThreeBetOpportunityCount += 1;
    }

    if (preflopStats.foldToThreeBet) {
      foldToThreeBetCount += 1;
    }

    if (preflopStats.limp) {
      limpCount += 1;
    }

    if (flopStats.cBetOpportunity) {
      cBetOpportunityCount += 1;
    }

    if (flopStats.cBet) {
      cBetCount += 1;
    }

    if (flopStats.foldToCBetOpportunity) {
      foldToCBetOpportunityCount += 1;
    }

    if (flopStats.foldToCBet) {
      foldToCBetCount += 1;
    }

    if (sawFlop) {
      sawFlopCount += 1;
      positionAccumulator.sawFlopCount += 1;
    }

    if (reachedShowdown) {
      wentToShowdownCount += 1;
      positionAccumulator.wentToShowdownCount += 1;
    }

    if (wonAtShowdown) {
      wonAtShowdownCount += 1;
      positionAccumulator.wonAtShowdownCount += 1;
    }
  }

  const positionStats = Object.fromEntries(
    POSITIONS.map((position) => [position, finalizePositionStats(positionAccumulators[position])]),
  ) as Readonly<Record<PokerPosition, PositionStats>>;

  return {
    handsPlayed: hands.length,
    totalProfit: roundStat(totalProfit),
    bbPer100: hands.length === 0 ? 0 : roundStat((totalBigBlindsWon / hands.length) * 100),
    vpip: asPercent(vpipCount, hands.length),
    pfr: asPercent(pfrCount, hands.length),
    threeBet: asPercent(threeBetCount, threeBetOpportunityCount),
    foldToThreeBet: asPercent(foldToThreeBetCount, foldToThreeBetOpportunityCount),
    limp: asPercent(limpCount, hands.length),
    cBetFlop: asPercent(cBetCount, cBetOpportunityCount),
    foldToCBetFlop: asPercent(foldToCBetCount, foldToCBetOpportunityCount),
    wtsd: asPercent(wentToShowdownCount, sawFlopCount),
    wsd: asPercent(wonAtShowdownCount, wentToShowdownCount),
    positionStats,
    sampleSizes: {
      hands: hands.length,
      threeBetOpportunities: threeBetOpportunityCount,
      foldToThreeBetOpportunities: foldToThreeBetOpportunityCount,
      cBetFlopOpportunities: cBetOpportunityCount,
      foldToCBetFlopOpportunities: foldToCBetOpportunityCount,
      sawFlop: sawFlopCount,
      wentToShowdown: wentToShowdownCount,
    },
  };
}
