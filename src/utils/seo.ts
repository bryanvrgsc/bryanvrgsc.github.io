// SEO Utility - Dynamic Meta Tags
export interface MetaTagsConfig {
    title: string;
    description: string;
    ogImage?: string;
    ogUrl?: string;
    keywords?: string;
}

export const updateMetaTags = (meta: MetaTagsConfig) => {
    if (typeof window === 'undefined') return;

    // Update title
    document.title = meta.title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
        const attribute = property ? 'property' : 'name';
        let element = document.querySelector(`meta[${attribute}="${name}"]`);

        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attribute, name);
            document.head.appendChild(element);
        }

        element.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('description', meta.description);
    if (meta.keywords) {
        setMetaTag('keywords', meta.keywords);
    }

    // Open Graph tags
    setMetaTag('og:title', meta.title, true);
    setMetaTag('og:description', meta.description, true);
    setMetaTag('og:type', 'website', true);

    if (meta.ogImage) {
        setMetaTag('og:image', meta.ogImage, true);
    }

    if (meta.ogUrl) {
        setMetaTag('og:url', meta.ogUrl, true);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', meta.title);
    setMetaTag('twitter:description', meta.description);

    if (meta.ogImage) {
        setMetaTag('twitter:image', meta.ogImage);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.href = meta.ogUrl || window.location.href;
};

// Default meta tags
export const DEFAULT_META: MetaTagsConfig = {
    title: 'TechSolutions | Desarrollo Web & Apps Móviles',
    description: 'Soluciones tecnológicas profesionales: desarrollo web, aplicaciones móviles, y consultoría IT. Transformamos ideas en productos digitales de alto rendimiento.',
    keywords: 'desarrollo web, apps móviles, consultoría IT, React, TypeScript, soluciones digitales',
    ogUrl: 'https://bryanvrgsc.github.io',
};
