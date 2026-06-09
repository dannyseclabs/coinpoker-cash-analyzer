import type {
  ActionType,
  Board,
  Card,
  HandAction,
  Player,
  PokerHand,
  PokerPosition,
  PokerStreet,
  Showdown,
  ShowdownEntry,
  Stakes,
  StreetActions,
} from "../../types";

const CARD_PATTERN = /^[2-9TJQKA][cdhs]$/;
const MONEY_PATTERN = /([^\d\s-]+)?([0-9]+(?:\.[0-9]+)?)/;
const EMPTY_BOARD: Board = {
  flop: null,
  turn: null,
  river: null,
};

interface ParsedMoney {
  readonly amount: number;
  readonly currency: string;
}

interface ParsedHeader {
  readonly handId: string;
  readonly stakes: Stakes;
  readonly date: string;
}

interface ParsedAction {
  readonly playerName: string;
  readonly type: ActionType;
  readonly amount: number | null;
  readonly raiseTo: number | null;
  readonly cards: readonly [Card, Card] | null;
  readonly handDescription: string | null;
}

function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

function parseMoney(value: string): ParsedMoney | null {
  const match = value.match(MONEY_PATTERN);

  if (!match?.[2]) {
    return null;
  }

  return {
    amount: Number(match[2]),
    currency: match[1] ?? "₮",
  };
}

function parseStakes(rawStakes: string): Stakes | null {
  const [rawSmallBlind, rawBigBlind] = rawStakes.split("/");

  if (!rawSmallBlind || !rawBigBlind) {
    return null;
  }

  const smallBlind = parseMoney(rawSmallBlind);
  const bigBlind = parseMoney(rawBigBlind);

  if (!smallBlind || !bigBlind) {
    return null;
  }

  return {
    smallBlind: smallBlind.amount,
    bigBlind: bigBlind.amount,
    currency: smallBlind.currency || bigBlind.currency,
  };
}

function parseHeader(headerLine: string): ParsedHeader | null {
  const match = headerLine.match(/^CoinPoker Hand #(\d+):\s+NLH\s+\(([^)]+)\)\s+(.+)$/);

  if (!match?.[1] || !match[2] || !match[3]) {
    return null;
  }

  const stakes = parseStakes(match[2]);

  if (!stakes) {
    return null;
  }

  return {
    handId: match[1],
    stakes,
    date: match[3],
  };
}

function isCard(value: string): value is Card {
  return CARD_PATTERN.test(value);
}

function parseCards(rawCards: string): Card[] {
  return rawCards.trim().split(/\s+/).filter(isCard);
}

function toHoleCards(cards: readonly Card[]): readonly [Card, Card] | null {
  const [firstCard, secondCard] = cards;

  if (!firstCard || !secondCard) {
    return null;
  }

  return [firstCard, secondCard];
}

function toFlop(cards: readonly Card[]): readonly [Card, Card, Card] | null {
  const [firstCard, secondCard, thirdCard] = cards;

  if (!firstCard || !secondCard || !thirdCard) {
    return null;
  }

  return [firstCard, secondCard, thirdCard];
}

function applyBoardCards(board: Board, cards: readonly Card[]): Board {
  return {
    flop: toFlop(cards) ?? board.flop,
    turn: cards[3] ?? board.turn,
    river: cards[4] ?? board.river,
  };
}

function parseBracketGroups(line: string): string[] {
  return [...line.matchAll(/\[([^\]]*)\]/g)].map((match) => match[1] ?? "");
}

function parseStreetMarker(
  line: string,
  board: Board,
): { board: Board; street: PokerStreet } | null {
  const bracketGroups = parseBracketGroups(line);

  if (line.startsWith("*** FLOP ***")) {
    const cards = parseCards(bracketGroups[0] ?? "");

    return {
      board: {
        ...board,
        flop: toFlop(cards),
      },
      street: "flop",
    };
  }

  if (line.startsWith("*** TURN ***")) {
    const turnCards = parseCards(bracketGroups.at(-1) ?? "");

    return {
      board: {
        ...applyBoardCards(board, parseCards(bracketGroups[0] ?? "")),
        turn: turnCards[0] ?? board.turn,
      },
      street: "turn",
    };
  }

  if (line.startsWith("*** RIVER ***")) {
    const riverCards = parseCards(bracketGroups.at(-1) ?? "");

    return {
      board: {
        ...applyBoardCards(board, parseCards(bracketGroups[0] ?? "")),
        river: riverCards[0] ?? board.river,
      },
      street: "river",
    };
  }

  return null;
}

