
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
  
  // 1. Static Check: Hardware Concurrency & RAM
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowSpec = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || 
                    (nav.deviceMemory && nav.deviceMemory <= 4);

  // If statically low spec, enable immediately
  if (prefersReducedMotion || isLowSpec) {
    enableLiteMode(true);
    return;
  }

  // 2. Dynamic Check: Measure FPS for 1.5 seconds
  // This catches powerful devices that are throttling (battery saver, heat)
  let frames = 0;
  let startTime = performance.now();
  let checkActive = true;

  const measure = () => {
      if (!checkActive) return;
      frames++;
      const now = performance.now();
      
      if (now - startTime >= 1500) { // Check for 1.5 seconds
          checkActive = false;
          const fps = Math.round((frames * 1000) / (now - startTime));
          
          // If FPS is below 45 consistently, downgrade to Lite Mode
          if (fps < 45) {
              console.log(`Low FPS detected (${fps}). Enabling Lite Mode.`);
              enableLiteMode(true);
          } else {
              console.log(`High FPS detected (${fps}). Lite Mode disabled.`);
              enableLiteMode(false);
          }
          return;
      }
      requestAnimationFrame(measure);
  };

  requestAnimationFrame(measure);
};

const enableLiteMode = (enable: boolean) => {
    performanceMode.setKey('lite', enable);
    if (enable) {
        document.documentElement.classList.add('lite-mode');
    } else {
        document.documentElement.classList.remove('lite-mode');
    }
};
