import { describe, expect, it } from "vitest";

import {
  didHeroReachShowdown,
  filterHands,
  getVisibleHands,
  normalizeHeroCardsSearch,
  paginateHands,
  sortHands,
  type HandExplorerFilters,
} from "../lib/handExplorer";
import type { Card, HandAction, PokerHand, PokerPosition, ShowdownEntry } from "../types";

const DEFAULT_FILTERS: HandExplorerFilters = {
  position: "All",
  result: "All",
  showdown: "All",
  dateRange: "All hands",
  heroCardsSearch: "",
};
const REFERENCE_DATE = new Date(2026, 5, 9, 12, 0, 0);

function createHand({
  handId,
  date,
  heroPosition,
  heroCards,
  heroNetResult,
  totalPot = null,
  showdown = false,
  showdownEntries,
  heroActions = [],
}: Readonly<{
  handId: string;
  date: string;
  heroPosition: PokerPosition;
  heroCards: readonly [Card, Card];
  heroNetResult: number;
  totalPot?: number | null;
  showdown?: boolean;
  showdownEntries?: readonly ShowdownEntry[];
  heroActions?: readonly HandAction[];
}>): PokerHand {
  const actions = [...heroActions];

  return {
    id: handId,
    handId,
    rawText: "",
    gameType: "NLH",
    gameFormat: "cash",
    date,
    tableName: "test",
    maxPlayers: 6,
    buttonSeat: 1,
    stakes: {
      smallBlind: 0.01,
      bigBlind: 0.02,
      currency: "₮",
    },
    players: [],
    heroName: "Hero",
    heroSeat: 1,
    heroCards,
    heroPosition,
    actions,
    streetActions: {
      preflop: actions.filter((action) => action.street === "preflop"),
      flop: [],
      turn: [],
      river: actions.filter((action) => action.street === "river"),
    },
    board: {
      flop: null,
      turn: null,
      river: null,
    },
    showdown: showdownEntries
      ? {
          entries: showdownEntries,
          winnerNames: showdownEntries
            .filter((entry) => entry.wonAmount > 0)
            .map((entry) => entry.playerName),
        }
      : showdown
        ? {
            entries: [
              {
                playerName: "Hero",
                cards: heroCards,
                handDescription: "One Pair",
                wonAmount: Math.max(heroNetResult, 0),
              },
            ],
            winnerNames: heroNetResult > 0 ? ["Hero"] : [],
          }
        : null,
    totalPot,
    rake: null,
    heroNetResult,
  };
}

function createHeroAction(type: HandAction["type"]): HandAction {
  return {
    street: "river",
    order: 1,
    playerName: "Hero",
    type,
    amount: null,
    raiseTo: null,
    cards: null,
    handDescription: null,
    rawLine: `Hero: ${type}`,
  };
}

const hands = [
  createHand({
    handId: "1",
    date: "2026/06/09 10:00:00 CEST",
    heroPosition: "BTN",
    heroCards: ["Ah", "Kh"],
    heroNetResult: 0.42,
    totalPot: 1.2,
    showdown: true,
  }),
  createHand({
    handId: "2",
    date: "2026/06/09 09:00:00 CEST",
    heroPosition: "BB",
    heroCards: ["Ad", "Kc"],
    heroNetResult: -0.2,
    totalPot: 0.4,
  }),
  createHand({
    handId: "3",
    date: "2026/06/09 11:00:00 CEST",
    heroPosition: "CO",
    heroCards: ["Ac", "As"],
    heroNetResult: 0,
    totalPot: 0.1,
  }),
] as const;

