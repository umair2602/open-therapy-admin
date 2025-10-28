"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus, X, RefreshCw, Tag } from "lucide-react";

type EP = { id: string; name: string; tag: string; createdAt?: string; updatedAt?: string };

export default function ProfilesTab() {
  const [items, setItems] = useState<EP[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<EP>>({});

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/emotional-profile/profiles");
      const data = await res.json();
      setItems(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm({ id: `profile_${Date.now()}`, name: "", tag: "" });
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(p: EP) {
    setForm({ ...p });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function submit() {
    try {
      let res: Response;
      if (editingId) {
        res = await fetch(`/api/emotional-profile/profiles/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/emotional-profile/profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("Server error", data);
        throw new Error(data?.error || "Save failed");
      }
      setForm({});
      setEditingId(null);
      setShowForm(false);
      await load();
    } catch (e) {
      alert((e as Error).message || "Save failed");
    }
  }

  async function remove(id?: string) {
    if (!id || !confirm("Delete this profile?")) return;
    try {
      const res = await fetch(`/api/emotional-profile/profiles/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      setItems((s) => s.filter((i) => i.id !== id));
    } catch (e) {
      alert((e as Error).message || "Delete failed");
    }
  }

  return (
    <div>
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Emotional Profiles</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage profile tags used for personalizing the Bloom experience
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            New Profile
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : items.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No profiles yet</p>
          <p className="text-gray-400 mt-2">
            Click "New Profile" to create your first emotional profile
          </p>
        </div>
      ) : (
        /* Profiles Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-all hover:border-indigo-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(p)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Profile ID</span>
                  <p className="text-sm text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded mt-1">
                    {p.id}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Tag</span>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {p.tag}
                    </span>
                  </div>
                </div>
              </div>

              {(p.createdAt || p.updatedAt) && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                  {p.updatedAt && (
                    <div>Updated: {new Date(p.updatedAt).toLocaleDateString()}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingId ? "Edit Profile" : "Create New Profile"}
                  </h2>
                  <p className="text-indigo-100 text-sm">
                    {editingId ? "Update profile information" : "Add a new emotional profile"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({});
                  setEditingId(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile ID
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={form.id ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                  placeholder="e.g., profile_123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  disabled={!!editingId}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for this profile (cannot be changed after creation)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={form.name ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g., Empathetic Leader"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Descriptive name for this emotional profile
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={form.tag ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                  placeholder="e.g., empathy-high"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Short tag used for categorization and filtering
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl border-t border-gray-200">
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({});
                  setEditingId(null);
                }}
                className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={!form.id || !form.name || !form.tag}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId ? "Update Profile" : "Create Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}