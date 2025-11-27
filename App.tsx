
import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { settings, applyTheme } from './src/store';
import { CanvasBackground, Header, Dock, ThemeToggle, LanguageToggle, ScrollToTop } from './src/components/SharedUI';
import { HomeView, ServicesView, PortfolioView, BlogView, ContactView } from './src/components/PageViews';

export default function App() {
  const { theme } = useStore(settings);
  // GitHub Pages Fix: Use Hash Routing (e.g., #/services) instead of Path Routing
  // This prevents 404 errors when refreshing pages on static hosting.
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    applyTheme(theme);
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
        {renderView()}
      </main>

      <Dock currentPath={currentHash.replace(/^#/, '') || '/'} />
      <ScrollToTop />
    </div>
  );
}
