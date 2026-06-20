import { currentRoundBets } from "./betPool";
import { db } from "@/app/lib/mysql";

export async function distributeWinnings(multiplier: number) {
  for (const bet of currentRoundBets) {
    if (bet.cashedOut) continue;

    const win = bet.amount * multiplier;

    await db.query(
      "UPDATE users SET balance = balance + ? WHERE id=?",
      [win, bet.userId]
    );
  }
}