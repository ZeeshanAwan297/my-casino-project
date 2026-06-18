import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { withdrawId } =
      await req.json();

    if (!withdrawId) {
      return NextResponse.json({
        success: false,
        message:
          "Withdraw ID is required",
      });
    }

    const [withdraws]: any =
      await db.query(
        `SELECT * FROM withdraw_requests
         WHERE id = ?`,
        [withdrawId]
      );

    if (withdraws.length === 0) {
      return NextResponse.json({
        success: false,
        message:
          "Withdraw request not found",
      });
    }

    const withdraw =
      withdraws[0];

    if (
      withdraw.status !==
      "pending"
    ) {
      return NextResponse.json({
        success: false,
        message:
          "Request already processed",
      });
    }

    await db.query(

      `UPDATE withdraw_requests
       SET status = 'rejected'
       WHERE id = ?`,
      [withdrawId]
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
    withdraw.user_id,
    "Withdraw Rejected",
    `Your withdraw request of Rs ${withdraw.amount} has been rejected.`
  ]
);


    return NextResponse.json({
      success: true,
      message:
        "Withdraw Rejected Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}