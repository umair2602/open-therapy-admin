"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus, X, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

type Option = { id: string; text: string };
type EQ = { id: number; category: string; question: string; options: Option[] };

function EmotionalProfileContent() {
  const [items, setItems] = useState<EQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<EQ>>({ options: [] });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/emotional-profile");
      const data = await res.json();
      setItems(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setForm({ id: (items.length ? items[items.length - 1].id + 1 : 1), category: "", question: "", options: [] });
    setShowForm(true);
  }

  function openEdit(it: EQ) {
    setForm(JSON.parse(JSON.stringify(it)));
    setShowForm(true);
  }

  function updateOption(idx: number, key: keyof Option, value: string) {
    setForm((f) => {
      const options = (f.options || []).slice();
      options[idx] = { ...(options[idx] || { id: `opt_${idx}` }), [key]: value } as Option;
      return { ...f, options } as Partial<EQ>;
    });
  }

  function addOption() {
    setForm((f) => ({ ...(f as any), options: [...(f.options || []), { id: `opt_${Date.now()}`, text: "" }] }));
  }

  function removeOption(idx: number) {
    setForm((f) => ({ ...(f as any), options: (f.options || []).filter((_, i) => i !== idx) }));
  }

  async function submit() {
    try {
      const res = await fetch("/api/emotional-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
      setShowForm(false);
      await load();
    } catch (e) {
      alert("Save failed");
    }
  }

  async function remove(id?: number) {
    if (id === undefined || !confirm("Delete this question?")) return;
    try {
      const res = await fetch(`/api/emotional-profile/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      setItems((s) => s.filter((i) => i.id !== id));
    } catch (e) {
      alert("Delete failed");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Emotional Profile Questions</h1>
              <p className="text-gray-600 mt-1">Manage your emotional intelligence assessment questions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={load}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                Create Question
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No questions yet</p>
              <p className="text-gray-400 mt-2">Click "Create Question" to add your first question</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                          {it.id}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {it.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{it.question}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(it.options || []).map((opt, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm border border-gray-200">
                            {opt.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openEdit(it)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => remove(it.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {form?.id ? `Edit Question #${form.id}` : "Create New Question"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question ID</label>
                  <input
                    type="number"
                    value={form.id ?? ""}
                    onChange={(e) => setForm((s) => ({ ...(s as any), id: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={form.category ?? ""}
                    onChange={(e) => setForm((s) => ({ ...(s as any), category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Self-awareness, Empathy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  value={form.question ?? ""}
                  onChange={(e) => setForm((s) => ({ ...(s as any), question: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Enter your question here..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Answer Options</label>
                  <button
                    onClick={addOption}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Option
                  </button>
                </div>
                <div className="space-y-3">
                  {(form.options || []).map((opt, i) => (
                    <div key={i} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1 grid grid-cols-4 gap-3">
                        <input
                          value={opt.id}
                          onChange={(e) => updateOption(i, "id", e.target.value)}
                          placeholder="Option ID"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                        <input
                          value={opt.text}
                          onChange={(e) => updateOption(i, "text", e.target.value)}
                          placeholder="Option text"
                          className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeOption(i)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {(form.options || []).length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No options added yet. Click "Add Option" to create answer choices.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <DashboardLayout>
    <EmotionalProfileContent />
  </DashboardLayout>;
}