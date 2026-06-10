import { HOLE_CARD_RANKS, normalizeHoleCards } from "./stats/holeCardMatrix";
import { isSplashPot } from "./stats/splashPots";
import type { PokerHand, PokerPosition } from "../types";

export type HandExplorerPositionFilter = "All" | Exclude<PokerPosition, "UNKNOWN">;
export type HandExplorerResultFilter = "All" | "Won" | "Lost" | "Break-even";
export type HandExplorerShowdownFilter = "All" | "Showdown" | "No Showdown";
export type HandExplorerSplashPotFilter = "All" | "Normal only" | "Splash only";
export type HandExplorerDateRangeFilter =
  | "Today"
  | "Yesterday"
  | "Last 7 days"
  | "Last 30 days"
  | "All hands";
export type HandExplorerSortKey = "date" | "heroNet" | "pot" | "position";
export type HandExplorerSortDirection = "asc" | "desc";
export type HandExplorerPageSize = 25 | 50 | 100;

export interface HandExplorerFilters {
  readonly position: HandExplorerPositionFilter;
  readonly result: HandExplorerResultFilter;
  readonly showdown: HandExplorerShowdownFilter;
  readonly splashPots: HandExplorerSplashPotFilter;
  readonly dateRange: HandExplorerDateRangeFilter;
  readonly heroCardsSearch: string;
}

export interface HandExplorerSort {
  readonly key: HandExplorerSortKey;
  readonly direction: HandExplorerSortDirection;
}

export interface HandExplorerPagination {
  readonly page: number;
  readonly pageSize: HandExplorerPageSize;
}

export interface HandExplorerSummary {
  readonly handsCount: number;
  readonly totalProfit: number;
  readonly totalBigBlindsWon: number;
  readonly bbPer100: number;
}

export interface HandExplorerPage {
  readonly hands: readonly PokerHand[];
  readonly page: number;
  readonly pageSize: HandExplorerPageSize;
  readonly pageCount: number;
  readonly totalHands: number;
}

const POSITION_ORDER: readonly PokerPosition[] = ["UTG", "HJ", "CO", "BTN", "SB", "BB", "UNKNOWN"];
const HAND_DATE_PATTERN = /^(\d{4})[/-](\d{2})[/-](\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/;

function compareNumbers(left: number, right: number): number {
  return left - right;
}

function getPositionIndex(position: PokerPosition): number {
  const index = POSITION_ORDER.indexOf(position);

  return index === -1 ? POSITION_ORDER.length : index;
}

function parseHandDate(hand: PokerHand): Date | null {
  const match = hand.date.match(HAND_DATE_PATTERN);

  if (!match?.[1] || !match[2] || !match[3]) {
    return null;
  }

  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4] ?? 0),
    Number(match[5] ?? 0),
    Number(match[6] ?? 0),
  );
}

function getHandTimestamp(hand: PokerHand): number {
  return parseHandDate(hand)?.getTime() ?? 0;
}

function getStartOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function isKnownRank(value: string): value is (typeof HOLE_CARD_RANKS)[number] {
  return HOLE_CARD_RANKS.includes(value as (typeof HOLE_CARD_RANKS)[number]);
}

function normalizeRankOrder(firstRank: string, secondRank: string): string {
  const firstIndex = HOLE_CARD_RANKS.indexOf(firstRank as (typeof HOLE_CARD_RANKS)[number]);
  const secondIndex = HOLE_CARD_RANKS.indexOf(secondRank as (typeof HOLE_CARD_RANKS)[number]);

  return firstIndex <= secondIndex ? `${firstRank}${secondRank}` : `${secondRank}${firstRank}`;
}

export function normalizeHeroCardsSearch(value: string): string | null {
  const compactValue = value.trim().replace(/\s+/g, "");

  if (compactValue.length === 0) {
    return null;
  }

  const firstRank = compactValue[0]?.toUpperCase();
  const secondRank = compactValue[1]?.toUpperCase();
  const suitedness = compactValue[2]?.toLowerCase();

  if (
    firstRank === undefined ||
    secondRank === undefined ||
    !isKnownRank(firstRank) ||
    !isKnownRank(secondRank)
  ) {
    return null;
  }

  if (firstRank === secondRank) {
    return compactValue.length === 2 ? `${firstRank}${secondRank}` : null;
  }

  if (compactValue.length > 3 || (suitedness !== undefined && !["s", "o"].includes(suitedness))) {
    return null;
  }

  const ranks = normalizeRankOrder(firstRank, secondRank);

  return suitedness === undefined ? ranks : `${ranks}${suitedness}`;
}

function matchesPosition(hand: PokerHand, position: HandExplorerPositionFilter): boolean {
  return position === "All" || hand.heroPosition === position;
}

function matchesResult(hand: PokerHand, result: HandExplorerResultFilter): boolean {
  if (result === "All") {
    return true;
  }

  if (result === "Won") {
    return hand.heroNetResult > 0;
  }

  if (result === "Lost") {
    return hand.heroNetResult < 0;
  }

  return hand.heroNetResult === 0;
}

