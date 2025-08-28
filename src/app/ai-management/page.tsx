'use client'

import { Cog6ToothIcon, CogIcon, DocumentTextIcon, ExclamationTriangleIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const aiModels = [
    {
        id: 1,
        name: 'GPT-4 Therapy Assistant',
        status: 'Active',
        version: '4.0.2',
        lastUpdated: '2024-03-15',
        responseTime: '1.2s',
        accuracy: '94.2%',
        usage: 'High',
    },
    {
        id: 2,
        name: 'Emotion Analysis Model',
        status: 'Active',
        version: '3.1.0',
        lastUpdated: '2024-03-10',
        responseTime: '0.8s',
        accuracy: '91.8%',
        usage: 'Medium',
    },
    {
        id: 3,
        name: 'Personality Assessment AI',
        status: 'Training',
        version: '2.5.1',
        lastUpdated: '2024-03-12',
        responseTime: '2.1s',
        accuracy: '87.3%',
        usage: 'Low',
    },
]

const responseTemplates = [
    {
        id: 1,
        name: 'Anxiety Support',
        category: 'Mental Health',
        content: 'I understand you\'re feeling anxious. Let\'s take a moment to breathe together...',
        usage: 1247,
        lastModified: '2024-03-14',
    },
    {
        id: 2,
        name: 'Depression Guidance',
        category: 'Mental Health',
        content: 'It\'s okay to feel this way. Depression can be overwhelming, but you\'re not alone...',
        usage: 892,
        lastModified: '2024-03-13',
    },
    {
        id: 3,
        name: 'Stress Management',
        category: 'Wellness',
        content: 'Stress is a natural response, but we can learn to manage it better...',
        usage: 1563,
        lastModified: '2024-03-15',
    },
]

const performanceMetrics = [
    { metric: 'Average Response Time', value: '1.4s', change: '-0.2s', trend: 'positive' },
    { metric: 'User Satisfaction', value: '4.7/5', change: '+0.1', trend: 'positive' },
    { metric: 'Accuracy Rate', value: '93.1%', change: '+1.2%', trend: 'positive' },
    { metric: 'Error Rate', value: '2.3%', change: '-0.5%', trend: 'positive' },
    { metric: 'Daily Active Sessions', value: '2,847', change: '+156', trend: 'positive' },
]

export default function AIModelManagement() {
    const [selectedModel, setSelectedModel] = useState<number | null>(null)
    const [isTraining, setIsTraining] = useState(false)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800'
            case 'Training': return 'bg-yellow-100 text-yellow-800'
            case 'Inactive': return 'bg-gray-100 text-gray-800'
            case 'Error': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getUsageColor = (usage: string) => {
        switch (usage) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">AI Model Management</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Configure AI models, manage response templates, and monitor performance metrics.
                    </p>
                </div>

                {/* Performance Overview */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 mb-8">
                    {performanceMetrics.map((metric) => (
                        <div key={metric.metric} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-1">
                                        <dt className="text-sm font-medium text-gray-500 truncate">{metric.metric}</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</dd>
                                        <dd className={`text-sm font-medium ${metric.trend === 'positive' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {metric.change}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Models Section */}
                <div className="bg-white shadow rounded-lg mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">AI Models</h3>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                                Deploy New Model
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Model
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Version
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Performance
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Usage
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {aiModels.map((model) => (
                                    <tr key={model.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    <Cog6ToothIcon className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{model.name}</div>
                                                    <div className="text-sm text-gray-500">ID: {model.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${getStatusColor(model.status)}`}>
                                                {model.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {model.version}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{model.responseTime}</div>
                                            <div className="text-sm text-gray-500">Accuracy: {model.accuracy}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${getUsageColor(model.usage)}`}>
                                                {model.usage}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {model.lastUpdated}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <CogIcon className="h-4 w-4" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-900">
                                                    <PlayIcon className="h-4 w-4" />
                                                </button>
                                                <button className="text-yellow-600 hover:text-yellow-900">
                                                    <PauseIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Response Templates Section */}
                <div className="bg-white shadow rounded-lg mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Response Templates</h3>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <DocumentTextIcon className="h-4 w-4 mr-2" />
                                Create Template
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Template
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Content Preview
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Usage
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Modified
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {responseTemplates.map((template) => (
                                    <tr key={template.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{template.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {template.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {template.content}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {template.usage.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {template.lastModified}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <DocumentTextIcon className="h-4 w-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <CogIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Model Training & Monitoring */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Training Status */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Model Training Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse"></div>
                                    <span className="text-sm text-yellow-800">Personality Assessment AI</span>
                                </div>
                                <span className="text-sm text-yellow-600">Training... 67%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                    <span className="text-sm text-green-800">Emotion Analysis Model</span>
                                </div>
                                <span className="text-sm text-green-600">Ready</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsTraining(!isTraining)}
                            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isTraining ? 'Stop Training' : 'Start Training'}
                        </button>
                    </div>

                    {/* System Alerts */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                                <div className="text-sm text-red-800">
                                    <p className="font-medium">High response latency detected</p>
                                    <p className="text-red-600">Average response time: 3.2s</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                                <div className="text-sm text-yellow-800">
                                    <p className="font-medium">Model accuracy below threshold</p>
                                    <p className="text-yellow-600">Current: 87.3% (Target: 90%)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
