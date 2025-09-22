import { useEmotionalCategories } from "@/hooks/useEmotionalCategores";
import { Emotion, EmotionalCategory } from "@/types";
import {
  PlusIcon,
  SparklesIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

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
  const { isUpdating, updateCategory } = useEmotionalCategories();

  const [category, setCategory] = useState<EmotionalCategory>(initialData);
  const [newEmotion, setNewEmotion] = useState<Emotion>({
    name: "",
    prompt: "",
    points: undefined,
  });

  useEffect(() => {
    setCategory(initialData);
  }, [initialData]);

  const handleAddEmotion = () => {
    if (!newEmotion.name.trim()) return;
    setCategory({
      ...category,
      emotions: [...category.emotions, { ...newEmotion }],
    });
    setNewEmotion({ name: "", prompt: "" });
  };

  const handleDeleteEmotion = (index: number) => {
    setCategory({
      ...category,
      emotions: category.emotions.filter((_, i) => i !== index),
    });
  };

  const handleUpdateEmotion = (
    index: number,
    field: keyof Emotion,
    value: string | number | undefined
  ) => {
    const updatedEmotions = [...category.emotions];
    updatedEmotions[index] = { ...updatedEmotions[index], [field]: value };
    setCategory({
      ...category,
      emotions: updatedEmotions,
    });
  };

  const handleSubmit = async () => {
    updateCategory({
      id: category?._id as string, // make sure your schema uses `_id`
      data: category,
    }).then((c) => {
      onUpdated(c);
      onClose();
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Update Emotional Category
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Edit category details, emotions, and AI prompts
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-8 max-h-[80vh] overflow-y-auto">
            {/* Category Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Category Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Anxiety, Joy, Anger"
                    value={category.name}
                    onChange={(e) =>
                      setCategory({ ...category, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description of this category"
                    value={category.description || ""}
                    onChange={(e) =>
                      setCategory({ ...category, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Type *
                  </label>
                  <select
                    value={category.type}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        type: e.target.value as EmotionalCategory["type"],
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="unhealthy">Unhealthy</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Prompt for AI *
                </label>
                <textarea
                  placeholder="Describe what this emotional category represents in daily life. This helps the AI understand and respond appropriately in therapy sessions and diary analysis."
                  value={category.prompt || ""}
                  onChange={(e) =>
                    setCategory({ ...category, prompt: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This prompt helps the AI understand the context and meaning of
                  this emotional category.
                </p>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category Colors
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Primary:</label>
                    <input
                      type="color"
                      value={category.color}
                      onChange={(e) =>
                        setCategory({ ...category, color: e.target.value })
                      }
                      className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Secondary:</label>
                    <input
                      type="color"
                      value={category.secondary_color}
                      onChange={(e) =>
                        setCategory({
                          ...category,
                          secondary_color: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Emotion */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                Add New Emotion
              </h4>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emotion Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Worry, Excitement, Frustration"
                      value={newEmotion.name}
                      onChange={(e) =>
                        setNewEmotion({ ...newEmotion, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emotion Prompt for AI
                    </label>
                    <textarea
                      placeholder="Describe what this emotion represents and how it manifests in daily life..."
                      value={newEmotion.prompt || ""}
                      onChange={(e) =>
                        setNewEmotion({ ...newEmotion, prompt: e.target.value })
                      }
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emotion Points (optional)
                    </label>
                    <input
                      type="number"
                      value={newEmotion.points ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewEmotion({
                          ...newEmotion,
                          points:
                            value === "" ? undefined : parseInt(value, 10),
                        });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddEmotion}
                  disabled={!newEmotion.name.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Emotion
                </button>
              </div>
            </div>

            {/* Existing Emotions */}
            {category.emotions.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Existing Emotions ({category.emotions.length})
                </h4>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {category.emotions.map((emotion, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emotion Name
                          </label>
                          <input
                            type="text"
                            value={emotion.name}
                            onChange={(e) =>
                              handleUpdateEmotion(index, "name", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emotion Points
                          </label>
                          <input
                            type="number"
                            value={emotion.points ?? ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              handleUpdateEmotion(
                                index,
                                "points",
                                value === "" ? undefined : parseInt(value, 10)
                              );
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => handleDeleteEmotion(index)}
                            className="w-full px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emotion Prompt for AI
                        </label>
                        <textarea
                          placeholder="Describe what this emotion represents and how it manifests in daily life..."
                          value={emotion.prompt || ""}
                          onChange={(e) =>
                            handleUpdateEmotion(index, "prompt", e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isUpdating || !category.name.trim()}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                {isUpdating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
