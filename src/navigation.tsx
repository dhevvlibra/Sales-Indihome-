import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageId =
  | 'home'
  | 'paket'
  | 'cek-area'
  | 'keunggulan'
  | 'cara-pasang'
  | 'testimoni'
  | 'faq'
  | 'admin';

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
    // 1. Check pathname first
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (pathname === 'admin' || pathname === 'kelola-sales') {
      return 'admin';
    }

    // 2. Check hash
    const hash = window.location.hash.replace('#/', '').replace('#', '').split('?')[0];
    if (hash === 'admin' || hash === 'kelola-sales') {
      return 'admin';
    }
    if (hash === 'paket' || hash === 'paket-internet') {
      return 'paket';
    }
    if (hash === 'cek-area' || hash === 'coverage') {
      return 'cek-area';
    }
    if (
      hash === 'keunggulan' ||
      hash === 'cara-pasang' ||
      hash === 'testimoni' ||
      hash === 'faq'
    ) {
      return hash as PageId;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromUrl);

  useEffect(() => {
    const handleUrlChange = () => {
      const page = getPageFromUrl();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const navigateTo = (page: PageId, anchorId?: string) => {
    if (page === 'home') {
      window.location.hash = anchorId ? `#/${anchorId}` : '#/';
      setCurrentPage('home');
      if (anchorId) {
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.hash = `#/${page}`;
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => useContext(NavigationContext);
