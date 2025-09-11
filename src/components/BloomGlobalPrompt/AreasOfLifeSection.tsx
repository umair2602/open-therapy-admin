"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, EmotionOpeningMapping } from "@/types";

interface AreasOfLifeSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function AreasOfLifeSection({
  prompt,
  updatePrompt,
}: AreasOfLifeSectionProps) {
  const [newArea, setNewArea] = useState("");
  const [newMood, setNewMood] = useState("");
  const [newMapping, setNewMapping] = useState({
    emotion: "",
    opening: "",
    enabled: true,
  });

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["areasOfLifeAndDiary"],
    value: string | string[] | EmotionOpeningMapping[]
  ) => {
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        [field]: value,
      },
    });
  };

  const addArea = () => {
    if (!newArea.trim()) return;
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        supportedAreas: [
          ...prompt.areasOfLifeAndDiary.supportedAreas,
          newArea.trim(),
        ],
      },
    });
    setNewArea("");
  };

  const removeArea = (index: number) => {
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        supportedAreas: prompt.areasOfLifeAndDiary.supportedAreas.filter(
          (_, i) => i !== index
        ),
      },
    });
  };

  const addMood = () => {
    if (!newMood.trim()) return;
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        supportedMoods: [
          ...prompt.areasOfLifeAndDiary.supportedMoods,
          newMood.trim(),
        ],
      },
    });
    setNewMood("");
  };

  const removeMood = (index: number) => {
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        supportedMoods: prompt.areasOfLifeAndDiary.supportedMoods.filter(
          (_, i) => i !== index
        ),
      },
    });
  };

  const addMapping = () => {
    if (!newMapping.emotion || !newMapping.opening) return;
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        emotionToOpeningMapping: [
          ...prompt.areasOfLifeAndDiary.emotionToOpeningMapping,
          newMapping,
        ],
      },
    });
    setNewMapping({ emotion: "", opening: "", enabled: true });
  };

  const removeMapping = (index: number) => {
    updatePrompt({
      areasOfLifeAndDiary: {
        ...prompt.areasOfLifeAndDiary,
        emotionToOpeningMapping:
          prompt.areasOfLifeAndDiary.emotionToOpeningMapping.filter(
            (_, i) => i !== index
          ),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Directory Path
          </label>
          <input
            type="text"
            value={prompt.areasOfLifeAndDiary.directoryPath}
            onChange={(e) => handleInputChange("directoryPath", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="/life-areas"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Naming Pattern
          </label>
          <input
            type="text"
            value={prompt.areasOfLifeAndDiary.fileNamingPattern}
            onChange={(e) =>
              handleInputChange("fileNamingPattern", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="{area}_{mood}_{date}.json"
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Supported Areas
        </h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {prompt.areasOfLifeAndDiary.supportedAreas.map((area, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {area}
              <button
                onClick={() => removeArea(index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Add new area"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addArea}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Supported Moods
        </h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {prompt.areasOfLifeAndDiary.supportedMoods.map((mood, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {mood}
              <button
                onClick={() => removeMood(index)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMood}
            onChange={(e) => setNewMood(e.target.value)}
            placeholder="Add new mood"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addMood}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Emotion to Opening Mapping
        </h4>
        <div className="space-y-3">
          {prompt.areasOfLifeAndDiary.emotionToOpeningMapping.map(
            (mapping, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={mapping.emotion}
                  placeholder="Emotion"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
                <input
                  type="text"
                  value={mapping.opening}
                  placeholder="Opening text"
                  className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mapping.enabled}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    readOnly
                  />
                </label>
                <button
                  onClick={() => removeMapping(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            )
          )}

          <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="text"
              value={newMapping.emotion}
              onChange={(e) =>
                setNewMapping({ ...newMapping, emotion: e.target.value })
              }
              placeholder="Emotion"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newMapping.opening}
              onChange={(e) =>
                setNewMapping({ ...newMapping, opening: e.target.value })
              }
              placeholder="Opening text"
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addMapping}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Integration Rule
        </label>
        <textarea
          value={prompt.areasOfLifeAndDiary.integrationRule}
          onChange={(e) => handleInputChange("integrationRule", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Always acknowledge the life area and mood before proceeding with therapeutic conversation."
        />
      </div>
    </div>
  );
}
