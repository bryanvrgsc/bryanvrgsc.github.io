
import React, { useEffect, useState, Suspense } from 'react';
import { useStore } from '@nanostores/react';
import { settings, applyTheme, checkPerformance } from './src/store';
import { CanvasBackground, Header, Dock, ThemeToggle, LanguageToggle, ScrollToTop } from './src/components/SharedUI';

// Lazy load views for Code Splitting
const HomeView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.HomeView })));
const ServicesView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.ServicesView })));
const PortfolioView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.PortfolioView })));
const BlogView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.BlogView })));
const ContactView = React.lazy(() => import('./src/components/PageViews').then(module => ({ default: module.ContactView })));

export default function App() {
  const { theme } = useStore(settings);
  // GitHub Pages Fix: Use Hash Routing (e.g., #/services) instead of Path Routing
  // This prevents 404 errors when refreshing pages on static hosting.
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    applyTheme(theme);
    // Initialize performance check (Lite Mode detection)
    checkPerformance();
  }, [theme]);

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
        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center opacity-50">Loading...</div>}>
          {renderView()}
        </Suspense>
      </main>

      <Dock currentPath={currentHash.replace(/^#/, '') || '/'} />
      <ScrollToTop />
    </div>
  );
}