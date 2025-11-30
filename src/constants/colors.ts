/**
 * Centralized Color Management System
 * 
 * This file contains all color definitions for the application.
 * Colors are organized by theme (light/dark) and purpose.
 * 
 * Usage:
 * - Import specific color constants or helper functions
 * - Use getThemeColor() to get colors based on current theme
 * - Refer to CSS variables in styles.css for corresponding values
 */

/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Base Color Palette
 * 
 * Core colors used throughout the application.
 * These map to CSS variables defined in styles.css
 */
export const BASE_COLORS = {
    light: {
        // Backgrounds
        bgPrimary: '#f8fafc',
        bgSecondary: '#ffffff',

        // Text
        textPrimary: '#020617',
        textSecondary: '#334155',
        textTertiary: '#64748b',

        // Cards & Glass
        cardBg: 'rgba(255, 255, 255, 0.75)',
        cardBorder: 'rgba(15, 23, 42, 0.2)',
        cardHoverBg: 'rgba(255, 255, 255, 0.95)',

        // Effects
        glassGlow: 'rgba(5, 150, 105, 0.35)',
        neonGlow: 'rgba(5, 150, 105, 0.3)',

        // Inputs
        inputBg: 'rgba(255, 255, 255, 0.8)',
        inputBorder: 'rgba(15, 23, 42, 0.2)',

        // Dock
        dockBg: 'rgba(240, 240, 245, 0.65)',
        dockItemBg: 'rgba(15, 23, 42, 0.05)',
        dockItemBgActive: '#ffffff',
        dockText: '#64748b',
    },

    dark: {
        // Backgrounds
        bgPrimary: '#000000',
        bgSecondary: '#111115',

        // Text
        textPrimary: '#f5f5f7',
        textSecondary: '#94a3b8',
        textTertiary: '#4b5563',

        // Cards & Glass
        cardBg: 'rgba(22, 22, 22, 0.6)',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
        cardHoverBg: 'rgba(30, 30, 30, 0.7)',

        // Effects
        glassGlow: 'rgba(255, 255, 255, 0.08)',
        neonGlow: 'rgba(52, 211, 153, 0.4)',

        // Inputs
        inputBg: 'rgba(255, 255, 255, 0.08)',
        inputBorder: 'rgba(255, 255, 255, 0.1)',

        // Dock
        dockBg: 'rgba(15, 15, 20, 0.6)',
        dockItemBg: 'rgba(255, 255, 255, 0.05)',
        dockItemBgActive: '#ffffff',
        dockText: '#94a3b8',
    }
} as const;

/**
 * Network Animation Colors
 * 
 * Colors used in the canvas background network visualization.
 * Light mode uses darker colors for contrast, dark mode uses lighter/neon colors.
 */
export const NETWORK_COLORS = {
    light: {
        // Canvas background
        canvasBg: '#ffffff',

        // Nodes (darker green for visibility on light background)
        nodeColor: 'rgba(71, 85, 105, 0.1) ',  // Base color, opacity added dynamically

        // Lines connecting nodes
        lineColor: 'rgba(71, 85, 105, 0.1)',

        // Data packets traveling between nodes
        packetColor: '#059669',  // Emerald-700
        packetGlow: 'rgba(5, 150, 105, 0.3)',
    },

    dark: {
        // Canvas background
        canvasBg: '#0a0a0a',

        // Nodes (lighter green for visibility on dark background)
        nodeColor: 'rgba(16, 185, 129, 1)',  // Base color, opacity added dynamically

        // Lines connecting nodes
        lineColor: 'rgba(16, 185, 129, 1)',

        // Data packets traveling between nodes
        packetColor: '#34d399',  // Emerald-400
        packetGlow: 'rgba(52, 211, 153, 0.4)',
    }
} as const;

/**
 * Social Media Brand Colors
 * 
 * Official brand colors for social media platforms.
 * These should remain consistent across themes.
 */
export const SOCIAL_COLORS = {
    linkedin: {
        primary: '#0077b5',
        hover: 'hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30',
    },
    github: {
        light: '#333',
        dark: '#ffffff',
        hover: 'hover:text-[#333] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20',
    },
    whatsapp: {
        primary: '#25D366',
        hover: 'hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30',
    },
    instagram: {
        primary: '#E4405F',
        hover: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30',
    },
} as const;

/**
 * Semantic Colors
 * 
 * Colors with semantic meaning (success, error, warning, etc.)
 */
