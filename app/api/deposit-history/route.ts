import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function GET(req: NextRequest) {
  try {
    const userId =
      req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID required",
      });
    }

    const [rows]: any = await db.query(
      `SELECT * FROM deposit_requests
       WHERE user_id = ?
       ORDER BY id DESC`,
      [userId]
    );

    return NextResponse.json({
      success: true,
      history: rows,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}