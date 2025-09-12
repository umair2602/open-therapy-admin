import { BloomGlobalPrompt } from "@/types";
import { generateSystemPrompt } from "./generateSystemPrompt";

/**
 * Generate a system prompt string from a BloomGlobalPrompt object
 * @param prompt - The BloomGlobalPrompt object from the database
 * @returns The formatted system prompt string
 */
export function createSystemPrompt(prompt: BloomGlobalPrompt): string {
  return generateSystemPrompt(prompt);
}

/**
 * Generate a system prompt and save it to a file (for development/testing)
 * @param prompt - The BloomGlobalPrompt object from the database
 * @param filePath - Optional file path to save the prompt
 * @returns The formatted system prompt string
 */
export function createSystemPromptFile(
  prompt: BloomGlobalPrompt,
  filePath?: string
): string {
  const systemPrompt = generateSystemPrompt(prompt);

  if (filePath) {
    // In a real application, you might want to save this to a file
    // For now, we'll just return the string
    console.log(`System prompt generated and would be saved to: ${filePath}`);
  }

  return systemPrompt;
}

/**
 * Get system prompt for a specific prompt ID
 * @param promptId - The ID of the prompt to generate
 * @returns Promise<string> - The generated system prompt
 */
export async function getSystemPromptById(promptId: string): Promise<string> {
  try {
    // This would typically fetch from your database
    // For now, we'll return a placeholder
    throw new Error("This function requires database integration");
  } catch (error) {
    console.error("Error generating system prompt:", error);
    throw error;
  }
}
