import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (_context, next) => {
    const response = await next();

    // Security Headers
    const headers = {
        // Content Security Policy
        'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://formspree.io",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' https://formspree.io https://unpkg.com",
            "frame-src https://www.google.com/recaptcha/",
            "base-uri 'self'",
            "form-action 'self' https://formspree.io",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests"
        ].join('; '),

        // HTTP Strict Transport Security
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

        // Prevent clickjacking
        'X-Frame-Options': 'DENY',

        // Prevent MIME type sniffing
        'X-Content-Type-Options': 'nosniff',

        // Referrer Policy
        'Referrer-Policy': 'strict-origin-when-cross-origin',

        // Permissions Policy
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',

        // XSS Protection (legacy but still useful)
        'X-XSS-Protection': '1; mode=block'
    };

    // Apply headers to response
    Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
};
