import { map } from 'nanostores';
import { getGPUTier } from 'detect-gpu';

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

// Helper to detect device capabilities and enable Lite Mode using detect-gpu
export const checkPerformance = async () => {
  if (typeof window === 'undefined') return;

  // 1. Accessibility Preference (User explicitly asked for less motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
      console.log('Performance: Lite Mode enabled (Prefers Reduced Motion)');
      enableLiteMode(true);
      return;
  }

  // 2. Advanced GPU Detection
  try {
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
      console.warn('GPU Detection failed, falling back to static hardware checks', error);
      
      // 3. Fallback: Static Hardware Detection
      const isLowSpec = !isHighPerformanceDeviceFallback();
      enableLiteMode(isLowSpec);
      console.log(`Hardware Fallback: ${isLowSpec ? 'Lite Mode' : 'Full Animation'}`);
  }
};

/**
 * Fallback Static Hardware Detection
 * Used if detect-gpu fails or times out.
 */
const isHighPerformanceDeviceFallback = (): boolean => {
  const nav = navigator as any;

  // Hardware Concurrency (CPU Cores)
  const logicalProcessors = nav.hardwareConcurrency || 4; 
  if (logicalProcessors < 4) return false;

  // Device Memory (RAM in GB)
  if (nav.deviceMemory && nav.deviceMemory < 4) return false;

  // Mobile Detection (Simplified)
  const userAgent = nav.userAgent || "";
  const isOldiOS = /iPhone OS [0-1]?[0-4]_/.test(userAgent); 
  if (isOldiOS) return false;

  // Data Saver
  if ((nav.connection as any)?.saveData) return false;

  return true;
};

const enableLiteMode = (enable: boolean) => {
    performanceMode.setKey('lite', enable);
    if (enable) {
        document.documentElement.classList.add('lite-mode');
    } else {
        document.documentElement.classList.remove('lite-mode');
    }
};