import { NextRequest, NextResponse } from "next/server";
import Resource from "@/models/Resource";
import "@/models/User"; // Ensure User model is registered
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

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { type, content, name } = body;

    if (!type || !content) {
      return NextResponse.json(
        { success: false, message: "Type and content are required" },
        { status: 400 }
      );
    }

    // Find existing active resource of this type
    const existingResource = await Resource.findOne({
      type,
      isActive: true,
    });

    let resource;
    if (existingResource) {
      // Update existing resource
      existingResource.content = content;
      if (name) existingResource.name = name;
      await existingResource.save();
      resource = existingResource;
    } else {
      // Create new resource
      resource = await Resource.create({
        name: name || `${type} Policy`,
        type,
        content,
        isActive: true,
      });
    }

    return NextResponse.json(
      { success: true, data: resource },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT resources error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error updating resource" },
      { status: 500 }
    );
  }
}

