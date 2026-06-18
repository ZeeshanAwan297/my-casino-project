import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { withdrawId } = await req.json();

    const [withdraws]: any = await db.query(
      `
      SELECT *
      FROM withdraw_requests
      WHERE id = ?
      `,
      [withdrawId]
    );

    if (withdraws.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Withdraw not found",
      });
    }

    const withdraw = withdraws[0];

    if (withdraw.status !== "pending") {
      return NextResponse.json({
        success: false,
        message: "Already processed",
      });
    }

    // Update withdraw request status
    await db.query(
      `
      UPDATE withdraw_requests
      SET status = 'approved'
      WHERE id = ?
      `,
      [withdrawId]
    );

    // Deduct balance
    await db.query(
      `
      UPDATE users
      SET balance = balance - ?
      WHERE id = ?
      `,
      [
        Number(withdraw.amount),
        Number(withdraw.user_id),
      ]
    );

    // Add transaction history
    await db.query(
      `
      INSERT INTO transactions
      (
        user_id,
        type,
        amount
      )
      VALUES (?, ?, ?)
      `,
      [
        withdraw.user_id,
        "withdraw",
        withdraw.amount,
      ]
    );

    // Add notification
    await db.query(
      `
      INSERT INTO notifications
      (
        user_id,
        title,
        message
      )
      VALUES (?, ?, ?)
      `,
      [
        withdraw.user_id,
        "Withdraw Approved",
        `Your withdrawal of Rs ${withdraw.amount} has been approved successfully.`,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Withdraw Approved Successfully",
    });

  } catch (error) {
    console.error("WITHDRAW APPROVE ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}