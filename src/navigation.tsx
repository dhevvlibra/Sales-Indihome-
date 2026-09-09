import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type PageId =
  | 'home'
  | 'paket'
  | 'cek-area'
  | 'keunggulan'
  | 'cara-pasang'
  | 'testimoni'
  | 'faq'
  | 'admin';

const KNOWN_PAGE_PATHS: Record<string, PageId> = {
  'admin': 'admin',
  'kelola-sales': 'admin',
  'paket': 'paket',
  'paket-internet': 'paket',
  'cek-area': 'cek-area',
  'coverage': 'cek-area',
  'keunggulan': 'keunggulan',
  'cara-pasang': 'cara-pasang',
  'testimoni': 'testimoni',
  'faq': 'faq',
};

interface NavigationContextType {
  currentPage: PageId;
  navigateTo: (page: PageId, anchorId?: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  navigateTo: () => {},
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getPageFromUrl = (): PageId => {
    if (typeof window === 'undefined') return 'home';

    // 1. Check Hash first (supports /#/admin, #/admin, #admin, etc.)
    const hash = window.location.hash || '';
    const cleanHash = hash.replace(/^#\/?/, '').split('?')[0].trim();
    if (cleanHash) {
      const hashSegments = cleanHash.split('/').filter(Boolean);
      const hashTarget = hashSegments[hashSegments.length - 1];
      if (hashTarget && KNOWN_PAGE_PATHS[hashTarget]) {
        // Attempt clean-up to slash path in browser address bar
        try {
          window.history.replaceState(null, '', `/${hashTarget}`);
        } catch {}
        return KNOWN_PAGE_PATHS[hashTarget];
      }
    }

    // 2. Check Pathname (supports /admin, /paket, and subdirectories like /my-app/admin)
    const pathname = window.location.pathname || '';
    const cleanPath = pathname.replace(/^\/+|\/+$/g, '').split('?')[0].trim();
    if (cleanPath) {
      const pathSegments = cleanPath.split('/').filter(Boolean);
      // Check from deepest segment to root
      for (let i = pathSegments.length - 1; i >= 0; i--) {
        const segment = pathSegments[i];
        if (KNOWN_PAGE_PATHS[segment]) {
          return KNOWN_PAGE_PATHS[segment];
        }
      }
    }

    // Default to 'home' (also applies to sales slugs like /budi, /rian)
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromUrl);

  useEffect(() => {
    const handleUrlChange = () => {
      const page = getPageFromUrl();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = useCallback((page: PageId, anchorId?: string) => {
    let targetPath = '/';

    if (page === 'home') {
      // Check if there is an active sales slug in session to preserve it
      let preservedSlug = '';
      try {
        const stored = sessionStorage.getItem('indihome_active_sales_slug');
        if (stored && !KNOWN_PAGE_PATHS[stored]) {
          preservedSlug = stored;
        }
      } catch {}

      targetPath = preservedSlug ? `/${preservedSlug}` : '/';
    } else {
      targetPath = `/${page}`;
    }

    // Update browser URL cleanly without '#' hashtag
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      try {
        window.history.pushState(null, '', targetPath);
      } catch {}
    }

    setCurrentPage(page);

    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => useContext(NavigationContext);

