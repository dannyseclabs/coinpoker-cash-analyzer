import type { PokerHand } from "../types";

const HERO_NAME = "Hero";

function didHeroShowOrMuck(hand: PokerHand): boolean {
  return hand.actions.some(
    (action) => action.playerName === HERO_NAME && ["muck", "show"].includes(action.type),
  );
}

function hasContestedShowdownCards(hand: PokerHand): boolean {
  const entries = hand.showdown?.entries ?? [];
  const heroShowedCards = entries.some(
    (entry) => entry.playerName === HERO_NAME && entry.cards !== null,
  );
  const opponentShowedCards = entries.some(
    (entry) => entry.playerName !== HERO_NAME && entry.cards !== null,
  );

  return heroShowedCards && opponentShowedCards;
}

export function didHeroReachTrackedShowdown(hand: PokerHand): boolean {
  return didHeroShowOrMuck(hand) || hasContestedShowdownCards(hand);
}

export function didHeroWinTrackedShowdown(hand: PokerHand): boolean {
  if (!didHeroReachTrackedShowdown(hand) || hand.showdown === null) {
    return false;
  }

  return (
    hand.showdown.winnerNames.includes(HERO_NAME) ||
    hand.showdown.entries.some((entry) => entry.playerName === HERO_NAME && entry.wonAmount > 0)
  );
}
