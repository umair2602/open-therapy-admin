"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BloomGlobalPrompt } from "@/types";

interface FeedbackSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function FeedbackSection({
  prompt,
  updatePrompt,
}: FeedbackSectionProps) {
  const [newMoment, setNewMoment] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["feedback"],
    value: string | boolean | string[]
  ) => {
    updatePrompt({
      feedback: {
        ...prompt.feedback,
        [field]: value,
      },
    });
  };

  const addMoment = () => {
    if (!newMoment.trim()) return;
    updatePrompt({
      feedback: {
        ...prompt.feedback,
        moments: [...prompt.feedback.moments, newMoment.trim()],
      },
    });
    setNewMoment("");
  };

  const removeMoment = (index: number) => {
    updatePrompt({
      feedback: {
        ...prompt.feedback,
        moments: prompt.feedback.moments.filter((_, i) => i !== index),
      },
    });
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    updatePrompt({
      feedback: {
        ...prompt.feedback,
        sampleQuestions: [
          ...prompt.feedback.sampleQuestions,
          newQuestion.trim(),
        ],
      },
    });
    setNewQuestion("");
  };

  const removeQuestion = (index: number) => {
    updatePrompt({
      feedback: {
        ...prompt.feedback,
        sampleQuestions: prompt.feedback.sampleQuestions.filter(
          (_, i) => i !== index
        ),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={prompt.feedback.enabled}
            onChange={(e) => handleInputChange("enabled", e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Enable Feedback Collection
          </span>
        </label>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Feedback Moments
        </h4>
        <div className="space-y-2">
          {prompt.feedback.moments.map((moment, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
            >
              <span className="text-blue-600 font-medium">📅</span>
              <span className="flex-1 text-gray-900">{moment}</span>
              <button
                onClick={() => removeMoment(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newMoment}
              onChange={(e) => setNewMoment(e.target.value)}
              placeholder="Add feedback moment"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addMoment}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Sample Questions
        </h4>
        <div className="space-y-2">
          {prompt.feedback.sampleQuestions.map((question, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-600 font-medium">❓</span>
              <span className="flex-1 text-gray-900">{question}</span>
              <button
                onClick={() => removeQuestion(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Add sample question"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Silence Rule
        </label>
        <textarea
          value={prompt.feedback.silenceRule}
          onChange={(e) => handleInputChange("silenceRule", e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="If no feedback is provided within 24 hours, send a gentle check-in message."
        />
      </div>
    </div>
  );
}
