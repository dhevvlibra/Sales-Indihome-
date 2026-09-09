import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, MessageCircle, ShieldCheck, Settings } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5px] text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="w-5 h-[2px] bg-slate-800 rounded-full block origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="w-5 h-[2px] bg-slate-800 rounded-full block origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="w-5 h-[2px] bg-slate-800 rounded-full block origin-center"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden lg:hidden border-t border-slate-100 bg-white shadow-xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
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

                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = link.page === currentPage;
                    return (
                      <button
                        key={link.label}
                        onClick={() => handleNavClick(link.page, link.anchorId)}
                        className={`w-full text-left block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-red-50 text-[#E0040B] font-bold'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </div>
                
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    id="mobile-nav-cta-coverage"
                    onClick={() => handleNavClick('cek-area')}
                    className="w-full flex items-center justify-center gap-2 bg-[#E0040B] hover:bg-[#B90006] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md text-center transition-all cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Cek Area &amp; Coverage ODP</span>
                  </button>
                  
                  <a
                    href={navWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-sm text-center transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat Sales ({activeSales.name})</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
