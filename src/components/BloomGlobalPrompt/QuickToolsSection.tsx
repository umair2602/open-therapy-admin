"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, Practice } from "@/types";

interface QuickToolsSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function QuickToolsSection({
  prompt,
  updatePrompt,
}: QuickToolsSectionProps) {
  const [newPractice, setNewPractice] = useState({
    id: "",
    text: "",
    enabled: true,
  });

  const addPractice = () => {
    if (!newPractice.id || !newPractice.text) return;
    updatePrompt({
      quickTools: {
        practices: [...prompt.quickTools.practices, newPractice],
      },
    });
    setNewPractice({ id: "", text: "", enabled: true });
  };

  const removePractice = (index: number) => {
    updatePrompt({
      quickTools: {
        practices: prompt.quickTools.practices.filter((_, i) => i !== index),
      },
    });
  };

  const updatePractice = (
    index: number,
    field: keyof Practice,
    value: string | boolean
  ) => {
    const updated = prompt.quickTools.practices.map((practice, i) =>
      i === index ? { ...practice, [field]: value } : practice
    );
    updatePrompt({
      quickTools: {
        practices: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Therapeutic Practices
        </h4>
        <div className="space-y-3">
          {prompt.quickTools.practices.map((practice, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="text"
                value={practice.id}
                onChange={(e) => updatePractice(index, "id", e.target.value)}
                placeholder="Practice ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={practice.text}
                onChange={(e) => updatePractice(index, "text", e.target.value)}
                placeholder="Practice text"
                className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={practice.enabled}
                  onChange={(e) =>
                    updatePractice(index, "enabled", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>
              <button
                onClick={() => removePractice(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="text"
              value={newPractice.id}
              onChange={(e) =>
                setNewPractice({ ...newPractice, id: e.target.value })
              }
              placeholder="Practice ID"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newPractice.text}
              onChange={(e) =>
                setNewPractice({ ...newPractice, text: e.target.value })
              }
              placeholder="Practice text"
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addPractice}
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
