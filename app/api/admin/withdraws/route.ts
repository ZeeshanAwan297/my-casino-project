import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function GET() {
  try {
    const [withdraws]: any = await db.query(
      `SELECT * FROM withdraw_requests
       ORDER BY id DESC`
    );

    return NextResponse.json({
      success: true,
      withdraws,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}