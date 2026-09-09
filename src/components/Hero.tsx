import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Zap,
  ShieldCheck,
  Clock,
  CheckCircle2,
  MapPin,
  Search,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';
import { useAppNavigation } from '../navigation';
import { useOrderModal } from '../context/OrderContext';
import { useSales } from '../context/SalesContext';

export const Hero: React.FC = () => {
  const [quickArea, setQuickArea] = useState('');
  const { navigateTo } = useAppNavigation();
  const { openOrderModal } = useOrderModal();
  const { activeSales } = useSales();

  const mainWaUrl = getWhatsAppUrl({
    salesPhoneNumber: activeSales.phone,
    salesName: activeSales.name,
    intent: 'general',
    customNote: `Saya mau tanya info pasang baru internet rumah IndiHome via Kak ${activeSales.name}.`,
  });

  const handleQuickAreaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickArea.trim()) {
      navigateTo('cek-area');
      return;
    }
    const url = getWhatsAppUrl({
      salesPhoneNumber: activeSales.phone,
      salesName: activeSales.name,
      intent: 'coverage',
      address: quickArea,
      city: activeSales.area || 'Bandung / Cimahi / Sekitarnya',
      customNote: `Mohon cek ketersediaan ODP di area saya: ${quickArea}`,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToPackages = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('paket');
  };

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-8 lg:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Copywriting & High Conversion Split Side (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            {/* Promo Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E0040B] rounded-full text-[10px] font-bold uppercase mb-4 border border-red-100 self-start shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Promo Bandung &amp; Cimahi 2026
            </div>

            {/* Main Catchy Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-[48px] leading-[1.12] font-extrabold tracking-tight mb-3 sm:mb-4 text-[#0F172A]">
              Pasang Internet Rumah{' '}
              <span className="text-[#E0040B]">Cepat &amp; Stabil</span> Tanpa Ribet
            </h1>

            {/* Subheadline with Coverage Scope */}
            <p className="text-slate-500 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed max-w-[440px]">
              Layanan Pemasangan Resmi <strong className="text-slate-800 font-semibold">IndiHome by Telkomsel</strong> Area{' '}
              <span className="text-slate-900 font-semibold">
                Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi &amp; Soreang
              </span>
              . Proses Cepat, Praktis &amp; Terpercaya!
            </p>

            {/* CTA Buttons & Action Controls (Mobile Friendly) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5">
              <a
                id="hero-cta-whatsapp"
                href={mainWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5c] text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-green-600/20 transition-all active:scale-95 text-xs sm:text-sm min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Daftar via WhatsApp</span>
              </a>

              <button
                id="hero-cta-cek-area"
                onClick={() => navigateTo('cek-area')}
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-xs sm:text-sm cursor-pointer min-h-[44px]"
              >
                <MapPin className="w-4 h-4 text-[#E0040B]" />
                <span>Cek Area</span>
              </button>
            </div>

            {/* Quick Cek Area Widget (SaaS Theme Widget) */}
            <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 max-w-md">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>Cek Area Cepat</span>
                <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Sistem Aktif
                </span>
              </div>
              <form onSubmit={handleQuickAreaSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={quickArea}
                  onChange={(e) => setQuickArea(e.target.value)}
                  placeholder="Ketik nama kelurahan / kecamatan..."
                  className="w-full text-xs p-2.5 pr-9 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E0040B] focus:border-transparent text-slate-800 placeholder-slate-400"
                />
                <button
                  type="submit"
                  aria-label="Cek Area"
                  className="absolute right-2 text-[#E0040B] hover:text-[#990005] p-1 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Trust Badges & Active Coverage Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E0040B]" />
                <span>Sales Resmi Bersertifikat</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tanpa Antre</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: SaaS Showcase Split Cards (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {/* Top 3-Plan Split Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch pt-2">
              
              {/* Card 1: 200 Mbps Upspeed Starter */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 hover:shadow-md transition-all relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Internet + Streaming
                  </span>
                  <span className="text-[10px] font-extrabold text-[#E0040B] bg-red-50 px-2 py-0.5 rounded-md">
                    ⚡ Promo 3 Bln
                  </span>
                </div>
                <div className="text-3xl font-black text-[#E0040B] mb-0.5">
                  200 <span className="text-sm font-bold text-slate-800">Mbps</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mb-3">
                  Promo Upspeed (Speed Normal: 75 Mbps)
                </div>
                <div className="text-xs text-slate-500 mb-4">Vision+, Prime Video, Viu, MaxStream</div>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400">Mulai dari</div>
                  <div className="text-xl font-black text-slate-900 mb-1">
                    Rp 240k<span className="text-xs font-normal text-slate-500">/bln</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mb-3 italic">Belum termasuk PPN</div>
                  <button
                    id="hero-plan-200"
                    onClick={() =>
                      openOrderModal({
                        packageName: 'Promo Internet + Streaming 200 Mbps',
                        speed: '200 Mbps (Promo Upspeed 3 Bulan - Normal 75 Mbps)',
                        price: 'Rp 240.000/bln',
                        categoryLabel: 'Internet + Streaming',
                        customNote: 'Streaming Vision+, Prime Video, Viu, MaxStream',
                      })
                    }
                    className="w-full block text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Pilih Paket 200 Mbps
                  </button>
                </div>
              </div>

              {/* Card 2: 300 Mbps Best Value (Dark Elevated SaaS Card) */}
              <div className="bg-[#0F172A] p-5 rounded-3xl shadow-xl relative flex flex-col z-10 text-white border-2 border-[#E0040B]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E0040B] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-red-900/30 whitespace-nowrap z-20">
                  🔥 Paling Laris
                </div>
                <div className="flex items-center justify-between mb-1.5 mt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Best Value Promo
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md">
                    🔥 Promo 6 Bln
                  </span>
                </div>
                <div className="text-3xl font-black text-amber-300 mb-0.5">
                  300 <span className="text-sm font-bold text-white">Mbps</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-300 mb-3">
                  Promo Upspeed (Speed Normal: 100 Mbps)
                </div>
                <div className="text-xs text-slate-300 mb-4">Favorit keluarga streaming 4K &amp; WFH</div>
                
                <div className="mt-auto pt-4 border-t border-slate-800">
                  <div className="text-[11px] text-slate-400">Mulai dari</div>
                  <div className="text-xl font-black text-white mb-1">
                    Rp 270k<span className="text-xs font-normal text-slate-400">/bln</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mb-3 italic">Belum termasuk PPN</div>
                  <button
                    id="hero-plan-300"
                    onClick={() =>
                      openOrderModal({
                        packageName: 'Best Value Promo Internet + Streaming 300 Mbps',
                        speed: '300 Mbps (Promo Upspeed 6 Bulan - Normal 100 Mbps)',
                        price: 'Rp 270.000/bln',
                        categoryLabel: 'Best Value Promo',
                        customNote: 'Favorit keluarga streaming 4K & WFH',
                      })
                    }
                    className="w-full block text-center py-2.5 bg-[#E0040B] hover:bg-[#b90006] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-red-900/40 transition-all cursor-pointer"
                  >
                    Ambil Promo 300 Mbps
                  </button>
                </div>
              </div>

              {/* Card 3: 500 Mbps Ultra Speed */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 hover:shadow-md transition-all relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Super Upspeed
                  </span>
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    🚀 Promo 1 Tahun!
                  </span>
                </div>
                <div className="text-3xl font-black text-purple-700 mb-0.5">
                  500 <span className="text-sm font-bold text-slate-800">Mbps</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mb-3">
                  Promo Upspeed (Speed Normal: 200 Mbps)
                </div>
                <div className="text-xs text-slate-500 mb-4">Power user &amp; content creator</div>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400">Mulai dari</div>
                  <div className="text-xl font-black text-slate-900 mb-1">
                    Rp 350k<span className="text-xs font-normal text-slate-500">/bln</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mb-3 italic">Belum termasuk PPN</div>
                  <button
                    id="hero-plan-500"
                    onClick={() =>
                      openOrderModal({
                        packageName: 'Super Upspeed Internet + Streaming 500 Mbps',
                        speed: '500 Mbps (Promo Upspeed 1 Tahun - Normal 200 Mbps)',
                        price: 'Rp 350.000/bln',
                        categoryLabel: 'Super Upspeed',
                        customNote: 'Power user & content creator',
                      })
                    }
                    className="w-full block text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Pilih Paket 500 Mbps
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom 2-Panel Feature & Social Proof Split with Click to Dedicated Pages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              
              {/* Feature Box: Cara Pemasangan -> Click to Cara Pasang Page */}
              <button
                onClick={() => navigateTo('cara-pasang')}
                className="group text-left bg-white/80 hover:bg-white backdrop-blur-xs p-4 rounded-2xl border border-dashed border-slate-300 hover:border-slate-400 flex flex-col justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-[#E0040B] transition-colors">
                    Alur &amp; Cara Pasang
                  </h4>
                  <span className="text-[9px] font-bold text-[#E0040B] flex items-center gap-0.5">
                    Lihat Detail <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-start">
                    <div className="w-4 h-4 bg-slate-800 text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      <span className="font-bold text-slate-900">Pilih Paket &amp; Cek ODP:</span> Kirim alamat via WhatsApp.
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-4 h-4 bg-slate-800 text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      <span className="font-bold text-slate-900">Upload Data:</span> Registrasi &amp; kirim foto KTP via WA.
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-4 h-4 bg-slate-800 text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      <span className="font-bold text-slate-900">Pilih Jadwal Pasang:</span> Bebas pilih dalam 3x24 jam.
                    </p>
                  </div>
                </div>
              </button>

              {/* Testimonial Box: Kata Pelanggan -> Click to Testimoni Page */}
              <button
                onClick={() => navigateTo('testimoni')}
                className="group text-left bg-white hover:bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-[#E0040B] transition-colors">
                    Kata Pelanggan Bandung Raya
                  </h4>
                  <span className="text-[9px] font-bold text-[#E0040B] flex items-center gap-0.5">
                    Semua Ulasan <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex gap-1 mb-0.5 text-yellow-400 text-[9px]">
                      ★★★★★
                    </div>
                    <p className="text-[10px] italic text-slate-600 leading-tight">
                      &quot;Pemasangan di Cimahi cepet banget, teknisinya ramah. Internet stabil buat WFH!&quot;
                    </p>
                    <div className="text-[8px] font-bold text-slate-800 mt-1">
                      — Budi, Baros Cimahi
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex gap-1 mb-0.5 text-yellow-400 text-[9px]">
                      ★★★★★
                    </div>
                    <p className="text-[10px] italic text-slate-600 leading-tight">
                      &quot;Layanan sales fast respon, pagi daftar siang teknisi udah dateng pasang.&quot;
                    </p>
                    <div className="text-[8px] font-bold text-slate-800 mt-1">
                      — Sarah, Antapani Bandung
                    </div>
                  </div>
                </div>
              </button>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
