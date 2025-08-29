"use client";

import CreateCategory from "@/components/CreateCategory";
import UpdateCategory from "@/components/UpdateCategory";
import { useEmotionalCategories } from "@/hooks/useEmotionalCategores";
import {
  ChartBarIcon,
  CogIcon,
  HeartIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmotionalCategory } from "@/types";
import Image from "next/image";
export default function Dashboard() {
  const { categories, isFetching, refetch, deleteCategory } =
    useEmotionalCategories()

  const [selectedCategory, setSelectedCategory] = useState<EmotionalCategory>();

  const [createCategoryVisible, setCreateCategoryVisible] =
    useState<boolean>(false);
  const [updateCategoryVisible, setUpdateCategoryVisible] =
    useState<boolean>(false);

  const [deleteCategoryVisible, setDeleteCategoryVisible] =
    useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<EmotionalCategory | null>(null);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Image alt='Logo' width={72} height={72} className='rounded-lg mx-auto' src={'/logo.png'}/>
              <span className="text-2xl font-bold text-gray-900">
                Open Therapy Admin
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">N/A</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <CogIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      AI Sessions
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">N/A</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Emotion Categories
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {categories?.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <CogIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Emotions
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {categories?.reduce(
                        (total, category) => total + category.emotions.length,
                        0
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emotion Categories Management */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Emotion Categories Management
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Manage the four main energy categories and their sub-emotions
                for the AI therapy system.
              </p>
            </div>
            <button
              onClick={() => setCreateCategoryVisible(true)}
              className="p-2 bg-blue-600 flex items-center gap-2 rounded-full text-white"
            >
              <PlusIcon height={20} width={20} />
              Create Category
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {categories?.map((category, key) => (
                <div
                  key={key}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {category.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory(category as EmotionalCategory);
                        setUpdateCategoryVisible(true);
                      }}
                      className="text-blue-600 ml-auto mr-8 cursor-pointer hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(category as EmotionalCategory);
                        setDeleteCategoryVisible(true);
                      }}
                      className="text-red-600 cursor-pointer hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Emotions ({category.emotions.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.emotions.slice(0, 6).map((emotion, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {emotion.name}
                        </span>
                      ))}
                      {category.emotions.length > 6 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          +{category.emotions.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8 bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <UsersIcon className="h-6 w-6 text-blue-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">User Management</span>
                            <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>

                        <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <CogIcon className="h-6 w-6 text-green-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">AI Model Settings</span>
                            <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>

                        <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <ChartBarIcon className="h-6 w-6 text-purple-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">Analytics & Reports</span>
                            <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>
                    </div>
                </div> */}
      </main>

      {/* Emotion Management Modal */}

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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete category "{categoryToDelete.name}
              "?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteCategoryVisible(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCategory(categoryToDelete._id as string).then(() => {
                    setCategoryToDelete(null);
                    setDeleteCategoryVisible(false);
                    refetch()
                  })
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}