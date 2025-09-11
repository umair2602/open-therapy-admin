"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, RateLimit } from "@/types";

interface ControlSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ControlSection({
  prompt,
  updatePrompt,
}: ControlSectionProps) {
  const [newRateLimit, setNewRateLimit] = useState({
    id: "",
    type: "",
    limit: 0,
    window: "",
    enabled: true,
  });

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["control"],
    value: string | RateLimit[]
  ) => {
    updatePrompt({
      control: {
        ...prompt.control,
        [field]: value,
      },
    });
  };

  const addRateLimit = () => {
    if (!newRateLimit.id || !newRateLimit.type || !newRateLimit.window) return;
    updatePrompt({
      control: {
        ...prompt.control,
        optionalRateLimits: [
          ...(prompt.control.optionalRateLimits || []),
          newRateLimit,
        ],
      },
    });
    setNewRateLimit({ id: "", type: "", limit: 0, window: "", enabled: true });
  };

  const removeRateLimit = (index: number) => {
    updatePrompt({
      control: {
        ...prompt.control,
        optionalRateLimits:
          prompt.control.optionalRateLimits?.filter((_, i) => i !== index) ||
          [],
      },
    });
  };

  const updateRateLimit = (
    index: number,
    field: keyof RateLimit,
    value: string | number | boolean
  ) => {
    const updated =
      prompt.control.optionalRateLimits?.map((limit, i) =>
        i === index ? { ...limit, [field]: value } : limit
      ) || [];
    updatePrompt({
      control: {
        ...prompt.control,
        optionalRateLimits: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crisis Protocol
          </label>
          <input
            type="text"
            value={prompt.control.crisisProtocol}
            onChange={(e) =>
              handleInputChange("crisisProtocol", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="CRISIS_PROTOCOL_ACTIVE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Tone
          </label>
          <select
            value={prompt.control.profileTone}
            onChange={(e) => handleInputChange("profileTone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="warm_professional">Warm Professional</option>
            <option value="casual_friendly">Casual Friendly</option>
            <option value="clinical_formal">Clinical Formal</option>
            <option value="empathetic_supportive">Empathetic Supportive</option>
          </select>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Optional Rate Limits
        </h4>
        <div className="space-y-3">
          {prompt.control.optionalRateLimits?.map((limit, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="text"
                value={limit.id}
                onChange={(e) => updateRateLimit(index, "id", e.target.value)}
                placeholder="Limit ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={limit.type}
                onChange={(e) => updateRateLimit(index, "type", e.target.value)}
                placeholder="Type"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={limit.limit}
                onChange={(e) =>
                  updateRateLimit(index, "limit", parseInt(e.target.value) || 0)
                }
                placeholder="Limit"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={limit.window}
                onChange={(e) =>
                  updateRateLimit(index, "window", e.target.value)
                }
                placeholder="Window"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={limit.enabled}
                  onChange={(e) =>
                    updateRateLimit(index, "enabled", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>
              <button
                onClick={() => removeRateLimit(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="text"
              value={newRateLimit.id}
              onChange={(e) =>
                setNewRateLimit({ ...newRateLimit, id: e.target.value })
              }
              placeholder="Limit ID"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newRateLimit.type}
              onChange={(e) =>
                setNewRateLimit({ ...newRateLimit, type: e.target.value })
              }
              placeholder="Type"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={newRateLimit.limit}
              onChange={(e) =>
                setNewRateLimit({
                  ...newRateLimit,
                  limit: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Limit"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newRateLimit.window}
              onChange={(e) =>
                setNewRateLimit({ ...newRateLimit, window: e.target.value })
              }
              placeholder="Window"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addRateLimit}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
