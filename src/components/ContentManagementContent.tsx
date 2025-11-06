"use client";

import {
  DocumentTextIcon,
  VideoCameraIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import FAQManagement from "./FAQManagement.tsx";
//@ts-ignore
import ResourceManagement from "./ResourceManagement.tsx";

export default function ContentManagementContent() {
  const [activeTab, setActiveTab] = useState("faqs");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "faqs", name: "FAQs", icon: DocumentTextIcon },
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
              Manage FAQs and User Manual resources
            </p>
          </div>
        </div>
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New
        </button>
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

        {/* Filters + Search */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tab Content Placeholder */}
        <div className="p-8 text-center text-gray-500">
          {activeTab === "faqs" ? <FAQManagement/> : (
            <ResourceManagement/>
          )}
        </div>
      </div>
    </div>
  );
}
