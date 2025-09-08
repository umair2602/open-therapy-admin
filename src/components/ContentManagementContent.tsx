'use client'

import {
    BookOpenIcon,
    DocumentTextIcon,
    EyeIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    PlusIcon,
    SpeakerWaveIcon,
    TrashIcon,
    VideoCameraIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ContentManagementContent() {
    const [activeTab, setActiveTab] = useState('articles')
    const [searchQuery, setSearchQuery] = useState('')

    const tabs = [
        { id: 'articles', name: 'Articles', icon: DocumentTextIcon, count: 24 },
        { id: 'videos', name: 'Videos', icon: VideoCameraIcon, count: 12 },
        { id: 'audio', name: 'Audio', icon: SpeakerWaveIcon, count: 8 },
        { id: 'resources', name: 'Resources', icon: BookOpenIcon, count: 15 },
    ]

    const sampleContent = [
        {
            id: 1,
            title: "Understanding Anxiety: A Complete Guide",
            type: "article",
            status: "published",
            author: "Dr. Sarah Johnson",
            createdAt: "2024-01-15",
            views: 1250,
            category: "Mental Health"
        },
        {
            id: 2,
            title: "Mindfulness Meditation Techniques",
            type: "video",
            status: "draft",
            author: "Dr. Michael Chen",
            createdAt: "2024-01-14",
            views: 890,
            category: "Wellness"
        },
        {
            id: 3,
            title: "Stress Management Audio Guide",
            type: "audio",
            status: "published",
            author: "Dr. Emma Davis",
            createdAt: "2024-01-13",
            views: 2100,
            category: "Stress Relief"
        },
        {
            id: 4,
            title: "Cognitive Behavioral Therapy Workbook",
            type: "resource",
            status: "published",
            author: "Dr. James Wilson",
            createdAt: "2024-01-12",
            views: 3400,
            category: "Therapy"
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-800'
            case 'draft': return 'bg-yellow-100 text-yellow-800'
            case 'archived': return 'bg-gray-100 text-gray-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'article': return DocumentTextIcon
            case 'video': return VideoCameraIcon
            case 'audio': return SpeakerWaveIcon
            case 'resource': return BookOpenIcon
            default: return DocumentTextIcon
        }
    }

    return (
        <>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                            <DocumentTextIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
                            <p className="text-gray-600">Manage articles, videos, audio, and resources</p>
                        </div>
                    </div>
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Content
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <div key={tab.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <Icon className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{tab.name}</p>
                                    <p className="text-2xl font-bold text-gray-900">{tab.count}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                            ? 'border-orange-500 text-orange-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{tab.name}</span>
                                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeTab === tab.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search content..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option>All Status</option>
                                <option>Published</option>
                                <option>Draft</option>
                                <option>Archived</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option>All Categories</option>
                                <option>Mental Health</option>
                                <option>Wellness</option>
                                <option>Stress Relief</option>
                                <option>Therapy</option>
                            </select>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <FunnelIcon className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content List */}
                <div className="p-6">
                    <div className="space-y-4">
                        {sampleContent.map((content) => {
                            const TypeIcon = getTypeIcon(content.type)
                            return (
                                <div key={content.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <TypeIcon className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-gray-900">{content.title}</h3>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <p className="text-xs text-gray-500">By {content.author}</p>
                                                <p className="text-xs text-gray-500">{content.createdAt}</p>
                                                <p className="text-xs text-gray-500">{content.views} views</p>
                                                <span className="text-xs text-gray-500">{content.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                                            {content.status}
                                        </span>
                                        <div className="flex space-x-1">
                                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                                <EyeIcon className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                            <span className="font-medium">59</span> results
                        </p>
                        <div className="flex space-x-2">
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-lg hover:bg-orange-700">
                                1
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                3
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
