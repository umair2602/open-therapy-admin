"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, ProfileMapping } from "@/types";

interface ProfilePersonalizationSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ProfilePersonalizationSection({
  prompt,
  updatePrompt,
}: ProfilePersonalizationSectionProps) {
  const [newMapping, setNewMapping] = useState({
    profileId: "",
    filePath: "",
    enabled: true,
  });

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["profilePersonalization"],
    value: string | boolean | ProfileMapping[]
  ) => {
    updatePrompt({
      profilePersonalization: {
        ...prompt.profilePersonalization,
        [field]: value,
      },
    });
  };

  const addMapping = () => {
    if (!newMapping.profileId || !newMapping.filePath) return;
    updatePrompt({
      profilePersonalization: {
        ...prompt.profilePersonalization,
        fileMappingPerProfile: [
          ...prompt.profilePersonalization.fileMappingPerProfile,
          newMapping,
        ],
      },
    });
    setNewMapping({ profileId: "", filePath: "", enabled: true });
  };

  const removeMapping = (index: number) => {
    updatePrompt({
      profilePersonalization: {
        ...prompt.profilePersonalization,
        fileMappingPerProfile:
          prompt.profilePersonalization.fileMappingPerProfile.filter(
            (_, i) => i !== index
          ),
      },
    });
  };

  const updateMapping = (
    index: number,
    field: keyof ProfileMapping,
    value: string | boolean
  ) => {
    const updated = prompt.profilePersonalization.fileMappingPerProfile.map(
      (mapping, i) => (i === index ? { ...mapping, [field]: value } : mapping)
    );
    updatePrompt({
      profilePersonalization: {
        ...prompt.profilePersonalization,
        fileMappingPerProfile: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={prompt.profilePersonalization.enabled}
            onChange={(e) => handleInputChange("enabled", e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Enable Profile Personalization
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Directory Path
        </label>
        <input
          type="text"
          value={prompt.profilePersonalization.directoryPath}
          onChange={(e) => handleInputChange("directoryPath", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="/profiles"
        />
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Profile File Mappings
        </h4>
        <div className="space-y-3">
          {prompt.profilePersonalization.fileMappingPerProfile.map(
            (mapping, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={mapping.profileId}
                  onChange={(e) =>
                    updateMapping(index, "profileId", e.target.value)
                  }
                  placeholder="Profile ID"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={mapping.filePath}
                  onChange={(e) =>
                    updateMapping(index, "filePath", e.target.value)
                  }
                  placeholder="File path"
                  className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mapping.enabled}
                    onChange={(e) =>
                      updateMapping(index, "enabled", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              value={newMapping.profileId}
              onChange={(e) =>
                setNewMapping({ ...newMapping, profileId: e.target.value })
              }
              placeholder="Profile ID"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newMapping.filePath}
              onChange={(e) =>
                setNewMapping({ ...newMapping, filePath: e.target.value })
              }
              placeholder="File path"
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
          Quick Guidelines Fallback
        </label>
        <textarea
          value={prompt.profilePersonalization.quickGuidelinesFallback}
          onChange={(e) =>
            handleInputChange("quickGuidelinesFallback", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Use general therapeutic principles with empathy and active listening."
        />
      </div>
    </div>
  );
}
