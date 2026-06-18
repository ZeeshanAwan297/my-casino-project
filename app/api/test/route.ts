import { NextResponse } from "next/server";
import { db } from "@/app/lib/mysql";

export async function GET() {
  try {
    await db.query("SELECT 1");

    return NextResponse.json({
      success: true,
      message: "MySQL Connected Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "MySQL Connection Failed",
    });
  }
}