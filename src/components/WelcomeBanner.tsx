'use client'

import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function WelcomeBanner() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-2xl shadow-2xl mb-8">
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-500/20 animate-pulse"></div>

            {/* Geometric Gradient Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400/30 via-orange-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-500/30 via-purple-600/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 via-indigo-500/20 to-purple-600/20 rounded-full blur-2xl"></div>

            {/* Main Content */}
            <div className="relative px-6 py-8 sm:px-8 sm:py-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            <div className="p-4 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl backdrop-blur-sm self-start shadow-lg border border-white/20">
                                <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                                    Welcome to Open Therapy Admin
                                </h1>
                                <p className="text-cyan-100 text-base sm:text-lg drop-shadow-md">
                                    Empowering mental health through AI technology
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="max-w-3xl">
                            <p className="text-cyan-100 text-sm sm:text-base leading-relaxed drop-shadow-md">
                                Monitor your mental health platform's performance, manage users, and ensure optimal AI therapy experiences.
                                Your dashboard provides real-time insights and comprehensive management tools.
                            </p>
                        </div>
                    </div>

                    {/* Right Decorative Elements */}
                    <div className="hidden lg:flex lg:items-center lg:justify-center">
                        <div className="relative">
                            {/* Animated Gradient Orbs */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400/40 to-orange-500/40 rounded-full blur-xl animate-pulse"></div>
                            </div>
                            <div className="relative flex space-x-3">
                                <SparklesIcon className="h-8 w-8 text-yellow-300 animate-bounce drop-shadow-lg" />
                                <SparklesIcon className="h-6 w-6 text-orange-300 animate-bounce delay-100 drop-shadow-lg" />
                                <SparklesIcon className="h-7 w-7 text-pink-300 animate-bounce delay-200 drop-shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Gradient Particles */}
            <div className="absolute top-10 right-20 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-20 right-40 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-ping delay-300 opacity-60"></div>
            <div className="absolute bottom-20 left-20 w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-ping delay-700 opacity-60"></div>
            <div className="absolute bottom-10 left-40 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-ping delay-1000 opacity-60"></div>
        </div>
    )
}
