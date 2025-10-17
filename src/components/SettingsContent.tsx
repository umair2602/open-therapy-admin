'use client'

import {
    BellIcon,
    CloudIcon,
    CogIcon,
    ServerIcon,
    ShieldCheckIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function SettingsContent() {
    const [activeTab, setActiveTab] = useState('general')

    const tabs = [
        { id: 'general', name: 'General', icon: CogIcon },
        { id: 'notifications', name: 'Notifications', icon: BellIcon },
        { id: 'security', name: 'Security', icon: ShieldCheckIcon },
        { id: 'profile', name: 'Profile', icon: UserIcon },
        { id: 'system', name: 'System', icon: ServerIcon },
    ]

    return <div className="text-center py-16">
        <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <CogIcon className="h-12 w-12 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Settings
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          This feature is coming soon!
        </p>
        <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-700 rounded-lg">
          <div className="animate-pulse mr-2">🚀</div>
          Coming Soon
        </div>
      </div>

    return (
        <>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg">
                        <CogIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600">Manage your platform configuration and preferences</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <tab.icon className="h-5 w-5" />
                                    <span className="text-sm font-medium">{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        {activeTab === 'general' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Platform Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Open Therapy"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Default Language
                                        </label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>German</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time Zone
                                        </label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>UTC-8 (Pacific)</option>
                                            <option>UTC-5 (Eastern)</option>
                                            <option>UTC+0 (GMT)</option>
                                            <option>UTC+1 (Central European)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                                            <p className="text-sm text-gray-500">Enable maintenance mode to restrict access</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                                            <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">System Alerts</h3>
                                            <p className="text-sm text-gray-500">Get notified about system issues</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Session Timeout (minutes)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue="30"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">IP Whitelist</h3>
                                            <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">AU</span>
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                                Change Avatar
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Admin User"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="admin@opentherapy.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Super Admin"
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'system' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <ServerIcon className="h-5 w-5 text-gray-600" />
                                                <h3 className="text-sm font-medium text-gray-900">Database Status</h3>
                                            </div>
                                            <p className="text-sm text-gray-600">Connected</p>
                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <CloudIcon className="h-5 w-5 text-gray-600" />
                                                <h3 className="text-sm font-medium text-gray-900">Storage Usage</h3>
                                            </div>
                                            <p className="text-sm text-gray-600">2.4 GB / 10 GB</p>
                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Backup Frequency
                                        </label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>Daily</option>
                                            <option>Weekly</option>
                                            <option>Monthly</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Auto Updates</h3>
                                            <p className="text-sm text-gray-500">Automatically install security updates</p>
                                        </div>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-end space-x-3">
                                <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
