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
    // 1. If legacy hash exists (e.g. /#/admin or /#/budi), migrate to clean slash path
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashRaw = window.location.hash.replace(/^#\/?/, '').split('?')[0];
      if (hashRaw) {
        const cleanPath = `/${hashRaw}`;
        try {
          window.history.replaceState(null, '', cleanPath);
        } catch {}
      }
    }

    // 2. Read clean pathname (e.g. /admin, /paket, /budi, or /)
    const pathname = typeof window !== 'undefined'
      ? window.location.pathname.replace(/^\/+|\/+$/g, '')
      : '';

    if (pathname && KNOWN_PAGE_PATHS[pathname]) {
      return KNOWN_PAGE_PATHS[pathname];
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

