"use client";

import { BloomGlobalPrompt } from "@/types";

interface ConversationRulesSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ConversationRulesSection({
  prompt,
  updatePrompt,
}: ConversationRulesSectionProps) {
  const handleInputChange = (
    field: keyof BloomGlobalPrompt["conversationRules"],
    value: string | number | boolean
  ) => {
    updatePrompt({
      conversationRules: {
        ...prompt.conversationRules,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Sentences
          </label>
          <input
            type="number"
            value={prompt.conversationRules.maxSentences}
            onChange={(e) =>
              handleInputChange("maxSentences", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Characters
          </label>
          <input
            type="number"
            value={prompt.conversationRules.maxChars}
            onChange={(e) =>
              handleInputChange("maxChars", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="100"
            max="2000"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">
          Conversation Behavior
        </h4>

        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={prompt.conversationRules.oneQuestionPerReply}
              onChange={(e) =>
                handleInputChange("oneQuestionPerReply", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              One question per reply
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={prompt.conversationRules.offerMicroActionOptional}
              onChange={(e) =>
                handleInputChange("offerMicroActionOptional", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              Offer micro action (optional)
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={prompt.conversationRules.chunkedDelivery}
              onChange={(e) =>
                handleInputChange("chunkedDelivery", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">Chunked delivery</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={prompt.conversationRules.askFeedback}
              onChange={(e) =>
                handleInputChange("askFeedback", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">Ask for feedback</span>
          </label>
        </div>
      </div>
    </div>
  );
}
