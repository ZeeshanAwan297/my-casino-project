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
      trxId,
      screenshot,
    } = await req.json();

    await db.query(
      `INSERT INTO deposit_requests
      (
        user_id,
        method,
        bank_name,
        amount,
        account_number,
        account_name,
        trx_id,
        screenshot
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        method,
        bankName,
        amount,
        accountNumber,
        accountName,
        trxId,
        screenshot,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Deposit Request Submitted",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}