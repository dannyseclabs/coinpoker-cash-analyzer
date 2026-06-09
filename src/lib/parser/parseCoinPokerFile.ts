import { parseHand } from "./parseHand";
import type { PokerHand } from "../../types";

export function parseCoinPokerFile(fileText: string): PokerHand[] {
  return fileText
    .split(/\n(?=CoinPoker Hand #)/)
    .map((rawHand) => parseHand(rawHand))
    .filter((hand): hand is PokerHand => hand !== null);
}
