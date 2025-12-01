import React, { useState } from 'react';
import { Icons } from '../Icons';
import { COLOR_PALETTES, hexToRgba, type PaletteName } from '../../constants/colors';

/**
 * PaletteSelector Component
 * 
 * Allows users to dynamically switch between color palettes.
 * Updates CSS variables in real-time for instant theme changes.
 * Imports palettes directly from colors.ts for single source of truth.
 */

interface Palette {
    name: PaletteName;
    label: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
}

// Generate palettes from COLOR_PALETTES (single source of truth)
const PALETTES: Palette[] = (Object.keys(COLOR_PALETTES) as PaletteName[]).map(key => ({
    name: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    colors: {
        primary: COLOR_PALETTES[key].light.primary,
        secondary: COLOR_PALETTES[key].light.secondary,
        accent: COLOR_PALETTES[key].light.accent
    }
}));

export const PaletteSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Initialize from localStorage or default to 'rose'
    const [activePalette, setActivePalette] = useState<PaletteName>(() => {
        const saved = localStorage.getItem('selectedPalette');
        return (saved as PaletteName) || 'rose';
    });

    const handlePaletteChange = (palette: Palette) => {
        setActivePalette(palette.name);

        // Get full palette data from COLOR_PALETTES
        const lightPalette = COLOR_PALETTES[palette.name].light;
        const darkPalette = COLOR_PALETTES[palette.name].dark;

        // Update CSS variables
        const root = document.documentElement;

        // Light theme variables
        root.style.setProperty('--primary-color', lightPalette.primary);
        root.style.setProperty('--secondary-color', lightPalette.secondary);
        root.style.setProperty('--accent-color', lightPalette.accent);

        // Glow and shadow effects
        root.style.setProperty('--primary-glow', hexToRgba(lightPalette.primary, 0.35));
        root.style.setProperty('--primary-shadow', hexToRgba(lightPalette.primary, 0.2));

        // Gradient colors
        root.style.setProperty('--primary-gradient', hexToRgba(lightPalette.primary, 0.1));
        root.style.setProperty('--accent-gradient-1', hexToRgba(lightPalette.accent, 0.1));

        // Animation/circuit colors
        root.style.setProperty('--primary-dark', hexToRgba(lightPalette.primary, 0.9));
        root.style.setProperty('--primary-darker', hexToRgba(lightPalette.secondary, 0.9));

        // Dark mode specific
        root.style.setProperty('--primary-light', hexToRgba(darkPalette.primary, 0.4));
        root.style.setProperty('--accent-light', hexToRgba(darkPalette.accent, 0.4));
        root.style.setProperty('--accent-gradient-2', hexToRgba(darkPalette.accent, 0.08));

        // Store selected palette in localStorage
        localStorage.setItem('selectedPalette', palette.name);

        // Reload page to apply new colors to all components
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const currentPalette = PALETTES.find(p => p.name === activePalette) || PALETTES[0];

    return (
        <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
            <div className="relative">
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                    aria-label="Change color palette"
                >
                    <Icons.Palette className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                    <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--bg-primary)]"
                        style={{ backgroundColor: currentPalette.colors.primary }}
                    ></div>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute bottom-full left-0 mb-2 w-56 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl shadow-xl z-20 overflow-hidden">
                            <div className="p-3 border-b border-[var(--card-border)]">
                                <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                                    Color Palette
                                </p>
                            </div>
                            <div className="p-2">
                                {PALETTES.map((palette) => (
                                    <button
                                        key={palette.name}
                                        onClick={() => handlePaletteChange(palette)}
                                        className={`w-full px-3 py-3 rounded-xl transition-all flex items-center gap-3 ${activePalette === palette.name
                                            ? 'bg-[var(--input-bg)] shadow-sm'
                                            : 'hover:bg-[var(--input-bg)]'
                                            }`}
                                    >
                                        <div className="flex gap-1">
                                            <div
                                                className="w-4 h-4 rounded-full border border-white/20"
                                                style={{ backgroundColor: palette.colors.primary }}
                                            ></div>
                                            <div
                                                className="w-4 h-4 rounded-full border border-white/20"
                                                style={{ backgroundColor: palette.colors.secondary }}
                                            ></div>
                                            <div
                                                className="w-4 h-4 rounded-full border border-white/20"
                                                style={{ backgroundColor: palette.colors.accent }}
                                            ></div>
                                        </div>
                                        <span className={`text-sm font-medium ${activePalette === palette.name
                                            ? 'text-[var(--text-primary)]'
                                            : 'text-[var(--text-secondary)]'
                                            }`}>
                                            {palette.label}
                                        </span>
                                        {activePalette === palette.name && (
                                            <Icons.CheckCircle className="w-4 h-4 ml-auto" style={{ color: palette.colors.primary }} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
