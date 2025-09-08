'use client'

import { ChartBarIcon, EyeIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

export default function AnalyticsContent() {
    return (
        <>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                        <ChartBarIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
                        <p className="text-gray-600">Platform insights and performance metrics</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">12,847</p>
                            <p className="text-xs text-green-600">+23% this month</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <EyeIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Page Views</p>
                            <p className="text-2xl font-bold text-gray-900">45,231</p>
                            <p className="text-xs text-green-600">+12% this month</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <ChartBarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">3.2%</p>
                            <p className="text-xs text-green-600">+0.5% this month</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">$8,432</p>
                            <p className="text-xs text-green-600">+18% this month</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coming Soon */}
            <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <ChartBarIcon className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Comprehensive analytics and reporting features are coming soon! You'll get detailed insights into user behavior and platform performance.
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-indigo-50 text-indigo-700 rounded-lg">
                    <div className="animate-pulse mr-2">📊</div>
                    Coming Soon
                </div>
            </div>
        </>
    )
}
