"use client";

import { BloomGlobalPrompt } from "@/types";

interface OperationalNotesSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function OperationalNotesSection({
  prompt,
  updatePrompt,
}: OperationalNotesSectionProps) {
  const handleInputChange = (
    field: keyof BloomGlobalPrompt["operationalNotes"],
    value: string
  ) => {
    updatePrompt({
      operationalNotes: {
        ...prompt.operationalNotes,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reply When Asked "More"
        </label>
        <textarea
          value={prompt.operationalNotes.replyWhenAskedMore}
          onChange={(e) =>
            handleInputChange("replyWhenAskedMore", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I'd be happy to explore that further. What specific aspect would you like to discuss?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reply When Asked "Summary"
        </label>
        <textarea
          value={prompt.operationalNotes.replyWhenAskedSummary}
          onChange={(e) =>
            handleInputChange("replyWhenAskedSummary", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Let me reflect back what I've heard: [summary]. Does this capture what you've shared?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reply When User Doesn't Want to Go Deeper
        </label>
        <textarea
          value={prompt.operationalNotes.replyWhenUserDoesntWantToGoDeeper}
          onChange={(e) =>
            handleInputChange(
              "replyWhenUserDoesntWantToGoDeeper",
              e.target.value
            )
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I respect your boundaries. We can stay at this level or explore something else that feels comfortable for you."
        />
      </div>
    </div>
  );
}
