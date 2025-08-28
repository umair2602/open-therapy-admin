'use client'

import { ArrowRightIcon, CogIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Open Therapy</span>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Admin Login
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Open Therapy</span>
            <span className="block text-blue-600">AI-Powered Mental Health</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            A comprehensive mental health platform that combines AI therapy, emotional tracking, and professional support to help users achieve better mental well-being.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Access Admin Panel
              <ArrowRightIcon className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <CogIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Therapy Sessions</h3>
            <p className="text-gray-600">
              Personalized AI-powered therapy conversations that adapt to your emotional state and provide immediate support.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <HeartIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Emotional Diary</h3>
            <p className="text-gray-600">
              Track your daily emotions, mood patterns, and mental health progress with intelligent insights and analysis.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy & Security</h3>
            <p className="text-gray-600">
              HIPAA-compliant platform with end-to-end encryption ensuring your mental health data remains completely private and secure.
            </p>
          </div>
        </div>

        {/* Admin Section */}
        <div className="mt-32 bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive administration tools for managing users, AI models, emotional categories, and platform analytics.
            Monitor user engagement, configure therapy responses, and ensure optimal platform performance.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
          >
            Login to Admin Panel
            <ArrowRightIcon className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <HeartIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Open Therapy</span>
          </div>
          <p className="text-gray-400">
            Empowering mental health through AI technology and compassionate care.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 Open Therapy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
