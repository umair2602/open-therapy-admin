'use client'

import { StatsSkeleton } from '@/components/Skeleton'
import WelcomeBanner from '@/components/WelcomeBanner'
import { useEmotionalCategories } from '@/hooks/useEmotionalCategores'
import {
    ArrowRightIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function DashboardContent() {
    const { categories, isFetching } = useEmotionalCategories()

    if (isFetching) {
        return (
            <>
                <WelcomeBanner />
                <StatsSkeleton />
            </>
        )
    }

    return (
        <>
            {/* Welcome Banner */}
            <WelcomeBanner />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <UsersIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">1,247</p>
                            <p className="text-xs text-green-600">+12% from last month</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">AI Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">3,421</p>
                            <p className="text-xs text-green-600">+8% from last month</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <HeartIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Emotion Categories</p>
                            <p className="text-2xl font-bold text-gray-900">{categories?.length || 0}</p>
                            <p className="text-xs text-gray-500">Active categories</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <ChartBarIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Emotions</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {categories?.reduce((total, category) => total + category.emotions.length, 0) || 0}
                            </p>
                            <p className="text-xs text-gray-500">Across all categories</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <p className="text-sm text-gray-600">Latest updates and changes</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <HeartIcon className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">New emotion category created</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <UsersIcon className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">5 new users registered</p>
                                    <p className="text-xs text-gray-500">4 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">AI model updated</p>
                                    <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            <Link
                                href="/emotional-categories"
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                        <HeartIcon className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Manage Categories</p>
                                        <p className="text-xs text-gray-500">Edit emotional categories</p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                            </Link>

                            <Link
                                href="/users"
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <UsersIcon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">User Management</p>
                                        <p className="text-xs text-gray-500">View and manage users</p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </Link>

                            <Link
                                href="/analytics"
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                        <ChartBarIcon className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">View Analytics</p>
                                        <p className="text-xs text-gray-500">Platform insights</p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
