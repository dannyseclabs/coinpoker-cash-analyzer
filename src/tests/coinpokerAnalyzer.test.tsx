import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { CoinPokerAnalyzer } from "../components/coinpoker-analyzer";
import { formatBBAmount, formatCurrency } from "../lib/formatPoker";
import { parseCoinPokerFile } from "../lib/parser/parseCoinPokerFile";
import { detectPokerSessions } from "../lib/sessions";
import { createHoleCardMatrix } from "../lib/stats/holeCardMatrix";
import {
  getBiggestLosingHand,
  getBiggestSplashPotLosingHand,
  getBiggestWinningHand,
  getMostProfitableStartingHand,
  getWorstStartingHand,
  type HandInsight,
} from "../lib/stats/summaryInsights";

function getSectionForHeading(name: string): HTMLElement {
  const heading = screen.getByRole("heading", { name });
  const section = heading.closest("section");

  if (section === null) {
    throw new Error(`Expected ${name} heading to be inside a section.`);
  }

  return section;
}

function getSectionForHeadingWithin(container: HTMLElement, name: string): HTMLElement {
  const heading = within(container).getByRole("heading", { name });
  const section = heading.closest("section");

  if (section === null) {
    throw new Error(`Expected ${name} heading to be inside a section.`);
  }

  return section;
}

function formatSignedBB(amount: number, bigBlind: number): string {
  return formatBBAmount(amount, bigBlind, { signed: true });
}

function formatSignedBBTotal(amount: number): string {
  return `${amount >= 0 ? "+" : ""}${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount)} BB`;
}

function formatCards(insight: HandInsight): string {
  return insight.heroCards?.join(" ") ?? "-";
}

function formatPotContext(insight: HandInsight): string {
  return `Pot ${insight.potSize === null ? "-" : formatBBAmount(insight.potSize, insight.hand.stakes.bigBlind)} · ${
    insight.potSize === null ? "-" : formatCurrency(insight.potSize)
  }`;
}

const handDetailDrawerFixture = `CoinPoker Hand #1111111111: NLH (₮0.01/₮0.02) 2026/06/07 21:00:00 CEST
Table 'drawer-test' 6-max Seat #3 is the button
Seat 1: utg11111 (₮2 in chips)
Seat 2: Hero (₮2 in chips)
Seat 3: btn33333 (₮2 in chips)
Seat 4: sb444444 (₮2 in chips)
Seat 5: bb555555 (₮2 in chips)
sb444444: posts small blind ₮0.01
bb555555: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to utg11111
Dealt to Hero [Ah Kh]
Dealt to btn33333
Dealt to sb444444
Dealt to bb555555
utg11111: raises ₮0.04 to ₮0.06
Hero: calls ₮0.06
btn33333: folds
sb444444: folds
bb555555: calls ₮0.04
*** FLOP *** [As 7d 2c]
bb555555: checks
utg11111: bets ₮0.12
Hero: raises ₮0.18 to ₮0.30
bb555555: folds
utg11111: calls ₮0.18
*** TURN *** [As 7d 2c] [9h]
utg11111: checks
Hero: ALLIN ₮1.84
utg11111: folds
Hero: RETURN ₮1.84
*** SHOWDOWN ***
Hero collected ₮0.70 from pot
*** SUMMARY ***
Total pot ₮0.72 | Rake ₮0.02
Hand was run once
Board [ As 7d 2c 9h ]
Game ended: 2026/06/07 21:01:00 CEST
Seat 1: utg11111 folded on the Turn
Seat 2: Hero showed [Ah Kh] and won (₮0.70) with One Pair
Seat 3: btn33333 folded before Flop (didn't bet)
Seat 4: sb444444 folded before Flop (didn't bet)
Seat 5: bb555555 folded on the Flop`;

