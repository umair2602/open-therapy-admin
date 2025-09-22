"use client";

import CreateCategory from "@/components/CreateCategory";
import { CategoriesSkeleton } from "@/components/Skeleton";
import UpdateCategory from "@/components/UpdateCategory";
import { useEmotionalCategories } from "@/hooks/useEmotionalCategores";
import { EmotionalCategory } from "@/types";
import {
  ChatBubbleLeftRightIcon,
  EyeIcon,
  HeartIcon,
  PencilIcon,
  PlusIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function EmotionalCategoriesContent() {
  const { categories, isFetching, refetch, deleteCategory } =
    useEmotionalCategories();

  console.log("Categories", categories);

  const [selectedCategory, setSelectedCategory] = useState<EmotionalCategory>();
  const [createCategoryVisible, setCreateCategoryVisible] =
    useState<boolean>(false);
  const [updateCategoryVisible, setUpdateCategoryVisible] =
    useState<boolean>(false);
  const [deleteCategoryVisible, setDeleteCategoryVisible] =
    useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<EmotionalCategory | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (isFetching) {
    return (
      <>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <HeartIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Emotional Categories
              </h1>
              <p className="text-gray-600">
                Manage emotional categories and their sub-emotions
              </p>
            </div>
          </div>
        </div>
        <CategoriesSkeleton />
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <HeartIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Emotional Categories
              </h1>
              <p className="text-gray-600">
                Manage emotional categories and their sub-emotions for AI
                therapy
              </p>
            </div>
          </div>
          <button
            onClick={() => setCreateCategoryVisible(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <HeartIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Categories
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {categories?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <SparklesIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Emotions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {categories?.reduce(
                  (total, category) => total + category.emotions.length,
                  0
                ) || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <HeartIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Active Categories
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {categories?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-6">
        {categories?.map((category, key) => (
          <div
            key={key}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Category Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.emotions.length} emotions • {category.type}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category._id
                          ? null
                          : category._id || ""
                      )
                    }
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    {expandedCategory === category._id ? "Hide" : "View"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category as EmotionalCategory);
                      setUpdateCategoryVisible(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setCategoryToDelete(category as EmotionalCategory);
                      setDeleteCategoryVisible(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>

              {category.description && (
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
              )}

              {/* Category Prompt */}
              {category.prompt && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        AI Prompt
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {category.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Emotions Preview */}
              <div className="flex flex-wrap gap-2">
                {category.emotions.slice(0, 6).map((emotion, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    {emotion.name}
                  </span>
                ))}
                {category.emotions.length > 6 && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                    +{category.emotions.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Expanded View */}
            {expandedCategory === category._id && (
              <div className="p-6 bg-gray-50">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-purple-600" />
                  All Emotions ({category.emotions.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.emotions.map((emotion, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">
                            {emotion.name}
                          </h5>
                          {emotion.prompt && (
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {emotion.prompt}
                            </p>
                          )}
                          {typeof emotion.points === "number" && (
                            <p className="text-xs text-gray-600 mt-1">
                              Points: {emotion.points}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories?.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <HeartIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No categories yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first emotional category.
          </p>
          <button
            onClick={() => setCreateCategoryVisible(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Your First Category
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateCategory
        isVisible={createCategoryVisible as boolean}
        onSubmit={() => setCreateCategoryVisible(false)}
        onClose={() => setCreateCategoryVisible(false)}
        onCreate={() => setCreateCategoryVisible(false)}
      />

      {selectedCategory && (
        <UpdateCategory
          isVisible={updateCategoryVisible}
          initialData={selectedCategory as EmotionalCategory}
          onClose={() => {
            setUpdateCategoryVisible(false);
            refetch();
          }}
          onUpdated={() => {}}
        />
      )}

      {deleteCategoryVisible && categoryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <HeartIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Category
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete "{categoryToDelete.name}"? This
                action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteCategoryVisible(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteCategory(categoryToDelete._id as string).then(() => {
                      setCategoryToDelete(null);
                      setDeleteCategoryVisible(false);
                      refetch();
                    });
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
