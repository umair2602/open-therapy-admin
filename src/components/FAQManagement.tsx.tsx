"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function FAQManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [faqs, setFaqs] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    isActive: true,
    displayOrder: 0,
  });

  const categories = ["General", "Therapy", "Platform", "Billing", "Privacy"];

  // ✅ Fetch FAQs
  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/faq");
      const data = await res.json();
      console.log("Fetched FAQs:", data);
      setFaqs(data?.data);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleOpenModal = (mode: "create" | "edit", faq?: any) => {
    setModalMode(mode);
    if (mode === "edit" && faq) {
      setSelectedFAQ(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        isActive: faq.isActive,
        displayOrder: faq.displayOrder,
      });
    } else {
      setFormData({
        question: "",
        answer: "",
        category: "General",
        isActive: true,
        displayOrder: faqs.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFAQ(null);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      isActive: true,
      displayOrder: 0,
    });
  };

  // ✅ Create or Update FAQ
  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const method = modalMode === "create" ? "POST" : "PUT";
      const url =
        modalMode === "create"
          ? "/api/faq"
          : `/api/faq/${selectedFAQ._id || selectedFAQ.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save FAQ");
      await fetchFAQs();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving FAQ:", err);
      alert("Something went wrong while saving FAQ.");
    }
  };

  // ✅ Delete FAQ
  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete FAQ");
      await fetchFAQs();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  // ✅ Change Order Locally
  const moveOrder = (id: number, direction: "up" | "down") => {
    const index = faqs.findIndex((f) => f.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === faqs.length - 1)
    ) {
      return;
    }

    const newFaqs = [...faqs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newFaqs[index], newFaqs[targetIndex]] = [
      newFaqs[targetIndex],
      newFaqs[index],
    ];

    newFaqs.forEach((faq, idx) => {
      faq.displayOrder = idx + 1;
    });

    setFaqs(newFaqs);
  };

  const filteredFAQs = faqs?.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                <QuestionMarkCircleIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  FAQ Management
                </h1>
                <p className="text-gray-600">
                  Manage frequently asked questions
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal("create")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New FAQ
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center text-gray-500 py-12">
                Loading FAQs...
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs?.map((faq, index) => (
                  <div
                    key={faq._id || faq.id}
                    className="border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveOrder(faq.id, "up")}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronUpIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => moveOrder(faq.id, "down")}
                            disabled={index === filteredFAQs?.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronDownIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() =>
                            setExpandedFAQ(
                              expandedFAQ === faq.id ? null : faq.id
                            )
                          }
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              {faq.question}
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {faq.category}
                            </span>
                            {!faq.isActive && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </div>
                          {expandedFAQ === faq.id && (
                            <p className="text-sm text-gray-600 mt-2">
                              {faq.answer}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Order: {faq.displayOrder} • Created:{" "}
                            {faq.createdAt
                              ? new Date(faq.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              : "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenModal("edit", faq)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id || faq.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredFAQs.length === 0 && !loading && (
              <div className="text-center py-12">
                <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No FAQs found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new FAQ.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalMode === "create" ? "Create New FAQ" : "Edit FAQ"}
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter the question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.answer}
                    onChange={(e) =>
                      setFormData({ ...formData, answer: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter the answer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.displayOrder}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          displayOrder: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-900 cursor-pointer"
                  >
                    Active (visible to users)
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                  >
                    {modalMode === "create" ? "Create FAQ" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
  );
}