const quizFixture = `CoinPoker Hand #2222222222: NLH (₮0.01/₮0.02) 2026/06/07 22:00:00 CEST
Table 'quiz-big-loss' 6-max Seat #3 is the button
Seat 1: utg22222 (₮2 in chips)
Seat 2: Hero (₮2 in chips)
Seat 3: btn22222 (₮2 in chips)
Seat 4: sb222222 (₮2 in chips)
Seat 5: bb222222 (₮2 in chips)
sb222222: posts small blind ₮0.01
bb222222: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to utg22222
Dealt to Hero [Kc Tc]
Dealt to btn22222
Dealt to sb222222
Dealt to bb222222
utg22222: raises ₮0.04 to ₮0.06
Hero: calls ₮0.06
btn22222: folds
sb222222: folds
bb222222: folds
*** FLOP *** [Ks 8d 2c]
utg22222: bets ₮0.20
Hero: calls ₮0.20
*** TURN *** [Ks 8d 2c] [9h]
utg22222: bets ₮0.24
Hero: calls ₮0.24
*** RIVER *** [Ks 8d 2c 9h] [3s]
utg22222: bets ₮0.20
Hero: calls ₮0.20
*** SHOWDOWN ***
utg22222: shows [Ad Ac] (One Pair)
utg22222 collected ₮1.42 from pot
*** SUMMARY ***
Total pot ₮1.44 | Rake ₮0.02
Hand was run once
Board [ Ks 8d 2c 9h 3s ]
Game ended: 2026/06/07 22:01:00 CEST
Seat 1: utg22222 showed [Ad Ac] and won (₮1.42) with One Pair
Seat 2: Hero showed [Kc Tc] and lost with One Pair
Seat 3: btn22222 folded before Flop (didn't bet)
Seat 4: sb222222 folded before Flop (didn't bet)
Seat 5: bb222222 folded before Flop

CoinPoker Hand #3333333333: NLH (₮0.01/₮0.02) 2026/06/07 22:05:00 CEST
Table 'quiz-blind' 6-max Seat #3 is the button
Seat 1: utg33333 (₮2 in chips)
Seat 2: co333333 (₮2 in chips)
Seat 3: btn33333 (₮2 in chips)
Seat 4: sb333333 (₮2 in chips)
Seat 5: Hero (₮2 in chips)
sb333333: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to utg33333
Dealt to co333333
Dealt to btn33333
Dealt to sb333333
Dealt to Hero [Qd 9c]
utg33333: folds
co333333: raises ₮0.04 to ₮0.06
btn33333: folds
sb333333: folds
Hero: calls ₮0.04
*** FLOP *** [Qs 7d 2c]
Hero: checks
co333333: bets ₮0.12
Hero: calls ₮0.12
*** TURN *** [Qs 7d 2c] [Ah]
Hero: checks
co333333: bets ₮0.20
Hero: folds
co333333 collected ₮0.36 from pot
*** SUMMARY ***
Total pot ₮0.38 | Rake ₮0.02
Hand was run once
Board [ Qs 7d 2c Ah ]
Game ended: 2026/06/07 22:06:00 CEST
Seat 1: utg33333 folded before Flop (didn't bet)
Seat 2: co333333 won (₮0.36)
Seat 3: btn33333 folded before Flop (didn't bet)
Seat 4: sb333333 folded before Flop (didn't bet)
Seat 5: Hero folded on the Turn`;

