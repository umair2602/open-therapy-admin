'use client'

import { MagnifyingGlassIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function UsersContent() {
    return (
        <>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                            <UsersIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                            <p className="text-gray-600">Manage and monitor platform users</p>
                        </div>
                    </div>
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
                        <UserPlusIcon className="h-5 w-5 mr-2" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option>All Users</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option>All Plans</option>
                            <option>Free</option>
                            <option>Premium</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Coming Soon */}
            <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <UsersIcon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">User Management</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    This feature is coming soon! You'll be able to manage users, view their profiles, and monitor their activity.
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-700 rounded-lg">
                    <div className="animate-pulse mr-2">🚀</div>
                    Coming Soon
                </div>
            </div>
        </>
    )
}
