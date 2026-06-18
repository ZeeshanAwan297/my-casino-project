import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const fileName =
      Date.now() + "-" + file.name;

    const filePath = path.join(
      uploadDir,
      fileName
    );

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      imagePath: "/uploads/" + fileName,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Upload failed",
    });
  }
}