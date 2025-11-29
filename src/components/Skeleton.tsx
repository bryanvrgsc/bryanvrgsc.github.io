// Skeleton Loading Components
import React from 'react';

// Base skeleton element
const SkeletonElement = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

// Card skeleton for portfolio/blog items
export const CardSkeleton = () => (
    <div className="bento-card p-6 space-y-4">
        <SkeletonElement className="h-48 w-full rounded-lg" />
        <div className="space-y-2">
            <SkeletonElement className="h-6 w-3/4" />
            <SkeletonElement className="h-4 w-full" />
            <SkeletonElement className="h-4 w-5/6" />
        </div>
        <div className="flex gap-2">
            <SkeletonElement className="h-6 w-16" />
            <SkeletonElement className="h-6 w-20" />
        </div>
    </div>
);

// Grid of cards skeleton
export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl w-full space-y-8 text-center">
            <SkeletonElement className="h-16 w-3/4 mx-auto" />
            <SkeletonElement className="h-8 w-full" />
            <SkeletonElement className="h-8 w-5/6 mx-auto" />
            <div className="flex gap-4 justify-center mt-8">
                <SkeletonElement className="h-12 w-32 rounded-full" />
                <SkeletonElement className="h-12 w-32 rounded-full" />
            </div>
        </div>
    </div>
);

// Service card skeleton
export const ServiceSkeleton = () => (
    <div className="bento-card p-8 space-y-4">
        <SkeletonElement className="h-12 w-12 rounded-xl" />
        <SkeletonElement className="h-8 w-2/3" />
        <div className="space-y-2">
            <SkeletonElement className="h-4 w-full" />
            <SkeletonElement className="h-4 w-full" />
            <SkeletonElement className="h-4 w-3/4" />
        </div>
    </div>
);

// Generic page skeleton
export const PageSkeleton = () => (
    <div className="min-h-screen w-full flex items-center justify-center">
        <div className="max-w-6xl w-full px-4 space-y-12">
            <div className="space-y-4">
                <SkeletonElement className="h-12 w-1/2" />
                <SkeletonElement className="h-6 w-3/4" />
            </div>
            <CardGridSkeleton count={6} />
        </div>
    </div>
);

// Contact form skeleton
export const ContactSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full space-y-6">
            <SkeletonElement className="h-12 w-1/2 mx-auto" />
            <div className="bento-card p-8 space-y-6">
                <SkeletonElement className="h-12 w-full rounded-lg" />
                <SkeletonElement className="h-12 w-full rounded-lg" />
                <SkeletonElement className="h-32 w-full rounded-lg" />
                <SkeletonElement className="h-12 w-full rounded-full" />
            </div>
        </div>
    </div>
);
