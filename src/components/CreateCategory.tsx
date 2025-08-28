import React, { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEmotionalCategories } from "@/hooks/useEmotionalCategories";

interface Emotion {
  name: string;
}

interface Category {
  name: string;
  description?: string;
  color?: string;
  secondary_color?: string;
  emotions: Emotion[];
}

interface CreateCategoryProps {
  isVisible: boolean;
  onSubmit: (category: Category) => void;
  onCreate: () => void;
  onClose: () => void;
}

export default function CreateCategory({
  isVisible,
  onCreate,
  onClose,
}: CreateCategoryProps) {
  const { isLoading, createCategory } = useEmotionalCategories();
  const [category, setCategory] = useState<Category>({
    name: "",
    description: "",
    color: "#000000",
    secondary_color: "#ffffff",
    emotions: [],
  });

  const [newEmotionName, setNewEmotionName] = useState<string>("");

  const handleAddEmotion = () => {
    if (!newEmotionName.trim()) return;
    setCategory({
      ...category,
      emotions: [...category.emotions, { name: newEmotionName }],
    });
    setNewEmotionName("");
  };

  const handleDeleteEmotion = (index: number) => {
    setCategory({
      ...category,
      emotions: category.emotions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    // onSubmit(category);
    createCategory(category).then((c) => {
      console.log("Created", c);
    });
    onCreate();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative h-[80%] top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white overflow-auto">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Create Category
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Category Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Description"
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <div className="flex space-x-2">
              <input
                type="color"
                value={category.color}
                onChange={(e) =>
                  setCategory({ ...category, color: e.target.value })
                }
                className="w-16 h-10 p-0 border-none rounded-md cursor-pointer"
              />
              <input
                type="color"
                value={category.secondary_color}
                onChange={(e) =>
                  setCategory({ ...category, secondary_color: e.target.value })
                }
                className="w-16 h-10 p-0 border-none rounded-md cursor-pointer"
              />
            </div>
          </div>

          {/* Add Emotion */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Add Emotion
            </h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Emotion Name"
                value={newEmotionName}
                onChange={(e) => setNewEmotionName(e.target.value)}
                className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleAddEmotion}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add
              </button>
            </div>
          </div>

          {/* Existing Emotions */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {category.emotions.map((emotion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {emotion.name}
                  </h5>
                </div>
                <button
                  onClick={() => handleDeleteEmotion(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400"
          >
            {isLoading ? "Loading..." : "Save Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
