function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export interface MoneyWithBBFormat {
  readonly bb: string;
  readonly currency: string;
}

export type PokerResultSign = "positive" | "negative" | "neutral";

export interface PokerResultFormat {
  readonly bbLabel: string;
  readonly currencyLabel: string;
  readonly sign: PokerResultSign;
}

export function formatCurrency(amount: number): string {
  return `₮${formatNumber(amount)}`;
}

export function formatBB(
  amount: number,
  bigBlind: number,
  options: Readonly<{ signed?: boolean }> = {},
): string {
  if (bigBlind <= 0) {
    return "- BB";
  }

  const sign = options.signed === true && amount > 0 ? "+" : "";

  return `${sign}${formatNumber(amount / bigBlind)} BB`;
}

export function formatBigBlindCount(
  bigBlinds: number,
  options: Readonly<{ signed?: boolean }> = {},
): string {
  const sign = options.signed === true && bigBlinds > 0 ? "+" : "";

  return `${sign}${formatNumber(bigBlinds)} BB`;
}

export function formatBBAmount(
  amount: number,
  bigBlind: number,
  options: Readonly<{ signed?: boolean }> = {},
): string {
  return formatBB(amount, bigBlind, options);
}

export function getPokerResultSign(amount: number): PokerResultSign {
  if (amount > 0) {
    return "positive";
  }

  if (amount < 0) {
    return "negative";
  }

  return "neutral";
}

export function formatPokerResult(
  amount: number,
  bigBlind: number,
  options: Readonly<{ signed?: boolean }> = { signed: true },
): PokerResultFormat {
  return {
    bbLabel: formatBB(amount, bigBlind, options),
    currencyLabel: formatCurrency(amount),
    sign: getPokerResultSign(amount),
  };
}

export function formatMoneyWithBB(
  amount: number,
  bigBlind: number,
  options: Readonly<{ signed?: boolean }> = {},
): MoneyWithBBFormat {
  const result = formatPokerResult(amount, bigBlind, options);

  return {
    bb: result.bbLabel,
    currency: result.currencyLabel,
  };
}
