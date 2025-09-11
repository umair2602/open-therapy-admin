import { NextRequest, NextResponse } from "next/server";
import { BloomGlobalPrompt, DEFAULT_BLOOM_GLOBAL_PROMPT } from "@/types";

// In a real application, this would be stored in a database
// For now, we'll use a simple in-memory store
let currentPrompt: BloomGlobalPrompt = DEFAULT_BLOOM_GLOBAL_PROMPT;

export async function GET() {
  try {
    return NextResponse.json(currentPrompt);
  } catch (error) {
    console.error("Error fetching Bloom Global Prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt configuration" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Update the prompt with the new data
    currentPrompt = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Bloom Global Prompt updated successfully",
      data: currentPrompt,
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
  try {
    const body = await request.json();

    // Reset to default prompt
    if (body.reset === true) {
      currentPrompt = DEFAULT_BLOOM_GLOBAL_PROMPT;
      return NextResponse.json({
        success: true,
        message: "Bloom Global Prompt reset to default",
        data: currentPrompt,
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
