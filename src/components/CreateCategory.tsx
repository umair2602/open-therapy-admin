import { useEmotionalCategories } from "@/hooks/useEmotionalCategores";
import { Emotion, EmotionalCategory } from "@/types";
import {
  Plus,
  Sparkles,
  Trash2,
  X,
  Tag,
} from "lucide-react";
import { useState } from "react";

interface CreateCategoryProps {
  isVisible: boolean;
  onSubmit: (category: EmotionalCategory) => void;
  onCreate: () => void;
  onClose: () => void;
}

export default function CreateCategory({
  isVisible,
  onCreate,
  onClose,
}: CreateCategoryProps) {
  const { isCreating, createCategory } = useEmotionalCategories();
  const [category, setCategory] = useState<EmotionalCategory>({
    name: "",
    description: "",
    color: "#3B82F6",
    secondary_color: "#8B5CF6",
    prompt: "",
    type: "healthy",
    emotions: [],
  });

  const [newEmotion, setNewEmotion] = useState<Emotion>({
    name: "",
    prompt: "",
    points: 0,
    directionTags: [],
  });

  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    setNewEmotion({
      ...newEmotion,
      directionTags: [...(newEmotion.directionTags || []), newTag.trim()],
    });
    setNewTag("");
  };

  const handleRemoveTag = (index: number) => {
    setNewEmotion({
      ...newEmotion,
      directionTags: (newEmotion.directionTags || []).filter((_, i) => i !== index),
    });
  };

  const handleAddEmotion = () => {
    if (!newEmotion.name.trim()) return;
    setCategory({
      ...category,
      emotions: [...category.emotions, { ...newEmotion }],
    });
    setNewEmotion({ name: "", prompt: "", points: 0, directionTags: [] });
  };

  const handleDeleteEmotion = (index: number) => {
    setCategory({
      ...category,
      emotions: category.emotions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    console.log("Creating category", category);
    createCategory(category).then((c) => {
      console.log("Created", c);
    }).catch(err => {
      console.log('Err',err);
    })
    onCreate();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 overflow-y-auto h-full w-full z-50">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Create Emotional Category
                  </h3>
                  <p className="text-purple-100 text-sm">
                    Add a new category with emotions and AI prompts
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-8 max-h-[80vh] overflow-y-auto">
            {/* Category Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
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
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Direction Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Direction Tags
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g., energizing, grounding, isolating"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Tag className="h-4 w-4" />
                    </button>
                  </div>
                  {newEmotion.directionTags && newEmotion.directionTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newEmotion.directionTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg text-sm text-purple-700"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="ml-2 text-purple-400 hover:text-purple-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAddEmotion}
                  disabled={!newEmotion.name.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Emotion
                </button>
              </div>
            </div>

            {/* Existing Emotions */}
            {category.emotions.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  Added Emotions ({category.emotions.length})
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {category.emotions.map((emotion, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-900 mb-1">
                          {emotion.name}
                        </h5>
                        {emotion.prompt && (
                          <p className="text-xs text-gray-600 leading-relaxed mb-2">
                            {emotion.prompt}
                          </p>
                        )}
                        {typeof emotion.points === "number" && (
                          <p className="text-xs text-gray-600 mb-2">
                            Points: {emotion.points}
                          </p>
                        )}
                        {emotion.directionTags && emotion.directionTags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {emotion.directionTags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs border border-purple-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteEmotion(index)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
                disabled={isCreating || !category.name.trim()}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Category"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}