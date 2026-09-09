import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, MessageCircle, ShieldCheck, Settings, X, ChevronRight } from 'lucide-react';
import { IndiHomeLogo } from './IndiHomeLogo';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';
import { useAppNavigation, PageId } from '../navigation';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useAppNavigation();
  const { activeSales, isCustomSalesActive } = useSales();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scrolling while mobile navigation menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks: { label: string; page: PageId; anchorId?: string }[] = [
    { label: 'Beranda', page: 'home' },
    { label: 'Paket Internet', page: 'paket' },
    { label: 'Cek Area', page: 'cek-area' },
    { label: 'Keunggulan', page: 'keunggulan' },
    { label: 'Cara Pasang', page: 'cara-pasang' },
    { label: 'Testimoni', page: 'testimoni' },
    { label: 'FAQ', page: 'faq' },
  ];

  const handleNavClick = (page: PageId, anchorId?: string) => {
    navigateTo(page, anchorId);
    setMobileMenuOpen(false);
  };

  const salesDisplayName = activeSales.name ? activeSales.name.split('(')[0].trim() : 'Sales Resmi';
  const navWaUrl = getWhatsAppUrl({
    salesPhoneNumber: activeSales.phone,
    salesName: activeSales.name,
    customMessage: `Halo Kak ${salesDisplayName} (Sales Resmi IndiHome),\nSaya tertarik untuk pasang WiFi IndiHome. Apakah boleh saya tanya lebih lanjut?`,
  });

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200'
            : 'bg-white py-3.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <IndiHomeLogo className="w-9 h-9" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 tracking-tight leading-none block">
                  Layanan WiFi
                </span>
                <span className="text-[#E0040B] text-[10px] uppercase font-bold tracking-tight block">
                  IndiHome by Telkomsel
                </span>
              </div>
            </button>

            {/* Active Sales Badge for Desktop */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <span>
                Sales:{' '}
                <strong className="text-slate-900 font-bold">{activeSales.name}</strong>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {navLinks.map((link) => {
              const isActive = link.page === currentPage;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page, link.anchorId)}
                  className={`transition-colors py-1 cursor-pointer relative ${
                    isActive
                      ? 'text-[#E0040B] font-bold'
                      : 'hover:text-[#E0040B] text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E0040B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Direct WhatsApp CTA for Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={navWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat {activeSales.name.split(' ')[0]}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <div className="sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-700 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{activeSales.name.split(' ')[0]}</span>
            </div>

            <motion.button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5px] text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
              aria-label="Buka Menu Navigasi"
              aria-expanded={mobileMenuOpen}
            >
              <span className="w-5 h-[2px] bg-slate-800 rounded-full block" />
              <span className="w-5 h-[2px] bg-slate-800 rounded-full block" />
              <span className="w-5 h-[2px] bg-slate-800 rounded-full block" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Modern Fullscreen Mobile Navigation Sheet/Overlay (Numpuk langsung di atas layar tanpa sela kosong di atas) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-fullscreen"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden"
          >
            {/* Top Bar of Mobile Menu: Aligned seamlessly with header position */}
            <div className="px-4 sm:px-8 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                  <IndiHomeLogo className="w-9 h-9" />
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 tracking-tight leading-none block">
                    Layanan WiFi
                  </span>
                  <span className="text-[#E0040B] text-[10px] uppercase font-bold tracking-tight block">
                    IndiHome by Telkomsel
                  </span>
                </div>
              </div>

              {/* Close Button on Top Right (Exact position of toggle button) */}
              <motion.button
                id="mobile-menu-close"
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
                aria-label="Tutup Menu"
              >
                <X className="w-6 h-6 text-slate-800" />
              </motion.button>
            </div>

            {/* Scrollable Menu Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Sales Info Banner in Mobile Menu */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    Sales Pendamping: <strong>{activeSales.name}</strong>
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  Aktif
                </span>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = link.page === currentPage;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.page, link.anchorId)}
                      className={`w-full text-left flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-red-50 text-[#E0040B] font-bold'
                          : 'text-slate-800 hover:bg-slate-100/80 active:bg-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#E0040B]' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  id="mobile-nav-cta-coverage"
                  onClick={() => handleNavClick('cek-area')}
                  className="w-full flex items-center justify-center gap-2 bg-[#E0040B] hover:bg-[#B90006] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md text-center transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Cek Area &amp; Coverage ODP</span>
                </button>
                
                <a
                  href={navWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm text-center transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat Sales ({activeSales.name})</span>
                </a>

                <p className="text-center text-[11px] text-slate-400 pt-1">
                  Pemasangan resmi teknisi Telkomsel • Bebas antre
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