export const SEMANTIC_COLORS = {
    light: {
        success: '#059669',      // Emerald-600
        successBg: '#f0fdf4',    // Emerald-50
        successText: '#064e3b',  // Emerald-900

        error: '#dc2626',        // Red-600
        errorBg: '#fef2f2',      // Red-50
        errorText: '#7f1d1d',    // Red-900

        warning: '#d97706',      // Amber-600
        warningBg: '#fffbeb',    // Amber-50
        warningText: '#78350f',  // Amber-900

        info: '#0284c7',         // Sky-600
        infoBg: '#f0f9ff',       // Sky-50
        infoText: '#0c4a6e',     // Sky-900
    },

    dark: {
        success: '#34d399',      // Emerald-400
        successBg: 'rgba(16, 185, 129, 0.1)',
        successText: '#6ee7b7',  // Emerald-300

        error: '#f87171',        // Red-400
        errorBg: 'rgba(239, 68, 68, 0.1)',
        errorText: '#fca5a5',    // Red-300

        warning: '#fbbf24',      // Amber-400
        warningBg: 'rgba(245, 158, 11, 0.1)',
        warningText: '#fcd34d',  // Amber-300

        info: '#38bdf8',         // Sky-400
        infoBg: 'rgba(14, 165, 233, 0.1)',
        infoText: '#7dd3fc',     // Sky-300
    }
} as const;

/**
 * Component-Specific Colors
 * 
 * Colors used by specific components that don't fit other categories
 */
export const COMPONENT_COLORS = {
    light: {
        // Liquid Button
        buttonText: '#0f172a',
        buttonBg: '#ffffff',
        buttonShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 4px 10px -3px rgba(16, 185, 129, 0.2), inset 0 0 0 1px rgba(255,255,255, 1)',
        highlightColor: 'rgba(255, 255, 255, 0.8)',

        // Circuit Animation
        circuitColor1: 'rgba(6, 78, 59, 0.9)',    // Deep Emerald
        circuitColor2: 'rgba(2, 44, 34, 0.9)',    // Black Green
    },

    dark: {
        // Liquid Button
        buttonText: '#000000',
        buttonBg: '#ffffff',
        buttonShadow: '0 0 30px -5px rgba(52, 211, 153, 0.4)',
        highlightColor: 'rgba(255, 255, 255, 0.2)',

        // Circuit Animation
        circuitColor1: 'rgba(52, 211, 153, 0.4)', // Emerald-400
        circuitColor2: 'rgba(34, 211, 238, 0.4)', // Cyan-400
    }
} as const;

/**
 * Accent Colors
 * 
 * Colors used for accents, highlights, and themed sections.
 * Each color has multiple variants for different use cases.
 */
export const ACCENT_COLORS = {
    emerald: {
        // CSS variable values
        border: 'rgba(16, 185, 129, 0.3)',
        glow: 'rgba(16, 185, 129, 0.5)',
        neon: 'rgba(16, 185, 129, 0.4)',

        // Variants for different opacities
        light: 'rgba(16, 185, 129, 0.15)',
        medium: 'rgba(16, 185, 129, 0.25)',

        // Solid colors
        solid: '#10b981',      // Emerald-500
        dark: '#059669',       // Emerald-600
        darker: '#047857',     // Emerald-700
    },
    cyan: {
        border: 'rgba(6, 182, 212, 0.3)',
        glow: 'rgba(6, 182, 212, 0.5)',
        neon: 'rgba(6, 182, 212, 0.4)',
        light: 'rgba(6, 182, 212, 0.15)',
        solid: '#06b6d4',      // Cyan-500
    },
    blue: {
        border: 'rgba(37, 99, 235, 0.3)',
        glow: 'rgba(37, 99, 235, 0.5)',
        neon: 'rgba(37, 99, 235, 0.4)',
        light: 'rgba(37, 99, 235, 0.15)',
        solid: '#3b82f6',      // Blue-500
        bright: '#60a5fa',     // Blue-400
    },
    purple: {
        border: 'rgba(124, 58, 237, 0.3)',
        glow: 'rgba(124, 58, 237, 0.5)',
        neon: 'rgba(124, 58, 237, 0.4)',
        light: 'rgba(124, 58, 237, 0.15)',
        solid: '#8b5cf6',      // Purple-500
    },
    rose: {
        border: 'rgba(225, 29, 72, 0.3)',
        glow: 'rgba(225, 29, 72, 0.5)',
        neon: 'rgba(225, 29, 72, 0.4)',
        light: 'rgba(225, 29, 72, 0.15)',
        solid: '#f43f5e',      // Rose-500
    },
    slate: {
        border: 'rgba(71, 85, 105, 0.25)',
        glow: 'rgba(148, 163, 184, 0.4)',
        neon: 'rgba(148, 163, 184, 0.3)',
        light: 'rgba(71, 85, 105, 0.15)',
        solid: '#64748b',      // Slate-500
    },
} as const;

