'use client'

import {
    BookOpenIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    CreditCardIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const stats = [
    { name: 'Total Users', value: '12,847', change: '+12%', changeType: 'positive', icon: UsersIcon },
    { name: 'Active Sessions', value: '2,341', change: '+8%', changeType: 'positive', icon: ChatBubbleLeftRightIcon },
    { name: 'Monthly Revenue', value: '$45,231', change: '+23%', changeType: 'positive', icon: CreditCardIcon },
    { name: 'AI Response Rate', value: '98.5%', change: '+2.1%', changeType: 'positive', icon: ChartBarIcon },
]

const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Active', lastActive: '2 hours ago', subscription: 'Premium' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', status: 'Active', lastActive: '4 hours ago', subscription: 'Free' },
    { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', status: 'Active', lastActive: '6 hours ago', subscription: 'Premium' },
    { name: 'James Wilson', email: 'j.wilson@example.com', status: 'Inactive', lastActive: '2 days ago', subscription: 'Free' },
]

const sessionData = [
    { name: 'Mon', sessions: 240, revenue: 1200 },
    { name: 'Tue', sessions: 280, revenue: 1400 },
    { name: 'Wed', sessions: 320, revenue: 1600 },
    { name: 'Thu', sessions: 290, revenue: 1450 },
    { name: 'Fri', sessions: 350, revenue: 1750 },
    { name: 'Sat', sessions: 310, revenue: 1550 },
    { name: 'Sun', sessions: 270, revenue: 1350 },
]

const emotionData = [
    { name: 'Anxiety', value: 35, color: '#ef4444' },
    { name: 'Depression', value: 25, color: '#8b5cf6' },
    { name: 'Stress', value: 20, color: '#f59e0b' },
    { name: 'Well-being', value: 20, color: '#10b981' },
]

const quickActions = [
    { name: 'User Management', description: 'Manage user accounts and permissions', icon: UsersIcon, href: '#' },
    { name: 'AI Model Settings', description: 'Configure AI parameters and responses', icon: Cog6ToothIcon, href: '#' },
    { name: 'Content Library', description: 'Manage therapeutic content and resources', icon: BookOpenIcon, href: '#' },
    { name: 'Analytics Report', description: 'Generate detailed performance reports', icon: ChartBarIcon, href: '#' },
]

export default function Dashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState('7d')

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome to the Open Therapy admin panel. Monitor your mental health platform's performance and manage users.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((item) => (
                        <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6">
                            <dt>
                                <div className="absolute rounded-md bg-blue-500 p-3">
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                                <p className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {item.change}
                                </p>
                            </dd>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
                    {/* Sessions & Revenue Chart */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Sessions & Revenue</h3>
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={sessionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} />
                                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Emotional State Distribution */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Emotional State Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={emotionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {emotionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions & Recent Users */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {quickActions.map((action) => (
                                    <a
                                        key={action.name}
                                        href={action.href}
                                        className="relative rounded-lg border border-gray-300 bg-white px-4 py-5 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <action.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900">{action.name}</p>
                                                <p className="text-sm text-gray-500">{action.description}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentUsers.map((user, index) => (
                                <div key={user.id || index} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${user.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {user.status}
                                            </span>
                                            <p className="text-sm text-gray-500 mt-1">{user.lastActive}</p>
                                            <p className="text-xs text-gray-400">{user.subscription}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Health & Notifications */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Health & Notifications</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <span className="text-sm text-green-800">AI Model: Operational</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                            <span className="text-sm text-blue-800">Database: Healthy</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <span className="text-sm text-yellow-800">3 Pending Reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
