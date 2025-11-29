// Web Vitals Analytics
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

const logMetric = (metric: Metric) => {
    // Log to console (always enabled for monitoring)
    console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
    });

    // In production, you could send to analytics service
    // Example: sendToAnalytics(metric);
};

export const initWebVitals = () => {
    if (typeof window === 'undefined') return;

    // Core Web Vitals
    onCLS(logMetric);  // Cumulative Layout Shift
    onINP(logMetric);  // Interaction to Next Paint (replaces FID)
    onLCP(logMetric);  // Largest Contentful Paint

    // Additional metrics
    onFCP(logMetric);  // First Contentful Paint
    onTTFB(logMetric); // Time to First Byte
};

// Track page views
export const trackPageView = (path: string) => {
    if (typeof window === 'undefined') return;

    console.log('[Analytics] Page view:', path);

    // In production, send to analytics service
    // Example: gtag('config', 'GA_ID', { page_path: path });
};
