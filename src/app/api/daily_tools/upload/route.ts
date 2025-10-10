import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
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

    const bucket = getRequiredEnv("AWS_S3_BUCKET");
    const region = getRequiredEnv("AWS_REGION");

    const arrayBuffer = await file.arrayBuffer();
    const bodyBuffer = Buffer.from(arrayBuffer);

    const safeName = file.name.replace(/\s+/g, "_");
    const key = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${safeName}`;

    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: getRequiredEnv("AWS_ACCESS_KEY_OT"),
        secretAccessKey: getRequiredEnv("AWS_SECRET_KEY_OT"),
      },
    });
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bodyBuffer,
      ContentType: file.type || "application/octet-stream",
    });

    await s3.send(command);

    const publicBase = process.env.AWS_S3_PUBLIC_BASE_URL;
    const publicUrl = publicBase
      ? `${publicBase}/${key}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "File upload failed" },
      { status: 500 }
    );
  }
}
