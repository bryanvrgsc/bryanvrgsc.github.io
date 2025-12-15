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

// Listen for system theme changes and auto-update when theme is 'system'
let systemThemeListener: MediaQueryList | null = null;

export const initThemeListener = () => {
  if (typeof window === 'undefined') return;

  // Clean up existing listener
  if (systemThemeListener) {
    systemThemeListener.removeEventListener('change', handleSystemThemeChange);
  }

  // Create new listener
  systemThemeListener = window.matchMedia('(prefers-color-scheme: dark)');
  systemThemeListener.addEventListener('change', handleSystemThemeChange);

  // Apply current theme
  const currentTheme = settings.get().theme;
  applyTheme(currentTheme);
};

const handleSystemThemeChange = () => {
  const currentTheme = settings.get().theme;

  // Only auto-update if theme is set to 'system'
  if (currentTheme === 'system') {
    applyTheme('system');
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
    // Tier 1: Low-end (Integrated graphics, older mobile) - BUT Safari/Apple GPU often reports Tier 1 incorrectly
    // Tier 2: Mid-range
    // Tier 3: High-end

    console.log(`Hardware Detection (detect-gpu): Tier ${gpuTier.tier}, FPS: ${gpuTier.fps}, GPU: ${gpuTier.gpu}`);

    // Safari/Apple GPU fix: Apple GPUs are powerful but often report as Tier 1
    // Only enable Lite Mode for truly low-end devices (Tier 0 or explicit low FPS)
    const isAppleGPU = gpuTier.gpu && gpuTier.gpu.toLowerCase().includes('apple');
    const isTrulyLowEnd = gpuTier.tier === 0 || (gpuTier.fps !== undefined && gpuTier.fps < 30);

    // Don't enable lite mode for Apple GPUs unless FPS is explicitly low
    const shouldEnableLiteMode = isTrulyLowEnd && !isAppleGPU;

    if (shouldEnableLiteMode) {
      console.log('Performance: Switching to Lite Mode (Device capability limit)');
      enableLiteMode(true);
    } else {
      console.log('Performance: High Performance Mode enabled');
      enableLiteMode(false);
    }

  } catch (error) {
    console.warn('GPU Detection failed, keeping default mode.', error);
    // Don't enable lite mode on error - assume capable device
    enableLiteMode(false);
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