function parseTableLine(line: string): {
  readonly tableName: string;
  readonly maxPlayers: number;
  readonly buttonSeat: number;
} | null {
  const match = line.match(/^Table '([^']+)'\s+(\d+)-max Seat #(\d+) is the button$/);

  if (!match?.[1] || !match[2] || !match[3]) {
    return null;
  }

  return {
    tableName: match[1],
    maxPlayers: Number(match[2]),
    buttonSeat: Number(match[3]),
  };
}

function parseSeatLine(line: string): Omit<Player, "position"> | null {
  const match = line.match(
    /^Seat\s+(\d+):\s+(.+?)\s+\((?:[^\d\s-]+)?([0-9]+(?:\.[0-9]+)?) in chips\)$/,
  );

  if (!match?.[1] || !match[2] || !match[3]) {
    return null;
  }

  return {
    seat: Number(match[1]),
    name: match[2],
    startingStack: Number(match[3]),
    isHero: match[2] === "Hero",
  };
}

function getPositionsAfterButton(playerCount: number): readonly PokerPosition[] {
  if (playerCount >= 6) {
    return ["SB", "BB", "UTG", "HJ", "CO"];
  }

  if (playerCount === 5) {
    return ["SB", "BB", "UTG", "CO"];
  }

  if (playerCount === 4) {
    return ["SB", "BB", "CO"];
  }

  if (playerCount === 3) {
    return ["SB", "BB"];
  }

  if (playerCount === 2) {
    return ["BB"];
  }

  return [];
}

function assignPositions(
  players: readonly Omit<Player, "position">[],
  buttonSeat: number | null,
): Player[] {
  const sortedPlayers = [...players].sort((left, right) => left.seat - right.seat);

  if (buttonSeat === null) {
    return sortedPlayers.map((player) => ({ ...player, position: "UNKNOWN" }));
  }

  const buttonIndex = sortedPlayers.findIndex((player) => player.seat === buttonSeat);

  if (buttonIndex === -1) {
    return sortedPlayers.map((player) => ({ ...player, position: "UNKNOWN" }));
  }

  const positions = new Map<number, PokerPosition>([[buttonSeat, "BTN"]]);
  const seatsAfterButton = [
    ...sortedPlayers.slice(buttonIndex + 1),
    ...sortedPlayers.slice(0, buttonIndex),
  ];

  getPositionsAfterButton(sortedPlayers.length).forEach((position, index) => {
    const player = seatsAfterButton[index];

    if (player) {
      positions.set(player.seat, position);
    }
  });

  return sortedPlayers.map((player) => ({
    ...player,
    position: positions.get(player.seat) ?? "UNKNOWN",
  }));
}

function createAction(
  parsedAction: ParsedAction,
  street: PokerStreet,
  order: number,
  rawLine: string,
): HandAction {
  return {
    street,
    order,
    playerName: parsedAction.playerName,
    type: parsedAction.type,
    amount: parsedAction.amount,
    raiseTo: parsedAction.raiseTo,
    cards: parsedAction.cards,
    handDescription: parsedAction.handDescription,
    rawLine,
  };
}

function createBasicAction(
  playerName: string,
  type: ActionType,
  amount: number | null = null,
  raiseTo: number | null = null,
): ParsedAction {
  return {
    playerName,
    type,
    amount,
    raiseTo,
    cards: null,
    handDescription: null,
  };
}

