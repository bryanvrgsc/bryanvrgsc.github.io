
import React, { useEffect, useState, Suspense } from 'react';
import { useStore } from '@nanostores/react';
import { settings, applyTheme, checkPerformance } from './src/store';
import { CanvasBackground, Header, Dock, ScrollToTop } from './src/components/layout';
import { ThemeToggle, LanguageToggle } from './src/components/ui';

// Lazy load views for Code Splitting
const HomeView = React.lazy(() => import('./src/components/views/HomeView').then(module => ({ default: module.HomeView })));
const ServicesView = React.lazy(() => import('./src/components/views/ServicesView').then(module => ({ default: module.ServicesView })));
const PortfolioView = React.lazy(() => import('./src/components/views/PortfolioView').then(module => ({ default: module.PortfolioView })));
const BlogView = React.lazy(() => import('./src/components/views/BlogView').then(module => ({ default: module.BlogView })));
const ContactView = React.lazy(() => import('./src/components/views/ContactView').then(module => ({ default: module.ContactView })));

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

  // Effect for Performance - Runs ONCE on mount
  useEffect(() => {
    checkPerformance();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      // Default to '#/' if empty
      setCurrentHash(window.location.hash || '#/');
    };

    // Listen for hash changes specifically
    window.addEventListener('hashchange', handleHashChange);

    // Set initial state in case it changed before load
    setCurrentHash(window.location.hash || '#/');

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
          <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center opacity-50 text-[var(--text-secondary)]">Loading...</div>}>
            {renderView()}
          </Suspense>
        </ErrorBoundary>
      </main>

      <Dock currentPath={currentHash.replace(/^#/, '') || '/'} />
      <ScrollToTop />
    </div>
  );
}