/**
 * Glow Effects
 * 
 * Shadow effects for glowing elements.
 * Organized by color and intensity.
 */
export const GLOW_EFFECTS = {
    emerald: {
        small: 'shadow-[0_0_12px_rgba(16,185,129,1)]',
        medium: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        large: 'shadow-[0_0_40px_rgba(52,211,153,0.5)]',
        subtle: 'shadow-[0_0_30px_rgba(52,211,153,0.1)]',
        hover: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        intense: 'shadow-[0_0_30px_rgba(52,211,153,0.3)]',
        // For gradients
        gradient: 'shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)]',
    },
    cyan: {
        hover: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    },
    white: {
        small: 'shadow-[0_0_10px_rgba(255,255,255,0.5)]',
        medium: 'shadow-[0_0_8px_rgba(255,255,255,0.8)]',
    },
    black: {
        medium: 'shadow-[0_0_6px_rgba(0,0,0,0.5)]',
    },
} as const;

/**
 * Logo Colors
 * 
 * Colors for platform logos and icons.
 */
export const LOGO_COLORS = {
    windows: {
        color: 'text-emerald-500',
        glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    },
    apple: {
        light: 'text-black',
        dark: 'text-white',
        glowLight: 'drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]',
        glowDark: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]',
    },
    linux: {
        color: 'text-blue-500',
        glow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]',
    },
} as const;

/**
 * Dock Colors
 * 
 * Colors specific to the dock component.
 */
export const DOCK_COLORS = {
    activeBg: 'var(--dock-item-bg-active)',
    inactiveBg: 'rgba(125,125,125,0.05)',
    activeBorder: 'rgba(16, 185, 129, 0.3)',
    inactiveBorder: 'transparent',
    activeGlow: 'rgba(16, 185, 129, 0.4)',
    indicator: {
        bg: 'bg-emerald-500',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,1)]',
    },
    hoverScale: 'scale-105',
    hoverGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
} as const;

/**
 * Helper function to get colors based on theme
 * 
 * @param theme - Current theme ('light', 'dark', or 'system')
 * @param isDarkSystem - Whether system prefers dark mode (for 'system' theme)
 * @returns Color palette for the current theme
 */
export function getThemeColors(theme: 'light' | 'dark' | 'system', isDarkSystem: boolean = false) {
    const isDark = theme === 'dark' || (theme === 'system' && isDarkSystem);

    return {
        base: isDark ? BASE_COLORS.dark : BASE_COLORS.light,
        network: isDark ? NETWORK_COLORS.dark : NETWORK_COLORS.light,
        semantic: isDark ? SEMANTIC_COLORS.dark : SEMANTIC_COLORS.light,
        component: isDark ? COMPONENT_COLORS.dark : COMPONENT_COLORS.light,
        social: SOCIAL_COLORS, // Same for both themes
        accent: ACCENT_COLORS, // Same for both themes
        glow: GLOW_EFFECTS, // Same for both themes
        logo: LOGO_COLORS, // Same for both themes
        dock: DOCK_COLORS, // Same for both themes
    };
}

/**
 * Helper to determine if current theme is dark
 * 
 * @param theme - Current theme setting
 * @returns true if dark mode is active
 */
export function isDarkTheme(theme: 'light' | 'dark' | 'system'): boolean {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    // For 'system', check browser preference
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Color Usage Guide
 * 
 * ## Base Colors
 * - bgPrimary: Main background color
 * - bgSecondary: Secondary background (cards, modals)
 * - textPrimary: Main text color
 * - textSecondary: Secondary text (descriptions, labels)
 * - textTertiary: Tertiary text (hints, placeholders)
 * 
 * ## Network Animation
 * - canvasBg: Canvas background
 * - nodeColor: Network node color (append opacity)
 * - lineColor: Connection lines between nodes
 * - packetColor: Data packets traveling on network
 * 
 * ## Social Media
 * - Use SOCIAL_COLORS for consistent brand colors
 * - Hover states include background and border colors
 * 
 * ## Semantic Colors
 * - success: Positive actions, confirmations
 * - error: Errors, destructive actions
 * - warning: Warnings, caution
 * - info: Information, neutral notifications
 * 
 * ## CSS Variable Mapping
 * All colors in this file correspond to CSS variables in styles.css:
 * - BASE_COLORS → --bg-*, --text-*, --card-*, etc.
 * - NETWORK_COLORS → Used in CanvasBackground component
 * - SEMANTIC_COLORS → --success-*, --error-*, etc.
 * - COMPONENT_COLORS → --button-*, --circuit-*, etc.
 */