function parsePlayerAction(line: string): ParsedAction | null {
  const blindMatch = line.match(/^(.+): posts (small blind|big blind|auto big blind) (.+)$/);

  if (blindMatch?.[1] && blindMatch[2] && blindMatch[3]) {
    const money = parseMoney(blindMatch[3]);
    let blindType: ActionType = "post_small_blind";

    if (blindMatch[2] === "big blind") {
      blindType = "post_big_blind";
    }

    if (blindMatch[2] === "auto big blind") {
      blindType = "post_auto_big_blind";
    }

    return createBasicAction(blindMatch[1], blindType, money?.amount ?? null);
  }

  const raiseMatch = line.match(/^(.+): raises (.+) to (.+)$/);

  if (raiseMatch?.[1] && raiseMatch[2] && raiseMatch[3]) {
    return createBasicAction(
      raiseMatch[1],
      "raise",
      parseMoney(raiseMatch[2])?.amount ?? null,
      parseMoney(raiseMatch[3])?.amount ?? null,
    );
  }

  const amountActionMatch = line.match(/^(.+): (calls|bets|ALLIN|RETURN) (.+)$/);

  if (amountActionMatch?.[1] && amountActionMatch[2] && amountActionMatch[3]) {
    let actionType: ActionType = "call";

    if (amountActionMatch[2] === "bets") {
      actionType = "bet";
    }

    if (amountActionMatch[2] === "ALLIN") {
      actionType = "all_in";
    }

    if (amountActionMatch[2] === "RETURN") {
      actionType = "return";
    }

    return createBasicAction(
      amountActionMatch[1],
      actionType,
      parseMoney(amountActionMatch[3])?.amount ?? null,
    );
  }

  const noAmountActionMatch = line.match(/^(.+): (folds|checks|mucks hand)$/);

  if (noAmountActionMatch?.[1] && noAmountActionMatch[2]) {
    let actionType: ActionType = "fold";

    if (noAmountActionMatch[2] === "checks") {
      actionType = "check";
    }

    if (noAmountActionMatch[2] === "mucks hand") {
      actionType = "muck";
    }

    return createBasicAction(noAmountActionMatch[1], actionType);
  }

  const showMatch = line.match(/^(.+): shows \[([^\]]+)\](?: \((.+)\))?$/);

  if (showMatch?.[1] && showMatch[2]) {
    return {
      playerName: showMatch[1],
      type: "show",
      amount: null,
      raiseTo: null,
      cards: toHoleCards(parseCards(showMatch[2])),
      handDescription: showMatch[3] ?? null,
    };
  }

  const collectMatch = line.match(/^(.+) collected (.+) from pot$/);

  if (collectMatch?.[1] && collectMatch[2]) {
    return createBasicAction(
      collectMatch[1],
      "collect",
      parseMoney(collectMatch[2])?.amount ?? null,
    );
  }

  return null;
}

function upsertShowdownEntry(
  entries: ShowdownEntry[],
  playerName: string,
  cards: readonly [Card, Card] | null,
  handDescription: string | null,
  wonAmount: number | null,
): void {
  const existingIndex = entries.findIndex((entry) => entry.playerName === playerName);
  const existingEntry = existingIndex >= 0 ? entries[existingIndex] : null;
  const nextEntry: ShowdownEntry = {
    playerName,
    cards: cards ?? existingEntry?.cards ?? null,
    handDescription: handDescription ?? existingEntry?.handDescription ?? null,
    wonAmount: wonAmount ?? existingEntry?.wonAmount ?? 0,
  };

  if (existingIndex >= 0) {
    entries[existingIndex] = nextEntry;
    return;
  }

  entries.push(nextEntry);
}

