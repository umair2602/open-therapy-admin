'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-gray-200',
                className
            )}
        />
    )
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <div className="ml-5 w-0 flex-1">
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function CategoryCardSkeleton() {
    return (
        <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function CategoriesSkeleton() {
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
                <div>
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
