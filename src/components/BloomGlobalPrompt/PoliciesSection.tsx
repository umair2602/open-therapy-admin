"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt } from "@/types";

interface PoliciesSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function PoliciesSection({
  prompt,
  updatePrompt,
}: PoliciesSectionProps) {
  const [newAlwaysRule, setNewAlwaysRule] = useState("");
  const [newNeverRule, setNewNeverRule] = useState("");

  const addAlwaysRule = () => {
    if (!newAlwaysRule.trim()) return;
    updatePrompt({
      policies: {
        ...prompt.policies,
        alwaysRules: [...prompt.policies.alwaysRules, newAlwaysRule.trim()],
      },
    });
    setNewAlwaysRule("");
  };

  const removeAlwaysRule = (index: number) => {
    updatePrompt({
      policies: {
        ...prompt.policies,
        alwaysRules: prompt.policies.alwaysRules.filter((_, i) => i !== index),
      },
    });
  };

  const addNeverRule = () => {
    if (!newNeverRule.trim()) return;
    updatePrompt({
      policies: {
        ...prompt.policies,
        neverRules: [...prompt.policies.neverRules, newNeverRule.trim()],
      },
    });
    setNewNeverRule("");
  };

  const removeNeverRule = (index: number) => {
    updatePrompt({
      policies: {
        ...prompt.policies,
        neverRules: prompt.policies.neverRules.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Always Rules</h4>
        <div className="space-y-2">
          {prompt.policies.alwaysRules.map((rule, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
            >
              <span className="text-green-600 font-medium">Always</span>
              <span className="flex-1 text-gray-900">{rule}</span>
              <button
                onClick={() => removeAlwaysRule(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newAlwaysRule}
              onChange={(e) => setNewAlwaysRule(e.target.value)}
              placeholder="Add an 'always' rule"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addAlwaysRule}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Never Rules</h4>
        <div className="space-y-2">
          {prompt.policies.neverRules.map((rule, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg"
            >
              <span className="text-red-600 font-medium">Never</span>
              <span className="flex-1 text-gray-900">{rule}</span>
              <button
                onClick={() => removeNeverRule(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newNeverRule}
              onChange={(e) => setNewNeverRule(e.target.value)}
              placeholder="Add a 'never' rule"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addNeverRule}
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
