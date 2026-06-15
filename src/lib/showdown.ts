import type { PokerHand } from "../types";

const HERO_NAME = "Hero";

function didPlayerShowOrMuck(hand: PokerHand, playerName: string): boolean {
  return hand.actions.some(
    (action) => action.playerName === playerName && ["muck", "show"].includes(action.type),
  );
}

function hasPlayerShowdownCards(hand: PokerHand, playerName: string): boolean {
  const entries = hand.showdown?.entries ?? [];

  return entries.some((entry) => entry.playerName === playerName && entry.cards !== null);
}

function getShowdownPlayerNames(hand: PokerHand): readonly string[] {
  const playerNames = new Set<string>();

  for (const action of hand.actions) {
    if (["muck", "show"].includes(action.type)) {
      playerNames.add(action.playerName);
    }
  }

  for (const entry of hand.showdown?.entries ?? []) {
    if (entry.cards !== null) {
      playerNames.add(entry.playerName);
    }
  }

  return [...playerNames];
}

function didPlayerReachShowdown(hand: PokerHand, playerName: string): boolean {
  return didPlayerShowOrMuck(hand, playerName) || hasPlayerShowdownCards(hand, playerName);
}

function hasOpponentAtShowdown(hand: PokerHand): boolean {
  return getShowdownPlayerNames(hand).some(
    (playerName) => playerName !== HERO_NAME && didPlayerReachShowdown(hand, playerName),
  );
}

export function didHeroReachTrackedShowdown(hand: PokerHand): boolean {
  return didPlayerReachShowdown(hand, HERO_NAME) && hasOpponentAtShowdown(hand);
}

export function didHeroWinTrackedShowdown(hand: PokerHand): boolean {
  if (!didHeroReachTrackedShowdown(hand)) {
    return false;
  }

  return hand.heroNetResult > 0;
}
