"use client";

import { useState } from "react";
import { useCrisisPrompts } from "@/hooks/useCrisisPrompts";
import { CrisisPrompt } from "@/types";
import DashboardLayout from "@/components/DashboardLayout";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function CrisisPromptsPage() {
  const {
    crisisPrompts,
    isFetching,
    createCrisisPrompt,
    updateCrisisPrompt,
    deleteCrisisPrompt,
    refetch,
  } = useCrisisPrompts();
  const [isCreating, setIsCreating] = useState(false);
  const [editing, setEditing] = useState<CrisisPrompt | null>(null);

  const [form, setForm] = useState<Partial<CrisisPrompt>>({
    id: "",
    slug: "",
    type: "crisis",
    title: "",
    category: "",
    level: "",
    jurisdiction: "",
    do_not_do: [],
    do: [],
    content: {
      description: "",
      base_message: "",
      variants: { micro: "", standard: "", full: "" },
      risk_signs: { "pt-BR": [], en: [], es: [] },
      slang_variations: [],
      exceptions: [],
      signal_words: { "pt-BR": [], en: [], es: [] },
      emojis: [],
      slangs_pt: [],
      variations_pt: [],
    },
  });

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
      <div className="px-6">
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
            placeholder={placeholder || "Add item and press Enter"}
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

  const resetForm = () =>
    setForm({
      id: "",
      slug: "",
      type: "crisis",
      title: "",
      category: "",
      level: "",
      jurisdiction: "",
      do_not_do: [],
      do: [],
      content: {
        description: "",
        base_message: "",
        variants: { micro: "", standard: "", full: "" },
        risk_signs: { "pt-BR": [], en: [], es: [] },
        slang_variations: [],
        exceptions: [],
        signal_words: { "pt-BR": [], en: [], es: [] },
        emojis: [],
        slangs_pt: [],
        variations_pt: [],
      },
    });

  const onSubmit = async () => {
    if (editing?._id) {
      await updateCrisisPrompt({ id: editing._id, data: form });
    } else {
      await createCrisisPrompt(form);
    }
    setIsCreating(false);
    setEditing(null);
    resetForm();
    refetch();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-xl">
              <ShieldExclamationIcon className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Crisis Prompts
              </h1>
              <p className="text-gray-600">
                Manage high-risk crisis prompt templates
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCreating(true);
              setEditing(null);
              resetForm();
            }}
            className="inline-flex items-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" /> New Crisis Prompt
          </button>
        </div>

        {isFetching ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="space-y-4">
            {crisisPrompts?.map((cp) => (
              <div
                key={cp._id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {cp.title}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        ({cp.jurisdiction} • {cp.level})
                      </span>
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {cp.content.description}
                    </p>
                    <div className="mt-3 text-sm text-gray-700">
                      <div className="font-medium">Base message:</div>
                      <div className="whitespace-pre-line">
                        {cp.content.base_message}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditing(cp);
                        setIsCreating(true);
                        setForm(cp);
                      }}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                    >
                      <PencilIcon className="h-4 w-4 inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (cp._id) {
                          await deleteCrisisPrompt(cp._id);
                          refetch();
                        }
                      }}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      <TrashIcon className="h-4 w-4 inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(!crisisPrompts || crisisPrompts.length === 0) && (
              <div className="text-center text-gray-500">
                No crisis prompts yet.
              </div>
            )}
          </div>
        )}

        {isCreating && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-2 sm:p-6">
            <div className="bg-white rounded-2xl w-full max-w-5xl space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
              <div className="flex bg-gradient-to-r from-red-600 to-pink-600 p-6 items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {editing ? "Edit Crisis Prompt" : "Create Crisis Prompt"}
                </h2>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditing(null);
                  }}
                  className="text-gray-500"
                >
                  <XMarkIcon className="h-6 text-white w-6" />
                </button>
              </div>

              {/* Localized risk signs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(["pt-BR", "en", "es"] as const).map((loc) => (
                  <ChipInput
                    key={`risk-${loc}`}
                    label={`Risk signs (${loc})`}
                    values={form.content?.risk_signs?.[loc] || []}
                    onChange={(arr) =>
                      setForm({
                        ...form,
                        content: {
                          ...(form.content || ({} as any)),
                          risk_signs: {
                            ...(form.content?.risk_signs || ({} as any)),
                            [loc]: arr,
                          },
                        },
                      })
                    }
                  />
                ))}
              </div>

              {/* Signal words per locale */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(["pt-BR", "en", "es"] as const).map((loc) => (
                  <ChipInput
                    key={`signals-${loc}`}
                    label={`Signal words (${loc})`}
                    values={form.content?.signal_words?.[loc] || []}
                    onChange={(arr) =>
                      setForm({
                        ...form,
                        content: {
                          ...(form.content || ({} as any)),
                          signal_words: {
                            ...(form.content?.signal_words || ({} as any)),
                            [loc]: arr,
                          },
                        },
                      })
                    }
                  />
                ))}
              </div>

              {/* Generic arrays */}
              <ChipInput
                label="Slang variations"
                values={form.content?.slang_variations || []}
                onChange={(arr) =>
                  setForm({
                    ...form,
                    content: {
                      ...(form.content || ({} as any)),
                      slang_variations: arr,
                    },
                  })
                }
              />
              <ChipInput
                label="Exceptions"
                values={form.content?.exceptions || []}
                onChange={(arr) =>
                  setForm({
                    ...form,
                    content: {
                      ...(form.content || ({} as any)),
                      exceptions: arr,
                    },
                  })
                }
              />

              {/* Optional fields */}
              <ChipInput
                label="Emojis"
                values={form.content?.emojis || []}
                onChange={(arr) =>
                  setForm({
                    ...form,
                    content: { ...(form.content || ({} as any)), emojis: arr },
                  })
                }
              />
              <ChipInput
                label="Slangs (pt)"
                values={form.content?.slangs_pt || []}
                onChange={(arr) =>
                  setForm({
                    ...form,
                    content: {
                      ...(form.content || ({} as any)),
                      slangs_pt: arr,
                    },
                  })
                }
              />
              <ChipInput
                label="Variations (pt)"
                values={form.content?.variations_pt || []}
                onChange={(arr) =>
                  setForm({
                    ...form,
                    content: {
                      ...(form.content || ({} as any)),
                      variations_pt: arr,
                    },
                  })
                }
              />

              {/* Top-level arrays */}
              <ChipInput
                label="Do"
                values={form.do || []}
                onChange={(arr) => setForm({ ...form, do: arr })}
              />
              <ChipInput
                label="Do not do"
                values={form.do_not_do || []}
                onChange={(arr) => setForm({ ...form, do_not_do: arr })}
              />
              <div className="grid grid-cols-1 px-6 md:grid-cols-2 gap-4">
                <input
                  className="border rounded-lg p-2"
                  placeholder="ID"
                  value={form.id || ""}
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Slug"
                  value={form.slug || ""}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Title"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Category"
                  value={form.category || ""}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Level"
                  value={form.level || ""}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Jurisdiction"
                  value={form.jurisdiction || ""}
                  onChange={(e) =>
                    setForm({ ...form, jurisdiction: e.target.value })
                  }
                />
              </div>

              <div className="px-6">
                <textarea
                className="border rounded-lg p-2 w-full"
                rows={3}
                placeholder="Description"
                value={form.content?.description || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: {
                      ...(form.content || ({} as any)),
                      description: e.target.value,
                    },
                  })
                }
              />
              <textarea
                className="border rounded-lg p-2 w-full"
                rows={3}
                placeholder="Base message"
                value={form.content?.base_message || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: {
                      ...(form.content || ({} as any)),
                      base_message: e.target.value,
                    },
                  })
                }
              />
                </div>

              <div className="grid grid-cols-1 md:grid-cols-3 px-6 gap-4">
                <input
                  className="border rounded-lg p-2"
                  placeholder="Variant micro"
                  value={form.content?.variants?.micro || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      content: {
                        ...(form.content || ({} as any)),
                        variants: {
                          ...(form.content?.variants || ({} as any)),
                          micro: e.target.value,
                        },
                      },
                    })
                  }
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Variant standard"
                  value={form.content?.variants?.standard || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      content: {
                        ...(form.content || ({} as any)),
                        variants: {
                          ...(form.content?.variants || ({} as any)),
                          standard: e.target.value,
                        },
                      },
                    })
                  }
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Variant full"
                  value={form.content?.variants?.full || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      content: {
                        ...(form.content || ({} as any)),
                        variants: {
                          ...(form.content?.variants || ({} as any)),
                          full: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-end p-6">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 mr-4 rounded-lg bg-gray-100 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white"
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
