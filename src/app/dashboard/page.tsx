'use client'

import { ArrowRightIcon, ChartBarIcon, CogIcon, HeartIcon, PencilIcon, PlusIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface EmotionCategory {
    _id: string
    name: string
    color: string
    description: string
    isMainCategory: boolean
    emotions: Array<{
        name: string
        description: string
        aiPrompt: string
        isActive: boolean
    }>
    isActive: boolean
    order: number
}

export default function Dashboard() {
    const [categories, setCategories] = useState<EmotionCategory[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<EmotionCategory | null>(null)
    const [showAddEmotion, setShowAddEmotion] = useState(false)
    const [newEmotion, setNewEmotion] = useState({ name: '', description: '', aiPrompt: '' })
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/login')
            return
        }

        fetchCategories()
    }, [router])

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/emotions/categories')
            if (response.ok) {
                const data = await response.json()
                setCategories(data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        router.push('/login')
    }

    const handleAddEmotion = async () => {
        if (!selectedCategory || !newEmotion.name || !newEmotion.description || !newEmotion.aiPrompt) {
            return
        }

        try {
            const response = await fetch(`/api/emotions/categories/${selectedCategory._id}/emotions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify(newEmotion),
            })

            if (response.ok) {
                setNewEmotion({ name: '', description: '', aiPrompt: '' })
                setShowAddEmotion(false)
                fetchCategories()
            }
        } catch (error) {
            console.error('Error adding emotion:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <HeartIcon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">Open Therapy Admin</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                        <UsersIcon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                        <dd className="text-lg font-medium text-gray-900">12,847</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                        <CogIcon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">AI Sessions</dt>
                                        <dd className="text-lg font-medium text-gray-900">2,341</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                        <ChartBarIcon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Emotion Categories</dt>
                                        <dd className="text-lg font-medium text-gray-900">{categories.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                        <CogIcon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Emotions</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {categories.reduce((total, cat) => total + cat.emotions.length, 0)}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emotion Categories Management */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Emotion Categories Management</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage the four main energy categories and their sub-emotions for the AI therapy system.
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {categories.map((category) => (
                                <div key={category._id} className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: category.color }}
                                            ></div>
                                            <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Manage Emotions
                                        </button>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Emotions ({category.emotions.length})
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {category.emotions.slice(0, 6).map((emotion, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                >
                                                    {emotion.name}
                                                </span>
                                            ))}
                                            {category.emotions.length > 6 && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    +{category.emotions.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <UsersIcon className="h-6 w-6 text-blue-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">User Management</span>
                            <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>

                        <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <CogIcon className="h-6 w-6 text-green-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">AI Model Settings</span>
                            <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>

                        <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <ChartBarIcon className="h-6 w-6 text-purple-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900">Analytics & Reports</span>
                            <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Emotion Management Modal */}
            {selectedCategory && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Manage Emotions - {selectedCategory.name}
                                </h3>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Add New Emotion */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Emotion</h4>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Emotion name"
                                        value={newEmotion.name}
                                        onChange={(e) => setNewEmotion({ ...newEmotion, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={newEmotion.description}
                                        onChange={(e) => setNewEmotion({ ...newEmotion, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                    <textarea
                                        placeholder="AI Prompt"
                                        value={newEmotion.aiPrompt}
                                        onChange={(e) => setNewEmotion({ ...newEmotion, aiPrompt: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                    <button
                                        onClick={handleAddEmotion}
                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <PlusIcon className="h-4 w-4 mr-2" />
                                        Add Emotion
                                    </button>
                                </div>
                            </div>

                            {/* Existing Emotions */}
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {selectedCategory.emotions.map((emotion, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex-1">
                                            <h5 className="text-sm font-medium text-gray-900">{emotion.name}</h5>
                                            <p className="text-xs text-gray-600">{emotion.description}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-700">
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-700">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
