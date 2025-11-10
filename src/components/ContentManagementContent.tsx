"use client";

import {
  DocumentTextIcon,
  VideoCameraIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import FAQManagement from "./FAQManagement.tsx";
//@ts-ignore
import ResourceManagement from "./ResourceManagement.tsx";

export default function ContentManagementContent() {
  const [activeTab, setActiveTab] = useState("faqs");

  const tabs = [
    { id: "faqs", name: "FAQs", icon: DocumentTextIcon },
    { id: "privacy", name: "Privacy", icon: ShieldCheckIcon },
    { id: "user-manual", name: "User Manual", icon: VideoCameraIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
            <DocumentTextIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Content Management
            </h1>
            <p className="text-gray-600">
              Manage FAQs, Privacy Policy, and User Manual resources
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "faqs" && <FAQManagement />}
          {activeTab === "privacy" && <ResourceManagement type="privacy" />}
          {activeTab === "user-manual" && <ResourceManagement type="manual" />}
        </div>
      </div>
    </div>
  );
}
