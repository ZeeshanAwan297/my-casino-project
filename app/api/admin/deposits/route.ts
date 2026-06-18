import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function GET() {
  try {
    const [rows]: any = await db.query(
      `
      SELECT *
      FROM deposit_requests
      ORDER BY id DESC
      `
    );

    return NextResponse.json({
      success: true,
      deposits: rows,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}