'use client'

import { CalendarIcon, ChartBarIcon, ClockIcon, DocumentDownloadIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const userGrowthData = [
    { month: 'Jan', users: 8500, newUsers: 1200, premiumUsers: 2800 },
    { month: 'Feb', users: 9200, newUsers: 700, premiumUsers: 3100 },
    { month: 'Mar', users: 10100, newUsers: 900, premiumUsers: 3400 },
    { month: 'Apr', users: 10800, newUsers: 700, premiumUsers: 3600 },
    { month: 'May', users: 11500, newUsers: 700, premiumUsers: 3900 },
    { month: 'Jun', users: 12200, newUsers: 700, premiumUsers: 4200 },
    { month: 'Jul', users: 12847, newUsers: 647, premiumUsers: 4456 },
]

const sessionData = [
    { day: 'Mon', sessions: 240, duration: 120, satisfaction: 4.6 },
    { day: 'Tue', sessions: 280, duration: 135, satisfaction: 4.7 },
    { day: 'Wed', sessions: 320, duration: 150, satisfaction: 4.8 },
    { day: 'Thu', sessions: 290, duration: 140, satisfaction: 4.6 },
    { day: 'Fri', sessions: 350, duration: 165, satisfaction: 4.9 },
    { day: 'Sat', sessions: 310, duration: 155, satisfaction: 4.7 },
    { day: 'Sun', sessions: 270, duration: 130, satisfaction: 4.8 },
]

const emotionalTrends = [
    { category: 'Anxiety', value: 35, change: '+5%' },
    { category: 'Depression', value: 25, change: '-2%' },
    { category: 'Stress', value: 20, change: '+3%' },
    { category: 'Well-being', value: 20, change: '-1%' },
]

const revenueData = [
    { month: 'Jan', revenue: 42000, subscriptions: 2800, churn: 120 },
    { month: 'Feb', revenue: 45000, subscriptions: 3100, churn: 95 },
    { month: 'Mar', revenue: 48000, subscriptions: 3400, churn: 110 },
    { month: 'Apr', revenue: 52000, subscriptions: 3600, churn: 85 },
    { month: 'May', revenue: 55000, subscriptions: 3900, churn: 75 },
    { month: 'Jun', revenue: 58000, subscriptions: 4200, churn: 65 },
    { month: 'Jul', revenue: 61231, subscriptions: 4456, churn: 58 },
]

const geographicData = [
    { country: 'United States', users: 6847, sessions: 15420, revenue: 32800 },
    { country: 'Canada', users: 2147, sessions: 4820, revenue: 10200 },
    { country: 'United Kingdom', users: 1847, sessions: 4150, revenue: 8800 },
    { country: 'Australia', users: 1547, sessions: 3480, revenue: 7400 },
    { country: 'Germany', users: 1247, sessions: 2800, revenue: 6000 },
]

const featureUsage = [
    { feature: 'Chat Therapy', usage: 85, satisfaction: 4.7 },
    { feature: 'Emotional Diary', usage: 72, satisfaction: 4.5 },
    { feature: 'Personality Tests', usage: 68, satisfaction: 4.6 },
    { feature: 'Stress Scale', usage: 61, satisfaction: 4.4 },
    { feature: 'Daily Tools', usage: 58, satisfaction: 4.3 },
    { feature: 'Insomnia Tests', usage: 45, satisfaction: 4.2 },
]

export default function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState('7d')
    const [selectedMetric, setSelectedMetric] = useState('users')

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Analytics & Reports</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Comprehensive insights into platform performance, user behavior, and business metrics.
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                                <option value="1y">Last year</option>
                            </select>
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <DocumentDownloadIcon className="h-4 w-4 mr-2" />
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <UsersIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                        <dd className="text-lg font-medium text-gray-900">12,847</dd>
                                        <dd className="text-sm text-green-600">+12% from last month</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ClockIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Sessions</dt>
                                        <dd className="text-lg font-medium text-gray-900">2,341</dd>
                                        <dd className="text-sm text-green-600">+8% from last month</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ChartBarIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                                        <dd className="text-lg font-medium text-gray-900">$61,231</dd>
                                        <dd className="text-sm text-green-600">+23% from last month</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Avg. Session Time</dt>
                                        <dd className="text-lg font-medium text-gray-900">2h 15m</dd>
                                        <dd className="text-sm text-green-600">+5% from last month</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Growth Chart */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">User Growth Trends</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setSelectedMetric('users')}
                                className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'users'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Total Users
                            </button>
                            <button
                                onClick={() => setSelectedMetric('newUsers')}
                                className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'newUsers'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                New Users
                            </button>
                            <button
                                onClick={() => setSelectedMetric('premiumUsers')}
                                className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'premiumUsers'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Premium Users
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey={selectedMetric}
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Session Analytics & Revenue */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
                    {/* Session Analytics */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Analytics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={sessionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} />
                                <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Revenue Trends */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Emotional Trends & Feature Usage */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
                    {/* Emotional Trends */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Emotional Health Trends</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={emotionalTrends}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="category" />
                                <PolarRadiusAxis />
                                <Radar name="Current" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Feature Usage */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Usage & Satisfaction</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={featureUsage} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="feature" type="category" width={100} />
                                <Tooltip />
                                <Bar dataKey="usage" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Users
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sessions
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Revenue
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Market Share
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {geographicData.map((country, index) => (
                                    <tr key={country.country} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {country.country}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {country.users.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {country.sessions.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${country.revenue.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {((country.users / 12847) * 100).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Insights & Recommendations */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights & Recommendations</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-900">User Engagement</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    Session duration has increased by 15% this month. Consider expanding premium features to capitalize on user engagement.
                                </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <h4 className="font-medium text-green-900">Revenue Growth</h4>
                                <p className="text-sm text-green-700 mt-1">
                                    Premium subscription conversion rate is at 34.7%, above industry average. Focus on retention strategies.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <h4 className="font-medium text-yellow-900">Feature Optimization</h4>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Insomnia Tests show lowest satisfaction (4.2/5). Consider UI/UX improvements and content updates.
                                </p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-medium text-purple-900">Geographic Expansion</h4>
                                <p className="text-sm text-purple-700 mt-1">
                                    Strong performance in English-speaking countries. Consider localization for European markets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
