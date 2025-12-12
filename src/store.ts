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
export const checkPerformance = async () => {
  if (typeof window === 'undefined') return;

  // 1. Accessibility Preference (User explicitly asked for less motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Performance: Lite Mode enabled (Prefers Reduced Motion)');
    enableLiteMode(true);
    return;
  }

  // 2. Advanced GPU Detection - Dynamic import to avoid SSR issues
  try {
    const { getGPUTier } = await import('detect-gpu');
    const gpuTier = await getGPUTier();

    // Tier 0: Blocklisted/Fail
    // Tier 1: Low-end (Integrated graphics, older mobile)
    // Tier 2: Mid-range
    // Tier 3: High-end
    // FPS: Estimated framerate for heavy tasks

    const isLowEnd = gpuTier.tier < 2 || (gpuTier.fps !== undefined && gpuTier.fps < 50);

    console.log(`Hardware Detection (detect-gpu): Tier ${gpuTier.tier}, FPS: ${gpuTier.fps}, GPU: ${gpuTier.gpu}`);

    if (isLowEnd) {
      console.log('Performance: Switching to Lite Mode (Device capability limit)');
      enableLiteMode(true);
    } else {
      console.log('Performance: High Performance Mode enabled');
      enableLiteMode(false);
    }

  } catch (error) {
    console.warn('GPU Detection failed, defaulting to Lite Mode for safety.', error);
    enableLiteMode(true);
  }
};

const enableLiteMode = (enable: boolean) => {
  performanceMode.setKey('lite', enable);
  if (enable) {
    document.documentElement.classList.add('lite-mode');
  } else {
    document.documentElement.classList.remove('lite-mode');
  }
};