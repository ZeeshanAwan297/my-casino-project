import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }
    
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid Password",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
      },
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}