import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";
import { cashoutBet } from "@/app/lib/betPool";

export async function POST(req: Request) {
  const { userId, multiplier } = await req.json();

  const [rows]: any = await db.query(
    "SELECT balance FROM users WHERE id=?",
    [userId]
  );

  const betAmount = 10; // (temporary demo, later dynamic)

  const win = betAmount * multiplier;

  await db.query(
    "UPDATE users SET balance = balance + ? WHERE id=?",
    [win, userId]
  );

  cashoutBet(userId, multiplier);

  return NextResponse.json({
    success: true,
    win,
  });
}