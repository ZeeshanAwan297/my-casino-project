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

    if (request.status !== "pending") {
      return NextResponse.json({
        success: false,
        message: "Already processed",
      });
    }

    await db.query(
      `
      UPDATE deposit_requests
      SET status='rejected'
      WHERE id=?
      `,
      [requestId]
    );
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
    "Deposit Rejected",
    `Your deposit request of Rs ${request.amount} has been rejected.`
  ]
);

    return NextResponse.json({
      success: true,
      message: "Deposit Rejected",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}