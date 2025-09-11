"use client";

import { BloomGlobalPrompt } from "@/types";

interface FixedMessagesSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function FixedMessagesSection({
  prompt,
  updatePrompt,
}: FixedMessagesSectionProps) {
  const handleInputChange = (
    field: keyof BloomGlobalPrompt["fixedMessages"],
    value: string
  ) => {
    updatePrompt({
      fixedMessages: {
        ...prompt.fixedMessages,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Welcome Message
        </label>
        <textarea
          value={prompt.fixedMessages.welcome}
          onChange={(e) => handleInputChange("welcome", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Welcome to your safe space. I'm here to listen and support you. How are you feeling today?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Closing Message
        </label>
        <textarea
          value={prompt.fixedMessages.closing}
          onChange={(e) => handleInputChange("closing", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Thank you for sharing with me today. Remember, you're not alone in this journey. Take care of yourself."
        />
      </div>
    </div>
  );
}
