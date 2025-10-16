"use client";

import { useBooks } from "@/hooks/useBooks";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

type DraftBook = {
  _id?: string;
  category: string;
  title: string;
  description: string;
  imageURL?: string;
  pdfURL?: string;
  author: string;
  emotionalProfile?: string[];
  directionTags?: string[];
  lifeAreas?: string[];
};

const supportedAreas = [
  "work",
  "relationships",
  "health",
  "family",
  "personal_growth",
  "love",
  "friendship",
  "studies",
  "finances",
  "self-care",
  "physical_wellbeing",
  "mental_wellbeing",
  "self_knowledge",
  "purpose",
  "spirituality_intuition",
  "self_esteem",
];

const directionTags = [
  "tensa e agitada",
  "animada e confiante",
  "desanimada e apática",
  "calma e leve",
];

export default function BooksContent() {
  const {
    books,
    isFetching,
    createBook,
    updateBook,
    deleteBook,
    uploadImage,
    uploadPdf,
  } = useBooks();
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<DraftBook>({
    category: "",
    title: "",
    description: "",
    imageURL: "",
    pdfURL: "",
    author: "",
    emotionalProfile: [],
    directionTags: [],
    lifeAreas: [],
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const closeModal = () => {
    setModalOpen(false);
    setDraft({
      category: "",
      title: "",
      description: "",
      imageURL: "",
      pdfURL: "",
      author: "",
      emotionalProfile: [],
      directionTags: [],
      lifeAreas: [],
    });
  };

  const onSave = async () => {
    console.log("Draft", draft);
    if (!draft.title || !draft.category || !draft.author) return;
    if (draft._id) {
      await updateBook({ id: draft._id, data: draft });
    } else {
      await createBook(draft);
    }
    closeModal();
  };

  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const handleImageFile = async (file: File) => {
    setImageError(null);
    const objectUrl = URL.createObjectURL(file);
    try {
      // Load image to validate dimensions
      const loaded = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () =>
          reject(new Error("Failed to load image for validation"));
        img.src = objectUrl;
      });

      const width = loaded.width;
      const height = loaded.height;
      const isAllowed = true;
      // (width === 72 && height === 72) || (width === 191 && height === 275);

      if (!isAllowed) {
        setImageError(
          `Invalid image dimensions ${width}x${height}. Allowed: 72x72 or 191x275.`
        );
        return;
      }

      setUploading(true);
      const url = await uploadImage(file);
      setDraft((d) => ({ ...d, imageURL: url }));
    } catch (err: any) {
      setImageError(err?.message || "Image upload failed");
    } finally {
      URL.revokeObjectURL(objectUrl);
      setUploading(false);
    }
  };

  const handlePdfFile = async (file: File) => {
    setPdfError(null);
    if (file.type !== "application/pdf") {
      setPdfError("Only PDF files are allowed.");
      return;
    }
    try {
      setPdfUploading(true);
      const url = await uploadPdf(file);
      setDraft((d) => ({ ...d, pdfURL: url }));
    } catch (err: any) {
      setPdfError(err?.message || "PDF upload failed");
    } finally {
      setPdfUploading(false);
    }
  };

  const tableRows = useMemo(() => books ?? [], [books]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Books Library</h1>
          <p className="text-gray-600">
            Manage books: create, edit, and delete
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> New Book
        </button>
      </div>

      {isFetching && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            Loading books...
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows.map((b) => (
                <tr key={b._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.imageURL ? (
                      <img
                        src={b.imageURL}
                        alt={b.title}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setDraft({
                          _id: b._id,
                          category: b.category,
                          title: b.title,
                          description: b.description,
                          imageURL: b.imageURL,
                          pdfURL: (b as any).pdfURL,
                          author: b.author,
                        });
                        setModalOpen(true);
                      }}
                      className="mr-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!b._id) return;
                        try {
                          setDeletingId(b._id);
                          await deleteBook(b._id);
                        } finally {
                          setDeletingId(null);
                        }
                      }}
                      disabled={deletingId === b._id}
                      className={`px-3 py-2 text-sm rounded-lg ${
                        deletingId === b._id
                          ? "bg-red-200 text-red-400 cursor-not-allowed"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {deletingId === b._id ? (
                        "Deleting…"
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {tableRows.length === 0 && !isFetching && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    No books yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {draft._id ? "Edit Book" : "New Book"}
                </h2>
                <button
                  onClick={closeModal}
                  className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    value={draft.category}
                    onChange={(e) =>
                      setDraft({ ...draft, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    value={draft.author}
                    onChange={(e) =>
                      setDraft({ ...draft, author: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageFile(f);
                      }}
                      className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-lg border-gray-300"
                    />
                    {uploading && (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    )}
                  </div>
                  {imageError && (
                    <p className="mt-1 text-xs text-red-600">{imageError}</p>
                  )}
                  {draft.imageURL && (
                    <div className="mt-2">
                      <img
                        src={draft.imageURL}
                        alt="preview"
                        className="h-16 w-16 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content (PDF only)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handlePdfFile(f);
                      }}
                      className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-lg border-gray-300"
                    />
                    {pdfUploading && (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    )}
                  </div>
                  {pdfError && (
                    <p className="mt-1 text-xs text-red-600">{pdfError}</p>
                  )}
                  {draft.pdfURL && (
                    <div className="mt-2">
                      <a
                        href={draft.pdfURL}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        View uploaded PDF
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                  rows={8}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emotional Profile
                </label>
                <div className="flex flex-wrap gap-2">
                  {["PE01", "PE02", "PE03", "PE04", "PE05", "PE06"].map(
                    (code) => {
                      const selected = draft.emotionalProfile?.includes(code);
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => {
                            setDraft((d) => {
                              const selected = d.emotionalProfile || [];
                              return selected.includes(code)
                                ? {
                                    ...d,
                                    emotionalProfile: selected.filter(
                                      (c) => c !== code
                                    ),
                                  }
                                : {
                                    ...d,
                                    emotionalProfile: [...selected, code],
                                  };
                            });
                          }}
                          className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${
                            selected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {code}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
              {/* Direction Tags */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direction Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {directionTags.map((tag) => {
                    const selected = draft.directionTags?.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setDraft((d) => {
                            const selected = d.directionTags || [];
                            return selected.includes(tag)
                              ? {
                                  ...d,
                                  directionTags: selected.filter(
                                    (t) => t !== tag
                                  ),
                                }
                              : { ...d, directionTags: [...selected, tag] };
                          });
                        }}
                        className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${
                          selected
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Life Areas */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Life Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {supportedAreas.map((area) => {
                    const selected = draft.lifeAreas?.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => {
                          setDraft((d) => {
                            const selected = d.lifeAreas || [];
                            return selected.includes(area)
                              ? {
                                  ...d,
                                  lifeAreas: selected.filter((a) => a !== area),
                                }
                              : { ...d, lifeAreas: [...selected, area] };
                          });
                        }}
                        className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${
                          selected
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
