import React from 'react';
import { useStore } from '@nanostores/react';
import { settings, setLang } from '../../store';
import { Icons } from '../Icons';

/**
 * LanguageToggle Component
 * 
 * Floating button that toggles between English (EN) and Spanish (ES).
 * Displays flag icons for the current language.
 * Located in the top-right corner below the theme toggle.
 */
export const LanguageToggle = () => {
    const { lang } = useStore(settings);

    return (
        <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="fixed top-16 right-3 md:top-6 md:right-24 z-50 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-transform duration-300 group overflow-hidden">
            <div className="w-full h-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                {lang === 'en' ? <Icons.FlagUS className="w-5 h-5 md:w-6 md:h-6 rounded-full" /> : <Icons.FlagMX className="w-5 h-5 md:w-6 md:h-6 rounded-full" />}
            </div>
        </button>
    );
};