describe("CoinPokerAnalyzer dashboard", () => {
  it("shows hand detail player labels and action amounts in BB-first format", async () => {
    const file = new File([handDetailDrawerFixture], "drawer-test.txt", {
      type: "text/plain",
    });
    const { container } = render(<CoinPokerAnalyzer />);
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');

    expect(input).not.toBeNull();

    fireEvent.change(input as HTMLInputElement, {
      target: {
        files: [file],
      },
    });

    await screen.findByRole("heading", { name: "Hand Explorer" });

    const explorer = within(getSectionForHeading("Hand Explorer"));

    fireEvent.click(explorer.getByRole("button", { name: "View" }));

    const dialog = await screen.findByRole("dialog", {
      name: "Hand 1111111111 detail",
    });
    const players = within(getSectionForHeadingWithin(dialog, "Players"));
    const timelineSection = getSectionForHeadingWithin(dialog, "Action Timeline");
    const timeline = within(timelineSection);
    const timelineRows = timeline.getAllByRole("row");
    const rowTexts = timelineRows.map((row) => row.textContent ?? "");

    expect(players.getByText("Hero (CO)")).toBeInTheDocument();
    expect(players.getByText("Villain 1 (UTG)")).toBeInTheDocument();
    expect(players.getByText("Villain 2 (BTN)")).toBeInTheDocument();
    expect(players.getByText("Villain 3 (SB)")).toBeInTheDocument();
    expect(players.getByText("Villain 4 (BB)")).toBeInTheDocument();
    expect(players.getByText("utg11111")).toBeInTheDocument();

    expect(timeline.queryByText("utg11111")).not.toBeInTheDocument();
    expect(rowTexts.filter((text) => text.includes("Villain 1 (UTG)"))).toHaveLength(5);
    expect(rowTexts.some((text) => text.includes("Hero (CO)") && text.includes("call"))).toBe(true);
    expect(rowTexts.some((text) => text.includes("Villain 2 (BTN)") && text.includes("fold"))).toBe(
      true,
    );
    expect(timeline.getByText("0.5 BB ₮0.01")).toBeInTheDocument();
    expect(timeline.getByText("Raise to 15 BB ₮0.3")).toBeInTheDocument();
    expect(timeline.getAllByText("92 BB ₮1.84")).toHaveLength(2);
    expect(within(dialog).getByText("Raw Hand History")).toBeInTheDocument();
  });

  it("renders the full hand explorer below leaks after upload", async () => {
    const fixture = readFileSync(
      join(process.cwd(), "src/tests/fixtures/coinpoker-v1-representative-hands.txt"),
      "utf8",
    );
    const file = new File([fixture], "coinpoker-v1-representative-hands.txt", {
      type: "text/plain",
    });
    const parsedHands = parseCoinPokerFile(fixture);
    const holeCardMatrix = createHoleCardMatrix(parsedHands);
    const detectedSessions = detectPokerSessions(parsedHands);
    const firstSession = detectedSessions[0];
    const mostProfitableStartingHand = getMostProfitableStartingHand(holeCardMatrix);
    const worstStartingHand = getWorstStartingHand(holeCardMatrix);
    const biggestWinningHand = getBiggestWinningHand(parsedHands);
    const biggestLosingHand = getBiggestLosingHand(parsedHands);
    const { container } = render(<CoinPokerAnalyzer />);
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');

    expect(input).not.toBeNull();

    fireEvent.change(input as HTMLInputElement, {
      target: {
        files: [file],
      },
    });

    await screen.findByRole("heading", { name: "Hand Explorer" });

    expect(
      screen.queryByRole("heading", { name: "First 10 parsed hands" }),
    ).not.toBeInTheDocument();

    const summary = within(getSectionForHeading("Summary"));

    expect(summary.getAllByText("What this means")).toHaveLength(10);
    expect(summary.getByText("Voluntarily Put Money In Pot")).toBeInTheDocument();
    expect(summary.getByText("Preflop Raise")).toBeInTheDocument();
    expect(summary.getByText("Three-Bet")).toBeInTheDocument();
    expect(summary.getByText("Went To Showdown")).toBeInTheDocument();

    const statusBadges = getSectionForHeading("Summary").querySelectorAll("span[title]");

    expect(statusBadges).toHaveLength(8);
    expect(
      summary.getByTitle(
        "WTSD above 50% often indicates calling too many marginal hands to showdown.",
      ),
    ).toBeInTheDocument();
    expect(summary.getByText("Very Loose")).toBeInTheDocument();

    const summaryHeading = screen.getByRole("heading", { name: "Summary" });
    const summaryInsightsHeading = screen.getByRole("heading", { name: "Summary Insights" });
    const sessionsHeading = screen.getByRole("heading", { name: "Sessions" });
    const sessionInsightsHeading = screen.getByRole("heading", { name: "Session Insights" });
    const positionHeading = screen.getByRole("heading", { name: "Position Analysis" });

    expect(
      summaryHeading.compareDocumentPosition(summaryInsightsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      summaryInsightsHeading.compareDocumentPosition(sessionsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      sessionsHeading.compareDocumentPosition(sessionInsightsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      sessionInsightsHeading.compareDocumentPosition(positionHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      sessionsHeading.compareDocumentPosition(positionHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const summaryInsights = within(getSectionForHeading("Summary Insights"));

    expect(
      summaryInsights.getByText("Quick highlights from the imported hand history."),
    ).toBeInTheDocument();
    expect(summaryInsights.getByText("Normal insights exclude splash pots.")).toBeInTheDocument();
    expect(summaryInsights.getByText("Most Profitable Starting Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Worst Starting Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Most Played Starting Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Biggest Winning Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Biggest Losing Hand")).toBeInTheDocument();
    expect(summaryInsights.queryByText("Biggest Splash Pot Won")).not.toBeInTheDocument();
    expect(summaryInsights.queryByText("Biggest Splash Pot Lost")).not.toBeInTheDocument();
    expect(summaryInsights.getAllByRole("button", { name: "View" })).toHaveLength(2);

    if (mostProfitableStartingHand !== null) {
      expect(summaryInsights.getByText(mostProfitableStartingHand.label)).toBeInTheDocument();
      expect(
        summaryInsights.getByText(
          formatSignedBBTotal(mostProfitableStartingHand.totalBigBlindsWon),
        ),
      ).toBeInTheDocument();
      expect(
        summaryInsights.getByText(formatCurrency(mostProfitableStartingHand.totalProfit)),
      ).toBeInTheDocument();
      expect(
        summaryInsights.getAllByText(`${mostProfitableStartingHand.handsPlayed} hands`).length,
      ).toBeGreaterThan(0);
      expect(
        summaryInsights.getAllByText(mostProfitableStartingHand.sampleLabel).length,
      ).toBeGreaterThan(0);
    }

    if (worstStartingHand !== null) {
      expect(summaryInsights.getByText(worstStartingHand.label)).toBeInTheDocument();
      expect(
        summaryInsights.getByText(formatSignedBBTotal(worstStartingHand.totalBigBlindsWon)),
      ).toBeInTheDocument();
      expect(
        summaryInsights.getByText(formatCurrency(worstStartingHand.totalProfit)),
      ).toBeInTheDocument();
      expect(
        summaryInsights.getAllByText(`${worstStartingHand.handsPlayed} hands`).length,
      ).toBeGreaterThan(0);
      expect(summaryInsights.getAllByText(worstStartingHand.sampleLabel).length).toBeGreaterThan(0);
    }

    if (biggestWinningHand === null || biggestLosingHand === null) {
      throw new Error("Expected fixture to have a biggest winning hand.");
    }

    expect(summaryInsights.getByText(formatCards(biggestWinningHand))).toBeInTheDocument();
    expect(summaryInsights.getByText(formatCards(biggestLosingHand))).toBeInTheDocument();
    expect(
      summaryInsights.getAllByText(
        formatSignedBB(biggestWinningHand.heroNet, biggestWinningHand.hand.stakes.bigBlind),
      ).length,
    ).toBeGreaterThan(0);
    expect(
      summaryInsights.getAllByText(
        formatSignedBB(biggestLosingHand.heroNet, biggestLosingHand.hand.stakes.bigBlind),
      ).length,
    ).toBeGreaterThan(0);
    expect(summaryInsights.getByText(formatPotContext(biggestWinningHand))).toBeInTheDocument();
    expect(summaryInsights.getByText(formatPotContext(biggestLosingHand))).toBeInTheDocument();
    expect(summaryInsights.getByText(`Hand ${biggestWinningHand.handId}`)).toBeInTheDocument();
    expect(summaryInsights.getByText(`Hand ${biggestLosingHand.handId}`)).toBeInTheDocument();

    if (firstSession === undefined) {
      throw new Error("Expected fixture to create at least one detected session.");
    }

    const sessions = within(getSectionForHeading("Sessions"));

    expect(sessions.getByText("Total Sessions")).toBeInTheDocument();
    expect(sessions.getByText("Best Session")).toBeInTheDocument();
    expect(sessions.getByText("Worst Session")).toBeInTheDocument();
    expect(sessions.getByText("Average Session Length")).toBeInTheDocument();
    expect(sessions.getByText("Average Hands / Session")).toBeInTheDocument();
    expect(sessions.getByText("Est. Tables")).toBeInTheDocument();
    expect(sessions.getAllByRole("button", { name: "View" }).length).toBeGreaterThan(0);

    const sessionInsights = within(getSectionForHeading("Session Insights"));

    expect(sessionInsights.getByText("Selected Session")).toBeInTheDocument();
    expect(sessionInsights.getByText("Session Highlights")).toBeInTheDocument();
    expect(sessionInsights.getByText("Session Trend Summary")).toBeInTheDocument();
    expect(sessionInsights.getByText("Low confidence due to limited history.")).toBeInTheDocument();
    expect(sessionInsights.getByText("VPIP/PFR Gap")).toBeInTheDocument();
    expect(sessionInsights.getByText("BB Profit")).toBeInTheDocument();

    fireEvent.click(summaryInsights.getAllByRole("button", { name: "View" })[0] as HTMLElement);

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /Hand .* detail/ })).toBeInTheDocument();
    });

    const summaryInsightDialog = screen.getByRole("dialog", {
      name: `Hand ${biggestWinningHand.handId} detail`,
    });
    const summaryInsightDetail = within(summaryInsightDialog);
    const firstPlayer = biggestWinningHand.hand.players[0];

    expect(summaryInsightDetail.getByText(biggestWinningHand.handId)).toBeInTheDocument();
    expect(
      summaryInsightDetail.getAllByText(
        formatSignedBB(
          biggestWinningHand.hand.heroNetResult,
          biggestWinningHand.hand.stakes.bigBlind,
        ),
      ).length,
    ).toBeGreaterThan(0);
    if (firstPlayer !== undefined) {
      expect(
        summaryInsightDetail.getByText(
          formatBBAmount(firstPlayer.startingStack, biggestWinningHand.hand.stakes.bigBlind),
        ),
      ).toBeInTheDocument();
    }
    expect(summaryInsightDetail.getAllByText("Result").length).toBeGreaterThan(0);
    expect(summaryInsightDetail.getAllByText("Ended On").length).toBeGreaterThan(0);
    expect(summaryInsightDetail.getAllByText("Players").length).toBeGreaterThan(0);
    expect(
      summaryInsightDetail.getByText((content) =>
        content.includes(`${biggestWinningHand.hand.players.length}-handed`),
      ),
    ).toBeInTheDocument();
    expect(summaryInsightDetail.getByText("Raw Hand History")).toBeInTheDocument();
    expect(
      summaryInsightDetail.getByText((content) =>
        content.includes(`CoinPoker Hand #${biggestWinningHand.handId}: NLH`),
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /Hand .* detail/ })).not.toBeInTheDocument();
    });

    const firstMatrixCellWithOccurrence = Object.values(holeCardMatrix.cells).find(
      (cell) => cell.occurrences.length > 0,
    );

    if (firstMatrixCellWithOccurrence === undefined) {
      throw new Error("Expected fixture to have at least one matrix occurrence.");
    }

    const firstOccurrence = firstMatrixCellWithOccurrence.occurrences[0];

    if (firstOccurrence === undefined) {
      throw new Error("Expected selected matrix cell to have an occurrence.");
    }

    const matrix = within(getSectionForHeading("Hole Card Matrix"));

    fireEvent.click(
      matrix.getByRole("button", {
        name: `Show ${firstMatrixCellWithOccurrence.notation} details`,
      }),
    );

    expect(
      matrix.getByText(`Selected Hand: ${firstMatrixCellWithOccurrence.notation}`),
    ).toBeInTheDocument();
    expect(
      matrix.getAllByText(formatSignedBBTotal(firstMatrixCellWithOccurrence.totalBigBlindsWon))
        .length,
    ).toBeGreaterThan(0);
    expect(
      matrix.getAllByText(formatCurrency(firstMatrixCellWithOccurrence.totalProfit)).length,
    ).toBeGreaterThan(0);
    expect(
      matrix.getAllByText(
        `${firstOccurrence.bigBlindsWon >= 0 ? "+" : ""}${firstOccurrence.bigBlindsWon} BB`,
      ).length,
    ).toBeGreaterThan(0);
    expect(matrix.getAllByText(formatCurrency(firstOccurrence.profit)).length).toBeGreaterThan(0);

    const leaksHeading = screen.getByRole("heading", { name: "Leaks" });
    const explorerHeading = screen.getByRole("heading", { name: "Hand Explorer" });

    expect(
      leaksHeading.compareDocumentPosition(explorerHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const explorerSection = getSectionForHeading("Hand Explorer");
    const explorer = within(explorerSection);

    expect(explorer.getByText(/Showing \d+ of \d+ filtered hands\./)).toBeInTheDocument();
    expect(explorer.getByLabelText("Position")).toBeInTheDocument();
    expect(explorer.getByLabelText("Result")).toBeInTheDocument();
    expect(explorer.getByLabelText("Hero Showdown")).toBeInTheDocument();
    expect(explorer.getByLabelText("Splash Pots")).toBeInTheDocument();
    expect(explorer.getByLabelText("Hero Cards")).toBeInTheDocument();
    expect(explorer.getByLabelText("Date")).toBeInTheDocument();
    expect(explorer.getByLabelText("Sort By")).toBeInTheDocument();
    expect(explorer.getByLabelText("Direction")).toBeInTheDocument();
    expect(explorer.getByLabelText("Rows")).toBeInTheDocument();

    fireEvent.click(sessions.getAllByRole("button", { name: "View" })[0] as HTMLElement);

    expect(explorer.getByText("Showing Session")).toBeInTheDocument();
    expect(explorer.getByRole("button", { name: "Clear Session Filter" })).toBeInTheDocument();
    expect(
      explorer.getByText(
        `Showing ${firstSession.handCount} of ${firstSession.handCount} filtered hands.`,
      ),
    ).toBeInTheDocument();

    fireEvent.click(explorer.getByRole("button", { name: "Clear Session Filter" }));

    expect(explorer.queryByText("Showing Session")).not.toBeInTheDocument();
    expect(
      explorer.getByText(`Showing ${parsedHands.length} of ${parsedHands.length} filtered hands.`),
    ).toBeInTheDocument();

    const viewButtons = explorer.getAllByRole("button", { name: "View" });
    const firstViewButton = viewButtons[0];

    expect(viewButtons.length).toBeGreaterThan(0);

    if (firstViewButton === undefined) {
      throw new Error("Expected at least one Hand Explorer View button.");
    }

    fireEvent.click(firstViewButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /Hand .* detail/ })).toBeInTheDocument();
    });
  });

  it("renders the compact study quiz launcher and opens full-screen study mode", async () => {
    const file = new File([quizFixture], "quiz-hands.txt", {
      type: "text/plain",
    });
    const { container } = render(<CoinPokerAnalyzer />);
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');

    expect(input).not.toBeNull();

    fireEvent.change(input as HTMLInputElement, {
      target: {
        files: [file],
      },
    });

    await screen.findByRole("heading", { name: "Study Quiz" });

    const leaksHeading = screen.getByRole("heading", { name: "Leaks" });
    const quizHeading = screen.getByRole("heading", { name: "Study Quiz" });
    const explorerHeading = screen.getByRole("heading", { name: "Hand Explorer" });

    expect(
      leaksHeading.compareDocumentPosition(quizHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      quizHeading.compareDocumentPosition(explorerHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const quiz = within(getSectionForHeading("Study Quiz"));

    expect(quiz.getByLabelText("Quiz Type")).toBeInTheDocument();
    expect(quiz.getByRole("button", { name: "Start Study Quiz" })).toBeInTheDocument();
    expect(quiz.getByText("4 review spots generated")).toBeInTheDocument();
    expect(quiz.getAllByText("Preflop Discipline").length).toBeGreaterThan(0);
    expect(quiz.getAllByText("River Discipline").length).toBeGreaterThan(0);
    expect(quiz.getAllByText("Blind Defense").length).toBeGreaterThan(0);
    expect(quiz.getAllByText("Value Extraction").length).toBeGreaterThan(0);
    expect(quiz.getAllByText("Review Spots").length).toBeGreaterThan(0);
    expect(quiz.queryByText("Question 1 / 4")).not.toBeInTheDocument();
    expect(
      quiz.queryByText("You lost 35 BB in this hand. What is the best review focus?"),
    ).not.toBeInTheDocument();

    fireEvent.click(quiz.getByRole("button", { name: "Start Study Quiz" }));

    const studyMode = within(
      await screen.findByRole("dialog", {
        name: "Study Quiz mode",
      }),
    );

    expect(studyMode.getByRole("heading", { name: "Question 1 / 4" })).toBeInTheDocument();
    expect(studyMode.getByText("Quiz Type: All")).toBeInTheDocument();
    expect(studyMode.getByText("Answered: 0 / 4")).toBeInTheDocument();
    expect(studyMode.getByText("Accuracy: 0%")).toBeInTheDocument();
    expect(studyMode.getByText("Correct: 0 / 0")).toBeInTheDocument();
    expect(
      studyMode.getByText("Hero CO: KTs. Facing an open raise, what is the best default action?"),
    ).toBeInTheDocument();
    expect(studyMode.getAllByText("Recommended spot").length).toBeGreaterThan(0);
    expect(studyMode.getByText("Kc Tc")).toBeInTheDocument();
    expect(studyMode.getByText("CO")).toBeInTheDocument();
    expect(studyMode.getAllByText("Preflop").length).toBeGreaterThan(0);
    expect(studyMode.getByText(/₮0\.01 \/ ₮0\.02/)).toBeInTheDocument();
    expect(studyMode.queryByText(/SB 0\.5 BB \/ BB 1 BB/)).not.toBeInTheDocument();
    expect(studyMode.getByText("₮2 (100 BB)")).toBeInTheDocument();
    expect(studyMode.queryByText("utg22222 (UTG)")).not.toBeInTheDocument();
    expect(studyMode.getAllByText("UTG").length).toBeGreaterThan(0);
    expect(studyMode.getAllByText("3 BB").length).toBeGreaterThan(0);
    expect(studyMode.getByText("0 callers")).toBeInTheDocument();
    expect(studyMode.getByText("Facing UTG open to 3 BB · 0 callers")).toBeInTheDocument();
    expect(studyMode.queryByText(/Call \d+ BB more/)).not.toBeInTheDocument();
    expect(studyMode.queryByText("Ks 8d 2c 9h 3s")).not.toBeInTheDocument();
    expect(studyMode.queryByText("72 BB")).not.toBeInTheDocument();
    expect(studyMode.queryByText("-35 BB")).not.toBeInTheDocument();
    expect(studyMode.getByText("Preflop Decision")).toBeInTheDocument();
    expect(studyMode.getByText("2222222222")).toBeInTheDocument();
    expect(studyMode.getByText(/Preflop: utg22222 Raise 3 BB/)).toBeInTheDocument();
    expect(studyMode.queryByText(/River: Showdown/)).not.toBeInTheDocument();
    expect(studyMode.getByText("Defensive")).toBeInTheDocument();
    expect(studyMode.getByText("Aggressive")).toBeInTheDocument();
    expect(studyMode.getByRole("button", { name: /Fold/ })).toBeInTheDocument();
    expect(studyMode.getByRole("button", { name: /Call/ })).toBeInTheDocument();
    expect(studyMode.getByRole("button", { name: /3bet small/ })).toBeInTheDocument();
    expect(studyMode.getByRole("button", { name: /3bet large/ })).toBeInTheDocument();
    expect(studyMode.queryByRole("button", { name: /All-in/ })).not.toBeInTheDocument();

    const showAnswerButton = studyMode.getByRole("button", { name: "Show Answer" });

    expect(showAnswerButton).toBeDisabled();

    fireEvent.click(studyMode.getByRole("button", { name: /Call/ }));

    expect(showAnswerButton).toBeEnabled();

    fireEvent.click(showAnswerButton);

    expect(studyMode.getByText("❌ Incorrect")).toBeInTheDocument();
    expect(studyMode.getByText("Selected: Call")).toBeInTheDocument();
    expect(studyMode.getByText("Recommended: Fold")).toBeInTheDocument();
    expect(studyMode.getByText("Actual Final Pot")).toBeInTheDocument();
    expect(studyMode.getByText("72 BB")).toBeInTheDocument();
    expect(studyMode.getByText("Actual Hero Result")).toBeInTheDocument();
    expect(studyMode.getByText("-35 BB")).toBeInTheDocument();
    expect(studyMode.getByText("Showdown")).toBeInTheDocument();
    expect(studyMode.getByText("Answered: 1 / 4")).toBeInTheDocument();
    expect(studyMode.getByText("Correct: 0 / 1")).toBeInTheDocument();
    expect(studyMode.getAllByText("Accuracy: 0%").length).toBeGreaterThan(0);
    expect(studyMode.getByText("Review Spots: 0")).toBeInTheDocument();
    expect(studyMode.getByText("Why")).toBeInTheDocument();
    expect(studyMode.getByText(/cold-calling open raises/)).toBeInTheDocument();
    expect(studyMode.getByText("Study takeaway")).toBeInTheDocument();
    expect(studyMode.getByText(/dominated versus an opener/)).toBeInTheDocument();

    fireEvent.click(studyMode.getByRole("button", { name: "Next Question" }));

    expect(studyMode.getByRole("heading", { name: "Question 2 / 4" })).toBeInTheDocument();
    expect(studyMode.getByText("River Discipline")).toBeInTheDocument();
    expect(studyMode.getByRole("button", { name: /Fold/ })).toBeInTheDocument();

    fireEvent.click(studyMode.getByRole("button", { name: "Open Hand" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Study Quiz mode" })).not.toBeInTheDocument();
    });

    expect(
      await screen.findByRole("dialog", { name: "Hand 2222222222 detail" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /Hand .* detail/ })).not.toBeInTheDocument();
    });

    fireEvent.click(quiz.getByRole("button", { name: "Start Study Quiz" }));

    const reopenedStudyMode = within(
      await screen.findByRole("dialog", {
        name: "Study Quiz mode",
      }),
    );

    fireEvent.click(reopenedStudyMode.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Study Quiz mode" })).not.toBeInTheDocument();
    });
  });

  it("shows separate splash pot insight cards when huge pots exist", async () => {
    const fixture = readFileSync(
      join(process.cwd(), "src/tests/fixtures/coinpoker-v1-representative-hands.txt"),
      "utf8",
    );
    const splashFixture = fixture.replace(
      "Total pot ₮1.32 | Rake ₮0.07",
      "Total pot ₮38.15 | Rake ₮0.07",
    );
    const file = new File([splashFixture], "coinpoker-v1-representative-hands.txt", {
      type: "text/plain",
    });
    const parsedHands = parseCoinPokerFile(splashFixture);
    const biggestLosingHand = getBiggestLosingHand(parsedHands);
    const biggestSplashPotLosingHand = getBiggestSplashPotLosingHand(parsedHands);
    const { container } = render(<CoinPokerAnalyzer />);
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');

    expect(input).not.toBeNull();

    fireEvent.change(input as HTMLInputElement, {
      target: {
        files: [file],
      },
    });

    await screen.findByRole("heading", { name: "Summary Insights" });

    const summaryInsights = within(getSectionForHeading("Summary Insights"));

    expect(biggestLosingHand?.handId).not.toBe("6299122116");
    expect(biggestSplashPotLosingHand).toMatchObject({
      handId: "6299122116",
      potBb: 1907.5,
      isSplashPot: true,
    });
    expect(summaryInsights.getByText("Biggest Splash Pot Lost")).toBeInTheDocument();
    expect(summaryInsights.getByText("SPLASH POT")).toBeInTheDocument();
    expect(summaryInsights.getByText("Hand 6299122116")).toBeInTheDocument();
    expect(summaryInsights.getAllByRole("button", { name: "View" })).toHaveLength(3);
  });
});
