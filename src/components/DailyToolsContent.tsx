"use client";

import { useDailyTools } from "@/hooks/useDailyTools";
import { DailyToolCategory, DailyToolItem } from "@/types";
import {
  PlusIcon,
  MusicalNoteIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DailyToolsContent() {
  const {
    categories,
    isFetching,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadAudio,
    uploadIcon,
    refetch,
    isCreating,
    isUpdating,
    isDeleting,
  } = useDailyTools();

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const [draft, setDraft] = useState<Partial<DailyToolCategory>>({
    title: "",
    tools: [],
  });
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const resetDraft = () => setDraft({ title: "", icon: "", tools: [] });

  const handleAddTool = () => {
    const next: DailyToolItem = { name: "New Tool", desc: "", audioUrl: "" };
    setDraft((d) => ({ ...d, tools: [...(d.tools || []), next] }));
  };

  const handleRemoveTool = (index: number) => {
    setDraft((d) => {
      const tools = [...(d.tools || [])];
      tools.splice(index, 1);
      return { ...d, tools };
    });
  };

  const handleUploadAudio = async (file: File, index: number) => {
    setUploadingIndex(index);
    try {
      const url = await uploadAudio(file);
      setDraft((d) => {
        const tools = [...(d.tools || [])];
        tools[index] = { ...tools[index], audioUrl: url };
        return { ...d, tools };
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleUploadIcon = async (file: File) => {
    setUploadingIcon(true);
    try {
      const url = await uploadIcon(file);
      setDraft((d) => ({ ...d, icon: url }));
    } finally {
      setUploadingIcon(false);
    }
  };

  const onCreate = async () => {
    if (!draft.title) return;
    if (draft._id) {
      await updateCategory({ id: draft._id, data: draft as DailyToolCategory });
    } else {
      await createCategory(draft as DailyToolCategory);
    }
    setCreating(false);
    resetDraft();
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <MusicalNoteIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Daily Tools</h1>
              <p className="text-gray-600">
                Create categories and attach mp3-guided tools
              </p>
            </div>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Category
          </button>
        </div>
      </div>

      {isFetching && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            Loading categories...
          </div>
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setCreating(false);
              resetDraft();
            }}
          />
          <div className="relative z-10 w-full max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {draft._id ? "Edit Category" : "New Category"}
                </h2>
                <button
                  onClick={() => {
                    setCreating(false);
                    resetDraft();
                  }}
                  className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    value={draft.title || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Icon (optional)
                  </label>
                  <div className="space-y-3">
                    {draft.icon && (
                      <div className="flex items-center gap-3">
                        <img
                          src={draft.icon}
                          alt="Category icon"
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Current icon</p>
                          <button
                            type="button"
                            onClick={() => setDraft({ ...draft, icon: "" })}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Remove icon
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadIcon(file);
                        }}
                        className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-lg border-gray-300"
                      />
                      {uploadingIcon && (
                        <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                          Uploading...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">Tools</h3>
                  <button
                    onClick={handleAddTool}
                    className="text-sm flex items-center gap-2 text-blue-600"
                  >
                    <PlusIcon className="h-4 w-4" /> Add Tool
                  </button>
                </div>
                <div className="space-y-4">
                  {(draft.tools || []).map((tool, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 gap-4 items-center"
                    >
                      <input
                        placeholder="Name"
                        value={tool.name}
                        onChange={(e) => {
                          const tools = [...(draft.tools || [])];
                          tools[idx] = { ...tools[idx], name: e.target.value };
                          setDraft({ ...draft, tools });
                        }}
                        className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Description"
                        value={tool.desc || ""}
                        onChange={(e) => {
                          const tools = [...(draft.tools || [])];
                          tools[idx] = { ...tools[idx], desc: e.target.value };
                          setDraft({ ...draft, tools });
                        }}
                        rows={10}
                        className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleUploadAudio(f, idx);
                          }}
                          className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-lg border-gray-300"
                        />
                        {uploadingIndex === idx && (
                          <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                            Uploading...
                          </span>
                        )}
                        {tool.audioUrl && (
                          <a
                            href={tool.audioUrl}
                            target="_blank"
                            className="text-sm text-gray-600 underline"
                          >
                            Audio
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveTool(idx)}
                          className="px-3 py-2 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setCreating(false);
                    resetDraft();
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={onCreate}
                  disabled={isCreating || isUpdating}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isCreating || isUpdating
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isCreating || isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {category.icon && (
                  <img
                    src={category.icon}
                    alt={`${category.title} icon`}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.tools.length} tools
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category._id
                        ? null
                        : (category._id as string)
                    )
                  }
                  className="px-3 py-2 text-sm bg-gray-50 rounded-lg"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setCreating(true);
                    setDraft({
                      _id: category._id,
                      title: category.title,
                      icon: category.icon,
                      tools: category.tools,
                    });
                  }}
                  className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={async () => {
                    if (!category._id) return;
                    try {
                      setDeletingId(category._id);
                      await deleteCategory(category._id);
                      await refetch();
                    } finally {
                      setDeletingId(null);
                    }
                  }}
                  disabled={deletingId === category._id}
                  className={`px-3 py-2 text-sm rounded-lg flex items-center gap-2 ${
                    deletingId === category._id
                      ? "bg-red-200 text-red-400 cursor-not-allowed"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  {deletingId === category._id ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-500" />
                      Deleting...
                    </>
                  ) : (
                    <TrashIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {expandedCategory === category._id && (
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="font-semibold text-gray-900">
                        {tool.name}
                      </div>
                      {tool.desc && (
                        <div className="text-sm text-gray-600 mt-1">
                          {tool.desc}
                        </div>
                      )}
                      {tool.audioUrl && (
                        <audio controls className="mt-3 w-full">
                          <source src={tool.audioUrl} />
                        </audio>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
