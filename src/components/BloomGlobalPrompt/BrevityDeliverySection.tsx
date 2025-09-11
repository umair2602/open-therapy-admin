"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, StopTrigger } from "@/types";

interface BrevityDeliverySectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function BrevityDeliverySection({
  prompt,
  updatePrompt,
}: BrevityDeliverySectionProps) {
  const [newTrigger, setNewTrigger] = useState({
    id: "",
    type: "long_text" as const,
    description: "",
    enabled: true,
  });

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["brevityAndDelivery"],
    value: string | number | StopTrigger[]
  ) => {
    updatePrompt({
      brevityAndDelivery: {
        ...prompt.brevityAndDelivery,
        [field]: value,
      },
    });
  };

  const addTrigger = () => {
    if (!newTrigger.id || !newTrigger.description) return;
    updatePrompt({
      brevityAndDelivery: {
        ...prompt.brevityAndDelivery,
        stopTriggers: [...prompt.brevityAndDelivery.stopTriggers, newTrigger],
      },
    });
    setNewTrigger({
      id: "",
      type: "long_text",
      description: "",
      enabled: true,
    });
  };

  const removeTrigger = (index: number) => {
    updatePrompt({
      brevityAndDelivery: {
        ...prompt.brevityAndDelivery,
        stopTriggers: prompt.brevityAndDelivery.stopTriggers.filter(
          (_, i) => i !== index
        ),
      },
    });
  };

  const updateTrigger = (
    index: number,
    field: keyof StopTrigger,
    value: string | boolean
  ) => {
    const updated = prompt.brevityAndDelivery.stopTriggers.map((trigger, i) =>
      i === index ? { ...trigger, [field]: value } : trigger
    );
    updatePrompt({
      brevityAndDelivery: {
        ...prompt.brevityAndDelivery,
        stopTriggers: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Standard Reply for "Give Me Everything"
        </label>
        <textarea
          value={prompt.brevityAndDelivery.standardReplyForEverything}
          onChange={(e) =>
            handleInputChange("standardReplyForEverything", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I understand you'd like to share everything. Let's start with what's most pressing for you right now."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Items Per Block
        </label>
        <input
          type="number"
          value={prompt.brevityAndDelivery.maxItemsPerBlock}
          onChange={(e) =>
            handleInputChange("maxItemsPerBlock", parseInt(e.target.value) || 0)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="1"
          max="10"
        />
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Stop Triggers
        </h4>
        <div className="space-y-3">
          {prompt.brevityAndDelivery.stopTriggers.map((trigger, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="text"
                value={trigger.id}
                onChange={(e) => updateTrigger(index, "id", e.target.value)}
                placeholder="Trigger ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={trigger.type}
                onChange={(e) =>
                  updateTrigger(index, "type", e.target.value as any)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="long_text">Long Text</option>
                <option value="ambiguity">Ambiguity</option>
                <option value="silence">Silence</option>
              </select>
              <input
                type="text"
                value={trigger.description}
                onChange={(e) =>
                  updateTrigger(index, "description", e.target.value)
                }
                placeholder="Description"
                className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={trigger.enabled}
                  onChange={(e) =>
                    updateTrigger(index, "enabled", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>
              <button
                onClick={() => removeTrigger(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="text"
              value={newTrigger.id}
              onChange={(e) =>
                setNewTrigger({ ...newTrigger, id: e.target.value })
              }
              placeholder="Trigger ID"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={newTrigger.type}
              onChange={(e) =>
                setNewTrigger({ ...newTrigger, type: e.target.value as any })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="long_text">Long Text</option>
              <option value="ambiguity">Ambiguity</option>
              <option value="silence">Silence</option>
            </select>
            <input
              type="text"
              value={newTrigger.description}
              onChange={(e) =>
                setNewTrigger({ ...newTrigger, description: e.target.value })
              }
              placeholder="Description"
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addTrigger}
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
