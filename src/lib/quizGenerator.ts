import { didHeroReachShowdown } from "./handExplorer";
import { normalizeHoleCards } from "./stats/holeCardMatrix";
import { classifySplashPot } from "./stats/splashPots";
import type { Card, HandAction, LeakResult, PokerHand, PokerPosition, PokerStreet } from "../types";

export type QuizSpotType =
  | "preflop-decision"
  | "blind-defense"
  | "river-discipline"
  | "value-bet"
  | "big-loss-review"
  | "showdown-review";

export type QuizOptionAction =
  | "fold"
  | "check"
  | "call"
  | "limp"
  | "bet-33"
  | "bet-75"
  | "overbet"
  | "raise"
  | "three-bet-small"
  | "three-bet-large"
  | "jam"
  | "review-cooler"
  | "review-overplay"
  | "review-hero-call"
  | "review-bluff-catch"
  | "review-splash"
  | "review-value-leak";

export type QuizTypeFilter =
  | "All"
  | "Preflop Discipline"
  | "Value Extraction"
  | "River Discipline"
  | "Blind Defense"
  | "Review Spots"
  | "Big Losses"
  | "River Calls";

export interface QuizOption {
  readonly id: string;
  readonly label: string;
  readonly action: QuizOptionAction;
}

export type QuizAnswerCorrectnessLabel = "correct" | "acceptable" | "marginal" | "incorrect";

export type QuizConfidence = "high" | "medium" | "low";

export interface QuizAnswerEvaluation {
  readonly optionId: string;
  readonly label: QuizAnswerCorrectnessLabel;
  readonly scorePercent: number;
  readonly reason?: string;
}

export interface QuizQuestionContext {
  readonly heroCards: string;
  readonly heroPosition: PokerPosition;
  readonly board?: string;
  readonly potBb?: number;
  readonly heroNetBb?: number;
  readonly actionSummary?: string;
  readonly isSplashPotReview?: boolean;
}

export interface QuizQuestion {
  readonly id: string;
  readonly handId: string;
  readonly street: PokerStreet;
  readonly spotType: QuizSpotType;
  readonly prompt: string;
  readonly context: QuizQuestionContext;
  readonly options: readonly QuizOption[];
  readonly correctOptionId?: string;
  readonly acceptableOptionIds?: readonly string[];
  readonly marginalOptionIds?: readonly string[];
  readonly answerEvaluations?: readonly QuizAnswerEvaluation[];
  readonly recommendedAnswer: string;
  readonly explanation: string;
  readonly takeaway: string;
  readonly confidence?: QuizConfidence;
  readonly confidenceReason?: string;
}

export interface GenerateQuizQuestionsOptions {
  readonly filter?: QuizTypeFilter;
  readonly maxQuestions?: number;
  readonly leaks?: readonly LeakResult[];
  readonly hasHighWtsdLeak?: boolean;
}

export interface QuizScore {
  readonly answered: number;
  readonly answerableAnswered: number;
  readonly correct: number;
  readonly accuracy: number;
  readonly reviewSpots: number;
}

export interface VisibleQuizMetric {
  readonly label: string;
  readonly value: string;
  readonly isMonospace?: boolean;
  readonly isCompact?: boolean;
}

export interface VisibleQuizInformation {
  readonly decisionItems: readonly VisibleQuizMetric[];
  readonly actionSummary: string;
  readonly outcomeItems: readonly VisibleQuizMetric[];
}

interface PreflopOpenContext {
  readonly openerLabel: string;
  readonly openerPosition: PokerPosition;
  readonly openSizeBb: number;
  readonly callerPositions: readonly PokerPosition[];
  readonly facingAction: string;
  readonly openerTendency: OpponentTendency;
  readonly openerTendencyNote: string;
}

interface PreflopRecommendation {
  readonly correctOptionId: string;
  readonly acceptableOptionIds?: readonly string[];
  readonly marginalOptionIds?: readonly string[];
  readonly answerEvaluations?: readonly QuizAnswerEvaluation[];
  readonly recommendedAnswer: string;
  readonly explanation: string;
  readonly takeaway: string;
  readonly confidence?: QuizConfidence;
  readonly confidenceReason?: string;
}

type OpponentTendency = "loose" | "tight" | "unknown";

const DEFAULT_QUIZ_LIMIT = 20;
const HERO_NAME = "Hero";
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"] as const;
const PREMIUM_HANDS = new Set(["AA", "KK", "QQ", "JJ", "AKs", "AKo", "AQs"]);
const STRONG_OPEN_HANDS = new Set([
  "TT",
  "99",
  "88",
  "77",
  "AQs",
  "AQo",
  "AJs",
  "ATs",
  "KQs",
  "KJs",
  "QJs",
  "JTs",
]);
const STANDARD_LATE_POSITION_OPEN_HANDS = new Set([
  "66",
  "55",
  "44",
  "33",
  "22",
  "ATo",
  "KQo",
  "KJo",
  "KTo",
  "QJo",
  "QTo",
  "JTo",
]);
const MARGINAL_CO_OPEN_HANDS = new Set([
  "QTo",
  "JTo",
  "KTo",
  "A9o",
  "Q9s",
  "J9s",
  "T9s",
  "98s",
  "87s",
  "76s",
  "65s",
]);
const BUTTON_STEAL_OPEN_HANDS = new Set([
  "A9o",
  "A8o",
  "A7o",
  "A6o",
  "A5o",
  "A4o",
  "A3o",
  "A2o",
  "K9o",
  "Q9o",
  "J9o",
  "T9o",
  "98o",
]);
const PREFLOP_THREE_BET_CANDIDATES = new Set(["AA", "KK", "QQ", "AKs", "AKo", "AQs", "AQo"]);
const STRONG_PLAYABLE_VS_OPEN = new Set([
  "JJ",
  "TT",
  "99",
  "AJs",
  "ATs",
  "KQs",
  "KJs",
  "QJs",
  "JTs",
  "AQo",
  "AJo",
  "KQo",
]);
const MARGINAL_PLAYABLE_VS_STEAL = new Set(["KJo", "QJo", "KTs", "QTs", "T9s", "88", "77", "66"]);
const CLEAR_FOLD_VS_STEAL = new Set(["J8o", "T8o", "98o", "K7o", "Q8o", "J9o", "A8o"]);
const BLIND_CALL_HANDS = new Set(["K9s", "Q9s", "J9s", "T9s", "98s", "A9o", "KTo", "QTo"]);
const BLIND_THREE_BET_HANDS = new Set([
  "AA",
  "KK",
  "QQ",
  "JJ",
  "AKs",
  "AKo",
  "AQs",
  "AQo",
  "AJs",
  "A5s",
]);
const STREET_LABELS: Readonly<Record<PokerStreet, string>> = {
  preflop: "Preflop",
  flop: "Flop",
  turn: "Turn",
  river: "River",
};

const OPEN_PREFLOP_OPTIONS: readonly QuizOption[] = [
  { id: "fold", label: "Fold", action: "fold" },
  { id: "limp", label: "Limp", action: "limp" },
  { id: "raise", label: "Raise", action: "raise" },
];

const FACING_OPEN_OPTIONS: readonly QuizOption[] = [
  { id: "fold", label: "Fold", action: "fold" },
  { id: "call", label: "Call", action: "call" },
  { id: "three-bet-small", label: "3bet small", action: "three-bet-small" },
  { id: "three-bet-large", label: "3bet large", action: "three-bet-large" },
];

const BLIND_DEFENSE_OPTIONS: readonly QuizOption[] = [
  { id: "fold", label: "Fold", action: "fold" },
  { id: "call", label: "Call", action: "call" },
  { id: "three-bet-small", label: "3bet small", action: "three-bet-small" },
  { id: "three-bet-large", label: "3bet large", action: "three-bet-large" },
];
const PREFLOP_JAM_OPTION: QuizOption = { id: "jam", label: "All-in", action: "jam" };

