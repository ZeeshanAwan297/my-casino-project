import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const {
      userId,
      method,
      bankName,
      amount,
      accountNumber,
      accountName,
    } = await req.json();

    if (
      !userId ||
      !method ||
      !amount ||
      !accountNumber ||
      !accountName
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    const [users]: any = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    if (
      Number(amount) > Number(user.balance)
    ) {
      return NextResponse.json({
        success: false,
        message:
          "Insufficient Wallet Balance",
      });
    }

    await db.query(
      `INSERT INTO withdraw_requests
      (
        user_id,
        method,
        bank_name,
        amount,
        account_number,
        account_name
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        method,
        bankName || null,
        amount,
        accountNumber,
        accountName,
      ]
    );

    return NextResponse.json({
      success: true,
      message:
        "Withdraw Request Submitted",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}