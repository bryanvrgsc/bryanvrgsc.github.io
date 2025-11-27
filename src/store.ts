import { map } from 'nanostores';

export type Language = 'en' | 'es';
export type Theme = 'light' | 'dark' | 'system';

export const settings = map<{ lang: Language; theme: Theme }>({
  lang: 'es', // Default to Spanish
  theme: 'system'
});

export const setLang = (lang: Language) => {
  settings.setKey('lang', lang);
};

export const setTheme = (theme: Theme) => {
  settings.setKey('theme', theme);
  applyTheme(theme);
};

// Helper to apply theme to document
export const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.removeAttribute('data-theme');
  root.classList.remove('dark');

  if (isDark) {
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
  }
};