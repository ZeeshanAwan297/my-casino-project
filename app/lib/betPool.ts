export type Bet = {
  userId: string;
  amount: number;
  cashedOut: boolean;
  cashoutMultiplier?: number;
};

export let currentRoundBets: Bet[] = [];

export function addBet(userId: string, amount: number) {
  currentRoundBets.push({
    userId,
    amount,
    cashedOut: false,
  });
}

export function cashoutBet(userId: string, multiplier: number) {
  const bet = currentRoundBets.find((b) => b.userId === userId);
  if (bet) {
    bet.cashedOut = true;
    bet.cashoutMultiplier = multiplier;
  }
}

export function resetBets() {
  currentRoundBets = [];
}