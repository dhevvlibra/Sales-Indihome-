import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SalesAgent } from '../types';
import {
  DEFAULT_SALES_AGENTS,
  normalizePhoneNumber,
  formatPhoneNumberDisplay,
  WHATSAPP_CONFIG,
} from '../config/whatsapp';

const STORAGE_KEY = 'indihome_sales_agents_v1';
const ACTIVE_SALES_SESSION_KEY = 'indihome_active_sales_slug';

interface SalesContextType {
  salesList: SalesAgent[];
  activeSales: SalesAgent;
  isCustomSalesActive: boolean;
  addSales: (agent: {
    name: string;
    phone: string;
    slug: string;
    area?: string;
    roleTitle?: string;
    isDefault?: boolean;
  }) => { success: boolean; message?: string; agent?: SalesAgent };
  updateSales: (id: string, updates: Partial<SalesAgent>) => { success: boolean; message?: string };
  deleteSales: (id: string) => { success: boolean; message?: string };
  setDefaultSales: (id: string) => boolean;
  setActiveSalesBySlug: (slug: string) => boolean;
  getSalesBySlug: (slug: string) => SalesAgent | undefined;
  resetToDefaults: () => void;
  formatShareUrl: (slug: string) => string;
  formatSalesShareMessage: (agent: SalesAgent) => string;
}

const SalesContext = createContext<SalesContextType | null>(null);

