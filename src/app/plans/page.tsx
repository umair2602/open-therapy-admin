"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

/* -------------------------------------------------
   Types
   ------------------------------------------------- */
interface Feature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  _id?: string;               // MongoDB id (only present when fetched)
  id: string;                 // custom plan identifier
  icon: "Star" | "Key" | "Users";
  title: string;
  subtitle: string;
  price: string;
  priceSubtitle: string;
  advantage?: string;
  detail?: string;
  features: Feature[];
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  isActive: boolean;
  displayOrder: number;
}

type FormData = Omit<PricingPlan, "_id">;

/* -------------------------------------------------
   Component
   ------------------------------------------------- */
export default function PricingPlansPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState<FormData>(getEmptyForm());

  /* ------------------------------------------------- */
  useEffect(() => {
    fetchPlans();
  }, []);

  function getEmptyForm(): FormData {
    return {
      id: "",
      icon: "Star",
      title: "",
      subtitle: "",
      price: "",
      priceSubtitle: "",
      advantage: "",
      detail: "",
      features: [],
      buttonText: "",
      buttonVariant: "secondary",
      isActive: true,
      displayOrder: 0,
    };
  }

  async function fetchPlans() {
    try {
      const res = await fetch("/api/pricing-plans");
      const data: PricingPlan[] = await res.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingPlan
        ? `/api/pricing-plans/${editingPlan._id}`
        : "/api/pricing-plans";

      const method = editingPlan ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchPlans();
        closeModal();
      } else {
        const error = await res.json();
        alert(error.message ?? "Error saving plan");
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Error saving plan");
    }
  }

  function closeModal() {
    setShowModal(false);
    setEditingPlan(null);
    setFormData(getEmptyForm());
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await fetch(`/api/pricing-plans/${id}`, { method: "DELETE" });
      await fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  }

  function openModal(plan: PricingPlan | null = null) {
    if (plan) {
      setEditingPlan(plan);
      // Strip `_id` from the form (API expects only the fields in FormData)
      const { _id, ...rest } = plan;
      setFormData(rest as FormData);
    } else {
      setEditingPlan(null);
      setFormData(getEmptyForm());
    }
    setShowModal(true);
  }

  function addFeature() {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { text: "", included: true }],
    }));
  }

  function updateFeature(index: number, field: keyof Feature, value: string | boolean) {
    setFormData((prev) => {
      const newFeatures = [...prev.features];
      // @ts-ignore – index is guaranteed to exist
      newFeatures[index][field] = value;
      return { ...prev, features: newFeatures };
    });
  }

  function removeFeature(index: number) {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  }

  async function moveOrder(plan: PricingPlan, direction: -1 | 1) {
    const newOrder = plan.displayOrder + direction;
    try {
      await fetch(`/api/pricing-plans/${plan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...plan, displayOrder: newOrder }),
      });
      await fetchPlans();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  const iconOptions: PricingPlan["icon"][] = ["Star", "Key", "Users"];

  /* -------------------------------------------------
     Render
     ------------------------------------------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Pricing Plans</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Plan
          </button>
        </div>

        {/* Plans list */}
        <div className="grid gap-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        plan.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="text-sm text-gray-500">
                      Order: {plan.displayOrder}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{plan.subtitle}</p>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {plan.priceSubtitle}
                    </span>
                  </div>

                  {(plan.advantage || plan.detail) && (
                    <div className="flex gap-2 mb-3">
                      {plan.advantage && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">
                          {plan.advantage}
                        </span>
                      )}
                      {plan.detail && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          {plan.detail}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <span
                          className={
                            feature.included ? "text-green-500" : "text-red-500"
                          }
                        >
                          {feature.included ? "✓" : "✗"}
                        </span>
                        {feature.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveOrder(plan, -1)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Move up"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveOrder(plan, 1)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Move down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => openModal(plan)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(plan._id!)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {editingPlan ? "Edit Plan" : "Add New Plan"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.id}
                        onChange={(e) =>
                          setFormData({ ...formData, id: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="e.g., openthera_premium_monthly"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon *
                      </label>
                      <select
                        required
                        value={formData.icon}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            icon: e.target.value as PricingPlan["icon"],
                          })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subtitle}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitle: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  {/* Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="R$ 39,00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Subtitle *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.priceSubtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priceSubtitle: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="/ mês"
                      />
                    </div>
                  </div>

                  {/* Advantage / Detail */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Advantage (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.advantage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            advantage: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="mais vantajoso"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detail (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.detail}
                        onChange={(e) =>
                          setFormData({ ...formData, detail: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="30% OFF"
                      />
                    </div>
                  </div>

                  {/* Button text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Button Text *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.buttonText}
                      onChange={(e) =>
                        setFormData({ ...formData, buttonText: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  {/* Button variant, order, active */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Variant *
                      </label>
                      <select
                        required
                        value={formData.buttonVariant}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            buttonVariant: e.target.value as "primary" | "secondary",
                          })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            displayOrder: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isActive: e.target.checked,
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Active
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Features
                      </label>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-blue-600 text-sm hover:text-blue-700"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={feature.text}
                            onChange={(e) =>
                              updateFeature(idx, "text", e.target.value)
                            }
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                            placeholder="Feature text"
                          />
                          <label className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded">
                            <input
                              type="checkbox"
                              checked={feature.included}
                              onChange={(e) =>
                                updateFeature(idx, "included", e.target.checked)
                              }
                              className="w-4 h-4"
                            />
                            <span className="text-sm">Included</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal actions */}
                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {editingPlan ? "Update Plan" : "Create Plan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}