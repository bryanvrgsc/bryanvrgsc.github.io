
import React, { useEffect, useState, Suspense } from 'react';
import { useStore } from '@nanostores/react';
import { settings, applyTheme, checkPerformance } from './src/store';
import { CanvasBackground, Header, Dock, ThemeToggle, LanguageToggle, ScrollToTop } from './src/components/SharedUI';
import { PageSkeleton } from './src/components/Skeleton';
import { initWebVitals, trackPageView } from './src/utils/analytics';
import { reportError } from './src/utils/errorReporting';

// Lazy load views for Code Splitting
const HomeView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.HomeView })));
const ServicesView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.ServicesView })));
const PortfolioView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.PortfolioView })));
const BlogView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.BlogView })));
const ContactView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.ContactView })));

// Simple Error Boundary to catch lazy loading errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("View loading error:", error, errorInfo);
    reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Something went wrong</h2>
          <p className="text-[var(--text-secondary)] mb-6">We couldn't load this section. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const { theme } = useStore(settings);
  // GitHub Pages Fix: Use Hash Routing (e.g., #/services) instead of Path Routing
  // This prevents 404 errors when refreshing pages on static hosting.
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  // Effect for Theme - Runs when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Effect for Performance & Analytics - Runs ONCE on mount
  useEffect(() => {
    checkPerformance();
    initWebVitals();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      // Default to '#/' if empty
      const newHash = window.location.hash || '#/';
      setCurrentHash(newHash);

      // Track page view
      const path = newHash.replace(/^#/, '') || '/';
      trackPageView(path);
    };

    // Listen for hash changes specifically
    window.addEventListener('hashchange', handleHashChange);

    // Set initial state in case it changed before load
    setCurrentHash(window.location.hash || '#/');

    // Track initial page view
    const initialPath = (window.location.hash || '#/').replace(/^#/, '') || '/';
    trackPageView(initialPath);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderView = () => {
    // Clean the hash to get the path (e.g., "#/services" -> "/services")
    const path = currentHash.replace(/^#/, '') || '/';

    if (path === '/' || path === '') return <HomeView />;
    if (path.startsWith('/services')) return <ServicesView />;
    if (path.startsWith('/portfolio')) return <PortfolioView />;
    if (path.startsWith('/blog')) return <BlogView />;
    if (path.startsWith('/contact')) return <ContactView />;
    return <HomeView />;
  };

  return (
    <div className="min-h-screen text-[var(--text-primary)] font-sans selection:bg-emerald-500/30">
      <CanvasBackground />
      <Header />
      <ThemeToggle />
      <LanguageToggle />

      <main className="relative z-10 w-full">
        <ErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            {renderView()}
          </Suspense>
        </ErrorBoundary>
      </main>

      <Dock currentPath={currentHash.replace(/^#/, '') || '/'} />
      <ScrollToTop />
    </div>
  );
}