const VALUE_EXTRACTION_OPTIONS: readonly QuizOption[] = [
  { id: "check", label: "Check", action: "check" },
  { id: "bet-33", label: "Bet 33%", action: "bet-33" },
  { id: "bet-75", label: "Bet 75%", action: "bet-75" },
  { id: "overbet", label: "Overbet", action: "overbet" },
];

const RIVER_DISCIPLINE_OPTIONS: readonly QuizOption[] = [
  { id: "fold", label: "Fold", action: "fold" },
  { id: "call", label: "Call", action: "call" },
  { id: "raise", label: "Raise", action: "raise" },
];

const REVIEW_SPOT_OPTIONS: readonly QuizOption[] = [
  { id: "cooler", label: "Cooler", action: "review-cooler" },
  { id: "overplay", label: "Overplay", action: "review-overplay" },
  { id: "hero-call", label: "Hero call", action: "review-hero-call" },
  { id: "bluff-catch", label: "Bluff catch", action: "review-bluff-catch" },
  { id: "splash-distortion", label: "Splash distortion", action: "review-splash" },
  { id: "value-leak", label: "Value leak", action: "review-value-leak" },
];

const DEFAULT_EVALUATION_REASONS: Readonly<Record<QuizAnswerCorrectnessLabel, string>> = {
  correct: "Matches the default population recommendation for this rule-based quiz spot.",
  acceptable: "Reasonable alternative for this spot; poker decisions can depend on table context.",
  marginal: "Playable only in some lineups or tighter/looser strategies, but not the default.",
  incorrect: "Does not fit the default population heuristic for this spot.",
};

