// Error Reporting Utility
export interface ErrorReport {
    message: string;
    stack?: string;
    componentStack?: string;
    timestamp: string;
    userAgent: string;
    url: string;
}

export const reportError = (error: Error, errorInfo?: any) => {
    const report: ErrorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
    };

    // Log to console in development
    console.error('[Error Report]', report);

    // In production, send to error tracking service
    // Examples:
    // - Sentry: Sentry.captureException(error, { extra: errorInfo });
    // - Custom API: fetch('/api/log-error', { method: 'POST', body: JSON.stringify(report) });

    // For now, store in localStorage for debugging
    try {
        const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
        errors.push(report);
        // Keep only last 10 errors
        if (errors.length > 10) errors.shift();
        localStorage.setItem('error_logs', JSON.stringify(errors));
    } catch (e) {
        // Ignore localStorage errors
    }
};

// Get stored error logs (for debugging)
export const getErrorLogs = (): ErrorReport[] => {
    try {
        return JSON.parse(localStorage.getItem('error_logs') || '[]');
    } catch {
        return [];
    }
};

// Clear error logs
export const clearErrorLogs = () => {
    try {
        localStorage.removeItem('error_logs');
    } catch {
        // Ignore
    }
};
