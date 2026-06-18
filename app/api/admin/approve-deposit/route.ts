import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    const [rows]: any = await db.query(
      `
      SELECT *
      FROM deposit_requests
      WHERE id = ?
      `,
      [requestId]
    );

    if (rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Request not found",
      });
    }

    const request = rows[0];

    if (request.status === "approved") {
      return NextResponse.json({
        success: false,
        message: "Already approved",
      });
    }

    // ✅ Update User Balance
    await db.query(
      `
      UPDATE users
      SET balance = balance + ?
      WHERE id = ?
      `,
      [
        Number(request.amount),
        Number(request.user_id),
      ]
    );

    // ✅ Add Notification
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
        request.user_id,
        "Deposit Approved",
        `Your deposit of Rs ${request.amount} has been approved successfully.`,
      ]
    );

    // ✅ Add Transaction Record
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
        request.user_id,
        "deposit",
        request.amount,
      ]
    );

    // ✅ Mark Deposit Request Approved
    await db.query(
      `
      UPDATE deposit_requests
      SET status = 'approved'
      WHERE id = ?
      `,
      [requestId]
    );

    // ✅ Debug (remove later)
    const [userRows]: any = await db.query(
      `
      SELECT id, balance
      FROM users
      WHERE id = ?
      `,
      [request.user_id]
    );

    console.log(
      "User:",
      request.user_id,
      "New Balance:",
      userRows?.[0]?.balance
    );

    return NextResponse.json({
      success: true,
      message: "Deposit Approved",
      balance: userRows?.[0]?.balance ?? 0,
    });

  } catch (error) {
    console.error("APPROVE DEPOSIT ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}