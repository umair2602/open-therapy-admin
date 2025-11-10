"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Upload } from "lucide-react";

interface ResourceManagementProps {
  type: "manual" | "privacy";
}

interface Resource {
  _id: string;
  name: string;
  fileUrl: string;
  uploadedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ResourceManagement({ type }: ResourceManagementProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<Resource | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = type === "manual" ? "User Manual" : "Privacy Policy";

  // Fetch current resource from database
  const fetchResource = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/resources?type=${type}&isActive=true`);

      if (!res.ok) {
        throw new Error("Failed to fetch resources");
      }

      const data = await res.json();

      if (
        data.success &&
        data.data &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        // Get the most recent active resource (already sorted by updatedAt desc)
        const activeResource = data.data[0];
        setResource({
          _id: activeResource._id || activeResource.id,
          name: activeResource.name,
          fileUrl: activeResource.fileUrl,
          uploadedAt: activeResource.updatedAt || activeResource.createdAt,
          createdAt: activeResource.createdAt,
          updatedAt: activeResource.updatedAt,
        });
      } else {
        setResource(null);
      }
    } catch (err) {
      console.error("Error fetching resource:", err);
      setResource(null);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchResource();
  }, [fetchResource]);

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
      formData.append("type", type);

      const res = await fetch("/api/resources/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const uploadedResource = await res.json();

      // Update the resource state with the new upload
      setResource({
        _id: uploadedResource._id || uploadedResource.id,
        name: uploadedResource.name,
        fileUrl: uploadedResource.fileUrl,
        uploadedAt: uploadedResource.updatedAt || uploadedResource.createdAt,
        createdAt: uploadedResource.createdAt,
        updatedAt: uploadedResource.updatedAt,
      });

      alert("Upload successful!");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh the resource to ensure we have the latest data
      await fetchResource();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full">
      {/* Current Resource Info */}
      {loading ? (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="text-center text-gray-500 py-4">
            Loading resource...
          </div>
        </div>
      ) : resource ? (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <DocumentTextIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {resource.name}
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded on {formatDate(resource.uploadedAt)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="View file"
              >
                <EyeIcon className="h-5 w-5" />
              </a>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                title="Replace file"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="text-center text-gray-500 py-4">
            <DocumentTextIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No {title.toLowerCase()} uploaded yet</p>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {selectedFile ? `Replace ${title}` : `Upload New ${title}`}
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.md,.docx"
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
                Selected:{" "}
                <span className="font-medium">{selectedFile.name}</span>
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
