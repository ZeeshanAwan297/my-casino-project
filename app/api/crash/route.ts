import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

let gameState = {
  multiplier: 1,
  crashPoint: 0,
  running: false,
   countdownEnd: 0,
  cashedOutUsers: new Set<string>(),
};

// crash point generator (more realistic)
function generateCrashPoint() {
  const rand = Math.random();

  if (rand < 0.5) return +(1 + Math.random() * 2).toFixed(2); // 1x - 3x
  if (rand < 0.8) return +(2 + Math.random() * 4).toFixed(2); // 2x - 6x
  return +(4 + Math.random() * 8).toFixed(2); // 4x - 12x
}

// auto reset round
function resetGame() {
  gameState = {
    multiplier: 1,
    crashPoint: generateCrashPoint(),
    running: true,
    countdownEnd: 0,
    cashedOutUsers: new Set(),
  };

  // simulate multiplier growth
  const interval = setInterval(() => {
    if (!gameState.running) return clearInterval(interval);

    gameState.multiplier = +(gameState.multiplier + 0.05).toFixed(2);

    if (gameState.multiplier >= gameState.crashPoint) {
      gameState.running = false;
       gameState.countdownEnd = Date.now() + 5000;
      clearInterval(interval);

      setTimeout(resetGame, 5000); // next round after 3 sec
    }
  }, 150);
}

// start first round automatically
if (!gameState.running && gameState.crashPoint === 0) {
  resetGame();
}

export async function POST(req: Request) {
  try {
    const { action, userId, betAmount } = await req.json();

    // ======================
    // BET (JOIN ROUND)
    // ======================
    if (action === "bet") {

  // Betting sirf countdown ke dauran allow hogi
  if (!gameState.running && Date.now() > gameState.countdownEnd) {
    return NextResponse.json({
      success: false,
      message: "Betting Closed",
    });
  }

  const [rows]: any = await db.query(
    "SELECT balance FROM users WHERE id=?",
    [userId]
  );
      if (!rows.length)
        return NextResponse.json({ success: false });

      const balance = parseFloat(rows[0].balance);

      if (balance < betAmount) {
        return NextResponse.json({
          success: false,
          message: "Insufficient balance",
        });
      }

      await db.query(
        "UPDATE users SET balance = balance - ? WHERE id=?",
        [betAmount, userId]
      );

      return NextResponse.json({
        success: true,
        message: "Bet placed",
        crashPoint: gameState.crashPoint,
      });
    }

    // ======================
    // CASHOUT
    // ======================
    if (action === "cashout") {
      if (!gameState.running) {
        return NextResponse.json({
          success: false,
          message: "Round crashed",
        });
      }

      if (gameState.cashedOutUsers.has(userId)) {
        return NextResponse.json({
          success: false,
          message: "Already cashed out",
        });
      }

      const winAmount = betAmount * gameState.multiplier;

      await db.query(
        "UPDATE users SET balance = balance + ? WHERE id=?",
        [winAmount, userId]
      );

      gameState.cashedOutUsers.add(userId);

      return NextResponse.json({
        success: true,
        winAmount,
        multiplier: gameState.multiplier,
      });
    }

    // ======================
    // LIVE STATE (frontend sync)
    // ======================
    if (action === "state") {
  return NextResponse.json({
    running: gameState.running,
    multiplier: gameState.multiplier,
    crashPoint: gameState.crashPoint,
    countdownEnd: gameState.countdownEnd,
  });
}
    return NextResponse.json({
      success: false,
      message: "Invalid action",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}