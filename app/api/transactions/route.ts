import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    const [history]: any = await db.query(
      `
      (
        SELECT
          id,
          type,
          amount,
          'approved' AS status,
          created_at
        FROM transactions
        WHERE user_id = ?
      )

      UNION ALL

      (
        SELECT
          id,
          'deposit' AS type,
          amount,
          status,
          created_at
        FROM deposit_requests
        WHERE user_id = ?
          AND status = 'pending'
      )

      UNION ALL

      (
        SELECT
          id,
          'withdraw' AS type,
          amount,
          status,
          created_at
        FROM withdraw_requests
        WHERE user_id = ?
          AND status = 'pending'
      )

      ORDER BY created_at DESC
      `,
      [userId, userId, userId]
    );

    return NextResponse.json({
      success: true,
      transactions: history,
    });

  } catch (error) {
    console.error("TRANSACTION HISTORY ERROR:", error);

    return NextResponse.json({
      success: false,
      transactions: [],
    });
  }
}