import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Resource from "@/models/Resource";
import dbConnect from "@/lib/db/mongodb";

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
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "other";
    const uploadedBy = formData.get("uploadedBy") as string | null;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Only allow PDF or text-like files
    if (
      !file.type ||
      (!file.type.includes("pdf") &&
        !file.type.includes("text") &&
        !file.type.includes("word"))
    ) {
      return NextResponse.json(
        { message: "Invalid file type. Only document files are allowed." },
        { status: 400 }
      );
    }

    const bucket = getRequiredEnv("AWS_S3_BUCKET");
    const region = getRequiredEnv("AWS_REGION");

    const arrayBuffer = await file.arrayBuffer();
    const bodyBuffer = Buffer.from(arrayBuffer);

    const safeName = file.name.replace(/\s+/g, "_");
    const key = `resources/${Date.now()}-${Math.random()
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
      ACL: "public-read",
    } as any);

    await s3.send(command);

    const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    // Save metadata to MongoDB
    const resource = await Resource.create({
      name: file.name,
      type,
      fileUrl,
      mimeType: file.type,
      size: file.size,
      uploadedBy,
      isActive: true,
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error: any) {
    console.error("Resource upload error:", error);
    return NextResponse.json(
      { message: error.message || "File upload failed" },
      { status: 500 }
    );
  }
}
