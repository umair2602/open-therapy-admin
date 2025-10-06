"use client";

import {
  ChatBubbleLeftRightIcon,
  CogIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function AIManagementContent() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Management</h1>
            <p className="text-gray-600">
              Configure and monitor AI therapy models
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">342</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <CogIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Model Version</p>
                            <p className="text-2xl font-bold text-gray-900">v2.1.3</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <SparklesIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Response Time</p>
                            <p className="text-2xl font-bold text-gray-900">1.2s</p>
                        </div>
                    </div>
                </div>
            </div> */}

      {/* Coming Soon */}
      <div className="text-center py-16">
        <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <ChatBubbleLeftRightIcon className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Management</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Advanced AI model configuration and monitoring tools are coming soon!
          You'll be able to fine-tune responses and track performance.
        </p>
        <div className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-lg">
          <div className="animate-pulse mr-2">🤖</div>
          Coming Soon
        </div>
      </div>
    </>
  );
}