function matchesDateRange(
  hand: PokerHand,
  dateRange: HandExplorerDateRangeFilter,
  referenceDate: Date,
): boolean {
  if (dateRange === "All hands") {
    return true;
  }

  const handDate = parseHandDate(hand);

  if (handDate === null) {
    return false;
  }

  const todayStart = getStartOfLocalDay(referenceDate);
  const tomorrowStart = addDays(todayStart, 1);

  if (dateRange === "Today") {
    return handDate >= todayStart && handDate < tomorrowStart;
  }

  if (dateRange === "Yesterday") {
    const yesterdayStart = addDays(todayStart, -1);

    return handDate >= yesterdayStart && handDate < todayStart;
  }

  const daysBack = dateRange === "Last 7 days" ? 6 : 29;
  const rangeStart = addDays(todayStart, -daysBack);

  return handDate >= rangeStart && handDate < tomorrowStart;
}

function roundStat(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function didHeroReachShowdown(hand: PokerHand): boolean {
  if (hand.showdown?.entries.some((entry) => entry.playerName === "Hero" && entry.cards !== null)) {
    return true;
  }

  return hand.actions.some(
    (action) => action.playerName === "Hero" && ["muck", "show"].includes(action.type),
  );
}

function matchesShowdown(hand: PokerHand, showdown: HandExplorerShowdownFilter): boolean {
  if (showdown === "All") {
    return true;
  }

  return showdown === "Showdown" ? didHeroReachShowdown(hand) : !didHeroReachShowdown(hand);
}

function matchesSplashPots(hand: PokerHand, splashPots: HandExplorerSplashPotFilter): boolean {
  if (splashPots === "All") {
    return true;
  }

  return splashPots === "Splash only" ? isSplashPot(hand) : !isSplashPot(hand);
}

function matchesHeroCardsSearch(hand: PokerHand, heroCardsSearch: string): boolean {
  const trimmedSearch = heroCardsSearch.trim();

  if (trimmedSearch.length === 0) {
    return true;
  }

  const search = normalizeHeroCardsSearch(trimmedSearch);
  const notation = normalizeHoleCards(hand.heroCards);

  if (search === null || notation === null) {
    return false;
  }

  return search.length === 2 && search[0] !== search[1]
    ? notation.startsWith(search)
    : notation === search;
}

export function filterHands(
  hands: readonly PokerHand[],
  filters: HandExplorerFilters,
  referenceDate = new Date(),
): PokerHand[] {
  return hands.filter(
    (hand) =>
      matchesPosition(hand, filters.position) &&
      matchesResult(hand, filters.result) &&
      matchesShowdown(hand, filters.showdown) &&
      matchesSplashPots(hand, filters.splashPots) &&
      matchesDateRange(hand, filters.dateRange, referenceDate) &&
      matchesHeroCardsSearch(hand, filters.heroCardsSearch),
  );
}

export function sortHands(hands: readonly PokerHand[], sort: HandExplorerSort): PokerHand[] {
  const directionMultiplier = sort.direction === "asc" ? 1 : -1;

  return [...hands].sort((left, right) => {
    let comparison = 0;

    if (sort.key === "heroNet") {
      comparison = compareNumbers(left.heroNetResult, right.heroNetResult);
    } else if (sort.key === "pot") {
      comparison = compareNumbers(left.totalPot ?? 0, right.totalPot ?? 0);
    } else if (sort.key === "position") {
      comparison = compareNumbers(
        getPositionIndex(left.heroPosition),
        getPositionIndex(right.heroPosition),
      );
    } else {
      comparison = compareNumbers(getHandTimestamp(left), getHandTimestamp(right));
    }

    return comparison * directionMultiplier;
  });
}

export function getFilteredAndSortedHands(
  hands: readonly PokerHand[],
  filters: HandExplorerFilters,
  sort: HandExplorerSort,
  referenceDate = new Date(),
): PokerHand[] {
  return sortHands(filterHands(hands, filters, referenceDate), sort);
}

export function getHandExplorerSummary(hands: readonly PokerHand[]): HandExplorerSummary {
  const totalProfit = hands.reduce((sum, hand) => sum + hand.heroNetResult, 0);
  const totalBigBlinds = hands.reduce(
    (sum, hand) => sum + (hand.stakes.bigBlind > 0 ? hand.heroNetResult / hand.stakes.bigBlind : 0),
    0,
  );

  return {
    handsCount: hands.length,
    totalProfit: roundStat(totalProfit),
    totalBigBlindsWon: roundStat(totalBigBlinds),
    bbPer100: hands.length === 0 ? 0 : roundStat((totalBigBlinds / hands.length) * 100),
  };
}

export function getPageCount(totalHands: number, pageSize: HandExplorerPageSize): number {
  return Math.max(1, Math.ceil(totalHands / pageSize));
}

export function paginateHands(
  hands: readonly PokerHand[],
  pagination: HandExplorerPagination,
): HandExplorerPage {
  const pageCount = getPageCount(hands.length, pagination.pageSize);
  const page = Math.min(Math.max(1, pagination.page), pageCount);
  const startIndex = (page - 1) * pagination.pageSize;

  return {
    hands: hands.slice(startIndex, startIndex + pagination.pageSize),
    page,
    pageSize: pagination.pageSize,
    pageCount,
    totalHands: hands.length,
  };
}

export function getVisibleHands(
  hands: readonly PokerHand[],
  filters: HandExplorerFilters,
  sort: HandExplorerSort,
  pagination?: HandExplorerPagination,
  referenceDate = new Date(),
): PokerHand[] {
  const filteredAndSortedHands = getFilteredAndSortedHands(hands, filters, sort, referenceDate);

  return pagination === undefined
    ? filteredAndSortedHands
    : [...paginateHands(filteredAndSortedHands, pagination).hands];
}