function parseSummaryShowdownLine(line: string): {
  readonly playerName: string;
  readonly cards: readonly [Card, Card] | null;
  readonly handDescription: string | null;
  readonly wonAmount: number | null;
} | null {
  const wonWithCardsMatch = line.match(
    /^Seat \d+: (.+?) showed \[([^\]]+)\] and won \(([^)]+)\)(?: with (.+))?$/,
  );

  if (wonWithCardsMatch?.[1] && wonWithCardsMatch[2] && wonWithCardsMatch[3]) {
    return {
      playerName: wonWithCardsMatch[1],
      cards: toHoleCards(parseCards(wonWithCardsMatch[2])),
      handDescription: wonWithCardsMatch[4] ?? null,
      wonAmount: parseMoney(wonWithCardsMatch[3])?.amount ?? null,
    };
  }

  const lostWithCardsMatch = line.match(/^Seat \d+: (.+?) showed \[([^\]]+)\] and lost with (.+)$/);

  if (lostWithCardsMatch?.[1] && lostWithCardsMatch[2] && lostWithCardsMatch[3]) {
    return {
      playerName: lostWithCardsMatch[1],
      cards: toHoleCards(parseCards(lostWithCardsMatch[2])),
      handDescription: lostWithCardsMatch[3],
      wonAmount: 0,
    };
  }

  const wonWithoutCardsMatch = line.match(/^Seat \d+: (.+?) won \(([^)]+)\)(?: with (.+))?$/);

  if (wonWithoutCardsMatch?.[1] && wonWithoutCardsMatch[2]) {
    return {
      playerName: wonWithoutCardsMatch[1],
      cards: null,
      handDescription: wonWithoutCardsMatch[3] ?? null,
      wonAmount: parseMoney(wonWithoutCardsMatch[2])?.amount ?? null,
    };
  }

  return null;
}

function getStreetContribution(
  contributionsByStreet: Readonly<Record<PokerStreet, Map<string, number>>>,
  street: PokerStreet,
  playerName: string,
): number {
  return contributionsByStreet[street].get(playerName) ?? 0;
}

function addStreetContribution(
  contributionsByStreet: Readonly<Record<PokerStreet, Map<string, number>>>,
  street: PokerStreet,
  playerName: string,
  amount: number,
): void {
  contributionsByStreet[street].set(
    playerName,
    roundMoney(getStreetContribution(contributionsByStreet, street, playerName) + amount),
  );
}

function recordContribution(
  action: HandAction,
  contributionsByStreet: Readonly<Record<PokerStreet, Map<string, number>>>,
): number {
  const amount = action.amount ?? 0;

  if (
    ["post_small_blind", "post_big_blind", "post_auto_big_blind", "call", "bet", "all_in"].includes(
      action.type,
    )
  ) {
    addStreetContribution(contributionsByStreet, action.street, action.playerName, amount);

    return amount;
  }

  if (action.type !== "raise") {
    return 0;
  }

  const currentContribution = getStreetContribution(
    contributionsByStreet,
    action.street,
    action.playerName,
  );
  const raiseTo = action.raiseTo ?? amount;
  const contribution = Math.max(raiseTo - currentContribution, amount, 0);

  contributionsByStreet[action.street].set(action.playerName, roundMoney(raiseTo));

  return roundMoney(contribution);
}

function createStreetActions(actions: readonly HandAction[]): StreetActions {
  return {
    preflop: actions.filter((action) => action.street === "preflop"),
    flop: actions.filter((action) => action.street === "flop"),
    turn: actions.filter((action) => action.street === "turn"),
    river: actions.filter((action) => action.street === "river"),
  };
}

