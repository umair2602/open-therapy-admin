"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt } from "@/types";

interface ProgressionLayersSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ProgressionLayersSection({
  prompt,
  updatePrompt,
}: ProgressionLayersSectionProps) {
  const [newLayer, setNewLayer] = useState("");

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["progressionLayers"],
    value: string | number | string[]
  ) => {
    updatePrompt({
      progressionLayers: {
        ...prompt.progressionLayers,
        [field]: value,
      },
    });
  };

  const addLayer = () => {
    if (!newLayer.trim()) return;
    updatePrompt({
      progressionLayers: {
        ...prompt.progressionLayers,
        order: [...prompt.progressionLayers.order, newLayer.trim()],
      },
    });
    setNewLayer("");
  };

  const removeLayer = (index: number) => {
    updatePrompt({
      progressionLayers: {
        ...prompt.progressionLayers,
        order: prompt.progressionLayers.order.filter((_, i) => i !== index),
      },
    });
  };

  const moveLayer = (index: number, direction: "up" | "down") => {
    const newOrder = [...prompt.progressionLayers.order];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [
        newOrder[targetIndex],
        newOrder[index],
      ];
      updatePrompt({
        progressionLayers: {
          ...prompt.progressionLayers,
          order: newOrder,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Layer Order */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Progression Order
        </h4>
        <div className="space-y-2">
          {prompt.progressionLayers.order.map((layer, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-500 w-8">
                {index + 1}.
              </span>
              <span className="flex-1 text-gray-900">{layer}</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => moveLayer(index, "up")}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveLayer(index, "down")}
                  disabled={index === prompt.progressionLayers.order.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeLayer(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="text"
              value={newLayer}
              onChange={(e) => setNewLayer(e.target.value)}
              placeholder="Add new layer (e.g., sentir, causa, impacto, passo)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addLayer}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Layers Before Step
          </label>
          <input
            type="number"
            value={prompt.progressionLayers.minLayersBeforeStep}
            onChange={(e) =>
              handleInputChange(
                "minLayersBeforeStep",
                parseInt(e.target.value) || 0
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Questions Per Layer
          </label>
          <input
            type="number"
            value={prompt.progressionLayers.questionsPerLayer}
            onChange={(e) =>
              handleInputChange(
                "questionsPerLayer",
                parseInt(e.target.value) || 0
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirmation Text
        </label>
        <textarea
          value={prompt.progressionLayers.confirmationText}
          onChange={(e) =>
            handleInputChange("confirmationText", e.target.value)
          }
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Are you ready to move to the next step?"
        />
      </div>
    </div>
  );
}
