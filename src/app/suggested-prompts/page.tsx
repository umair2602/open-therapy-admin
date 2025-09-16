"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useSuggestedPrompts } from "@/hooks/useSuggestedPrompts";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type {
  ChatType,
  AreaOfLifeSubcategory,
  SuggestedPrompt,
} from "@/lib/api/suggestedPrompts";

const chatTypes: ChatType[] = ["general", "emotional_diary", "area_of_life"];

const areaOfLifeSubs: AreaOfLifeSubcategory[] = [
  "relationships",
  "activeLife",
  "personalCare",
  "innerPath",
];

export default function SuggestedPromptsPage() {
  const [filters, setFilters] = useState<{
    chatType?: ChatType;
    subcategory?: AreaOfLifeSubcategory;
    isActive?: boolean;
  }>({});

  const {
    suggestedPrompts,
    isFetching,
    createSuggestedPrompt,
    updateSuggestedPrompt,
    deleteSuggestedPrompt,
    refetch,
  } = useSuggestedPrompts(filters);

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<SuggestedPrompt | null>(null);
  const [form, setForm] = useState<Partial<SuggestedPrompt>>({
    chatType: "general",
    title: "",
    prompt: "",
    isActive: true,
    tags: [],
  });

  const resetForm = () =>
    setForm({
      chatType: "general",
      title: "",
      prompt: "",
      isActive: true,
      tags: [],
    });

  const onSubmit = async () => {
    if (editing?._id) {
      await updateSuggestedPrompt({ id: editing._id, data: form });
    } else {
      await createSuggestedPrompt(form);
    }
    setIsOpen(false);
    setEditing(null);
    resetForm();
    refetch();
  };

  function ChipInput({
    label,
    values,
    onChange,
    placeholder,
  }: {
    label: string;
    values: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
  }) {
    const [draft, setDraft] = useState("");
    const addDraft = () => {
      const v = draft.trim();
      if (!v) return;
      onChange([...(values || []), v]);
      setDraft("");
    };
    const removeAt = (idx: number) => {
      const next = [...(values || [])];
      next.splice(idx, 1);
      onChange(next);
    };
    return (
      <div>
        <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {(values || []).map((v, i) => (
            <span
              key={`${v}-${i}`}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
            >
              {v}
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label="Remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="border rounded-lg p-2 flex-1"
            placeholder={placeholder || "Add tag and press Enter"}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addDraft();
              }
            }}
          />
          <button
            type="button"
            onClick={addDraft}
            className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700"
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Suggested Prompts
            </h1>
            <p className="text-gray-600">
              Manage suggested prompts for different chat types
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
              setEditing(null);
              resetForm();
            }}
            className="inline-flex items-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" /> New Suggested Prompt
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Chat Type</label>
            <select
              className="border rounded-lg p-2"
              value={filters.chatType || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  chatType: (e.target.value || undefined) as ChatType,
                  subcategory: undefined,
                })
              }
            >
              <option value="">All</option>
              {chatTypes.map((ct) => (
                <option value={ct} key={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>
          {filters.chatType === "area_of_life" && (
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Subcategory</label>
              <select
                className="border rounded-lg p-2"
                value={filters.subcategory || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    subcategory: (e.target.value ||
                      undefined) as AreaOfLifeSubcategory,
                  })
                }
              >
                <option value="">All</option>
                {areaOfLifeSubs.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              id="activeOnly"
              type="checkbox"
              checked={!!filters.isActive}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  isActive: e.target.checked ? true : undefined,
                })
              }
              className="h-4 w-4"
            />
            <label htmlFor="activeOnly" className="text-sm text-gray-700">
              Active only
            </label>
          </div>
          <button
            onClick={() => refetch()}
            className="ml-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
          >
            Apply
          </button>
        </div>

        {/* List */}
        {isFetching ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="space-y-3">
            {suggestedPrompts?.map((sp) => (
              <div
                key={sp._id}
                className="bg-white rounded-xl p-4 border border-gray-100 flex items-start justify-between"
              >
                <div>
                  <div className="text-sm text-gray-500">
                    {sp.chatType}
                    {sp.chatType === "area_of_life" && sp.subcategory
                      ? ` • ${sp.subcategory}`
                      : ""}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {sp.title}
                  </div>
                  <div className="text-gray-700 whitespace-pre-line mt-1">
                    {sp.prompt}
                  </div>
                  {sp.tags && sp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sp.tags.map((t, i) => (
                        <span
                          key={`${t}-${i}`}
                          className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(sp);
                      setIsOpen(true);
                      setForm(sp);
                    }}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    <PencilIcon className="h-4 w-4 inline mr-1" /> Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (sp._id) {
                        await deleteSuggestedPrompt(sp._id);
                        refetch();
                      }
                    }}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <TrashIcon className="h-4 w-4 inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
            {(!suggestedPrompts || suggestedPrompts.length === 0) && (
              <div className="text-center text-gray-500">
                No suggested prompts
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-2 sm:p-6">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {editing ? "Edit" : "Create"} Suggested Prompt
                </h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setEditing(null);
                  }}
                  className="text-gray-500"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Chat Type
                  </label>
                  <select
                    className="border rounded-lg p-2"
                    value={form.chatType || "general"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        chatType: e.target.value as ChatType,
                        subcategory: undefined,
                      })
                    }
                  >
                    {chatTypes.map((ct) => (
                      <option value={ct} key={ct}>
                        {ct}
                      </option>
                    ))}
                  </select>
                </div>
                {form.chatType === "area_of_life" && (
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      Subcategory
                    </label>
                    <select
                      className="border rounded-lg p-2"
                      value={form.subcategory || "relationships"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          subcategory: e.target.value as AreaOfLifeSubcategory,
                        })
                      }
                    >
                      {areaOfLifeSubs.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <input
                  className="border rounded-lg p-2 md:col-span-2"
                  placeholder="Title"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                  className="border rounded-lg p-2 md:col-span-2"
                  rows={6}
                  placeholder="Prompt"
                  value={form.prompt || ""}
                  onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                />
                <div className="flex items-center gap-2 md:col-span-2">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={!!form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Active
                  </label>
                </div>
                <div className="md:col-span-2">
                  <ChipInput
                    label="Tags"
                    values={form.tags || []}
                    onChange={(arr) => setForm({ ...form, tags: arr })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  {editing ? "Save changes" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
