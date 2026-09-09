import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wifi,
  Check,
  Flame,
  Shield,
  Smartphone,
  MessageCircle,
  Sparkles,
  Gamepad2,
  Film,
  Tv,
  Users,
  TrendingUp,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { PACKAGES_DATA, TELKOMSEL_ONE_TIERS } from '../data/packages';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useOrderModal } from '../context/OrderContext';
import { PackageCategory, PackageItem, TelkomselOneTier } from '../types';
import { StreamingLogosList } from './StreamingLogos';

export const Packages: React.FC = () => {
  const { openOrderModal } = useOrderModal();
  // Default to 'all' so "Semua Paket" on top is active by default, or user can filter by specific category
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('all');
  
  // Interactive state for Telkomsel One Kuota: '30 GB' vs '50 GB'
  // Default to '50 GB' because it's the standout promo (only +10k for +20GB!)
  const [selectedKuotaTOne, setSelectedKuotaTOne] = useState<'30 GB' | '50 GB'>('50 GB');

  const streamingPackages = PACKAGES_DATA.filter((p) => p.category === 'internet-streaming');
  const gamingPackage = PACKAGES_DATA.find((p) => p.category === 'gaming');
  const moviePackage = PACKAGES_DATA.find((p) => p.category === 'movie');

  const specificCategoryTabs = [
    {
      id: 'internet-streaming' as PackageCategory,
      title: 'Internet + Streaming',
      subtitle: 'WiFi Rumah + 4 Aplikasi',
      icon: Tv,
      badge: 'Mulai 240rb',
      badgeColor: 'bg-red-50 text-[#E0040B] border-red-200',
    },
    {
      id: 'telkomsel-one' as PackageCategory,
      title: 'Telkomsel One Dynamic',
      subtitle: 'WiFi + Kuota HP Keluarga',
      icon: Users,
      badge: 'Bisa 30GB / 50GB',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'gaming' as PackageCategory,
      title: 'Internet + Game',
      subtitle: 'Benefit MLBB, PB, FF',
      icon: Gamepad2,
      badge: 'Khusus Gamers',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'movie' as PackageCategory,
      title: 'Movie Complete',
      subtitle: 'Netflix, Disney+, Vidio',
      icon: Film,
      badge: 'Bioskop Lengkap',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  // Render a standard package card (Internet Streaming, Gaming, Movie)
  const renderStandardCard = (pkg: PackageItem) => {
    const isBestSeller = pkg.isBestSeller;
    const waUrl = getWhatsAppUrl({
      intent: 'package',
      packageName: pkg.name,
      speed: `${pkg.speedMbps} Mbps (Upspeed ${pkg.upspeedMbps} Mbps)`,
      price: `${pkg.formattedPrice}/bln (belum PPN)`,
      customNote: pkg.ctaMessage,
    });

    return (
      <div
        key={pkg.id}
        className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white transition-all ${
          isBestSeller
            ? 'border-2 border-[#E0040B] shadow-xl shadow-red-500/10'
            : 'border border-slate-200 shadow-sm hover:border-slate-300'
        }`}
      >
        {/* Top Badges */}
        {isBestSeller && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E0040B] text-white text-[9px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <Flame className="w-3 h-3 fill-white" />
            <span>{pkg.tag || 'Paling Laris'}</span>
          </div>
        )}

        {pkg.tag && !isBestSeller && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[9px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-xs flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{pkg.tag}</span>
          </div>
        )}

        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {pkg.categoryLabel}
            </span>
          </div>

          <h3 className="text-xl font-black text-[#0F172A] leading-snug">
            {pkg.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 min-h-[34px] leading-relaxed">
            {pkg.idealFor}
          </p>

          {/* Speed & Upspeed Promo Showcase - Upspeed is the primary HERO focal point */}
          <div className="mt-4 mb-5 p-4 rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-amber-50/60 border-2 border-red-200/80 shadow-xs relative overflow-hidden">
            {/* Background speed watermark */}
            <div className="absolute -right-3 -bottom-4 text-red-100/70 font-black text-6xl select-none pointer-events-none">
              {pkg.upspeedMbps}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#E0040B] bg-white px-2.5 py-0.5 rounded-md border border-red-200 shadow-2xs">
                  <TrendingUp className="w-3 h-3 text-[#E0040B]" />
                  Promo Upspeed {pkg.upspeedDuration}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                  Speed Asli: <strong className="text-slate-800">{pkg.speedMbps} Mbps</strong>
                </span>
              </div>

              {/* Dominant Hero Speed Display */}
              <div className="flex items-baseline gap-1.5 my-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[#E0040B] tracking-tight">
                  {pkg.upspeedMbps}
                </span>
                <span className="text-xl font-black text-slate-900">Mbps</span>
                <span className="ml-auto text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  ⚡ Super Ngebut
                </span>
              </div>

              <div className="pt-2 mt-2 border-t border-red-200/60 flex items-center justify-between text-[11px] text-slate-700">
                <span className="font-medium">
                  Melesat ke <strong className="text-[#E0040B]">{pkg.upspeedMbps} Mbps</strong> selama {pkg.upspeedDuration}!
                </span>
                <span className="text-[10px] text-slate-400">Normal {pkg.speedMbps} Mbps</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#0F172A] tracking-tight">
                {pkg.formattedPrice}
              </span>
              <span className="text-xs font-normal text-slate-500">/bulan</span>
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px]">
              <span className="text-slate-400 italic">Belum termasuk PPN 11%</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-500" />
                {pkg.deviceRecommendation}
              </span>
            </div>
          </div>

          {/* Included Apps with Authentic Brand Logos */}
          {pkg.includedApps && pkg.includedApps.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center justify-between gap-1 mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {pkg.category === 'gaming'
                    ? 'Benefit Game Termasuk:'
                    : pkg.category === 'movie'
                    ? 'Aplikasi Movie Termasuk:'
                    : 'Layanan Streaming Termasuk:'}
                </p>
              </div>

              {pkg.category === 'gaming' ? (
                <div className="flex flex-wrap gap-1.5">
                  {pkg.includedApps.map((app, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg border bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              ) : (
                <StreamingLogosList apps={pkg.includedApps} size="sm" />
              )}
            </div>
          )}

          {/* Perks */}
          <div className="space-y-2 mb-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Fasilitas Paket:
            </p>
            {pkg.perks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-red-50 text-[#E0040B] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-snug">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            id={`btn-choose-${pkg.id}`}
            onClick={() =>
              openOrderModal({
                packageName: pkg.name,
                speed: `${pkg.speedMbps} Mbps (Upspeed ${pkg.upspeedMbps} Mbps - ${pkg.upspeedDuration})`,
                price: `${pkg.formattedPrice}/bln`,
                categoryLabel: pkg.categoryLabel,
                customNote: pkg.ctaMessage,
              })
            }
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
              isBestSeller
                ? 'bg-[#E0040B] hover:bg-[#b90006] text-white shadow-lg shadow-red-200'
                : 'bg-[#0F172A] hover:bg-slate-800 text-white shadow-xs'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Pilih Paket {pkg.speedMbps} Mbps</span>
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            Isi data singkat lalu lanjut ke WhatsApp Sales
          </p>
        </div>
      </div>
    );
  };

  // Render a Telkomsel One card with INTERACTIVE 30GB vs 50GB selector
  const renderTelkomselOneCard = (tier: TelkomselOneTier) => {
    const currentOption = tier.options[selectedKuotaTOne];
    const is50Gb = selectedKuotaTOne === '50 GB';

    const waUrl = getWhatsAppUrl({
      intent: 'package',
      packageName: `${tier.name} + Kuota ${selectedKuotaTOne}`,
      speed: `${tier.speedMbps} Mbps (Upspeed ${tier.upspeedMbps} Mbps)`,
      price: `${currentOption.formattedPrice}/bln (belum PPN)`,
      customNote: currentOption.ctaMessage,
    });

    return (
      <div
        key={tier.id}
        className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white transition-all ${
          is50Gb && tier.isBestSeller
            ? 'border-2 border-[#E0040B] shadow-xl shadow-red-500/10'
            : 'border border-slate-200 shadow-sm hover:border-slate-300'
        }`}
      >
        {/* Dynamic Badge */}
        {is50Gb && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E0040B] text-white text-[9px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <Flame className="w-3 h-3 fill-white" />
            <span>Paling Untung! Cuma Beda 10rb (+20 GB)</span>
          </div>
        )}

        {!is50Gb && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-xs whitespace-nowrap">
            <span>Paket Kuota Hemat 30 GB</span>
          </div>
        )}

        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider border border-amber-200">
              Telkomsel One Dynamic
            </span>
          </div>

          <h3 className="text-xl font-black text-[#0F172A] leading-snug">
            {tier.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 min-h-[34px] leading-relaxed">
            {tier.idealFor}
          </p>

          {/* Speed & Upspeed Promo Showcase - Upspeed is the primary HERO focal point */}
          <div className="mt-4 mb-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/90 via-red-50/60 to-orange-50/70 border-2 border-amber-300/80 shadow-xs relative overflow-hidden">
            {/* Background speed watermark */}
            <div className="absolute -right-3 -bottom-4 text-amber-200/50 font-black text-6xl select-none pointer-events-none">
              {tier.upspeedMbps}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#E0040B] bg-white px-2.5 py-0.5 rounded-md border border-red-200 shadow-2xs">
                  <TrendingUp className="w-3 h-3 text-[#E0040B]" />
                  Promo Upspeed {tier.upspeedDuration}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                  Speed Asli: <strong className="text-slate-800">{tier.speedMbps} Mbps</strong>
                </span>
              </div>

              {/* Dominant Hero Speed Display */}
              <div className="flex items-baseline gap-1.5 my-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[#E0040B] tracking-tight">
                  {tier.upspeedMbps}
                </span>
                <span className="text-xl font-black text-slate-900">Mbps</span>
                <span className="ml-auto text-[10px] font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  ⚡ WiFi Fiber
                </span>
              </div>

              <div className="pt-2 mt-2 border-t border-amber-200/70 flex items-center justify-between text-[11px] text-slate-700">
                <span className="font-medium">
                  Melesat ke <strong className="text-[#E0040B]">{tier.upspeedMbps} Mbps</strong> selama {tier.upspeedDuration}!
                </span>
                <span className="text-[10px] text-slate-400">Normal {tier.speedMbps} Mbps</span>
              </div>
            </div>
          </div>

          {/* VISUAL DIFFERENCE CALLOUT BOX (Active Kuota Variant) */}
          <div className="mb-4">
            {is50Gb ? (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 text-xs shadow-2xs">
                <div className="flex items-center gap-1.5 text-amber-950 font-black text-xs mb-1">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-600 shrink-0" />
                  <span>Varian Aktif: Kuota HP Keluarga 50 GB (+20 GB Ekstra!)</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Hanya selisih <strong className="text-[#E0040B] font-bold">Rp 10.000 / bulan</strong> dari varian 30 GB, Anda langsung mendapatkan ekstra kuota <strong>+20 GB</strong> untuk seluruh nomor Telkomsel keluarga!
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                  <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Varian Aktif: Kuota HP Keluarga 30 GB / bulan</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Kuota bersama 30 GB per bulan yang dapat dibagi ke nomor Telkomsel anggota keluarga untuk internetan di luar rumah.
                </p>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-[#0F172A] tracking-tight">
                {currentOption.formattedPrice}
              </span>
              <span className="text-xs font-normal text-slate-500">/bulan</span>
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px]">
              <span className="text-slate-400 italic">Belum termasuk PPN 11%</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-500" />
                WiFi + Kuota HP {selectedKuotaTOne}
              </span>
            </div>
          </div>

          {/* Included Apps with Authentic Brand Logos */}
          <div className="mb-5">
            <div className="flex items-center justify-between gap-1 mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Layanan Streaming Termasuk:
              </p>
            </div>
            <StreamingLogosList apps={tier.includedApps} size="sm" />
          </div>

          {/* Perks */}
          <div className="space-y-2 mb-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Fasilitas Paket Telkomsel One:
            </p>
            {tier.perks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-red-50 text-[#E0040B] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-snug">{perk}</span>
              </div>
            ))}
            <div className="flex items-start gap-2 text-xs text-slate-700">
              <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <span className="leading-snug font-medium text-amber-900">
                {is50Gb
                  ? 'Kuota Bersama Keluarga 50 GB/bulan (Paket paling untung, beda 10rb)'
                  : 'Kuota Bersama Keluarga 30 GB/bulan untuk nomor Telkomsel'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            id={`btn-choose-${tier.id}-${selectedKuotaTOne.replace(' ', '')}`}
            onClick={() =>
              openOrderModal({
                packageName: `${tier.name} + Kuota ${selectedKuotaTOne}`,
                speed: `${tier.speedMbps} Mbps (Upspeed ${tier.upspeedMbps} Mbps - ${tier.upspeedDuration})`,
                price: `${currentOption.formattedPrice}/bln`,
                categoryLabel: 'Telkomsel One Dynamic',
                customNote: currentOption.ctaMessage,
              })
            }
            className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 bg-[#E0040B] hover:bg-[#b90006] text-white shadow-lg shadow-red-200 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Pilih Paket ({tier.speedMbps} Mbps + {selectedKuotaTOne})</span>
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            Isi data singkat lalu lanjut ke WhatsApp Sales
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="paket" className="py-16 md:py-24 bg-white relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 text-[#E0040B] rounded-full text-xs font-semibold mb-3 border border-red-100">
            <span className="w-2 h-2 rounded-full bg-[#E0040B]"></span>
            <span>Katalog Paket Resmi IndiHome by Telkomsel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Pilihan Paket Internet &amp; Hiburan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Pilih paket yang sesuai kebutuhan rumah Anda. Dapatkan promo <strong className="text-slate-900 font-bold">Upspeed Drastis</strong>, sewa modem WiFi dual-band tanpa biaya tambahan, dan tagihan pasca-bayar.
          </p>
        </div>

        {/* Category Navigation Bar: "Semua Paket" di Atas, Baru Kategori Sisanya di Bawahnya */}
        <div className="mb-10 max-w-5xl mx-auto space-y-2.5 sm:space-y-3">
          {/* 1. Master Tab: Semua Paket (Di Atas Full-Width) */}
          <button
            type="button"
            id="tab-category-all"
            onClick={() => setActiveCategory('all')}
            className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              activeCategory === 'all'
                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg shadow-slate-900/10 ring-2 ring-red-500/30'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activeCategory === 'all' ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-2xs'
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black leading-tight">
                    Semua Paket
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      activeCategory === 'all'
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : 'bg-red-50 text-[#E0040B] border-red-200'
                    }`}
                  >
                    Katalog Lengkap
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${activeCategory === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Bandingkan seluruh katalog resmi: WiFi Rumah, Streaming Hiburan, Telkomsel One, Game, &amp; Movie
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold shrink-0">
              <span className={activeCategory === 'all' ? 'text-white' : 'text-slate-600'}>
                Tampilkan Semua
              </span>
              <ArrowRight className={`w-3.5 h-3.5 ${activeCategory === 'all' ? 'text-red-400' : 'text-slate-400'}`} />
            </div>
          </button>

          {/* 2. Sub Tabs: 4 Kategori Sisanya (Grid 2 Kolom di Mobile, 4 Kolom di Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {specificCategoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-category-${tab.id}`}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`p-3 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-2xs'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                        isActive ? 'bg-white/20 text-white border-white/20' : tab.badgeColor
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black leading-snug">
                      {tab.title}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                      {tab.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: TELKOMSEL ONE DYNAMIC TAB                             */}
        {/* ------------------------------------------------------------- */}
        {activeCategory === 'telkomsel-one' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Telkomsel One Banner & Master Kuota Switcher */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-red-500/10 to-orange-500/10 border border-amber-200">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wider mb-1">
                    <Users className="w-4 h-4 text-[#E0040B]" />
                    Paket 2-in-1: WiFi Rumah + Kuota HP Keluarga
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Satu Tagihan Praktis untuk WiFi Rumah &amp; Nomor Telkomsel Keluarga
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Pilih besaran kuota bersama yang Anda inginkan di bawah ini. Kuota dapat dipakai bersama oleh beberapa nomor Telkomsel di keluarga Anda.
                  </p>
                </div>

                {/* Master Kuota Selector (Mobile Optimized) */}
                <div className="bg-white p-2.5 rounded-2xl border border-amber-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
                  <span className="text-xs font-bold text-slate-700 px-1 text-center sm:text-left">
                    Pilih Varian Kuota:
                  </span>
                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedKuotaTOne('30 GB')}
                      className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center justify-center ${
                        selectedKuotaTOne === '30 GB'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      📦 30 GB / bln
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedKuotaTOne('50 GB')}
                      className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                        selectedKuotaTOne === '50 GB'
                          ? 'bg-[#E0040B] text-white shadow-md shadow-red-500/20'
                          : 'bg-red-50 text-[#E0040B] hover:bg-red-100'
                      }`}
                    >
                      <span>🔥 50 GB / bln</span>
                      <span className="text-[9px] bg-amber-300 text-slate-900 px-1 py-0.2 rounded font-black">
                        +10rb!
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Telkomsel One 3 Speed Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {TELKOMSEL_ONE_TIERS.map((tier) => renderTelkomselOneCard(tier))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: INTERNET + STREAMING TAB                              */}
        {/* ------------------------------------------------------------- */}
        {activeCategory === 'internet-streaming' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Tv className="w-4 h-4 text-[#E0040B]" />
                  <span>Seluruh paket sudah termasuk 4 aplikasi streaming:</span>
                </div>
                <StreamingLogosList
                  apps={['Vision+', 'Prime Video', 'Viu', 'MaxStream']}
                  size="sm"
                />
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                100% Full Fiber Optic Unlimited
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {streamingPackages.map((pkg) => renderStandardCard(pkg))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: INTERNET + GAMER TAB                                  */}
        {/* ------------------------------------------------------------- */}
        {activeCategory === 'gaming' && gamingPackage && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-900 flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <strong className="font-bold">Khusus Pecinta Game:</strong> Rute server diprioritaskan untuk latency rendah &amp; ping stabil, serta reward in-game eksklusif Mobile Legends, Point Blank, Free Fire, AyoDance, dan Ragnarok Online.
              </div>
            </div>

            <div>
              {renderStandardCard(gamingPackage)}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: MOVIE COMPLETE TAB                                    */}
        {/* ------------------------------------------------------------- */}
        {activeCategory === 'movie' && moviePackage && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-rose-600 shrink-0" />
                <strong className="font-bold">Bioskop Lengkap di Rumah:</strong>
                <span className="text-slate-700">Termasuk 5 platform besar:</span>
              </div>
              <StreamingLogosList apps={moviePackage.includedApps} size="sm" />
            </div>

            <div>
              {renderStandardCard(moviePackage)}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 5: SEMUA PAKET TAB (Organized with clear sections)       */}
        {/* ------------------------------------------------------------- */}
        {activeCategory === 'all' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* Sub-Section 1: Internet + Streaming */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-[#E0040B] flex items-center justify-center font-bold shrink-0">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      1. Paket Internet + Streaming
                    </h3>
                    <p className="text-xs text-slate-500">
                      Internet fiber cepat + Bonus 4 platform streaming resmi
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StreamingLogosList
                    apps={['Vision+', 'Prime Video', 'Viu', 'MaxStream']}
                    size="sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {streamingPackages.map((pkg) => renderStandardCard(pkg))}
              </div>
            </div>

            {/* Sub-Section 2: Telkomsel One Dynamic with interactive toggle */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      2. Paket Telkomsel One Dynamic (WiFi + Kuota HP Keluarga)
                    </h3>
                    <p className="text-xs text-slate-500">
                      WiFi rumah tanpa batas kuota + kuota seluler untuk nomor HP keluarga Anda
                    </p>
                  </div>
                </div>

                {/* Switcher */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSelectedKuotaTOne('30 GB')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedKuotaTOne === '30 GB'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Kuota 30 GB
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedKuotaTOne('50 GB')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      selectedKuotaTOne === '50 GB'
                        ? 'bg-[#E0040B] text-white'
                        : 'text-red-600 hover:text-red-700'
                    }`}
                  >
                    <span>Kuota 50 GB</span>
                    <span className="text-[9px] bg-amber-300 text-slate-900 px-1 rounded font-black">
                      +10rb
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {TELKOMSEL_ONE_TIERS.map((tier) => renderTelkomselOneCard(tier))}
              </div>
            </div>

            {/* Sub-Section 3: Special Packages (Gaming & Movie) */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      3. Paket Spesial: Game &amp; Bioskop Lengkap
                    </h3>
                    <p className="text-xs text-slate-500">
                      Benefit premium khusus bagi para gamers dan penikmat bioskop digital
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400">2 Paket Spesial</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {gamingPackage && renderStandardCard(gamingPackage)}
                {moviePackage && renderStandardCard(moviePackage)}
              </div>
            </div>

          </div>
        )}

        {/* Informative Footnote on Pricing & PPN */}
        <div className="mt-14 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600">
            <strong className="font-semibold text-slate-800">Keterangan Resmi Tarif &amp; PPN:</strong> Seluruh harga di atas belum termasuk PPN 11%. Pembayaran tagihan resmi diterbitkan langsung oleh Telkomsel pada bulan berikutnya (pasca-bayar). Tidak ada pungutan uang tunai apapun di muka kepada sales maupun teknisi di lokasi.
          </div>
        </div>

      </div>
    </section>
  );
};
