"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ShieldExclamationIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SafetyPrompt {
  _id: string;
  content: string;
  isActive: boolean;
}

export default function SafetyPromptsPage() {
  const [prompts, setPrompts] = useState<SafetyPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPromptContent, setNewPromptContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/safety-prompts");
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      alert("Failed to fetch safety prompts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newPromptContent.trim()) return;

    try {
      const response = await fetch("/api/safety-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPromptContent }),
      });

      if (response.ok) {
        setNewPromptContent("");
        fetchPrompts();
      } else {
        alert("Failed to create prompt");
      }
    } catch (error) {
      console.error("Error creating prompt:", error);
      alert("Failed to create prompt");
    }
  };

  const handleUpdate = async (id: string, updates: Partial<SafetyPrompt>) => {
    try {
      const response = await fetch(`/api/safety-prompts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        fetchPrompts();
        setEditingId(null);
      } else {
        alert("Failed to update prompt");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
      alert("Failed to update prompt");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this safety prompt?")) return;

    try {
      const response = await fetch(`/api/safety-prompts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPrompts();
      } else {
        alert("Failed to delete prompt");
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
      alert("Failed to delete prompt");
    }
  };

  const startEditing = (prompt: SafetyPrompt) => {
    setEditingId(prompt._id);
    setEditContent(prompt.content);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-100 rounded-xl">
            <ShieldExclamationIcon className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Safety Prompts</h1>
            <p className="text-gray-600">
              Manage global safety prompts and behaviors
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Safety Prompts List
          </h2>
          
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <div
                key={prompt._id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="flex-1">
                  {editingId === prompt._id ? (
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <p className={`text-gray-900 ${!prompt.isActive && "text-gray-400 line-through"}`}>
                      {prompt.content}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {editingId === prompt._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(prompt._id, { content: editContent })}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleUpdate(prompt._id, { isActive: !prompt.isActive })}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          prompt.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {prompt.isActive ? "Active" : "Inactive"}
                      </button>
                      <button
                        onClick={() => startEditing(prompt)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prompt._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Prompt */}
            <div className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <input
                type="text"
                value={newPromptContent}
                onChange={(e) => setNewPromptContent(e.target.value)}
                placeholder="Add a new safety prompt..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate();
                }}
              />
              <button
                onClick={handleCreate}
                disabled={!newPromptContent.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
