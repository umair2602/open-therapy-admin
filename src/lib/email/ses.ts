import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize SES client using existing AWS credentials
const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_OT || "",
    secretAccessKey: process.env.AWS_SECRET_KEY_OT || "",
  },
});

interface TrialWelcomeEmailParams {
  toEmail: string;
  username: string;
  trialEndDate: string;
}

/**
 * Send a welcome email to users who have been granted free trial access
 */
export async function sendTrialWelcomeEmail({
  toEmail,
  username,
  trialEndDate,
}: TrialWelcomeEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required environment variables
    if (!process.env.AWS_SES_FROM_EMAIL) {
      throw new Error("AWS_SES_FROM_EMAIL environment variable is not set");
    }

    if (!process.env.AWS_ACCESS_KEY_OT || !process.env.AWS_SECRET_KEY_OT) {
      throw new Error("AWS credentials are not configured");
    }

    // Format the trial end date
    const formattedEndDate = new Date(trialEndDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Email subject
    const subject = "🎉 Welcome to Your 30-Day Free Trial!";

    // HTML email body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
    .highlight {
      background: #fef3c7;
      padding: 15px;
      border-left: 4px solid #f59e0b;
      border-radius: 4px;
      margin: 20px 0;
    }
    .feature-list {
      list-style: none;
      padding: 0;
    }
    .feature-list li {
      padding: 8px 0;
      padding-left: 30px;
      position: relative;
    }
    .feature-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to Open Therapy!</h1>
  </div>
  
  <div class="content">
    <p>Hi <strong>${username}</strong>,</p>
    
    <p>Great news! You've been granted <strong>30 days of free trial access</strong> to Open Therapy. We're excited to have you on board!</p>
    
    <div class="highlight">
      <strong>📅 Your trial period:</strong><br>
      Expires on <strong>${formattedEndDate}</strong>
    </div>
    
    <h2 style="color: #667eea; margin-top: 30px;">What's Included:</h2>
    <ul class="feature-list">
      <li>Full access to all therapy tools and resources</li>
      <li>Personalized emotional tracking and insights</li>
      <li>AI-powered mental health support</li>
      <li>Daily wellness exercises and prompts</li>
      <li>Crisis support resources</li>
    </ul>
    
    <p style="margin-top: 30px;">Make the most of your trial by exploring all the features we have to offer. If you have any questions or need assistance, our support team is here to help!</p>
    
    <p style="margin-top: 30px;">Best regards,<br>
    <strong>The Open Therapy Team</strong></p>
  </div>
  
  <div class="footer">
    <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
    <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Open Therapy. All rights reserved.</p>
  </div>
</body>
</html>
    `;

    // Plain text version for email clients that don't support HTML
    const textBody = `
Hi ${username},

Great news! You've been granted 30 days of free trial access to Open Therapy. We're excited to have you on board!

Your trial period expires on ${formattedEndDate}.

What's Included:
✓ Full access to all therapy tools and resources
✓ Personalized emotional tracking and insights
✓ AI-powered mental health support
✓ Daily wellness exercises and prompts
✓ Crisis support resources

Make the most of your trial by exploring all the features we have to offer. If you have any questions or need assistance, our support team is here to help!

Best regards,
The Open Therapy Team

---
This is an automated message. Please do not reply to this email.
© ${new Date().getFullYear()} Open Therapy. All rights reserved.
    `;

    // Create the email command
    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: "UTF-8",
          },
          Text: {
            Data: textBody,
            Charset: "UTF-8",
          },
        },
      },
    });

    // Send the email
    const response = await sesClient.send(command);
    
    console.log("✅ Trial welcome email sent successfully:", {
      messageId: response.MessageId,
      toEmail,
      username,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error sending trial welcome email:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
