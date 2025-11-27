import { NextRequest, NextResponse } from "next/server";
import { sendTrialWelcomeEmail } from "@/lib/email/ses";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, trialEndDate } = body;

    // Validate required fields
    if (!email || !username || !trialEndDate) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: email, username, and trialEndDate are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Send the email
    const result = await sendTrialWelcomeEmail({
      toEmail: email,
      username,
      trialEndDate,
    });

    if (!result.success) {
      console.error("Failed to send trial welcome email:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to send email",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Trial welcome email sent successfully",
    });
  } catch (error) {
    console.error("Error in send-trial-welcome API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