// Helper to sanitize slug
export const sanitizeSlug = (raw: string): string => {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Reserved routes that cannot be used as sales slugs
export const RESERVED_SLUGS = new Set([
  'admin',
  'kelola-sales',
  'paket',
  'paket-internet',
  'cek-area',
  'coverage',
  'keunggulan',
  'cara-pasang',
  'testimoni',
  'faq',
  'home',
  'api',
  'assets',
]);

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Sales List from LocalStorage or default
  const [salesList, setSalesList] = useState<SalesAgent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SALES_AGENTS;
  });

  // Save to localStorage whenever salesList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(salesList));
    } catch {
      // Ignore
    }
  }, [salesList]);

  // Find default fallback agent
  const defaultAgent =
    salesList.find((s) => s.isDefault && s.isActive !== false) ||
    salesList.find((s) => s.isActive !== false) ||
    DEFAULT_SALES_AGENTS[0];

  const [activeSales, setActiveSales] = useState<SalesAgent>(defaultAgent);
  const [isCustomSalesActive, setIsCustomSalesActive] = useState<boolean>(false);

  // Helper to find agent by slug
  const getSalesBySlug = useCallback(
    (slug: string): SalesAgent | undefined => {
      const clean = sanitizeSlug(slug);
      return salesList.find(
        (s) => s.slug.toLowerCase() === clean && s.isActive !== false
      );
    },
    [salesList]
  );

  // Function to set active sales by slug
  const setActiveSalesBySlug = useCallback(
    (slug: string): boolean => {
      const found = getSalesBySlug(slug);
      if (found) {
        setActiveSales(found);
        setIsCustomSalesActive(true);
        try {
          sessionStorage.setItem(ACTIVE_SALES_SESSION_KEY, found.slug);
        } catch {}
        return true;
      }
      return false;
    },
    [getSalesBySlug]
  );

  // 2. Detect sales slug from URL on mount & URL changes
  useEffect(() => {
    const detectSalesFromUrl = () => {
      // Priority A: Query parameters (e.g. ?sales=budi or ?ref=budi)
      const urlParams = new URLSearchParams(window.location.search);
      const querySlug = urlParams.get('sales') || urlParams.get('ref') || urlParams.get('s');
      if (querySlug) {
        const found = getSalesBySlug(querySlug);
        if (found) {
          setActiveSales(found);
          setIsCustomSalesActive(true);
          try {
            sessionStorage.setItem(ACTIVE_SALES_SESSION_KEY, found.slug);
          } catch {}
          return;
        }
      }

      // Priority B: Pathname (e.g. /budi or /rian)
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (pathname && !RESERVED_SLUGS.has(pathname)) {
        const found = getSalesBySlug(pathname);
        if (found) {
          setActiveSales(found);
          setIsCustomSalesActive(true);
          try {
            sessionStorage.setItem(ACTIVE_SALES_SESSION_KEY, found.slug);
          } catch {}
          return;
        }
      }

      // Priority C: Hash (e.g. #/budi or #budi)
      const hashRaw = window.location.hash.replace(/^#\/?/, '').split('?')[0].split('/')[0];
      if (hashRaw && !RESERVED_SLUGS.has(hashRaw)) {
        const found = getSalesBySlug(hashRaw);
        if (found) {
          setActiveSales(found);
          setIsCustomSalesActive(true);
          try {
            sessionStorage.setItem(ACTIVE_SALES_SESSION_KEY, found.slug);
          } catch {}
          return;
        }
      }

      // Priority D: Check previous session storage if visitor already navigated
      try {
        const storedSlug = sessionStorage.getItem(ACTIVE_SALES_SESSION_KEY);
        if (storedSlug) {
          const found = getSalesBySlug(storedSlug);
          if (found) {
            setActiveSales(found);
            setIsCustomSalesActive(true);
            return;
          }
        }
      } catch {}

      // Fallback: Use default agent
      setActiveSales(defaultAgent);
      setIsCustomSalesActive(false);
    };

    detectSalesFromUrl();

    // Listen to popstate and hashchange
    window.addEventListener('popstate', detectSalesFromUrl);
    window.addEventListener('hashchange', detectSalesFromUrl);
    return () => {
      window.removeEventListener('popstate', detectSalesFromUrl);
      window.removeEventListener('hashchange', detectSalesFromUrl);
    };
  }, [getSalesBySlug, defaultAgent]);

  // Add Sales
  const addSales = (agentData: {
    name: string;
    phone: string;
    slug: string;
    area?: string;
    roleTitle?: string;
    isDefault?: boolean;
  }) => {
    const cleanName = agentData.name.trim();
    if (!cleanName) {
      return { success: false, message: 'Nama sales tidak boleh kosong.' };
    }

    const cleanPhone = normalizePhoneNumber(agentData.phone);
    if (!cleanPhone || cleanPhone.length < 9) {
      return { success: false, message: 'Nomor WhatsApp tidak valid. Masukkan nomor yang benar.' };
    }

    let cleanSlug = sanitizeSlug(agentData.slug || agentData.name);
    if (!cleanSlug) {
      cleanSlug = 'sales-' + Math.random().toString(36).substring(2, 6);
    }

    if (RESERVED_SLUGS.has(cleanSlug)) {
      return {
        success: false,
        message: `Slug "${cleanSlug}" tidak dapat digunakan karena merupakan nama halaman sistem. Gunakan slug lain (misal: "${cleanSlug}-sales").`,
      };
    }

    // Check duplicate slug
    const duplicate = salesList.find((s) => s.slug.toLowerCase() === cleanSlug.toLowerCase());
    if (duplicate) {
      return {
        success: false,
        message: `Link /${cleanSlug} sudah digunakan oleh sales "${duplicate.name}". Silakan pilih slug lain.`,
      };
    }

    const newAgent: SalesAgent = {
      id: `sales-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: cleanName,
      slug: cleanSlug,
      phone: cleanPhone,
      displayPhone: formatPhoneNumberDisplay(cleanPhone),
      area: agentData.area?.trim() || 'Bandung & Sekitarnya',
      roleTitle: agentData.roleTitle?.trim() || 'Sales Resmi IndiHome by Telkomsel',
      isDefault: Boolean(agentData.isDefault),
      isActive: true,
      createdAt: Date.now(),
    };

    setSalesList((prev) => {
      let updated = [...prev];
      if (newAgent.isDefault) {
        updated = updated.map((s) => ({ ...s, isDefault: false }));
      }
      return [newAgent, ...updated];
    });

    return { success: true, agent: newAgent };
  };

  // Update Sales
  const updateSales = (id: string, updates: Partial<SalesAgent>) => {
    if (updates.slug) {
      const cleanSlug = sanitizeSlug(updates.slug);
      if (RESERVED_SLUGS.has(cleanSlug)) {
        return {
          success: false,
          message: `Slug "${cleanSlug}" adalah nama halaman sistem. Gunakan slug lain.`,
        };
      }
      const duplicate = salesList.find(
        (s) => s.id !== id && s.slug.toLowerCase() === cleanSlug.toLowerCase()
      );
      if (duplicate) {
        return {
          success: false,
          message: `Link /${cleanSlug} sudah digunakan oleh sales "${duplicate.name}".`,
        };
      }
      updates.slug = cleanSlug;
    }

    if (updates.phone) {
      updates.phone = normalizePhoneNumber(updates.phone);
      updates.displayPhone = formatPhoneNumberDisplay(updates.phone);
    }

    setSalesList((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        if (updates.isDefault) {
          return { ...item, isDefault: false };
        }
        return item;
      });
    });

    return { success: true };
  };

  // Delete Sales
  const deleteSales = (id: string) => {
    const target = salesList.find((s) => s.id === id);
    if (!target) return { success: false, message: 'Sales tidak ditemukan.' };

    if (salesList.length <= 1) {
      return { success: false, message: 'Minimal harus ada 1 sales terdaftar di sistem.' };
    }

    setSalesList((prev) => {
      const remaining = prev.filter((s) => s.id !== id);
      // If deleted item was default, make the first one default
      if (target.isDefault && remaining.length > 0) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });

    return { success: true };
  };

  // Set Default Sales
  const setDefaultSales = (id: string): boolean => {
    setSalesList((prev) =>
      prev.map((s) => ({
        ...s,
        isDefault: s.id === id,
      }))
    );
    return true;
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setSalesList(DEFAULT_SALES_AGENTS);
    setActiveSales(DEFAULT_SALES_AGENTS[0]);
    setIsCustomSalesActive(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(ACTIVE_SALES_SESSION_KEY);
    } catch {}
  };

  // Format Share URL (Clean domain.com/slug)
  const formatShareUrl = (slug: string): string => {
    if (typeof window === 'undefined') return `/${slug}`;
    const origin = window.location.origin;
    return `${origin}/${slug}`;
  };

  // Format message template to forward to sales
  const formatSalesShareMessage = (agent: SalesAgent): string => {
    const link = formatShareUrl(agent.slug);
    const phoneFormatted = formatPhoneNumberDisplay(agent.phone);
    return (
      `Halo Kak ${agent.name},\n\n` +
      `Ini link website promosi resmi WiFi IndiHome khusus milikmu:\n` +
      `👉 ${link}\n\n` +
      `Kelebihan link ini:\n` +
      `✅ Nama dan wilayahmu (${agent.area || 'Jawa Barat'}) otomatis terpasang di website.\n` +
      `✅ Semua tombol daftar pasang WiFi & chat WA langsung mengarah ke nomor HP kamu (${phoneFormatted}).\n` +
      `✅ Calon pelanggan tidak akan tertukar ke sales lain.\n\n` +
      `Silakan bagikan link ini di WhatsApp Story, grup warga, Facebook, atau saat canvassing. Semangat closing!`
    );
  };

  return (
    <SalesContext.Provider
      value={{
        salesList,
        activeSales,
        isCustomSalesActive,
        addSales,
        updateSales,
        deleteSales,
        setDefaultSales,
        setActiveSalesBySlug,
        getSalesBySlug,
        resetToDefaults,
        formatShareUrl,
        formatSalesShareMessage,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = (): SalesContextType => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
};