function createEvaluation(
  optionId: string,
  label: QuizAnswerCorrectnessLabel,
  scorePercent: number,
  reason?: string,
): QuizAnswerEvaluation {
  return {
    optionId,
    label,
    scorePercent,
    ...(reason === undefined ? {} : { reason }),
  };
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyAmount(amount: number, currency: string): string {
  return `${currency}${formatNumber(amount)}`;
}

function toBigBlinds(amount: number | null, bigBlind: number): number | null {
  if (amount === null || bigBlind <= 0) {
    return null;
  }

  return roundStat(amount / bigBlind);
}

function formatCards(cards: readonly Card[] | null): string {
  return cards === null || cards.length === 0 ? "-" : cards.join(" ");
}

function formatBoard(hand: PokerHand): string {
  return [...(hand.board.flop ?? []), hand.board.turn, hand.board.river]
    .filter((card): card is Card => card !== null)
    .join(" ");
}

function formatBoardForStreet(hand: PokerHand, street: PokerStreet): string {
  if (street === "preflop") {
    return "";
  }

  const cards: Card[] = [];

  if (hand.board.flop !== null) {
    cards.push(...hand.board.flop);
  }

  if ((street === "turn" || street === "river") && hand.board.turn !== null) {
    cards.push(hand.board.turn);
  }

  if (street === "river" && hand.board.river !== null) {
    cards.push(hand.board.river);
  }

  return cards.join(" ");
}

function formatActionType(action: HandAction): string {
  if (action.type === "all_in") {
    return "Jam";
  }

  if (action.type === "raise") {
    return "Raise";
  }

  return action.type.replaceAll("_", " ").replace(/^\w/, (letter) => letter.toUpperCase());
}

function formatActionAmount(action: HandAction, bigBlind: number): string {
  const amount = action.raiseTo ?? action.amount;

  if (amount === null || bigBlind <= 0) {
    return "";
  }

  return ` ${roundStat(amount / bigBlind)} BB`;
}

function formatBlinds(hand: PokerHand): string {
  if (hand.stakes.bigBlind <= 0) {
    return `${formatCurrencyAmount(hand.stakes.smallBlind, hand.stakes.currency)} / ${formatCurrencyAmount(
      hand.stakes.bigBlind,
      hand.stakes.currency,
    )}`;
  }

  return `${formatCurrencyAmount(hand.stakes.smallBlind, hand.stakes.currency)} / ${formatCurrencyAmount(
    hand.stakes.bigBlind,
    hand.stakes.currency,
  )}`;
}

function getEffectiveStackAmount(hand: PokerHand): number | null {
  if (hand.stakes.bigBlind <= 0) {
    return null;
  }

  const heroStack = hand.players.find((player) => player.isHero)?.startingStack ?? null;

  if (heroStack === null) {
    return null;
  }

  const largestOpponentStack = hand.players
    .filter((player) => !player.isHero)
    .reduce<
      number | null
    >((largestStack, player) => (largestStack === null ? player.startingStack : Math.max(largestStack, player.startingStack)), null);

  if (largestOpponentStack === null) {
    return heroStack;
  }

  return Math.min(heroStack, largestOpponentStack);
}

function formatStackWithBb(amount: number, hand: PokerHand): string {
  return `${formatCurrencyAmount(amount, hand.stakes.currency)} (${roundStat(
    amount / hand.stakes.bigBlind,
  )} BB)`;
}

function getEffectiveStackBb(hand: PokerHand): number | null {
  const effectiveStackAmount = getEffectiveStackAmount(hand);

  if (effectiveStackAmount === null || hand.stakes.bigBlind <= 0) {
    return null;
  }

  return roundStat(effectiveStackAmount / hand.stakes.bigBlind);
}

function isShortEffectiveStack(hand: PokerHand): boolean {
  const effectiveStackBb = getEffectiveStackBb(hand);

  return effectiveStackBb !== null && effectiveStackBb <= 30;
}

function getPreflopOptions(
  baseOptions: readonly QuizOption[],
  hand: PokerHand,
): readonly QuizOption[] {
  return isShortEffectiveStack(hand) ? [...baseOptions, PREFLOP_JAM_OPTION] : baseOptions;
}

function getStreetOrder(street: PokerStreet): number {
  return ["preflop", "flop", "turn", "river"].indexOf(street);
}

function getFirstHeroDecisionOnStreet(
  hand: PokerHand,
  street: PokerStreet,
): HandAction | undefined {
  return hand.streetActions[street].find(
    (action) =>
      action.playerName === HERO_NAME &&
      ["all_in", "bet", "call", "check", "fold", "raise"].includes(action.type),
  );
}

function isVisibleActionAtDecision(
  action: HandAction,
  decisionStreet: PokerStreet,
  firstHeroDecision?: HandAction,
): boolean {
  const actionStreetOrder = getStreetOrder(action.street);
  const decisionStreetOrder = getStreetOrder(decisionStreet);

  if (actionStreetOrder < decisionStreetOrder) {
    return true;
  }

  if (actionStreetOrder > decisionStreetOrder) {
    return false;
  }

  if (firstHeroDecision === undefined) {
    return true;
  }

  return action.order < firstHeroDecision.order;
}

function getActionsVisibleAtDecision(hand: PokerHand, street: PokerStreet): readonly HandAction[] {
  const firstHeroDecision = getFirstHeroDecisionOnStreet(hand, street);

  return hand.actions.filter((action) =>
    isVisibleActionAtDecision(action, street, firstHeroDecision),
  );
}

function getEstimatedPotBbAtDecision(hand: PokerHand, street: PokerStreet): number | null {
  if (street === "preflop" || hand.stakes.bigBlind <= 0) {
    return null;
  }

  const visibleCommittedAmount = getActionsVisibleAtDecision(hand, street).reduce(
    (total, action) => total + (action.raiseTo ?? action.amount ?? 0),
    0,
  );

  if (visibleCommittedAmount <= 0) {
    return null;
  }

  return roundStat(visibleCommittedAmount / hand.stakes.bigBlind);
}

function formatVisibleActionSummary(hand: PokerHand, street: PokerStreet): string {
  const actions = getActionsVisibleAtDecision(hand, street);

  if (actions.length === 0) {
    return "-";
  }

  return actions
    .slice(0, 12)
    .map(
      (action) =>
        `${STREET_LABELS[action.street]}: ${action.playerName} ${formatActionType(
          action,
        )}${formatActionAmount(action, hand.stakes.bigBlind)}`,
    )
    .join("\n");
}

function formatPlayerPositionSuffix(position: PokerPosition): string {
  return position === "UNKNOWN" ? "" : ` (${position})`;
}

function createQuizPlayerLabels(hand: PokerHand): ReadonlyMap<string, string> {
  const labels = new Map<string, string>();
  const sortedPlayers = [...hand.players].sort((left, right) => left.seat - right.seat);
  let nextVillainNumber = 1;

  sortedPlayers.forEach((player) => {
    if (player.isHero) {
      labels.set(player.name, `Hero${formatPlayerPositionSuffix(player.position)}`);
      return;
    }

    labels.set(
      player.name,
      `Villain ${nextVillainNumber}${formatPlayerPositionSuffix(player.position)}`,
    );
    nextVillainNumber += 1;
  });

  if (!labels.has(hand.heroName)) {
    labels.set(hand.heroName, `Hero${formatPlayerPositionSuffix(hand.heroPosition)}`);
  }

  return labels;
}

function getQuizPlayerLabel(
  playerLabels: ReadonlyMap<string, string>,
  playerName: string,
): string | null {
  return playerLabels.get(playerName) ?? null;
}

function formatShowdownSummary(hand: PokerHand): string | null {
  if (hand.showdown === null) {
    return null;
  }

  const playerLabels = createQuizPlayerLabels(hand);
  const entries = hand.showdown.entries
    .map((entry) => {
      const playerLabel = getQuizPlayerLabel(playerLabels, entry.playerName);

      if (playerLabel === null || entry.cards === null) {
        return null;
      }

      const description = entry.handDescription === null ? "" : ` (${entry.handDescription})`;

      return `${playerLabel}: ${entry.cards.join(" ")}${description}`;
    })
    .filter((entry): entry is string => entry !== null);

  if (entries.length === 0) {
    return null;
  }

  return entries.join("\n");
}

function getActionSummary(hand: PokerHand): string | undefined {
  const heroActions = hand.actions
    .filter((action) => action.playerName === HERO_NAME)
    .slice(0, 9)
    .map(
      (action) =>
        `${STREET_LABELS[action.street]}: ${formatActionType(action)}${formatActionAmount(
          action,
          hand.stakes.bigBlind,
        )}`,
    );

  if (didHeroReachShowdown(hand)) {
    heroActions.push("River: Showdown");
  }

  if (heroActions.length === 0) {
    return undefined;
  }

  return heroActions.join("\n");
}

function createQuestionContext(hand: PokerHand): QuizQuestionContext {
  const board = formatBoard(hand);
  const potBb = toBigBlinds(hand.totalPot, hand.stakes.bigBlind);
  const heroNetBb = toBigBlinds(hand.heroNetResult, hand.stakes.bigBlind);
  const actionSummary = getActionSummary(hand);
  const splashPot = classifySplashPot(hand);

  return {
    heroCards: formatCards(hand.heroCards),
    heroPosition: hand.heroPosition,
    ...(board.length > 0 ? { board } : {}),
    ...(potBb === null ? {} : { potBb }),
    ...(heroNetBb === null ? {} : { heroNetBb }),
    ...(actionSummary === undefined ? {} : { actionSummary }),
    ...(splashPot.isSplashPot || splashPot.isSplashPotCandidate ? { isSplashPotReview: true } : {}),
  };
}

function getHeroNetBb(hand: PokerHand): number {
  return toBigBlinds(hand.heroNetResult, hand.stakes.bigBlind) ?? 0;
}

function getPotBb(hand: PokerHand): number | null {
  return toBigBlinds(hand.totalPot, hand.stakes.bigBlind);
}

function formatOptionalBb(value: number | null, signed = false): string | null {
  if (value === null) {
    return null;
  }

  if (!signed) {
    return `${roundStat(value)} BB`;
  }

  return `${value > 0 ? "+" : ""}${roundStat(value)} BB`;
}

function getRankValue(rank: string): number {
  return RANKS.indexOf(rank as (typeof RANKS)[number]);
}

function getHighRankValue(notation: string): number {
  return getRankValue(notation[0] ?? "2");
}

function isSuited(notation: string): boolean {
  return notation.endsWith("s");
}

function isOffsuit(notation: string): boolean {
  return notation.endsWith("o");
}

function isPairNotation(notation: string): boolean {
  return notation.length === 2 && notation[0] === notation[1];
}

function getPairRankValue(notation: string): number {
  return isPairNotation(notation) ? getRankValue(notation[0] ?? "2") : -1;
}

function getLowRankValue(notation: string): number {
  return getRankValue(notation[1] ?? "2");
}

function isAceWheelSuited(notation: string): boolean {
  return ["A5s", "A4s"].includes(notation);
}

function isSuitedAce(notation: string): boolean {
  return isSuited(notation) && notation[0] === "A";
}

function isSuitedKingOrQueen(notation: string): boolean {
  return isSuited(notation) && ["K", "Q"].includes(notation[0] ?? "2");
}

function isSuitedBroadway(notation: string): boolean {
  return isSuited(notation) && getLowRankValue(notation) >= getRankValue("T");
}

function isSuitedConnectorDownTo65(notation: string): boolean {
  if (!isSuited(notation)) {
    return false;
  }

  const highRank = getHighRankValue(notation);
  const lowRank = getLowRankValue(notation);

  return highRank - lowRank === 1 && lowRank >= getRankValue("5");
}

function isSelectiveSuitedOneGapper(notation: string): boolean {
  if (!isSuited(notation)) {
    return false;
  }

  const highRank = getHighRankValue(notation);
  const lowRank = getLowRankValue(notation);

  return highRank - lowRank === 2 && lowRank >= getRankValue("6");
}

function isDeepOpenStack(hand: PokerHand): boolean {
  const effectiveStackBb = getEffectiveStackBb(hand);

  return effectiveStackBb === null || effectiveStackBb >= 80;
}

function isVeryWeakOffsuit(notation: string): boolean {
  if (!notation.endsWith("o")) {
    return false;
  }

  const highRank = notation[0] ?? "2";
  const lowRank = notation[1] ?? "2";

  if (highRank === "A") {
    return getRankValue(lowRank) <= getRankValue("8");
  }

  if (highRank === "K") {
    return getRankValue(lowRank) <= getRankValue("7");
  }

  if (highRank === "Q") {
    return getRankValue(lowRank) <= getRankValue("8");
  }

  if (highRank === "J") {
    return getRankValue(lowRank) <= getRankValue("9");
  }

  return getHighRankValue(notation) <= getRankValue("T");
}

function getPlayerPosition(hand: PokerHand, playerName: string): PokerPosition {
  return hand.players.find((player) => player.name === playerName)?.position ?? "UNKNOWN";
}

function getOpponentTendency(hand: PokerHand, playerName: string): OpponentTendency {
  const player = hand.players.find((candidate) => candidate.name === playerName);
  const vpip = player?.vpip;

  if (vpip === undefined) {
    return "unknown";
  }

  if (vpip >= 35) {
    return "loose";
  }

  if (vpip <= 18) {
    return "tight";
  }

  return "unknown";
}

function getOpponentTendencyNote(tendency: OpponentTendency): string {
  if (tendency === "loose") {
    return "Opponent tendency: Loose. Available VPIP suggests a wider range, so continuing in position can become more attractive.";
  }

  if (tendency === "tight") {
    return "Opponent tendency: Tight. Available VPIP suggests a stronger range, so dominated offsuit continues become worse.";
  }

  return "Opponent tendency unknown. This recommendation uses a default population heuristic.";
}

function getHeroFirstPreflopDecision(hand: PokerHand): HandAction | undefined {
  return hand.streetActions.preflop.find(
    (action) =>
      action.playerName === HERO_NAME && ["all_in", "call", "fold", "raise"].includes(action.type),
  );
}

function getPriorPreflopRaise(hand: PokerHand): HandAction | undefined {
  const heroDecision = getHeroFirstPreflopDecision(hand);

  if (heroDecision === undefined) {
    return undefined;
  }

  return hand.streetActions.preflop
    .filter((action) => action.order < heroDecision.order && action.type === "raise")
    .at(-1);
}

function getPreflopOpenContext(hand: PokerHand): PreflopOpenContext | null {
  const heroDecision = getHeroFirstPreflopDecision(hand);

  if (heroDecision === undefined) {
    return null;
  }

  const raisesBeforeHero = hand.streetActions.preflop.filter(
    (action) =>
      action.order < heroDecision.order &&
      action.playerName !== HERO_NAME &&
      action.type === "raise",
  );

  if (raisesBeforeHero.length !== 1) {
    return null;
  }

  const openRaise = raisesBeforeHero[0];

  if (openRaise === undefined) {
    return null;
  }

  const openAmount = openRaise.raiseTo ?? openRaise.amount;
  const openSizeBb = toBigBlinds(openAmount, hand.stakes.bigBlind);

  if (openAmount === null || openSizeBb === null) {
    return null;
  }

  const callerPositions = hand.streetActions.preflop
    .filter(
      (action) =>
        action.order > openRaise.order &&
        action.order < heroDecision.order &&
        action.playerName !== HERO_NAME &&
        action.type === "call",
    )
    .map((action) => getPlayerPosition(hand, action.playerName));
  const openerPosition = getPlayerPosition(hand, openRaise.playerName);
  const openerTendency = getOpponentTendency(hand, openRaise.playerName);
  const callerText =
    callerPositions.length === 0
      ? "0 callers"
      : `${callerPositions.length} ${callerPositions.length === 1 ? "caller" : "callers"}`;

  return {
    openerLabel: openerPosition === "UNKNOWN" ? "Opener" : openerPosition,
    openerPosition,
    openSizeBb,
    callerPositions,
    facingAction: `Facing ${openerPosition} open to ${openSizeBb} BB · ${callerText}`,
    openerTendency,
    openerTendencyNote: getOpponentTendencyNote(openerTendency),
  };
}

function isUnopenedBeforeHero(hand: PokerHand): boolean {
  const heroDecision = getHeroFirstPreflopDecision(hand);

  if (heroDecision === undefined) {
    return false;
  }

  return !hand.streetActions.preflop.some(
    (action) =>
      action.order < heroDecision.order &&
      action.playerName !== HERO_NAME &&
      ["all_in", "call", "raise"].includes(action.type),
  );
}

function getReviewStreet(hand: PokerHand): PokerStreet {
  if (hand.streetActions.river.length > 0 || hand.board.river !== null) {
    return "river";
  }

  if (hand.streetActions.turn.length > 0 || hand.board.turn !== null) {
    return "turn";
  }

  if (hand.streetActions.flop.length > 0 || hand.board.flop !== null) {
    return "flop";
  }

  return "preflop";
}

function handReachedRiver(hand: PokerHand): boolean {
  return hand.board.river !== null || hand.streetActions.river.length > 0;
}

function getRiverFacingBet(hand: PokerHand): HandAction | undefined {
  const heroRiverDecision = hand.streetActions.river.find(
    (action) =>
      action.playerName === HERO_NAME && ["all_in", "call", "fold", "raise"].includes(action.type),
  );

  if (heroRiverDecision === undefined) {
    return undefined;
  }

  return hand.streetActions.river
    .filter(
      (action) =>
        action.order < heroRiverDecision.order &&
        action.playerName !== HERO_NAME &&
        ["all_in", "bet", "raise"].includes(action.type),
    )
    .at(-1);
}

function getHeroShowdownDescription(hand: PokerHand): string | null {
  return (
    hand.showdown?.entries.find((entry) => entry.playerName === HERO_NAME)?.handDescription ?? null
  );
}

function isStrongShowdownHand(description: string | null): boolean {
  if (description === null) {
    return false;
  }

  const normalized = description.toLowerCase();

  return (
    normalized.includes("top pair") ||
    normalized.includes("two pair") ||
    normalized.includes("three of a kind") ||
    normalized.includes("straight") ||
    normalized.includes("flush") ||
    normalized.includes("full house") ||
    normalized.includes("four of a kind") ||
    normalized.includes("set")
  );
}

function isTopPairLike(hand: PokerHand): boolean {
  const notation = normalizeHoleCards(hand.heroCards);
  const flopTopRank = hand.board.flop
    ?.map((card) => card[0] ?? "2")
    .sort((left, right) => getRankValue(right) - getRankValue(left))[0];

  if (notation === null || flopTopRank === undefined) {
    return false;
  }

  return notation.includes(flopTopRank) && getHighRankValue(notation) >= getRankValue("K");
}

function getSplashExplanation(hand: PokerHand): string {
  const splashPot = classifySplashPot(hand);

  if (!splashPot.isSplashPot && !splashPot.isSplashPotCandidate) {
    return "";
  }

  return ` This is marked as a splash review spot because the pot was ${splashPot.potBb} BB; splash pots can distort normal review priorities.`;
}

function createPreflopRecommendation(
  notation: string,
  heroPosition: PokerPosition,
  openerPosition: PokerPosition,
  openerTendency: OpponentTendency,
  openerTendencyNote: string,
): PreflopRecommendation {
  const isButtonVsCutoffOpen = heroPosition === "BTN" && openerPosition === "CO";
  const isTightOpen = openerPosition === "UTG" || openerPosition === "HJ";
  const pairRank = getPairRankValue(notation);

  if (PREFLOP_THREE_BET_CANDIDATES.has(notation) || isAceWheelSuited(notation)) {
    return {
      correctOptionId: "three-bet-small",
      acceptableOptionIds: ["call"],
      recommendedAnswer: "3bet small",
      explanation:
        "Recommended default. This hand has enough raw equity or blocker value to 3bet small, while calling can still be acceptable in some lineups.",
      takeaway:
        "Use small 3bets with hands that can value-build or apply blocker pressure; avoid jumping straight to all-in at normal stack depth.",
    };
  }

  if (isButtonVsCutoffOpen) {
    if (notation === "KJo") {
      if (openerTendency === "tight") {
        return {
          correctOptionId: "fold",
          acceptableOptionIds: ["call"],
          marginalOptionIds: ["three-bet-small"],
          answerEvaluations: [
            createEvaluation(
              "fold",
              "correct",
              100,
              "Against a tight CO opener, folding KJo avoids dominated offsuit spots.",
            ),
            createEvaluation(
              "call",
              "acceptable",
              75,
              "Calling can still be acceptable in position if the opener is not too strong postflop.",
            ),
            createEvaluation(
              "three-bet-small",
              "marginal",
              45,
              "Small 3betting KJo loses appeal versus a tight range without stronger fold reads.",
            ),
            createEvaluation(
              "three-bet-large",
              "incorrect",
              0,
              "Large 3bets with dominated offsuit broadways are too loose at normal stack depth.",
            ),
          ],
          recommendedAnswer: "Fold",
          explanation: `This is a close/mixed preflop spot, but the opener appears tight. KJo can be dominated by a stronger CO range, so folding is the conservative default while calling remains acceptable in position. ${openerTendencyNote}`,
          takeaway:
            "Use opponent tendency to downgrade dominated offsuit calls against tighter openers.",
          confidence: "medium",
          confidenceReason:
            "Rule-based score uses a simple VPIP bucket; exact strategy still depends on opener sizing and postflop tendencies.",
        };
      }

      return {
        correctOptionId: "call",
        acceptableOptionIds: ["three-bet-small"],
        marginalOptionIds: ["fold"],
        answerEvaluations: [
          createEvaluation(
            "call",
            "correct",
            100,
            "Calling realizes equity in position versus a CO range and keeps dominated hands from overplaying.",
          ),
          createEvaluation(
            "three-bet-small",
            "acceptable",
            75,
            "A small 3bet can be acceptable as a mixed aggressive option, especially without deeper villain reads.",
          ),
          createEvaluation(
            "fold",
            "marginal",
            openerTendency === "loose" ? 40 : 50,
            "Folding is tight but not unreasonable if the opener is strong or Hero wants lower-variance defaults.",
          ),
          createEvaluation(
            "three-bet-large",
            "incorrect",
            0,
            "Large 3bets with KJo are too aggressive at normal stack depth without a clear exploit.",
          ),
        ],
        recommendedAnswer: "Call",
        explanation: `This is a close/mixed preflop spot. The goal is not to punish reasonable alternatives: calling is a playable default in position, occasional small 3bets can be acceptable, and folding is marginal rather than a hard failure. ${openerTendencyNote}`,
        takeaway:
          "Treat marginal broadways as context hands, not automatic trash, when you have position versus a cutoff open.",
        confidence: "medium",
        confidenceReason:
          "Without detailed fold-to-3bet or postflop reads, this is a default population recommendation.",
      };
    }

    if (
      STRONG_PLAYABLE_VS_OPEN.has(notation) ||
      (pairRank >= getRankValue("7") && pairRank <= getRankValue("J"))
    ) {
      return {
        correctOptionId: "call",
        acceptableOptionIds: ["three-bet-small"],
        recommendedAnswer: "Call",
        explanation:
          "Recommended default: Call. BTN versus CO is a wider configuration, so playable broadways and medium pairs should not be treated as automatic folds. 3bet small is also acceptable as a mixed aggressive option.",
        takeaway:
          "In late-position battles, do not overfold hands that realize equity well in position.",
      };
    }

    if (MARGINAL_PLAYABLE_VS_STEAL.has(notation)) {
      return {
        correctOptionId: "call",
        acceptableOptionIds: ["fold", "three-bet-small"],
        recommendedAnswer: "Call",
        explanation:
          "This is a close/mixed preflop spot. The goal is not to punish reasonable alternatives: calling is a playable default in position, while folding or occasional small 3bets can be acceptable depending on opener tendencies.",
        takeaway:
          "Treat marginal broadways as context hands, not automatic trash, when you have position versus a cutoff open.",
      };
    }

    if (CLEAR_FOLD_VS_STEAL.has(notation) || isVeryWeakOffsuit(notation)) {
      return {
        correctOptionId: "fold",
        recommendedAnswer: "Fold",
        explanation:
          "Conservative default. Weak offsuit trash still performs poorly even in position because it makes dominated pairs and has limited backup equity.",
        takeaway:
          "Wide late-position configurations are not permission to continue with disconnected offsuit hands.",
      };
    }
  }

  if (isTightOpen) {
    if (notation === "AJo") {
      return {
        correctOptionId: "fold",
        acceptableOptionIds: ["call"],
        recommendedAnswer: "Fold",
        explanation:
          "This is a close/mixed preflop spot versus a tighter open. AJo can be dominated by the strongest early-position range, so folding is the conservative default while calling can be acceptable in softer lineups.",
        takeaway:
          "Versus early-position opens, offsuit broadways need extra discipline because domination matters more.",
      };
    }

    if (
      notation === "KJo" ||
      notation === "QJo" ||
      notation === "KTo" ||
      isVeryWeakOffsuit(notation)
    ) {
      return {
        correctOptionId: "fold",
        recommendedAnswer: "Fold",
        explanation:
          "Conservative default. Against UTG/HJ opens, dominated offsuit broadways lose value because the opening range is stronger.",
        takeaway:
          "Tight early-position opens require tighter continues, especially with offsuit broadways.",
      };
    }

    if (
      STRONG_PLAYABLE_VS_OPEN.has(notation) ||
      (pairRank >= getRankValue("9") && pairRank <= getRankValue("J"))
    ) {
      return {
        correctOptionId: "call",
        acceptableOptionIds: ["fold", "three-bet-small"],
        recommendedAnswer: "Call",
        explanation:
          "This is a close/mixed preflop spot versus a tighter open. Calling is playable with the stronger suited broadways and pairs, but tighter folds or small 3bets can be acceptable alternatives.",
        takeaway:
          "Versus early-position opens, continue with hands that retain equity well and avoid dominated offsuit calls.",
      };
    }
  }

  if (
    STRONG_PLAYABLE_VS_OPEN.has(notation) ||
    (pairRank >= getRankValue("8") && pairRank <= getRankValue("J"))
  ) {
    return {
      correctOptionId: "call",
      acceptableOptionIds: ["three-bet-small"],
      recommendedAnswer: "Call",
      explanation:
        "Recommended default: Call. This hand is strong enough to continue versus an open, and 3bet small can be acceptable as a mixed aggressive line.",
      takeaway:
        "Do not collapse every non-premium hand into fold; playable hands need position and opener context.",
    };
  }

  if (MARGINAL_PLAYABLE_VS_STEAL.has(notation) && !isTightOpen) {
    return {
      correctOptionId: "call",
      acceptableOptionIds: ["fold"],
      recommendedAnswer: "Call",
      explanation:
        "This is a close/mixed preflop spot. Calling is reasonable against later opens, while folding remains acceptable if the opener is tight.",
      takeaway:
        "Use opener position to decide whether marginal hands are profitable continues or disciplined folds.",
    };
  }

  return {
    correctOptionId: "fold",
    recommendedAnswer: "Fold",
    explanation:
      "Conservative default. This hand is too dominated or disconnected to continue profitably against the open without stronger reads.",
    takeaway:
      "When the hand has poor equity realization and domination problems, folding preflop protects your stack.",
  };
}

function isAnyPocketPair(notation: string): boolean {
  return isPairNotation(notation) && getPairRankValue(notation) >= getRankValue("2");
}

function isCoSuitedKingQueenOpen(notation: string): boolean {
  if (!isSuited(notation)) {
    return false;
  }

  const highRank = notation[0] ?? "2";
  const lowRank = getLowRankValue(notation);

  return (
    (highRank === "K" && lowRank >= getRankValue("9")) ||
    (highRank === "Q" && lowRank >= getRankValue("9"))
  );
}

function isStandardLatePositionOpen(notation: string): boolean {
  return (
    PREMIUM_HANDS.has(notation) ||
    STRONG_OPEN_HANDS.has(notation) ||
    STANDARD_LATE_POSITION_OPEN_HANDS.has(notation) ||
    isAnyPocketPair(notation) ||
    isSuitedAce(notation) ||
    isSuitedBroadway(notation) ||
    isSuitedConnectorDownTo65(notation)
  );
}

function isMarginalLatePositionOpen(notation: string): boolean {
  return (
    MARGINAL_CO_OPEN_HANDS.has(notation) ||
    notation === "A9o" ||
    isCoSuitedKingQueenOpen(notation) ||
    isSelectiveSuitedOneGapper(notation)
  );
}

function isButtonStealOpen(notation: string): boolean {
  return (
    isStandardLatePositionOpen(notation) ||
    isMarginalLatePositionOpen(notation) ||
    BUTTON_STEAL_OPEN_HANDS.has(notation) ||
    isSuitedKingOrQueen(notation) ||
    isSelectiveSuitedOneGapper(notation)
  );
}

function createUnopenedPreflopRecommendation(
  notation: string,
  heroPosition: PokerPosition,
  hand: PokerHand,
): PreflopRecommendation | null {
  const isDeepStack = isDeepOpenStack(hand);
  const isAlwaysOpen =
    PREMIUM_HANDS.has(notation) ||
    STRONG_OPEN_HANDS.has(notation) ||
    (isAnyPocketPair(notation) && getPairRankValue(notation) >= getRankValue("7"));

  if (isAlwaysOpen) {
    return {
      correctOptionId: "raise",
      recommendedAnswer: "Raise",
      explanation:
        "Recommended default. This is a strong first-in hand, so raising builds value, initiative, and fold equity.",
      takeaway: "When first into the pot, prefer raise-or-fold defaults over limping.",
    };
  }

  if (heroPosition === "CO") {
    if (isDeepStack && isMarginalLatePositionOpen(notation)) {
      return {
        correctOptionId: "raise",
        acceptableOptionIds: ["fold"],
        answerEvaluations: [
          createEvaluation(
            "raise",
            "correct",
            100,
            "Raise is the default CO steal action with this marginal but playable hand.",
          ),
          createEvaluation(
            "fold",
            "acceptable",
            notation === "QTo" ? 60 : 65,
            "Fold is acceptable in tighter simplified CO strategies.",
          ),
          createEvaluation(
            "limp",
            "incorrect",
            0,
            "The app uses a raise-or-fold first-in strategy from CO, not an open-limp default.",
          ),
        ],
        recommendedAnswer: "Raise",
        explanation:
          notation === "QTo"
            ? "QTo is a marginal but reasonable CO open when action folds to Hero. It can be folded in tighter strategies, but Raise should not be marked incorrect."
            : "This is a marginal but reasonable open from the CO when action folds to Hero. Folding can be acceptable in tighter strategies, but raising should not be treated as a mistake.",
        takeaway:
          "CO steal spots are wider than early-position spots; avoid applying facing-open dominated-hand rules to unopened pots.",
      };
    }

    if (
      isDeepStack &&
      (isStandardLatePositionOpen(notation) || isCoSuitedKingQueenOpen(notation))
    ) {
      return {
        correctOptionId: "raise",
        recommendedAnswer: "Raise",
        explanation:
          "Recommended default. This hand fits a reasonable CO first-in range, so raising is preferred over limping.",
        takeaway:
          "When action folds to the CO, open playable pairs, broadways, suited aces, and connected suited hands with a raise-or-fold plan.",
      };
    }
  }

  if (heroPosition === "BTN") {
    if (isDeepStack && isButtonStealOpen(notation)) {
      return {
        correctOptionId: "raise",
        recommendedAnswer: "Raise",
        explanation:
          "Recommended default. BTN steal ranges are wider than CO ranges, and this hand is a reasonable open when action folds to Hero.",
        takeaway:
          "On the button, use position to open wider with broadways, suited hands, pairs, and selected offsuit steal hands.",
      };
    }
  }

  if (heroPosition === "SB") {
    if (isDeepStack && isButtonStealOpen(notation) && !isVeryWeakOffsuit(notation)) {
      return {
        correctOptionId: "raise",
        acceptableOptionIds: ["fold"],
        recommendedAnswer: "Raise",
        explanation:
          "Recommended default. SB first-in ranges can be wide, but this app uses a raise-or-fold default rather than recommending limp.",
        takeaway:
          "Small-blind opens are strategy-dependent, but avoid defaulting to limp unless you are intentionally studying a limp strategy.",
      };
    }

    return {
      correctOptionId: "fold",
      recommendedAnswer: "Fold",
      explanation:
        "Conservative default. From the SB, weak hands still play out of position, so folding is preferred when the hand is too disconnected for a raise.",
      takeaway:
        "Small-blind steal ranges can be wide, but raise-or-fold discipline matters when the hand has poor equity realization.",
    };
  }

  if (heroPosition === "UTG" || heroPosition === "HJ") {
    if (PREMIUM_HANDS.has(notation) || STRONG_OPEN_HANDS.has(notation)) {
      return {
        correctOptionId: "raise",
        recommendedAnswer: "Raise",
        explanation:
          "Recommended default. Early-position opens should stay tighter, but this hand is strong enough to raise first in.",
        takeaway:
          "Early position needs stronger opening discipline than CO, BTN, or SB steal seats.",
      };
    }

    if (isOffsuit(notation) || isVeryWeakOffsuit(notation)) {
      return {
        correctOptionId: "fold",
        marginalOptionIds: ["raise"],
        answerEvaluations: [
          createEvaluation(
            "fold",
            "correct",
            100,
            "Fold keeps UTG/HJ first-in ranges disciplined with dominated offsuit broadways.",
          ),
          createEvaluation(
            "raise",
            "marginal",
            notation === "QTo" ? 40 : 45,
            "Raising a marginal offsuit broadway from early position is too wide for the default heuristic.",
          ),
          createEvaluation(
            "limp",
            "incorrect",
            0,
            "Open-limping does not fit the quiz's raise-or-fold first-in default.",
          ),
        ],
        recommendedAnswer: "Fold",
        explanation:
          "Conservative default. Early-position unopened ranges are tighter, and offsuit marginal broadways can run into domination.",
        takeaway:
          "Do not use late-position steal ranges from UTG/HJ; position should tighten the opening threshold.",
      };
    }
  }

  return null;
}

function createPreflopDisciplineQuestion(hand: PokerHand): QuizQuestion | null {
  const notation = normalizeHoleCards(hand.heroCards);
  const priorRaise = getPriorPreflopRaise(hand);

  if (notation === null) {
    return null;
  }

  if (priorRaise !== undefined && !["SB", "BB"].includes(hand.heroPosition)) {
    const openContext = getPreflopOpenContext(hand);

    if (openContext === null) {
      return null;
    }

    const recommendation = createPreflopRecommendation(
      notation,
      hand.heroPosition,
      openContext.openerPosition,
      openContext.openerTendency,
      openContext.openerTendencyNote,
    );

    return {
      id: `${hand.handId}-preflop-facing-open`,
      handId: hand.handId,
      street: "preflop",
      spotType: "preflop-decision",
      prompt: `Hero ${hand.heroPosition}: ${notation}. Facing an open raise, what is the best default action?`,
      context: createQuestionContext(hand),
      options: getPreflopOptions(FACING_OPEN_OPTIONS, hand),
      correctOptionId: recommendation.correctOptionId,
      ...(recommendation.acceptableOptionIds === undefined
        ? {}
        : { acceptableOptionIds: recommendation.acceptableOptionIds }),
      ...(recommendation.marginalOptionIds === undefined
        ? {}
        : { marginalOptionIds: recommendation.marginalOptionIds }),
      ...(recommendation.answerEvaluations === undefined
        ? {}
        : { answerEvaluations: recommendation.answerEvaluations }),
      recommendedAnswer: recommendation.recommendedAnswer,
      explanation: recommendation.explanation,
      takeaway: recommendation.takeaway,
      ...(recommendation.confidence === undefined ? {} : { confidence: recommendation.confidence }),
      ...(recommendation.confidenceReason === undefined
        ? {}
        : { confidenceReason: recommendation.confidenceReason }),
    };
  }

  if (!isUnopenedBeforeHero(hand)) {
    return null;
  }

  const recommendation = createUnopenedPreflopRecommendation(notation, hand.heroPosition, hand);

  if (recommendation === null) {
    return null;
  }

  return {
    id: `${hand.handId}-preflop-unopened`,
    handId: hand.handId,
    street: "preflop",
    spotType: "preflop-decision",
    prompt: `Hero ${hand.heroPosition}: ${notation}. Action folds to Hero. What is the best default action?`,
    context: createQuestionContext(hand),
    options: getPreflopOptions(OPEN_PREFLOP_OPTIONS, hand),
    correctOptionId: recommendation.correctOptionId,
    ...(recommendation.acceptableOptionIds === undefined
      ? {}
      : { acceptableOptionIds: recommendation.acceptableOptionIds }),
    ...(recommendation.marginalOptionIds === undefined
      ? {}
      : { marginalOptionIds: recommendation.marginalOptionIds }),
    ...(recommendation.answerEvaluations === undefined
      ? {}
      : { answerEvaluations: recommendation.answerEvaluations }),
    recommendedAnswer: recommendation.recommendedAnswer,
    explanation: recommendation.explanation,
    takeaway: recommendation.takeaway,
    ...(recommendation.confidence === undefined ? {} : { confidence: recommendation.confidence }),
    ...(recommendation.confidenceReason === undefined
      ? {}
      : { confidenceReason: recommendation.confidenceReason }),
  };
}

function createBlindDefenseQuestion(hand: PokerHand): QuizQuestion | null {
  const notation = normalizeHoleCards(hand.heroCards);
  const priorRaise = getPriorPreflopRaise(hand);

  if (notation === null || priorRaise === undefined || !["BB", "SB"].includes(hand.heroPosition)) {
    return null;
  }

  const openContext = getPreflopOpenContext(hand);

  if (openContext === null) {
    return null;
  }

  let recommendedOptionId = "fold";

  if (BLIND_THREE_BET_HANDS.has(notation)) {
    recommendedOptionId = "three-bet-large";
  } else if (
    BLIND_CALL_HANDS.has(notation) ||
    (isSuited(notation) && getHighRankValue(notation) >= getRankValue("K"))
  ) {
    recommendedOptionId = "call";
  }

  const recommendedAnswer =
    recommendedOptionId === "three-bet-large"
      ? "3bet large"
      : recommendedOptionId === "call"
        ? "Call"
        : "Fold";
  return {
    id: `${hand.handId}-blind-defense`,
    handId: hand.handId,
    street: "preflop",
    spotType: "blind-defense",
    prompt: `${openContext.openerPosition} opens. Hero ${hand.heroPosition}: ${notation}. What is the best default action?`,
    context: createQuestionContext(hand),
    options: getPreflopOptions(BLIND_DEFENSE_OPTIONS, hand),
    correctOptionId: recommendedOptionId,
    recommendedAnswer,
    explanation:
      recommendedOptionId === "three-bet-large"
        ? "Recommended default. This hand has enough strength or blocker value to apply pressure from the blinds."
        : recommendedOptionId === "call"
          ? "Recommended default. This hand can usually continue and realize equity against a steal without inflating the pot."
          : "Conservative default. Weak offsuit blind defenses often lose more from domination and out-of-position play than they recover in pot odds.",
    takeaway:
      recommendedOptionId === "fold"
        ? "Blind defense is not permission to defend everything; dominated trash still belongs in the muck."
        : "Defend blinds with hands that either realize equity well or have clear value/blocker reasons to 3bet.",
  };
}

function createValueExtractionQuestion(hand: PokerHand): QuizQuestion | null {
  const heroNetBb = getHeroNetBb(hand);
  const splashPot = classifySplashPot(hand);
  const showdownDescription = getHeroShowdownDescription(hand);

  if (
    heroNetBb <= 5 ||
    !didHeroReachShowdown(hand) ||
    splashPot.isSplashPotCandidate ||
    (!isStrongShowdownHand(showdownDescription) && !isTopPairLike(hand))
  ) {
    return null;
  }

  return {
    id: `${hand.handId}-value-extraction`,
    handId: hand.handId,
    street: getReviewStreet(hand),
    spotType: "value-bet",
    prompt:
      "Hero reached showdown with a strong made hand. What sizing extracts the most value by default?",
    context: createQuestionContext(hand),
    options: VALUE_EXTRACTION_OPTIONS,
    correctOptionId: "bet-75",
    recommendedAnswer: "Bet 75%",
    explanation:
      "Recommended default. Strong made hands often benefit from larger value sizing because worse pairs and draws can still continue.",
    takeaway:
      "When many worse hands can call, think value before pot control and avoid defaulting to small bets.",
  };
}

function createRiverDisciplineQuestion(
  hand: PokerHand,
  hasHighWtsdLeak: boolean,
): QuizQuestion | null {
  const facingBet = getRiverFacingBet(hand);
  const heroNetBb = getHeroNetBb(hand);

  if (!handReachedRiver(hand) || facingBet === undefined || (heroNetBb >= 0 && !hasHighWtsdLeak)) {
    return null;
  }

  const betBb = toBigBlinds(facingBet.raiseTo ?? facingBet.amount, hand.stakes.bigBlind);
  const potBb = getPotBb(hand);
  const betText = betBb === null ? "a river bet" : `${betBb} BB river pressure`;

  return {
    id: `${hand.handId}-river-discipline`,
    handId: hand.handId,
    street: "river",
    spotType: "river-discipline",
    prompt: `Facing ${betText}. What is the safest default action?`,
    context: createQuestionContext(hand),
    options: RIVER_DISCIPLINE_OPTIONS,
    correctOptionId: "fold",
    recommendedAnswer: "Fold",
    explanation: `Conservative default. Hero lost this river/showdown spot, and the pot was ${
      potBb === null ? "unknown" : `${potBb} BB`
    }. Without a clear value hand or strong blocker reason, folding is usually the safer population play.`,
    takeaway:
      "River calls need a clear reason. When the line is strong and your hand is marginal, default to discipline before curiosity.",
  };
}

function createReviewSpotQuestion(hand: PokerHand): QuizQuestion | null {
  const heroNetBb = getHeroNetBb(hand);
  const splashPot = classifySplashPot(hand);

  if (heroNetBb > -20 && !splashPot.isSplashPotCandidate) {
    return null;
  }

  const splashPrefix =
    splashPot.isSplashPot || splashPot.isSplashPotCandidate ? "Splash pot review: " : "";

  return {
    id: `${hand.handId}-review-spot`,
    handId: hand.handId,
    street: getReviewStreet(hand),
    spotType: heroNetBb <= -20 ? "big-loss-review" : "showdown-review",
    prompt: `${splashPrefix}Review-only question. What should this hand be tagged for?`,
    context: createQuestionContext(hand),
    options: REVIEW_SPOT_OPTIONS,
    recommendedAnswer: "No correct answer available",
    explanation: `Review-only question. No correct answer is available from rules alone. Review this hand and identify whether the main theme is a cooler, overplay, Hero call, bluff catch, splash distortion, or value leak.${getSplashExplanation(
      hand,
    )}`,
    takeaway:
      "Use review-only spots to build hand-reading notes; they do not affect quiz accuracy.",
  };
}

function filterMatches(questionFilter: QuizTypeFilter, targetFilter: QuizTypeFilter): boolean {
  if (questionFilter === "All") {
    return true;
  }

  if (questionFilter === "Big Losses") {
    return targetFilter === "Review Spots";
  }

  if (questionFilter === "River Calls") {
    return targetFilter === "River Discipline";
  }

  return questionFilter === targetFilter;
}

function hasGlobalHighWtsdLeak(options: GenerateQuizQuestionsOptions): boolean {
  return (
    options.hasHighWtsdLeak === true ||
    options.leaks?.some((leak) => leak.id === "high-wtsd" || leak.metric === "wtsd") === true
  );
}

export function generateQuizQuestions(
  hands: readonly PokerHand[],
  options: GenerateQuizQuestionsOptions = {},
): QuizQuestion[] {
  const filter = options.filter ?? "All";
  const maxQuestions = options.maxQuestions ?? DEFAULT_QUIZ_LIMIT;
  const hasHighWtsdLeak = hasGlobalHighWtsdLeak(options);
  const questions: QuizQuestion[] = [];

  const addQuestion = (question: QuizQuestion | null): void => {
    if (question !== null && questions.length < maxQuestions) {
      questions.push(question);
    }
  };

  if (maxQuestions <= 0 || hands.length === 0) {
    return [];
  }

  if (filterMatches(filter, "Preflop Discipline")) {
    for (const hand of hands) {
      addQuestion(createPreflopDisciplineQuestion(hand));
    }
  }

  if (filterMatches(filter, "Value Extraction")) {
    for (const hand of hands) {
      addQuestion(createValueExtractionQuestion(hand));
    }
  }

  if (filterMatches(filter, "River Discipline")) {
    for (const hand of hands) {
      addQuestion(createRiverDisciplineQuestion(hand, hasHighWtsdLeak));
    }
  }

  if (filterMatches(filter, "Blind Defense")) {
    for (const hand of hands) {
      addQuestion(createBlindDefenseQuestion(hand));
    }
  }

  if (filterMatches(filter, "Review Spots")) {
    for (const hand of hands) {
      addQuestion(createReviewSpotQuestion(hand));
    }
  }

  return questions;
}

export function getVisibleQuizInformation(
  question: QuizQuestion,
  hand: PokerHand | undefined,
  isAnswerVisible: boolean,
): VisibleQuizInformation {
  const isReviewOnly = question.correctOptionId === undefined;
  const shouldShowDecisionBoard = !isReviewOnly;
  const decisionItems: VisibleQuizMetric[] = [
    { label: "Hero", value: question.context.heroCards, isMonospace: true },
    { label: "Position", value: question.context.heroPosition },
    { label: "Street", value: STREET_LABELS[question.street] },
  ];

  if (hand === undefined) {
    if (question.context.board !== undefined && shouldShowDecisionBoard) {
      decisionItems.push({ label: "Board", value: question.context.board, isMonospace: true });
    }

    return {
      decisionItems,
      actionSummary: question.context.actionSummary ?? "-",
      outcomeItems:
        isAnswerVisible && question.context.heroNetBb !== undefined
          ? [
              {
                label: "Result",
                value: formatOptionalBb(question.context.heroNetBb, true) ?? "-",
                isMonospace: true,
              },
            ]
          : [],
    };
  }

  const effectiveStackAmount = getEffectiveStackAmount(hand);
  const board = shouldShowDecisionBoard ? formatBoardForStreet(hand, question.street) : "";
  const potBb = getEstimatedPotBbAtDecision(hand, question.street);
  const preflopOpenContext = question.street === "preflop" ? getPreflopOpenContext(hand) : null;

  decisionItems.push({
    label: "Stakes",
    value: formatBlinds(hand),
    isMonospace: true,
    isCompact: true,
  });

  if (effectiveStackAmount !== null) {
    decisionItems.push({
      label: "Effective Stack",
      value: formatStackWithBb(effectiveStackAmount, hand),
      isMonospace: true,
      isCompact: true,
    });
  }

  if (question.street === "preflop" && preflopOpenContext === null && isUnopenedBeforeHero(hand)) {
    decisionItems.push({
      label: "Hero Facing",
      value: "Action folds to Hero",
      isCompact: true,
    });
  }

  if (preflopOpenContext !== null) {
    const callerCount = preflopOpenContext.callerPositions.length;

    decisionItems.push(
      {
        label: "Opener",
        value: preflopOpenContext.openerLabel,
        isCompact: true,
      },
      {
        label: "Open Size",
        value: `${preflopOpenContext.openSizeBb} BB`,
        isMonospace: true,
        isCompact: true,
      },
      {
        label: "Callers",
        value:
          callerCount === 0
            ? "0 callers"
            : `${callerCount} ${callerCount === 1 ? "caller" : "callers"}: ${preflopOpenContext.callerPositions.join(
                ", ",
              )}`,
        isCompact: true,
      },
      {
        label: "Hero Facing",
        value: preflopOpenContext.facingAction,
        isCompact: true,
      },
    );
  }

  if (board.length > 0) {
    decisionItems.push({ label: "Board", value: board, isMonospace: true });
  }

  if (potBb !== null) {
    decisionItems.push({
      label: "Pot",
      value: `${potBb} BB`,
      isMonospace: true,
    });
  }

  const outcomeItems: VisibleQuizMetric[] = [];

  if (isAnswerVisible) {
    const finalBoard = formatBoard(hand);
    const finalPotBb = getPotBb(hand);
    const heroNetBb = getHeroNetBb(hand);
    const showdownSummary = formatShowdownSummary(hand);

    if (isReviewOnly && finalBoard.length > 0) {
      outcomeItems.push({ label: "Final Board", value: finalBoard, isMonospace: true });
    }

    if (finalPotBb !== null) {
      outcomeItems.push({
        label: "Actual Final Pot",
        value: `${finalPotBb} BB`,
        isMonospace: true,
      });
    }

    outcomeItems.push({
      label: "Actual Hero Result",
      value: formatOptionalBb(heroNetBb, true) ?? "-",
      isMonospace: true,
    });

    if (showdownSummary !== null) {
      outcomeItems.push({ label: "Showdown", value: showdownSummary, isMonospace: true });
    }
  }

  return {
    decisionItems,
    actionSummary: formatVisibleActionSummary(hand, question.street),
    outcomeItems,
  };
}

export function evaluateQuizAnswer(
  question: QuizQuestion,
  selectedOptionId: string | undefined,
): QuizAnswerEvaluation | undefined {
  if (selectedOptionId === undefined || question.correctOptionId === undefined) {
    return undefined;
  }

  const explicitEvaluation = question.answerEvaluations?.find(
    (evaluation) => evaluation.optionId === selectedOptionId,
  );

  if (explicitEvaluation !== undefined) {
    return explicitEvaluation;
  }

  if (selectedOptionId === question.correctOptionId) {
    return createEvaluation(selectedOptionId, "correct", 100, DEFAULT_EVALUATION_REASONS.correct);
  }

  if (question.acceptableOptionIds?.includes(selectedOptionId) === true) {
    return createEvaluation(
      selectedOptionId,
      "acceptable",
      75,
      DEFAULT_EVALUATION_REASONS.acceptable,
    );
  }

  if (question.marginalOptionIds?.includes(selectedOptionId) === true) {
    return createEvaluation(selectedOptionId, "marginal", 50, DEFAULT_EVALUATION_REASONS.marginal);
  }

  return createEvaluation(selectedOptionId, "incorrect", 0, DEFAULT_EVALUATION_REASONS.incorrect);
}

export function scoreQuizAnswers(
  questions: readonly QuizQuestion[],
  selectedOptionIds: Readonly<Record<string, string | undefined>>,
): QuizScore {
  const score = questions.reduce<Omit<QuizScore, "accuracy">>(
    (currentScore, question) => {
      const selectedOptionId = selectedOptionIds[question.id];

      if (selectedOptionId === undefined) {
        return currentScore;
      }

      const isReviewOnly = question.correctOptionId === undefined;
      const evaluation = evaluateQuizAnswer(question, selectedOptionId);
      const countsAsCorrect = evaluation?.label === "correct" || evaluation?.label === "acceptable";

      return {
        answered: currentScore.answered + 1,
        answerableAnswered: isReviewOnly
          ? currentScore.answerableAnswered
          : currentScore.answerableAnswered + 1,
        correct: !isReviewOnly && countsAsCorrect ? currentScore.correct + 1 : currentScore.correct,
        reviewSpots: isReviewOnly ? currentScore.reviewSpots + 1 : currentScore.reviewSpots,
      };
    },
    { answered: 0, answerableAnswered: 0, correct: 0, reviewSpots: 0 },
  );

  return {
    ...score,
    accuracy:
      score.answerableAnswered === 0
        ? 0
        : roundStat((score.correct / score.answerableAnswered) * 100),
  };
}
