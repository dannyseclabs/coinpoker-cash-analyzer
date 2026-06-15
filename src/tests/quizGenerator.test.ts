import { describe, expect, it } from "vitest";

import {
  generateQuizQuestions,
  getVisibleQuizInformation,
  scoreQuizAnswers,
  type QuizQuestion,
} from "../lib/quizGenerator";
import type { Card, HandAction, Player, PokerHand, PokerPosition, PokerStreet } from "../types";

function createAction({
  playerName = "Hero",
  type,
  street = "preflop",
  order = 1,
  amount = null,
  raiseTo = null,
}: Readonly<{
  playerName?: string;
  type: HandAction["type"];
  street?: PokerStreet;
  order?: number;
  amount?: number | null;
  raiseTo?: number | null;
}>): HandAction {
  return {
    street,
    order,
    playerName,
    type,
    amount,
    raiseTo,
    cards: null,
    handDescription: null,
    rawLine: `${playerName}: ${type}`,
  };
}

function createPlayer(name: string, position: PokerPosition, isHero = false): Player {
  return {
    seat: isHero ? 2 : 1,
    name,
    startingStack: 2,
    isHero,
    position,
  };
}

function createHand({
  handId = "quiz-hand",
  heroCards = ["Ah", "Kh"],
  heroPosition = "BTN",
  heroNetResult = 0,
  totalPot = 0.2,
  bigBlind = 0.02,
  actions = [],
  reachedRiver = false,
  showdown = false,
  handDescription = "Top Pair",
  players,
  board,
}: Readonly<{
  handId?: string;
  heroCards?: readonly [Card, Card];
  heroPosition?: PokerPosition;
  heroNetResult?: number;
  totalPot?: number | null;
  bigBlind?: number;
  actions?: readonly HandAction[];
  reachedRiver?: boolean;
  showdown?: boolean;
  handDescription?: string;
  players?: readonly Player[];
  board?: Readonly<{
    flop?: readonly [Card, Card, Card] | null;
    turn?: Card | null;
    river?: Card | null;
  }>;
}>): PokerHand {
  const allPlayers = players ?? [
    createPlayer("Villain", "BTN"),
    createPlayer("Hero", heroPosition, true),
  ];

  return {
    id: handId,
    handId,
    rawText: "",
    gameType: "NLH",
    gameFormat: "cash",
    date: "2026/06/09 12:00:00 CEST",
    tableName: "quiz-test",
    maxPlayers: 6,
    buttonSeat: 1,
    stakes: {
      smallBlind: bigBlind / 2,
      bigBlind,
      currency: "₮",
    },
    players: allPlayers,
    heroName: "Hero",
    heroSeat: 2,
    heroCards,
    heroPosition,
    actions,
    streetActions: {
      preflop: actions.filter((action) => action.street === "preflop"),
      flop: actions.filter((action) => action.street === "flop"),
      turn: actions.filter((action) => action.street === "turn"),
      river: actions.filter((action) => action.street === "river"),
    },
    board: {
      flop:
        board?.flop === undefined
          ? reachedRiver || showdown
            ? ["Ks", "7d", "2c"]
            : null
          : board.flop === null
            ? null
            : [...board.flop],
      turn: board?.turn === undefined ? (reachedRiver || showdown ? "9h" : null) : board.turn,
      river: board?.river === undefined ? (reachedRiver ? "3s" : null) : board.river,
    },
    showdown: showdown
      ? {
          entries: [
            {
              playerName: "Hero",
              cards: heroCards,
              handDescription,
              wonAmount: Math.max(heroNetResult, 0),
            },
          ],
          winnerNames: heroNetResult > 0 ? ["Hero"] : ["Villain"],
        }
      : null,
    totalPot,
    rake: null,
    heroNetResult,
  };
}

function createVisibleInfoQuestion(street: PokerStreet, correctOptionId = "call"): QuizQuestion {
  return {
    id: `visible-${street}`,
    handId: `visible-${street}`,
    street,
    spotType: street === "river" ? "river-discipline" : "value-bet",
    prompt: "Visible information test question.",
    context: {
      heroCards: "Ah Kh",
      heroPosition: "CO",
    },
    options: [
      { id: "fold", label: "Fold", action: "fold" },
      { id: "call", label: "Call", action: "call" },
    ],
    correctOptionId,
    recommendedAnswer: "Call",
    explanation: "Test explanation.",
    takeaway: "Test takeaway.",
  };
}

