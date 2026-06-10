import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { CoinPokerAnalyzer } from "../components/coinpoker-analyzer";

function getSectionForHeading(name: string): HTMLElement {
  const heading = screen.getByRole("heading", { name });
  const section = heading.closest("section");

  if (section === null) {
    throw new Error(`Expected ${name} heading to be inside a section.`);
  }

  return section;
}

describe("CoinPokerAnalyzer dashboard", () => {
  it("renders the full hand explorer below leaks after upload", async () => {
    const fixture = readFileSync(
      join(process.cwd(), "src/tests/fixtures/coinpoker-v1-representative-hands.txt"),
      "utf8",
    );
    const file = new File([fixture], "coinpoker-v1-representative-hands.txt", {
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
    const positionHeading = screen.getByRole("heading", { name: "Position Analysis" });

    expect(
      summaryHeading.compareDocumentPosition(summaryInsightsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      summaryInsightsHeading.compareDocumentPosition(positionHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const summaryInsights = within(getSectionForHeading("Summary Insights"));

    expect(
      summaryInsights.getByText("Quick highlights from the imported hand history."),
    ).toBeInTheDocument();
    expect(summaryInsights.getByText("Most Profitable Starting Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Worst Starting Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Most Played Starting Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Biggest Winning Hand")).toBeInTheDocument();
    expect(summaryInsights.getByText("Biggest Losing Hand")).toBeInTheDocument();
    expect(summaryInsights.getAllByRole("button", { name: "View" })).toHaveLength(2);

    fireEvent.click(summaryInsights.getAllByRole("button", { name: "View" })[0] as HTMLElement);

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /Hand .* detail/ })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /Hand .* detail/ })).not.toBeInTheDocument();
    });

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
    expect(explorer.getByLabelText("Hero Cards")).toBeInTheDocument();
    expect(explorer.getByLabelText("Date")).toBeInTheDocument();
    expect(explorer.getByLabelText("Sort By")).toBeInTheDocument();
    expect(explorer.getByLabelText("Direction")).toBeInTheDocument();
    expect(explorer.getByLabelText("Rows")).toBeInTheDocument();
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
});
