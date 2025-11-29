/**
 * Navigation utilities for hash-based routing (GitHub Pages compatible)
 */

/**
 * Navigate to a path using hash routing
 * @param path - The path to navigate to (e.g., '/services', '/portfolio')
 */
export function navigateTo(path: string): void {
    // Ensure path starts with '/'
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Update hash without triggering page reload
    window.location.hash = `#${normalizedPath}`;

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Get current path from hash
 * @returns Current path without the hash symbol
 */
export function getCurrentPath(): string {
    return window.location.hash.replace(/^#/, '') || '/';
}

/**
 * Check if a path is currently active
 * @param path - The path to check
 * @param currentPath - The current path (optional, will use window.location.hash if not provided)
 * @returns true if the path is active
 */
export function isPathActive(path: string, currentPath?: string): boolean {
    const current = currentPath || getCurrentPath();
    return current === path || current.startsWith(`${path}/`);
}
