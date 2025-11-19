import { NextRequest, NextResponse } from "next/server";
import { BloomGlobalPrompt, DEFAULT_BLOOM_GLOBAL_PROMPT } from "@/types";
import dbConnect from "@/lib/db/mongodb";
import BloomGlobalPromptModel from "@/models/BloomGlobalPrompt";
import { verifyToken, hasRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Check authentication and role
  const decoded = verifyToken(request);
  if (!decoded) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only super_admin can access prompt routes
  if (!hasRole(decoded.role, "super_admin")) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const ageGroup =
      (searchParams.get("ageGroup") as
        | "adolescence"
        | "young-adult"
        | "adult"
        | "middle-age"
        | null) || "adult";

    // Try to find existing prompt for this age group
    let prompt = await BloomGlobalPromptModel.findOne({
      id: `bloom-global-prompt-v1-${ageGroup}`,
    });

    // If no prompt exists, create one with default values
    if (!prompt) {
      prompt = new BloomGlobalPromptModel({
        ...DEFAULT_BLOOM_GLOBAL_PROMPT,
        ageGroup,
        id: `bloom-global-prompt-v1-${ageGroup}`,
        slug: `bloom-global-prompt-${ageGroup}`,
      });
      await prompt.save();
    }

    return NextResponse.json(prompt.toObject());
  } catch (error) {
    console.error("Error fetching Bloom Global Prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt configuration" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Check authentication and role
  const decoded = verifyToken(request);
  if (!decoded) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only super_admin can access prompt routes
  if (!hasRole(decoded.role, "super_admin")) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  try {
    await dbConnect();

    const body = await request.json();

    // Validate the request body
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Update the prompt with the new data
    const updatedData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Find and update the existing prompt, or create a new one
    const prompt = await BloomGlobalPromptModel.findOneAndUpdate(
      { id: body.id },
      updatedData,
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    return NextResponse.json({
      success: true,
      message: "Bloom Global Prompt updated successfully",
      data: prompt.toObject(),
    });
  } catch (error) {
    console.error("Error updating Bloom Global Prompt:", error);
    return NextResponse.json(
      { error: "Failed to update prompt configuration" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Check authentication and role
  const decoded = verifyToken(request);
  if (!decoded) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only super_admin can access prompt routes
  if (!hasRole(decoded.role, "super_admin")) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  try {
    await dbConnect();

    const body = await request.json();

    // Reset to default prompt
    if (body.reset === true) {
      const ageGroup =
        (body.ageGroup as
          | "adolescence"
          | "young-adult"
          | "adult"
          | "middle-age"
          | undefined) || "adult";
      const resetData = {
        ...DEFAULT_BLOOM_GLOBAL_PROMPT,
        ageGroup,
        id: `bloom-global-prompt-v1-${ageGroup}`,
        slug: `bloom-global-prompt-${ageGroup}`,
        updatedAt: new Date().toISOString(),
      };

      const prompt = await BloomGlobalPromptModel.findOneAndUpdate(
        { id: resetData.id },
        resetData,
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );

      return NextResponse.json({
        success: true,
        message: "Bloom Global Prompt reset to default",
        data: prompt.toObject(),
      });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Error resetting Bloom Global Prompt:", error);
    return NextResponse.json(
      { error: "Failed to reset prompt configuration" },
      { status: 500 }
    );
  }
}
