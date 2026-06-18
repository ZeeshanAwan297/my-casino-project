import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const [notifications]: any = await db.query(
      `
      SELECT *
      FROM notifications
      WHERE user_id = ?
      ORDER BY id DESC
      `,
      [userId]
    );

    return NextResponse.json({
      success: true,
      notifications,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}