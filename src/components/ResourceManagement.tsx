"use client";

import React, { useState, useRef } from "react";
import {
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Upload } from "lucide-react";

export default function ResourceManagement() {
  const [activeTab, setActiveTab] = useState<"manual" | "privacy">("manual");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockResources = {
    manual: {
      name: "User_Manual_v1.2.pdf",
      uploadedAt: "2025-10-25",
      fileUrl: "https://example.com/User_Manual_v1.2.pdf",
    },
    privacy: {
      name: "Privacy_Policy_v1.0.pdf",
      uploadedAt: "2025-09-18",
      fileUrl: "https://example.com/Privacy_Policy_v1.0.pdf",
    },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", activeTab);

      const res = await fetch("/api/resources/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("Upload successful!");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="py-10 px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
          <p className="text-gray-600">
            Manage User Manual and Privacy Policy documents.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("manual")}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === "manual"
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          User Manual
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === "privacy"
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Current Resource Info */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <DocumentTextIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {mockResources[activeTab].name}
              </p>
              <p className="text-sm text-gray-500">
                Uploaded on {mockResources[activeTab].uploadedAt}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <a
              href={mockResources[activeTab].fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <EyeIcon className="h-5 w-5" />
            </a>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {selectedFile ? "Replace Resource" : "Upload New Resource"}
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.md"
            className="hidden"
            onChange={handleFileChange}
          />
          {!selectedFile ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow hover:scale-105 transition-transform"
            >
              <Upload className="h-5 w-5 mr-2" />
              Select File
            </button>
          ) : (
            <div>
              <p className="text-gray-700 mb-4">
                Selected: <span className="font-medium">{selectedFile.name}</span>
              </p>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`inline-flex items-center px-5 py-3 rounded-xl font-medium shadow ${
                  uploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-transform"
                }`}
              >
                {uploading ? "Uploading..." : "Upload File"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
