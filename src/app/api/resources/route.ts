import { NextRequest, NextResponse } from "next/server";
import Resource from "@/models/Resource";
import dbConnect from "@/lib/db/mongodb";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const isActive = searchParams.get("isActive");

    const filter: any = {};
    if (type) filter.type = type;
    if (isActive !== null) {
      filter.isActive = isActive === "true";
    }

    const resources = await Resource.find(filter)
      .sort({ updatedAt: -1 })
      .populate("uploadedBy", "name email")
      .lean();

    return NextResponse.json(
      { success: true, data: resources },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET resources error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error fetching resources" },
      { status: 500 }
    );
  }
}
