
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

  // 1. Preferencias del sistema:
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Detectar iPad viejo (Safari limitado)
  const isOldiPad = /iPad/.test(nav.userAgent) && nav.maxTouchPoints === 5;

  // 3. Hardware Concurrency + RAM (cuando sí están disponibles)
  const hasLowCores = nav.hardwareConcurrency && nav.hardwareConcurrency < 4;
  const hasLowMemory = nav.deviceMemory && nav.deviceMemory < 4;

  const isLowSpecStatic = prefersReducedMotion || isOldiPad || hasLowCores || hasLowMemory;

  if (isLowSpecStatic) {
    enableLiteMode(true);
    return;
  }

  // 4. Dynamic FPS check (3s)
  let frames = 0;
  let startTime = performance.now();
  let running = true;

  const measure = () => {
    if (!running) return;
    frames++;
    const now = performance.now();

    if (now - startTime >= 3000) {
      running = false;
      const fps = Math.round((frames * 1000) / (now - startTime));

      if (fps < 45) {
        console.log(`Low FPS (${fps}) – Lite Mode ON`);
        enableLiteMode(true);
      } else {
        console.log(`High FPS (${fps}) – Lite Mode OFF`);
        enableLiteMode(false);
      }
      return;
    }

    requestAnimationFrame(measure);
  };
};

const enableLiteMode = (enable: boolean) => {
    performanceMode.setKey('lite', enable);
    if (enable) {
        document.documentElement.classList.add('lite-mode');
    } else {
        document.documentElement.classList.remove('lite-mode');
    }
};
