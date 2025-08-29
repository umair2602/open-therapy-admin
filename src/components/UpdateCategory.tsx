import React, { useState, useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Emotion, EmotionalCategory } from "@/types";
import { useEmotionalCategories } from "@/hooks/useEmotionalCategores";

interface UpdateCategoryProps {
  isVisible: boolean;
  initialData: EmotionalCategory;
  onClose: () => void;
  onUpdated: (updatedCategory: EmotionalCategory) => void;
}

export default function UpdateCategory({
  isVisible,
  initialData,
  onClose,
  onUpdated,
}: UpdateCategoryProps) {
  const { isLoading, updateCategory } = useEmotionalCategories();
    
  const [category, setCategory] = useState<EmotionalCategory>(initialData);
  const [newEmotion, setNewEmotion] = useState<Emotion>({ name: ""});

  useEffect(() => {
    setCategory(initialData);
  }, [initialData]);

  const handleAddEmotion = () => {
    if (!newEmotion.name.trim()) return;
    setCategory({
      ...category,
      emotions: [...category.emotions, newEmotion],
    });
    setNewEmotion({ name: "" });
  };

  const handleDeleteEmotion = (index: number) => {
    setCategory({
      ...category,
      emotions: category.emotions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    updateCategory({
        id: category?._id as string,      // make sure your schema uses `_id`
        data: category,
    }).then((c) => {
        onUpdated(c);
        onClose();
    });
    };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative h-[80%] top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white overflow-auto">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Update Category</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          {/* Category Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Description"
              value={category.description as string}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <div className="flex space-x-2">
              <input
                type="color"
                value={category.color}
                onChange={(e) => setCategory({ ...category, color: e.target.value })}
                className="w-16 h-10 p-0 border-none rounded-md cursor-pointer"
              />
              <input
                type="color"
                value={category.secondary_color}
                onChange={(e) => setCategory({ ...category, secondary_color: e.target.value })}
                className="w-16 h-10 p-0 border-none rounded-md cursor-pointer"
              />
            </div>
          </div>

          {/* Add Emotion */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Add Emotion</h4>
            <input
              type="text"
              placeholder="Emotion Name"
              value={newEmotion.name}
              onChange={(e) => setNewEmotion({ ...newEmotion, name: e.target.value })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
            />
            <button
              onClick={handleAddEmotion}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" /> Add
            </button>
          </div>

          {/* Existing Emotions */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {category.emotions.map((emotion, index) => (
              <div
                key={index}
                className="flex flex-col p-3 border border-gray-200 rounded-lg space-y-1"
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium text-gray-900">{emotion.name}</h5>
                  <button
                    onClick={() => handleDeleteEmotion(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white disabled:bg-gray-200 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}