import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import BloomGlobalPromptModel from "@/models/BloomGlobalPrompt";
import { createSystemPrompt } from "@/lib/systemPromptUtils";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ageGroup =
      (searchParams.get("ageGroup") as
        | "adolescence"
        | "young_adult"
        | "adult"
        | "middle_age"
        | null) || "adult";

    // Get the current prompt for age group from database
    const prompt = await BloomGlobalPromptModel.findOne({
      id: `bloom-global-prompt-v1-${ageGroup}`,
    });

    if (!prompt) {
      return NextResponse.json(
        { error: "Bloom Global Prompt not found" },
        { status: 404 }
      );
    }

    // Generate the system prompt
    const systemPrompt = createSystemPrompt(prompt.toObject());

    return NextResponse.json({
      success: true,
      data: {
        systemPrompt,
        promptId: prompt.id,
        version: prompt.version,
        updatedAt: prompt.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error generating system prompt:", error);
    return NextResponse.json(
      { error: "Failed to generate system prompt" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { promptId, saveToFile } = body;

    // Get the prompt by ID (default to bloom-global-prompt-v1 if not provided)
    const prompt = await BloomGlobalPromptModel.findOne({
      id: promptId || "bloom-global-prompt-v1",
    });

    if (!prompt) {
      return NextResponse.json(
        { error: "Bloom Global Prompt not found" },
        { status: 404 }
      );
    }

    // Generate the system prompt
    const systemPrompt = createSystemPrompt(prompt.toObject());

    // If saveToFile is true, you could implement file saving logic here
    if (saveToFile) {
      // In a real application, you might save this to a file
      console.log("System prompt generated and ready to save to file");
    }

    return NextResponse.json({
      success: true,
      data: {
        systemPrompt,
        promptId: prompt.id,
        version: prompt.version,
        updatedAt: prompt.updatedAt,
        savedToFile: saveToFile || false,
      },
    });
  } catch (error) {
    console.error("Error generating system prompt:", error);
    return NextResponse.json(
      { error: "Failed to generate system prompt" },
      { status: 500 }
    );
  }
}
