// Skeleton Loading Components
import React from 'react';

// Base skeleton element with premium glass feel
const SkeletonElement = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-sm ${className}`} />
);

// Card skeleton for portfolio/blog items
export const CardSkeleton = () => (
    <div className="bento-card p-6 space-y-5 h-full">
        <SkeletonElement className="h-48 w-full rounded-2xl" />
        <div className="space-y-3">
            <SkeletonElement className="h-7 w-3/4 rounded-lg" />
            <SkeletonElement className="h-4 w-full rounded-md" />
            <SkeletonElement className="h-4 w-5/6 rounded-md" />
        </div>
        <div className="flex gap-2 pt-2">
            <SkeletonElement className="h-6 w-20 rounded-full" />
            <SkeletonElement className="h-6 w-24 rounded-full" />
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
        <div className="max-w-4xl w-full space-y-8 text-center flex flex-col items-center">
            <SkeletonElement className="h-20 w-3/4 rounded-3xl" />
            <SkeletonElement className="h-8 w-full max-w-2xl rounded-xl" />
            <SkeletonElement className="h-8 w-2/3 max-w-xl rounded-xl" />
            <div className="flex gap-4 justify-center mt-8">
                <SkeletonElement className="h-14 w-40 rounded-full" />
                <SkeletonElement className="h-14 w-40 rounded-full" />
            </div>
        </div>
    </div>
);

// Service card skeleton
export const ServiceSkeleton = () => (
    <div className="bento-card p-8 space-y-5 h-full">
        <SkeletonElement className="h-16 w-16 rounded-2xl mb-4" />
        <SkeletonElement className="h-8 w-2/3 rounded-lg" />
        <div className="space-y-3">
            <SkeletonElement className="h-4 w-full rounded-md" />
            <SkeletonElement className="h-4 w-full rounded-md" />
            <SkeletonElement className="h-4 w-3/4 rounded-md" />
        </div>
    </div>
);

// Generic page skeleton
export const PageSkeleton = () => (
    <div className="min-h-screen w-full pt-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-6 text-center flex flex-col items-center">
                <SkeletonElement className="h-16 w-1/2 md:w-1/3 rounded-3xl" />
                <SkeletonElement className="h-6 w-2/3 md:w-1/4 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    </div>
);

// Contact form skeleton
export const ContactSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <SkeletonElement className="h-12 w-12 rounded-2xl" />
                <SkeletonElement className="h-12 w-3/4 rounded-xl" />
                <SkeletonElement className="h-32 w-full rounded-3xl" />
            </div>
            <div className="bento-card p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <SkeletonElement className="h-14 w-full rounded-2xl" />
                    <SkeletonElement className="h-14 w-full rounded-2xl" />
                </div>
                <SkeletonElement className="h-32 w-full rounded-2xl" />
                <SkeletonElement className="h-14 w-full rounded-full" />
            </div>
        </div>
    </div>
);
