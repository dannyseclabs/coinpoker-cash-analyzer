import { describe, expect, it } from "vitest";

import {
  getPositionHighlights,
  getPositionSampleLabel,
  pickBestPosition,
  pickWorstPosition,
} from "../lib/stats/positionAnalysis";
import type { PokerPosition, PositionStats } from "../types";

function createPositionStats(
  position: PokerPosition,
  overrides: Partial<PositionStats> = {},
): PositionStats {
  return {
    position,
    handsPlayed: 0,
    totalProfit: 0,
    bbPer100: 0,
    vpip: 0,
    pfr: 0,
    wtsd: 0,
    wsd: 0,
    ...overrides,
  };
}

describe("positionAnalysis", () => {
  it("labels position sample sizes", () => {
    expect(getPositionSampleLabel(0)).toBe("Small sample");
    expect(getPositionSampleLabel(29)).toBe("Small sample");
    expect(getPositionSampleLabel(30)).toBe("Medium sample");
    expect(getPositionSampleLabel(99)).toBe("Medium sample");
    expect(getPositionSampleLabel(100)).toBe("Reliable sample");
  });

  it("selects best and worst positions only from positions with at least 30 hands", () => {
    const positionStats = [
      createPositionStats("BTN", {
        handsPlayed: 29,
        bbPer100: 500,
      }),
      createPositionStats("CO", {
        handsPlayed: 30,
        bbPer100: 12,
      }),
      createPositionStats("SB", {
        handsPlayed: 100,
        bbPer100: -55,
      }),
      createPositionStats("BB", {
        handsPlayed: 45,
        bbPer100: -20,
      }),
    ];

    expect(pickBestPosition(positionStats)?.position).toBe("CO");
    expect(pickWorstPosition(positionStats)?.position).toBe("SB");
  });

  it("returns no best or worst position when every position is below 30 hands", () => {
    const positionStats = [
      createPositionStats("BTN", {
        handsPlayed: 29,
        bbPer100: 500,
      }),
      createPositionStats("SB", {
        handsPlayed: 12,
        bbPer100: -100,
      }),
    ];

    expect(pickBestPosition(positionStats)).toBeNull();
    expect(pickWorstPosition(positionStats)).toBeNull();
  });

  it("keeps most active position available even when winrate highlights lack sample", () => {
    const highlights = getPositionHighlights([
      createPositionStats("BTN", {
        handsPlayed: 20,
        vpip: 48,
      }),
      createPositionStats("SB", {
        handsPlayed: 10,
        vpip: 30,
      }),
    ]);

    expect(highlights.best).toBeNull();
    expect(highlights.worst).toBeNull();
    expect(highlights.mostActive?.position).toBe("BTN");
  });
});
