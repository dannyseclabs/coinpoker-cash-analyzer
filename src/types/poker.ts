export type PokerGameType = "NLH";

export type CashGameFormat = "cash";

export type PokerStreet = "preflop" | "flop" | "turn" | "river";

export type PokerPosition = "UTG" | "HJ" | "CO" | "BTN" | "SB" | "BB" | "UNKNOWN";

export type CardRank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";

export type CardSuit = "c" | "d" | "h" | "s";

export type Card = `${CardRank}${CardSuit}`;

export interface Stakes {
  readonly smallBlind: number;
  readonly bigBlind: number;
  readonly currency: string;
}

export interface Player {
  readonly seat: number;
  readonly name: string;
  readonly startingStack: number;
  readonly isHero: boolean;
  readonly position: PokerPosition;
}

export type ActionType =
  | "post_small_blind"
  | "post_big_blind"
  | "post_auto_big_blind"
  | "fold"
  | "check"
  | "call"
  | "bet"
  | "raise"
  | "all_in"
  | "return"
  | "collect"
  | "muck"
  | "show";

export interface HandAction {
  readonly street: PokerStreet;
  readonly order: number;
  readonly playerName: string;
  readonly type: ActionType;
  readonly amount: number | null;
  readonly raiseTo: number | null;
  readonly cards: readonly [Card, Card] | null;
  readonly handDescription: string | null;
  readonly rawLine: string;
}

export interface StreetActions {
  readonly preflop: readonly HandAction[];
  readonly flop: readonly HandAction[];
  readonly turn: readonly HandAction[];
  readonly river: readonly HandAction[];
}

export interface Board {
  readonly flop: readonly [Card, Card, Card] | null;
  readonly turn: Card | null;
  readonly river: Card | null;
}

export interface ShowdownEntry {
  readonly playerName: string;
  readonly cards: readonly [Card, Card] | null;
  readonly handDescription: string | null;
  readonly wonAmount: number;
}

export interface Showdown {
  readonly entries: readonly ShowdownEntry[];
  readonly winnerNames: readonly string[];
}

export interface PokerHand {
  readonly id: string;
  readonly handId: string;
  readonly rawText: string;
  readonly gameType: PokerGameType;
  readonly gameFormat: CashGameFormat;
  readonly date: string;
  readonly tableName: string | null;
  readonly maxPlayers: number | null;
  readonly buttonSeat: number | null;
  readonly stakes: Stakes;
  readonly players: readonly Player[];
  readonly heroName: "Hero";
  readonly heroSeat: number | null;
  readonly heroCards: readonly [Card, Card] | null;
  readonly heroPosition: PokerPosition;
  readonly actions: readonly HandAction[];
  readonly streetActions: StreetActions;
  readonly board: Board;
  readonly showdown: Showdown | null;
  readonly totalPot: number | null;
  readonly rake: number | null;
  readonly heroNetResult: number;
}

export interface ParseError {
  readonly handId: string | null;
  readonly message: string;
  readonly rawText: string;
}

export interface ParsedFileResult {
  readonly sourceText: string;
  readonly fileName: string | null;
  readonly hands: readonly PokerHand[];
  readonly errors: readonly ParseError[];
}

export interface PositionStats {
  readonly position: PokerPosition;
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly totalBigBlindsWon: number;
  readonly bbPer100: number;
  readonly vpip: number;
  readonly pfr: number;
  readonly wtsd: number;
  readonly wsd: number;
}

export interface StatisticsSampleSizes {
  readonly hands: number;
  readonly threeBetOpportunities: number;
  readonly foldToThreeBetOpportunities: number;
  readonly cBetFlopOpportunities: number;
  readonly foldToCBetFlopOpportunities: number;
  readonly sawFlop: number;
  readonly wentToShowdown: number;
}

export interface StatisticsResult {
  readonly handsPlayed: number;
  readonly totalProfit: number;
  readonly totalBigBlindsWon: number;
  readonly bbPer100: number;
  readonly vpip: number;
  readonly pfr: number;
  readonly threeBet: number;
  readonly foldToThreeBet: number;
  readonly limp: number;
  readonly cBetFlop: number;
  readonly foldToCBetFlop: number;
  readonly wtsd: number;
  readonly wsd: number;
  readonly positionStats: Readonly<Record<PokerPosition, PositionStats>>;
  readonly sampleSizes: StatisticsSampleSizes;
}

export type LeakSeverity = "low" | "medium" | "high";

export type LeakCategory = "preflop" | "postflop" | "showdown" | "position";

export type LeakMetric =
  | "vpip"
  | "vpip_pfr_gap"
  | "three_bet"
  | "limp"
  | "c_bet_flop"
  | "wtsd"
  | "wsd"
  | "bb_bb_per100"
  | "btn_pfr"
  | "btn_vpip"
  | "sb_bb_per100";

export interface LeakResult {
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