export function parseHand(rawHand: string): PokerHand | null {
  const trimmedHand = rawHand.trim();
  const lines = trimmedHand
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const headerLine = lines[0];

  if (!headerLine) {
    return null;
  }

  const header = parseHeader(headerLine);

  if (!header) {
    return null;
  }

  let tableName: string | null = null;
  let maxPlayers: number | null = null;
  let buttonSeat: number | null = null;
  let board = EMPTY_BOARD;
  let currentStreet: PokerStreet = "preflop";
  let actionOrder = 0;
  let totalPot: number | null = null;
  let rake: number | null = null;
  let heroCards: readonly [Card, Card] | null = null;
  let heroContributed = 0;
  let heroCollected = 0;
  let heroReturned = 0;
  const rawPlayers: Omit<Player, "position">[] = [];
  const actions: HandAction[] = [];
  const showdownEntries: ShowdownEntry[] = [];
  const winnerNames = new Set<string>();
  const contributionsByStreet: Record<PokerStreet, Map<string, number>> = {
    preflop: new Map(),
    flop: new Map(),
    turn: new Map(),
    river: new Map(),
  };

  for (const line of lines.slice(1)) {
    const table = parseTableLine(line);

    if (table) {
      tableName = table.tableName;
      maxPlayers = table.maxPlayers;
      buttonSeat = table.buttonSeat;
      continue;
    }

    const parsedSeat = parseSeatLine(line);

    if (parsedSeat) {
      rawPlayers.push(parsedSeat);
      continue;
    }

    const streetMarker = parseStreetMarker(line, board);

    if (streetMarker) {
      board = streetMarker.board;
      currentStreet = streetMarker.street;
      continue;
    }

    if (line.startsWith("*** HOLE CARDS ***") || line.startsWith("*** SHOWDOWN ***")) {
      continue;
    }

    if (
      line.startsWith("*** SUMMARY ***") ||
      line.startsWith("Hand was run once") ||
      line.startsWith("Game ended:")
    ) {
      continue;
    }

    if (line.startsWith("SPLASH dropped")) {
      continue;
    }

    const heroCardsMatch = line.match(/^Dealt to Hero \[([^\]]+)\]$/);

    if (heroCardsMatch?.[1]) {
      heroCards = toHoleCards(parseCards(heroCardsMatch[1]));
      continue;
    }

    if (/^Dealt to /.test(line)) {
      continue;
    }

    const totalPotMatch = line.match(/^Total pot (.+?) \| Rake (.+?)(?: \| .+)?$/);

    if (totalPotMatch?.[1] && totalPotMatch[2]) {
      totalPot = parseMoney(totalPotMatch[1])?.amount ?? null;
      rake = parseMoney(totalPotMatch[2])?.amount ?? null;
      continue;
    }

    const summaryBoardMatch = line.match(/^Board \[([^\]]*)\]$/);

    if (summaryBoardMatch?.[1] !== undefined) {
      board = applyBoardCards(board, parseCards(summaryBoardMatch[1]));
      continue;
    }

    const summaryShowdown = parseSummaryShowdownLine(line);

    if (summaryShowdown) {
      upsertShowdownEntry(
        showdownEntries,
        summaryShowdown.playerName,
        summaryShowdown.cards,
        summaryShowdown.handDescription,
        summaryShowdown.wonAmount,
      );

      if (summaryShowdown.wonAmount && summaryShowdown.wonAmount > 0) {
        winnerNames.add(summaryShowdown.playerName);
      }

      continue;
    }

    const parsedAction = parsePlayerAction(line);

    if (!parsedAction) {
      continue;
    }

    const action = createAction(parsedAction, currentStreet, actionOrder, line);
    actionOrder += 1;
    actions.push(action);

    const contribution = recordContribution(action, contributionsByStreet);

    if (action.playerName === "Hero") {
      if (contribution > 0) {
        heroContributed = roundMoney(heroContributed + contribution);
      }

      if (action.type === "return" && action.amount) {
        heroReturned = roundMoney(heroReturned + action.amount);
      }

      if (action.type === "collect" && action.amount) {
        heroCollected = roundMoney(heroCollected + action.amount);
      }
    }

    if (action.type === "show") {
      upsertShowdownEntry(
        showdownEntries,
        action.playerName,
        action.cards,
        action.handDescription,
        null,
      );
    }

    if (action.type === "collect" && action.amount !== null) {
      upsertShowdownEntry(showdownEntries, action.playerName, null, null, action.amount);
      winnerNames.add(action.playerName);
    }
  }

  const players = assignPositions(rawPlayers, buttonSeat);
  const hero = players.find((player) => player.isHero);
  const showdown: Showdown | null =
    showdownEntries.length > 0 || winnerNames.size > 0
      ? {
          entries: showdownEntries,
          winnerNames: [...winnerNames],
        }
      : null;

  return {
    id: header.handId,
    handId: header.handId,
    rawText: trimmedHand,
    gameType: "NLH",
    gameFormat: "cash",
    date: header.date,
    tableName,
    maxPlayers,
    buttonSeat,
    stakes: header.stakes,
    players,
    heroName: "Hero",
    heroSeat: hero?.seat ?? null,
    heroCards,
    heroPosition: hero?.position ?? "UNKNOWN",
    actions,
    streetActions: createStreetActions(actions),
    board,
    showdown,
    totalPot,
    rake,
    heroNetResult: roundMoney(heroCollected + heroReturned - heroContributed),
  };
}
