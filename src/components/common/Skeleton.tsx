import React from 'react';

/**
 * Skeleton Components for loading states
 * 
 * Premium animated placeholders that show while content is loading.
 * Uses pulse animation and matches the glass morphism design system.
 */

interface SkeletonProps {
    className?: string;
}

/**
 * Basic skeleton box with pulse animation
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
    <div
        className={`animate-pulse bg-gradient-to-r from-[var(--card-bg)] via-[var(--input-bg)] to-[var(--card-bg)] rounded-xl ${className}`}
        style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
        }}
    />
);

/**
 * Skeleton for text lines
 */
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
    lines = 3,
    className = ''
}) => (
    <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

/**
 * Skeleton for cards (Bento style)
 */
export const SkeletonCard: React.FC<SkeletonProps> = ({ className = '' }) => (
    <div className={`bento-card p-6 rounded-2xl ${className}`}>
        <Skeleton className="h-12 w-12 rounded-xl mb-4" />
        <Skeleton className="h-6 w-2/3 mb-3" />
        <SkeletonText lines={2} />
    </div>
);

/**
 * Full page skeleton for view loading
 */
export const ViewSkeleton: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-32 md:pb-40 animate-fade-in">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-16">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
            <SkeletonText lines={2} className="max-w-xl mx-auto" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    </div>
);

/**
 * Home view skeleton
 */
export const HomeViewSkeleton: React.FC = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-4xl mx-auto">
            {/* Title */}
            <Skeleton className="h-20 md:h-32 w-full max-w-3xl mx-auto mb-6" />

            {/* Subtitle */}
            <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
            <Skeleton className="h-4 w-1/2 mx-auto mb-10" />

            {/* Buttons */}
            <div className="flex gap-4 justify-center mb-12">
                <Skeleton className="h-14 w-44 rounded-full" />
                <Skeleton className="h-14 w-44 rounded-full" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bento-card p-4 rounded-2xl">
                        <Skeleton className="h-8 w-16 mx-auto mb-2" />
                        <Skeleton className="h-3 w-12 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/**
 * Contact view skeleton
 */
export const ContactViewSkeleton: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-32 animate-fade-in">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <Skeleton className="h-12 w-1/2 mb-4" />
            <Skeleton className="h-6 w-2/3 mb-10" />

            {/* Form Fields */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-14 rounded-xl" />
                    <Skeleton className="h-14 rounded-xl" />
                </div>
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-14 w-48 rounded-full" />
            </div>
        </div>
    </div>
);

/**
 * Portfolio view skeleton
 */
export const PortfolioViewSkeleton: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-32 animate-fade-in">
        {/* Header */}
        <Skeleton className="h-12 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-10" />

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bento-card rounded-3xl overflow-hidden">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-6">
                        <Skeleton className="h-8 w-2/3 mb-3" />
                        <SkeletonText lines={2} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