function createButtonVsCutoffOpenHand(
  heroCards: readonly [Card, Card],
  handId = `btn-co-${heroCards.join("")}`,
): PokerHand {
  return createHand({
    handId,
    heroCards,
    heroPosition: "BTN",
    actions: [
      createAction({ playerName: "co", type: "raise", order: 1, amount: 0.04, raiseTo: 0.06 }),
      createAction({ type: "call", order: 2, amount: 0.06 }),
    ],
    players: [createPlayer("co", "CO"), createPlayer("Hero", "BTN", true)],
  });
}

function createFacingUtgOpenHand(
  heroCards: readonly [Card, Card],
  heroPosition: PokerPosition = "BTN",
  handId = `utg-open-${heroCards.join("")}`,
): PokerHand {
  return createHand({
    handId,
    heroCards,
    heroPosition,
    actions: [
      createAction({ playerName: "utg", type: "raise", order: 1, amount: 0.04, raiseTo: 0.06 }),
      createAction({ type: "call", order: 2, amount: 0.06 }),
    ],
    players: [createPlayer("utg", "UTG"), createPlayer("Hero", heroPosition, true)],
  });
}

describe("quizGenerator", () => {
  it("creates no questions without hands", () => {
    expect(generateQuizQuestions([])).toEqual([]);
  });

  it("creates answerable preflop discipline questions with recommended answers", () => {
    const questions = generateQuizQuestions(
      [
        createHand({
          handId: "weak-offsuit",
          heroCards: ["Kd", "Tc"],
          heroPosition: "CO",
          actions: [
            createAction({ playerName: "utg", type: "fold", order: 1 }),
            createAction({ type: "raise", order: 2 }),
          ],
        }),
      ],
      { filter: "Preflop Discipline" },
    );

    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({
      handId: "weak-offsuit",
      spotType: "preflop-decision",
      correctOptionId: "fold",
      recommendedAnswer: "Fold",
    });
    expect(questions[0]?.explanation).toContain("Likely better action");
    expect(questions[0]?.takeaway).toContain("discipline");
  });

  it("does not recommend fold for BTN versus CO open with KJs", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Kh", "Jh"])], {
      filter: "Preflop Discipline",
    });

    expect(question?.correctOptionId).not.toBe("fold");
    expect(question?.recommendedAnswer).toBe("Call");
    expect(question?.acceptableOptionIds).toContain("three-bet-small");
  });

  it("does not mark call as hard incorrect for BTN versus CO open with KJo", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Kh", "Jd"])], {
      filter: "Preflop Discipline",
    });

    if (question === undefined) {
      throw new Error("Expected KJo preflop question.");
    }

    expect(question.correctOptionId).toBe("call");
    expect(question.acceptableOptionIds).toEqual(
      expect.arrayContaining(["fold", "three-bet-small"]),
    );
    expect(scoreQuizAnswers([question], { [question.id]: "call" })).toMatchObject({
      correct: 1,
      accuracy: 100,
    });
  });

  it("allows call for BTN versus CO open with QJs", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Qh", "Jh"])], {
      filter: "Preflop Discipline",
    });

    expect(question?.correctOptionId).toBe("call");
    expect(question?.acceptableOptionIds).toContain("three-bet-small");
  });

  it("recommends continuing rather than folding BTN versus CO open with TT", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Th", "Td"])], {
      filter: "Preflop Discipline",
    });

    expect(question?.correctOptionId).not.toBe("fold");
    expect(["call", "three-bet-small"]).toContain(question?.correctOptionId);
  });

  it("recommends fold for BTN versus CO open with J8o", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Jh", "8d"])], {
      filter: "Preflop Discipline",
    });

    expect(question?.correctOptionId).toBe("fold");
    expect(question?.recommendedAnswer).toBe("Fold");
  });

  it("can recommend fold versus UTG open with KJo", () => {
    const [question] = generateQuizQuestions([createFacingUtgOpenHand(["Kh", "Jd"])], {
      filter: "Preflop Discipline",
    });

    expect(question?.correctOptionId).toBe("fold");
    expect(question?.recommendedAnswer).toBe("Fold");
  });

  it("scores acceptable preflop answers as accuracy-positive", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Kh", "Jd"])], {
      filter: "Preflop Discipline",
    });

    if (question === undefined) {
      throw new Error("Expected KJo preflop question.");
    }

    expect(question.acceptableOptionIds).toContain("fold");
    expect(scoreQuizAnswers([question], { [question.id]: "fold" })).toMatchObject({
      answered: 1,
      answerableAnswered: 1,
      correct: 1,
      accuracy: 100,
    });
  });

  it("uses close mixed language for marginal BTN versus CO open spots", () => {
    const [question] = generateQuizQuestions([createButtonVsCutoffOpenHand(["Kh", "Jd"])], {
      filter: "Preflop Discipline",
    });

    expect(question?.explanation.toLowerCase()).toMatch(/close\/mixed|acceptable/);
  });

  it("creates answerable blind defense questions", () => {
    const questions = generateQuizQuestions(
      [
        createHand({
          handId: "blind-defense",
          heroCards: ["Js", "4c"],
          heroPosition: "BB",
          actions: [
            createAction({
              playerName: "btn",
              type: "raise",
              order: 1,
              amount: 0.04,
              raiseTo: 0.05,
            }),
            createAction({ type: "call", order: 2, amount: 0.03 }),
          ],
          players: [createPlayer("btn", "BTN"), createPlayer("Hero", "BB", true)],
        }),
      ],
      { filter: "Blind Defense" },
    );

    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({
      handId: "blind-defense",
      spotType: "blind-defense",
      correctOptionId: "fold",
      recommendedAnswer: "Fold",
    });
  });

  it("creates answerable value extraction questions with takeaway", () => {
    const questions = generateQuizQuestions(
      [
        createHand({
          handId: "value",
          heroCards: ["Ah", "Kh"],
          heroPosition: "CO",
          heroNetResult: 0.32,
          totalPot: 0.48,
          showdown: true,
          handDescription: "Top Pair",
          actions: [
            createAction({ type: "show", street: "river", order: 9 }),
            createAction({ playerName: "Villain", type: "show", street: "river", order: 10 }),
          ],
        }),
      ],
      { filter: "Value Extraction" },
    );

    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({
      spotType: "value-bet",
      correctOptionId: "bet-75",
      recommendedAnswer: "Bet 75%",
    });
    expect(questions[0]?.explanation).toContain("Recommended default");
    expect(questions[0]?.takeaway).toContain("value before pot control");
  });

  it("creates answerable river discipline questions", () => {
    const questions = generateQuizQuestions(
      [
        createHand({
          handId: "river-loss",
          heroNetResult: -0.24,
          totalPot: 0.6,
          reachedRiver: true,
          showdown: true,
          actions: [
            createAction({
              playerName: "villain",
              type: "bet",
              street: "river",
              order: 1,
              amount: 0.24,
            }),
            createAction({ type: "call", street: "river", order: 2, amount: 0.24 }),
          ],
        }),
      ],
      { filter: "River Discipline" },
    );

    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({
      street: "river",
      spotType: "river-discipline",
      correctOptionId: "fold",
      recommendedAnswer: "Fold",
    });
  });

  it("keeps review-only questions in Review Spots without a correct answer", () => {
    const questions = generateQuizQuestions(
      [
        createHand({
          handId: "review-only",
          heroNetResult: -0.5,
          totalPot: 1,
        }),
      ],
      { filter: "Review Spots" },
    );

    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({
      handId: "review-only",
      spotType: "big-loss-review",
      recommendedAnswer: "No correct answer available",
    });
    expect(questions[0]?.correctOptionId).toBeUndefined();
    expect(questions[0]?.options.map((option) => option.label)).toContain("Cooler");
  });

  it("clearly marks splash pot review spots", () => {
    const questions = generateQuizQuestions(
      [
        createHand({
          handId: "splash-loss",
          heroNetResult: -0.5,
          totalPot: 12,
        }),
      ],
      { filter: "Review Spots" },
    );

    expect(questions[0]?.context.isSplashPotReview).toBe(true);
    expect(questions[0]?.prompt).toContain("Splash pot review");
    expect(questions[0]?.explanation.toLowerCase()).toContain("splash");
  });

  it("limits quiz questions to 20", () => {
    const hands = Array.from({ length: 25 }, (_, index) =>
      createHand({
        handId: `loss-${index}`,
        heroNetResult: -0.5,
        totalPot: 1,
      }),
    );

    expect(generateQuizQuestions(hands, { filter: "Review Spots" })).toHaveLength(20);
  });

  it("scores correct and incorrect answer flows with accuracy", () => {
    const [question] = generateQuizQuestions(
      [
        createHand({
          handId: "weak-offsuit",
          heroCards: ["Kd", "Tc"],
          heroPosition: "CO",
          actions: [createAction({ type: "raise", order: 1 })],
        }),
      ],
      { filter: "Preflop Discipline" },
    );

    if (question === undefined) {
      throw new Error("Expected preflop question.");
    }

    expect(scoreQuizAnswers([question], { [question.id]: "fold" })).toMatchObject({
      answered: 1,
      answerableAnswered: 1,
      correct: 1,
      accuracy: 100,
      reviewSpots: 0,
    });
    expect(scoreQuizAnswers([question], { [question.id]: "raise" })).toMatchObject({
      answered: 1,
      answerableAnswered: 1,
      correct: 0,
      accuracy: 0,
      reviewSpots: 0,
    });
  });

  it("does not let review-only questions affect accuracy", () => {
    const [question] = generateQuizQuestions(
      [
        createHand({
          handId: "review-only",
          heroNetResult: -0.5,
          totalPot: 1,
        }),
      ],
      { filter: "Review Spots" },
    );

    if (question === undefined) {
      throw new Error("Expected a review-only quiz question.");
    }

    expect(scoreQuizAnswers([question], { [question.id]: "cooler" })).toEqual({
      answered: 1,
      answerableAnswered: 0,
      correct: 0,
      accuracy: 0,
      reviewSpots: 1,
    });
  });

  it("generates mixed quiz categories in All mode", () => {
    const questions = generateQuizQuestions([
      createHand({
        handId: "preflop",
        heroCards: ["Kd", "Tc"],
        heroPosition: "CO",
        actions: [createAction({ type: "raise", order: 1 })],
      }),
      createHand({
        handId: "value",
        heroCards: ["Ah", "Kh"],
        heroNetResult: 0.32,
        showdown: true,
        handDescription: "Top Pair",
        actions: [
          createAction({ type: "show", street: "river", order: 9 }),
          createAction({ playerName: "Villain", type: "show", street: "river", order: 10 }),
        ],
      }),
      createHand({
        handId: "river",
        heroNetResult: -0.24,
        reachedRiver: true,
        showdown: true,
        actions: [
          createAction({
            playerName: "villain",
            type: "bet",
            street: "river",
            order: 1,
            amount: 0.24,
          }),
          createAction({ type: "call", street: "river", order: 2, amount: 0.24 }),
        ],
      }),
      createHand({
        handId: "review",
        heroNetResult: -0.5,
        totalPot: 1,
      }),
    ]);

    expect(questions.map((question) => question.spotType)).toEqual(
      expect.arrayContaining([
        "preflop-decision",
        "value-bet",
        "river-discipline",
        "big-loss-review",
      ]),
    );
  });

  it("preflop visible information does not include board or result BB", () => {
    const hand = createHand({
      handId: "visible-preflop",
      heroCards: ["Td", "Tc"],
      heroPosition: "BTN",
      heroNetResult: -0.74,
      totalPot: 1.44,
      reachedRiver: true,
      actions: [
        createAction({ playerName: "utg", type: "fold", order: 1 }),
        createAction({ type: "raise", order: 2, raiseTo: 0.05 }),
      ],
    });
    const [question] = generateQuizQuestions([hand], { filter: "Preflop Discipline" });

    if (question === undefined) {
      throw new Error("Expected preflop question.");
    }

    const visibleInfo = getVisibleQuizInformation(question, hand, false);

    expect(visibleInfo.decisionItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Stakes",
          value: "₮0.01 / ₮0.02",
        }),
        expect.objectContaining({ label: "Effective Stack", value: "₮2 (100 BB)" }),
        expect.objectContaining({ label: "Hero Facing", value: "Action folds to Hero" }),
      ]),
    );
    expect(JSON.stringify(visibleInfo)).not.toContain("SB 0.5 BB / BB 1 BB");
    expect(visibleInfo.decisionItems.map((item) => item.label)).not.toContain("Board");
    expect(visibleInfo.decisionItems.map((item) => item.label)).not.toContain("Pot");
    expect(visibleInfo.outcomeItems).toEqual([]);
    expect(JSON.stringify(visibleInfo)).not.toContain("-37 BB");
    expect(question.options.map((option) => option.label)).not.toContain("All-in");
  });

  it("preflop visible information includes opener position, sizing, and caller count", () => {
    const hand = createHand({
      handId: "visible-facing-open",
      heroCards: ["Ah", "Kd"],
      heroPosition: "BTN",
      actions: [
        createAction({
          playerName: "utg",
          type: "raise",
          order: 1,
          amount: 0.04,
          raiseTo: 0.06,
        }),
        createAction({ playerName: "co", type: "call", order: 2, amount: 0.06 }),
        createAction({ type: "call", order: 3, amount: 0.06 }),
      ],
      players: [
        createPlayer("utg", "UTG"),
        createPlayer("co", "CO"),
        createPlayer("Hero", "BTN", true),
      ],
    });
    const [question] = generateQuizQuestions([hand], { filter: "Preflop Discipline" });

    if (question === undefined) {
      throw new Error("Expected preflop question.");
    }

    const visibleInfo = getVisibleQuizInformation(question, hand, false);

    expect(visibleInfo.decisionItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Opener", value: "UTG" }),
        expect.objectContaining({ label: "Open Size", value: "3 BB" }),
        expect.objectContaining({ label: "Callers", value: "1 caller: CO" }),
        expect.objectContaining({
          label: "Hero Facing",
          value: "Facing UTG open to 3 BB · 1 caller",
        }),
      ]),
    );
    expect(JSON.stringify(visibleInfo)).not.toContain("utg (UTG)");
    expect(JSON.stringify(visibleInfo)).not.toMatch(/Call \\d+ BB more/);
  });

  it("allows all-in for preflop questions only when effective stack is short", () => {
    const deepStackQuestion = generateQuizQuestions(
      [
        createHand({
          handId: "deep-stack-open",
          heroCards: ["Td", "Tc"],
          heroPosition: "BTN",
          actions: [createAction({ type: "raise", order: 1, raiseTo: 0.05 })],
        }),
      ],
      { filter: "Preflop Discipline" },
    )[0];
    const shortStackQuestion = generateQuizQuestions(
      [
        createHand({
          handId: "short-stack-open",
          heroCards: ["Td", "Tc"],
          heroPosition: "BTN",
          actions: [createAction({ type: "raise", order: 1, raiseTo: 0.05 })],
          players: [createPlayer("Villain", "BB"), createPlayer("Hero", "BTN", true)].map(
            (player) => ({
              ...player,
              startingStack: 0.5,
            }),
          ),
        }),
      ],
      { filter: "Preflop Discipline" },
    )[0];

    expect(deepStackQuestion?.options.map((option) => option.label)).not.toContain("All-in");
    expect(shortStackQuestion?.options.map((option) => option.label)).toContain("All-in");
  });

  it("flop visible information hides turn and river cards", () => {
    const hand = createHand({
      reachedRiver: true,
      board: {
        flop: ["Ks", "7d", "2c"],
        turn: "9h",
        river: "3s",
      },
      actions: [
        createAction({ playerName: "btn", type: "raise", order: 1, raiseTo: 0.05 }),
        createAction({ type: "call", order: 2, amount: 0.05 }),
        createAction({ playerName: "btn", type: "bet", street: "flop", order: 3, amount: 0.08 }),
      ],
    });
    const visibleInfo = getVisibleQuizInformation(createVisibleInfoQuestion("flop"), hand, false);
    const boardItem = visibleInfo.decisionItems.find((item) => item.label === "Board");

    expect(boardItem?.value).toBe("Ks 7d 2c");
    expect(JSON.stringify(visibleInfo)).not.toContain("9h");
    expect(JSON.stringify(visibleInfo)).not.toContain("3s");
  });

  it("turn visible information hides the river card", () => {
    const hand = createHand({
      reachedRiver: true,
      board: {
        flop: ["Ks", "7d", "2c"],
        turn: "9h",
        river: "3s",
      },
      actions: [
        createAction({ playerName: "btn", type: "raise", order: 1, raiseTo: 0.05 }),
        createAction({ type: "call", order: 2, amount: 0.05 }),
        createAction({ type: "check", street: "flop", order: 3 }),
        createAction({ playerName: "btn", type: "bet", street: "turn", order: 4, amount: 0.12 }),
      ],
    });
    const visibleInfo = getVisibleQuizInformation(createVisibleInfoQuestion("turn"), hand, false);
    const boardItem = visibleInfo.decisionItems.find((item) => item.label === "Board");

    expect(boardItem?.value).toBe("Ks 7d 2c 9h");
    expect(JSON.stringify(visibleInfo)).not.toContain("3s");
  });

  it("river visible information hides outcome before answer", () => {
    const hand = createHand({
      heroNetResult: -0.74,
      totalPot: 1.44,
      reachedRiver: true,
      showdown: true,
      actions: [
        createAction({ playerName: "btn", type: "raise", order: 1, raiseTo: 0.05 }),
        createAction({ type: "call", order: 2, amount: 0.05 }),
        createAction({ playerName: "btn", type: "bet", street: "river", order: 3, amount: 0.74 }),
      ],
    });
    const visibleInfo = getVisibleQuizInformation(createVisibleInfoQuestion("river"), hand, false);
    const boardItem = visibleInfo.decisionItems.find((item) => item.label === "Board");

    expect(boardItem?.value).toBe("Ks 7d 2c 9h 3s");
    expect(visibleInfo.outcomeItems).toEqual([]);
    expect(JSON.stringify(visibleInfo)).not.toContain("-37 BB");
    expect(JSON.stringify(visibleInfo)).not.toContain("Showdown");
  });

  it("show answer reveals outcome information", () => {
    const hand = createHand({
      heroNetResult: -0.74,
      totalPot: 1.44,
      reachedRiver: true,
      showdown: true,
    });
    const visibleInfo = getVisibleQuizInformation(createVisibleInfoQuestion("river"), hand, true);

    expect(visibleInfo.outcomeItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Actual Final Pot", value: "72 BB" }),
        expect.objectContaining({ label: "Actual Hero Result", value: "-37 BB" }),
        expect.objectContaining({ label: "Showdown" }),
      ]),
    );
  });

  it("does not render empty raw showdown rows", () => {
    const baseHand = createHand({
      heroNetResult: -0.74,
      totalPot: 1.44,
      reachedRiver: true,
      showdown: true,
    });
    const hand: PokerHand = {
      ...baseHand,
      showdown: {
        entries: [
          {
            playerName: "cb38460e",
            cards: null,
            handDescription: null,
            wonAmount: 1.44,
          },
        ],
        winnerNames: ["cb38460e"],
      },
    };
    const visibleInfo = getVisibleQuizInformation(createVisibleInfoQuestion("river"), hand, true);

    expect(visibleInfo.outcomeItems.map((item) => item.label)).not.toContain("Showdown");
    expect(JSON.stringify(visibleInfo)).not.toContain("cb38460e:");
  });

  it("review spots reveal outcome only after answer", () => {
    const hand = createHand({
      handId: "review-visibility",
      heroNetResult: -0.74,
      totalPot: 1.44,
      reachedRiver: true,
      showdown: true,
    });
    const [question] = generateQuizQuestions([hand], { filter: "Review Spots" });

    if (question === undefined) {
      throw new Error("Expected review question.");
    }

    const beforeAnswer = getVisibleQuizInformation(question, hand, false);
    const afterAnswer = getVisibleQuizInformation(question, hand, true);

    expect(beforeAnswer.decisionItems.map((item) => item.label)).not.toContain("Board");
    expect(beforeAnswer.outcomeItems).toEqual([]);
    expect(afterAnswer.outcomeItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Final Board", value: "Ks 7d 2c 9h 3s" }),
        expect.objectContaining({ label: "Actual Hero Result", value: "-37 BB" }),
      ]),
    );
  });
});
