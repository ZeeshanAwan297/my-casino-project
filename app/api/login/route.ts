import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/app/lib/mysql";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [users]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

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
      }
   } ) 
    
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Login Failed",
    });
  }
}