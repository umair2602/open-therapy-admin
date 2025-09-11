"use client";

import { BloomGlobalPrompt } from "@/types";

interface SafetySectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function SafetySection({
  prompt,
  updatePrompt,
}: SafetySectionProps) {
  const handleInputChange = (
    field: keyof BloomGlobalPrompt["safety"],
    value: string | boolean
  ) => {
    updatePrompt({
      safety: {
        ...prompt.safety,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="text-md font-medium text-red-800 mb-2">
          ⚠️ Safety Configuration
        </h4>
        <p className="text-sm text-red-700">
          These settings control critical safety protocols. Changes should be
          made carefully and tested thoroughly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            High Risk Directory
          </label>
          <input
            type="text"
            value={prompt.safety.highRiskDirectory}
            onChange={(e) =>
              handleInputChange("highRiskDirectory", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="/safety/high-risk"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trigger File
          </label>
          <input
            type="text"
            value={prompt.safety.triggerFile}
            onChange={(e) => handleInputChange("triggerFile", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="/safety/triggers.json"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crisis Protocol File
          </label>
          <input
            type="text"
            value={prompt.safety.crisisProtocolFile}
            onChange={(e) =>
              handleInputChange("crisisProtocolFile", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="/safety/crisis-protocol.json"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={prompt.safety.blockDiagnosisPrescription}
              onChange={(e) =>
                handleInputChange(
                  "blockDiagnosisPrescription",
                  e.target.checked
                )
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              Block diagnosis/prescription
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interruption Message
        </label>
        <textarea
          value={prompt.safety.interruptionMessage}
          onChange={(e) =>
            handleInputChange("interruptionMessage", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I'm concerned about your safety. Please consider reaching out to a crisis helpline or emergency services."
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-md font-medium text-yellow-800 mb-2">
          Safety Guidelines
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Always prioritize user safety over conversation flow</li>
          <li>• Crisis protocols should be immediately accessible</li>
          <li>• Interruption messages should be clear and actionable</li>
          <li>• Regular testing of safety mechanisms is essential</li>
        </ul>
      </div>
    </div>
  );
}
