"use client";

import { BloomGlobalPrompt } from "@/types";

interface ContentLongPolicySectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ContentLongPolicySection({
  prompt,
  updatePrompt,
}: ContentLongPolicySectionProps) {
  const handleInputChange = (
    field: keyof BloomGlobalPrompt["contentLongPolicy"],
    value: string | number
  ) => {
    updatePrompt({
      contentLongPolicy: {
        ...prompt.contentLongPolicy,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Summary Template
        </label>
        <textarea
          value={prompt.contentLongPolicy.shortSummaryTemplate}
          onChange={(e) =>
            handleInputChange("shortSummaryTemplate", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Let me summarize what I've heard so far: [summary]. What would you like to focus on next?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detail Question
        </label>
        <textarea
          value={prompt.contentLongPolicy.detailQuestion}
          onChange={(e) => handleInputChange("detailQuestion", e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Would you like me to ask more specific questions about any of these areas?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Batch Size
        </label>
        <input
          type="number"
          value={prompt.contentLongPolicy.batchSize}
          onChange={(e) =>
            handleInputChange("batchSize", parseInt(e.target.value) || 0)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="1"
          max="10"
        />
      </div>
    </div>
  );
}
