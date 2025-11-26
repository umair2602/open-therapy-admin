"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  BloomGlobalPrompt,
  QuestionTemplate,
  ValidationTemplate,
  OptionalPractice,
} from "@/types";

interface ResponseStructureSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ResponseStructureSection({
  prompt,
  updatePrompt,
}: ResponseStructureSectionProps) {
  const [newTemplate, setNewTemplate] = useState({
    id: "",
    text: "",
    enabled: true,
  });
  const [newValidation, setNewValidation] = useState({
    id: "",
    text: "",
    enabled: true,
  });
  const [newPractice, setNewPractice] = useState({
    id: "",
    text: "",
    enabled: true,
  });
  const [newBehavior, setNewBehavior] = useState("");

  const handleInputChange = (
    field: keyof BloomGlobalPrompt["responseStructure"],
    value: string
  ) => {
    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        [field]: value,
      },
    });
  };

  const addTemplate = (type: "question" | "validation" | "practice") => {
    const newItem =
      type === "question"
        ? newTemplate
        : type === "validation"
        ? newValidation
        : newPractice;
    if (!newItem.id || !newItem.text) return;

    const field =
      type === "question"
        ? "openQuestionTemplates"
        : type === "validation"
        ? "validationTemplates"
        : "optionalPractices";

    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        [field]: [...prompt.responseStructure[field], newItem],
      },
    });

    if (type === "question")
      setNewTemplate({ id: "", text: "", enabled: true });
    else if (type === "validation")
      setNewValidation({ id: "", text: "", enabled: true });
    else setNewPractice({ id: "", text: "", enabled: true });
  };

  const removeTemplate = (
    type: "question" | "validation" | "practice",
    index: number
  ) => {
    const field =
      type === "question"
        ? "openQuestionTemplates"
        : type === "validation"
        ? "validationTemplates"
        : "optionalPractices";

    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        [field]: prompt.responseStructure[field].filter((_, i) => i !== index),
      },
    });
  };

  const updateTemplate = (
    type: "question" | "validation" | "practice",
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const fieldName =
      type === "question"
        ? "openQuestionTemplates"
        : type === "validation"
        ? "validationTemplates"
        : "optionalPractices";

    const updated = prompt.responseStructure[fieldName].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        [fieldName]: updated,
      },
    });
  };

  const addBehavior = () => {
    if (!newBehavior.trim()) return;
    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        noActiveListeningBehaviors: [
          ...(prompt.responseStructure.noActiveListeningBehaviors || []),
          newBehavior,
        ],
      },
    });
    setNewBehavior("");
  };

  const removeBehavior = (index: number) => {
    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        noActiveListeningBehaviors: (
          prompt.responseStructure.noActiveListeningBehaviors || []
        ).filter((_, i) => i !== index),
      },
    });
  };

  const updateBehavior = (index: number, value: string) => {
    const updated = (
      prompt.responseStructure.noActiveListeningBehaviors || []
    ).map((item, i) => (i === index ? value : item));

    updatePrompt({
      responseStructure: {
        ...prompt.responseStructure,
        noActiveListeningBehaviors: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Active Listening Template */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Active Listening Template
        </label>
        <textarea
          value={prompt.responseStructure.activeListeningTemplate}
          onChange={(e) =>
            handleInputChange("activeListeningTemplate", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I hear that you're feeling [emotion]. It sounds like [summary]. Can you tell me more about [specific aspect]?"
        />
      </div>

      {/* No Active Listening Behaviors */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          No Active Listening Behaviors
        </h4>
        <p className="text-sm text-gray-500 mb-3">
          If user mentions any of these behaviors, don't actively listen and act
          accordingly.
        </p>
        <div className="space-y-3">
          {(prompt.responseStructure.noActiveListeningBehaviors || []).map(
            (behavior, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={behavior}
                  onChange={(e) => updateBehavior(index, e.target.value)}
                  placeholder="Behavior description"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => removeBehavior(index)}
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
              value={newBehavior}
              onChange={(e) => setNewBehavior(e.target.value)}
              placeholder="Add new behavior"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addBehavior}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Open Question Templates */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Open Question Templates
        </h4>
        <div className="space-y-3">
          {prompt.responseStructure.openQuestionTemplates.map(
            (template, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={template.id}
                  onChange={(e) =>
                    updateTemplate("question", index, "id", e.target.value)
                  }
                  placeholder="Template ID"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={template.text}
                  onChange={(e) =>
                    updateTemplate("question", index, "text", e.target.value)
                  }
                  placeholder="Template text"
                  className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={template.enabled}
                    onChange={(e) =>
                      updateTemplate(
                        "question",
                        index,
                        "enabled",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>
                <button
                  onClick={() => removeTemplate("question", index)}
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
              value={newTemplate.id}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, id: e.target.value })
              }
              placeholder="Template ID"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newTemplate.text}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, text: e.target.value })
              }
              placeholder="Template text"
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => addTemplate("question")}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Validation Templates */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Validation Templates
        </h4>
        <div className="space-y-3">
          {prompt.responseStructure.validationTemplates.map(
            (template, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={template.id}
                  onChange={(e) =>
                    updateTemplate("validation", index, "id", e.target.value)
                  }
                  placeholder="Template ID"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={template.text}
                  onChange={(e) =>
                    updateTemplate("validation", index, "text", e.target.value)
                  }
                  placeholder="Template text"
                  className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={template.enabled}
                    onChange={(e) =>
                      updateTemplate(
                        "validation",
                        index,
                        "enabled",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>
                <button
                  onClick={() => removeTemplate("validation", index)}
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
              value={newValidation.id}
              onChange={(e) =>
                setNewValidation({ ...newValidation, id: e.target.value })
              }
              placeholder="Template ID"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newValidation.text}
              onChange={(e) =>
                setNewValidation({ ...newValidation, text: e.target.value })
              }
              placeholder="Template text"
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => addTemplate("validation")}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Optional Practices */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Optional Practices
        </h4>
        <div className="space-y-3">
          {prompt.responseStructure.optionalPractices.map((practice, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="text"
                value={practice.id}
                onChange={(e) =>
                  updateTemplate("practice", index, "id", e.target.value)
                }
                placeholder="Practice ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={practice.text}
                onChange={(e) =>
                  updateTemplate("practice", index, "text", e.target.value)
                }
                placeholder="Practice text"
                className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={practice.enabled}
                  onChange={(e) =>
                    updateTemplate(
                      "practice",
                      index,
                      "enabled",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>
              <button
                onClick={() => removeTemplate("practice", index)}
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
              onClick={() => addTemplate("practice")}
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
