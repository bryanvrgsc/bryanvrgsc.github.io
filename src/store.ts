import { map } from 'nanostores';

export type Language = 'en' | 'es';
export type Theme = 'light' | 'dark' | 'system';

export const settings = map<{ lang: Language; theme: Theme }>({
  lang: 'es', // Default to Spanish
  theme: 'system'
});

// Performance Store: "Lite Mode" for low-end devices
export const performanceMode = map<{ lite: boolean }>({
  lite: false
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

// Helper to detect device capabilities and enable Lite Mode
export const checkPerformance = () => {
  if (typeof window === 'undefined') return;

  const nav = navigator as any;
  // Criteria for Lite Mode:
  // 1. Reduced Motion Preference
  // 2. Low Concurrency (<= 4 logical cores)
  // 3. Low Device Memory (<= 4GB RAM, generic fallback for heavy textures)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowSpec = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || 
                    (nav.deviceMemory && nav.deviceMemory <= 4);

  const shouldBeLite = prefersReducedMotion || isLowSpec;

  performanceMode.setKey('lite', shouldBeLite);

  if (shouldBeLite) {
    document.documentElement.classList.add('lite-mode');
  } else {
    document.documentElement.classList.remove('lite-mode');
  }
};