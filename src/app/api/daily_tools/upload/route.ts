import { NextRequest, NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { mkdir, stat } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

async function ensureDir(dirPath: string) {
  try {
    await stat(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await ensureDir(uploadsDir);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = path.extname(file.name) || ".mp3";
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${ext}`;
    const targetPath = path.join(uploadsDir, filename);

    await new Promise<void>((resolve, reject) => {
      const stream = createWriteStream(targetPath);
      stream.on("error", reject);
      stream.on("finish", () => resolve());
      stream.write(buffer);
      stream.end();
    });

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "File upload failed" },
      { status: 500 }
    );
  }
}
