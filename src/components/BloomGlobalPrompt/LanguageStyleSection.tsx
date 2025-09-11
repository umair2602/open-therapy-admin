"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt } from "@/types";

interface LanguageStyleSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function LanguageStyleSection({
  prompt,
  updatePrompt,
}: LanguageStyleSectionProps) {
  const [newDoItem, setNewDoItem] = useState("");
  const [newDontItem, setNewDontItem] = useState("");

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["languageStyle"],
    value: string[]
  ) => {
    updatePrompt({
      languageStyle: {
        ...prompt.languageStyle,
        [field]: value,
      },
    });
  };

  const addDoItem = () => {
    if (!newDoItem.trim()) return;
    updatePrompt({
      languageStyle: {
        ...prompt.languageStyle,
        doList: [...prompt.languageStyle.doList, newDoItem.trim()],
      },
    });
    setNewDoItem("");
  };

  const removeDoItem = (index: number) => {
    updatePrompt({
      languageStyle: {
        ...prompt.languageStyle,
        doList: prompt.languageStyle.doList.filter((_, i) => i !== index),
      },
    });
  };

  const addDontItem = () => {
    if (!newDontItem.trim()) return;
    updatePrompt({
      languageStyle: {
        ...prompt.languageStyle,
        dontList: [...prompt.languageStyle.dontList, newDontItem.trim()],
      },
    });
    setNewDontItem("");
  };

  const removeDontItem = (index: number) => {
    updatePrompt({
      languageStyle: {
        ...prompt.languageStyle,
        dontList: prompt.languageStyle.dontList.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Do List</h4>
        <div className="space-y-2">
          {prompt.languageStyle.doList.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
            >
              <span className="text-green-600 font-medium">✓</span>
              <span className="flex-1 text-gray-900">{item}</span>
              <button
                onClick={() => removeDoItem(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newDoItem}
              onChange={(e) => setNewDoItem(e.target.value)}
              placeholder="Add a 'do' guideline"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addDoItem}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Don't List</h4>
        <div className="space-y-2">
          {prompt.languageStyle.dontList.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg"
            >
              <span className="text-red-600 font-medium">✗</span>
              <span className="flex-1 text-gray-900">{item}</span>
              <button
                onClick={() => removeDontItem(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newDontItem}
              onChange={(e) => setNewDontItem(e.target.value)}
              placeholder="Add a 'don't' guideline"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addDontItem}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
