import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const [users]: any = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const user = users[0];

    const newBalance =
      Number(user.balance) + Number(amount);

    await db.query(
      "UPDATE users SET balance = ? WHERE id = ?",
      [newBalance, userId]
    );

    await db.query(
      "INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)",
      [userId, "deposit", amount]
    );

    return NextResponse.json({
      success: true,
      message: "Deposit successful",
      balance: newBalance,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}