describe("handExplorer", () => {
  it("filters by position", () => {
    const filtered = filterHands(hands, {
      ...DEFAULT_FILTERS,
      position: "BTN",
    });

    expect(filtered.map((hand) => hand.handId)).toEqual(["1"]);
  });

  it("filters by result", () => {
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        result: "Won",
      }).map((hand) => hand.handId),
    ).toEqual(["1"]);
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        result: "Lost",
      }).map((hand) => hand.handId),
    ).toEqual(["2"]);
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        result: "Break-even",
      }).map((hand) => hand.handId),
    ).toEqual(["3"]);
  });

  it("filters by showdown", () => {
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        showdown: "Showdown",
      }).map((hand) => hand.handId),
    ).toEqual(["1"]);
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        showdown: "No Showdown",
      }).map((hand) => hand.handId),
    ).toEqual(["2", "3"]);
  });

  it("detects Hero showdown only from Hero cards or Hero show/muck actions", () => {
    const heroShowsInSummary = createHand({
      handId: "hero-show-summary",
      date: "2026/06/09 12:00:00 CEST",
      heroPosition: "BTN",
      heroCards: ["Qs", "Qh"],
      heroNetResult: 1,
      showdownEntries: [
        {
          playerName: "Hero",
          cards: ["Qs", "Qh"],
          handDescription: "One Pair",
          wonAmount: 1,
        },
      ],
    });
    const heroMucksAtShowdown = createHand({
      handId: "hero-muck",
      date: "2026/06/09 12:01:00 CEST",
      heroPosition: "BTN",
      heroCards: ["Js", "Jh"],
      heroNetResult: -1,
      heroActions: [createHeroAction("muck")],
    });
    const rawShowdownButHeroFolded = createHand({
      handId: "other-showdown",
      date: "2026/06/09 12:02:00 CEST",
      heroPosition: "BB",
      heroCards: ["2c", "2d"],
      heroNetResult: -0.02,
      showdownEntries: [
        {
          playerName: "Villain",
          cards: ["Ah", "Ad"],
          handDescription: "One Pair",
          wonAmount: 1,
        },
      ],
    });
    const heroWinsWithoutShowing = createHand({
      handId: "hero-no-show",
      date: "2026/06/09 12:03:00 CEST",
      heroPosition: "SB",
      heroCards: ["Ac", "Ks"],
      heroNetResult: 0.2,
      showdownEntries: [
        {
          playerName: "Hero",
          cards: null,
          handDescription: null,
          wonAmount: 0.2,
        },
      ],
    });

    expect(didHeroReachShowdown(heroShowsInSummary)).toBe(true);
    expect(didHeroReachShowdown(heroMucksAtShowdown)).toBe(true);
    expect(didHeroReachShowdown(rawShowdownButHeroFolded)).toBe(false);
    expect(didHeroReachShowdown(heroWinsWithoutShowing)).toBe(false);
  });

  it("uses Hero showdown logic for showdown filtering", () => {
    const rawShowdownButHeroFolded = createHand({
      handId: "other-showdown",
      date: "2026/06/09 12:02:00 CEST",
      heroPosition: "BB",
      heroCards: ["2c", "2d"],
      heroNetResult: -0.02,
      showdownEntries: [
        {
          playerName: "Villain",
          cards: ["Ah", "Ad"],
          handDescription: "One Pair",
          wonAmount: 1,
        },
      ],
    });

    expect(
      filterHands([hands[0], rawShowdownButHeroFolded], {
        ...DEFAULT_FILTERS,
        showdown: "Showdown",
      }).map((hand) => hand.handId),
    ).toEqual(["1"]);
    expect(
      filterHands([hands[0], rawShowdownButHeroFolded], {
        ...DEFAULT_FILTERS,
        showdown: "No Showdown",
      }).map((hand) => hand.handId),
    ).toEqual(["other-showdown"]);
  });

  it("filters by normalized hero cards", () => {
    expect(normalizeHeroCardsSearch("ka s")).toBe("AKs");
    expect(normalizeHeroCardsSearch("kao")).toBe("AKo");
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        heroCardsSearch: "AKs",
      }).map((hand) => hand.handId),
    ).toEqual(["1"]);
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        heroCardsSearch: "AKo",
      }).map((hand) => hand.handId),
    ).toEqual(["2"]);
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        heroCardsSearch: "AK",
      }).map((hand) => hand.handId),
    ).toEqual(["1", "2"]);
    expect(
      filterHands(hands, {
        ...DEFAULT_FILTERS,
        heroCardsSearch: "AA",
      }).map((hand) => hand.handId),
    ).toEqual(["3"]);
  });

  it("filters by date range", () => {
    const datedHands = [
      createHand({
        handId: "today",
        date: "2026/06/09 10:00:00 CEST",
        heroPosition: "BTN",
        heroCards: ["Ah", "Kh"],
        heroNetResult: 1,
      }),
      createHand({
        handId: "yesterday",
        date: "2026/06/08 21:00:00 CEST",
        heroPosition: "BTN",
        heroCards: ["Ad", "Kd"],
        heroNetResult: 1,
      }),
      createHand({
        handId: "last-seven",
        date: "2026/06/03 21:00:00 CEST",
        heroPosition: "BTN",
        heroCards: ["As", "Ks"],
        heroNetResult: 1,
      }),
      createHand({
        handId: "last-thirty",
        date: "2026/05/12 21:00:00 CEST",
        heroPosition: "BTN",
        heroCards: ["Ac", "Kc"],
        heroNetResult: 1,
      }),
      createHand({
        handId: "old",
        date: "2026/02/01 21:00:00 CEST",
        heroPosition: "BTN",
        heroCards: ["Qs", "Qh"],
        heroNetResult: 1,
      }),
    ];

    expect(
      filterHands(
        datedHands,
        {
          ...DEFAULT_FILTERS,
          dateRange: "Today",
        },
        REFERENCE_DATE,
      ).map((hand) => hand.handId),
    ).toEqual(["today"]);
    expect(
      filterHands(
        datedHands,
        {
          ...DEFAULT_FILTERS,
          dateRange: "Yesterday",
        },
        REFERENCE_DATE,
      ).map((hand) => hand.handId),
    ).toEqual(["yesterday"]);
    expect(
      filterHands(
        datedHands,
        {
          ...DEFAULT_FILTERS,
          dateRange: "Last 7 days",
        },
        REFERENCE_DATE,
      ).map((hand) => hand.handId),
    ).toEqual(["today", "yesterday", "last-seven"]);
    expect(
      filterHands(
        datedHands,
        {
          ...DEFAULT_FILTERS,
          dateRange: "Last 30 days",
        },
        REFERENCE_DATE,
      ).map((hand) => hand.handId),
    ).toEqual(["today", "yesterday", "last-seven", "last-thirty"]);
    expect(
      filterHands(
        datedHands,
        {
          ...DEFAULT_FILTERS,
          dateRange: "All hands",
        },
        REFERENCE_DATE,
      ).map((hand) => hand.handId),
    ).toEqual(["today", "yesterday", "last-seven", "last-thirty", "old"]);
  });

  it("sorts by hero net", () => {
    expect(
      sortHands(hands, { key: "heroNet", direction: "asc" }).map((hand) => hand.handId),
    ).toEqual(["2", "3", "1"]);
  });

  it("sorts by date descending by default direction", () => {
    expect(sortHands(hands, { key: "date", direction: "desc" }).map((hand) => hand.handId)).toEqual(
      ["3", "1", "2"],
    );
  });

  it("sorts by date ascending when requested", () => {
    expect(sortHands(hands, { key: "date", direction: "asc" }).map((hand) => hand.handId)).toEqual([
      "2",
      "1",
      "3",
    ]);
  });

  it("filters before sorting visible hands", () => {
    const visibleHands = getVisibleHands(
      hands,
      {
        ...DEFAULT_FILTERS,
        heroCardsSearch: "AK",
      },
      { key: "heroNet", direction: "asc" },
    );

    expect(visibleHands.map((hand) => hand.handId)).toEqual(["2", "1"]);
  });

  it("paginates hands", () => {
    const manyHands = Array.from({ length: 60 }, (_, index) =>
      createHand({
        handId: `${index + 1}`,
        date: `2026/06/09 ${String(index).padStart(2, "0")}:00:00 CEST`,
        heroPosition: "BTN",
        heroCards: ["Ah", "Kh"],
        heroNetResult: index,
      }),
    );
    const page = paginateHands(manyHands, {
      page: 2,
      pageSize: 25,
    });

    expect(page.page).toBe(2);
    expect(page.pageCount).toBe(3);
    expect(page.hands).toHaveLength(25);
    expect(page.hands[0]?.handId).toBe("26");

    const clampedPage = paginateHands(manyHands, {
      page: 99,
      pageSize: 50,
    });

    expect(clampedPage.page).toBe(2);
  });

  it("filters and sorts before pagination", () => {
    const moreHands = Array.from({ length: 60 }, (_, index) =>
      createHand({
        handId: `${index + 10}`,
        date: `2026/06/09 ${String(index).padStart(2, "0")}:00:00 CEST`,
        heroPosition: index % 2 === 0 ? "BTN" : "BB",
        heroCards: index % 2 === 0 ? ["Ah", "Kh"] : ["7c", "2d"],
        heroNetResult: index,
      }),
    );
    const visibleHands = getVisibleHands(
      moreHands,
      {
        ...DEFAULT_FILTERS,
        position: "BTN",
      },
      { key: "heroNet", direction: "asc" },
      {
        page: 2,
        pageSize: 25,
      },
    );

    expect(
      visibleHands.map((hand) => hand.heroPosition).every((position) => position === "BTN"),
    ).toBe(true);
    expect(visibleHands).toHaveLength(5);
    expect(visibleHands[0]?.handId).toBe("60");
  });
});
