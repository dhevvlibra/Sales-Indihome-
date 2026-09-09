import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Zap,
  ShieldCheck,
  Clock,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Wifi,
  Tv,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useAppNavigation } from '../navigation';
import { useOrderModal } from '../context/OrderContext';
import { useSales } from '../context/SalesContext';
import { StreamingLogosList } from './StreamingLogos';

interface HeroPlanDetail {
  id: '200' | '300' | '500';
  speed: string;
  normalSpeed: string;
  promoDuration: string;
  badge: string;
  price: string;
  rawPrice: string;
  popular?: boolean;
  desc: string;
  devices: string;
  apps: string[];
  packageName: string;
}

const HERO_PLANS: Record<'200' | '300' | '500', HeroPlanDetail> = {
  '300': {
    id: '300',
    speed: '300 Mbps',
    normalSpeed: '100 Mbps',
    promoDuration: 'Promo Upspeed 6 Bulan',
    badge: 'Paling Diminati',
    price: 'Rp 270.000',
    rawPrice: 'Rp 270.000/bln',
    popular: true,
    desc: 'Paling pas untuk kebutuhan seluruh keluarga: streaming 4K, video call WFH, dan gaming bebas lag.',
    devices: 'Ideal untuk 6 - 12 perangkat',
    apps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    packageName: 'Best Value Promo Internet + Streaming 300 Mbps',
  },
  '200': {
    id: '200',
    speed: '200 Mbps',
    normalSpeed: '75 Mbps',
    promoDuration: 'Promo Upspeed 3 Bulan',
    badge: 'Ekonomis',
    price: 'Rp 240.000',
    rawPrice: 'Rp 240.000/bln',
    desc: 'Paket hemat berkualitas untuk rumah minimalis, kos, atau kebutuhan belajar online & browsing sehari-hari.',
    devices: 'Ideal untuk 3 - 6 perangkat',
    apps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    packageName: 'Promo Internet + Streaming 200 Mbps',
  },
  '500': {
    id: '500',
    speed: '500 Mbps',
    normalSpeed: '200 Mbps',
    promoDuration: 'Promo Upspeed 1 Tahun',
    badge: 'Super Cepat',
    price: 'Rp 350.000',
    rawPrice: 'Rp 350.000/bln',
    desc: 'Koneksi ultra-cepat untuk content creator, streamer, gamer kompetitif, dan rumah besar banyak pengguna.',
    devices: 'Ideal untuk 12+ perangkat',
    apps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    packageName: 'Super Upspeed Internet + Streaming 500 Mbps',
  },
};

export const Hero: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { openOrderModal } = useOrderModal();
  const { activeSales } = useSales();
  const [selectedPlanId, setSelectedPlanId] = useState<'200' | '300' | '500'>('300');

  const activePlan = HERO_PLANS[selectedPlanId];

  const mainWaUrl = getWhatsAppUrl({
    salesPhoneNumber: activeSales.phone,
    salesName: activeSales.name,
    intent: 'general',
    customNote: `Saya mau tanya info pasang baru internet rumah IndiHome via Kak ${activeSales.name}.`,
  });

  const handleOrderActivePlan = () => {
    openOrderModal({
      packageName: activePlan.packageName,
      speed: `${activePlan.speed} (${activePlan.promoDuration} - Normal ${activePlan.normalSpeed})`,
      price: activePlan.rawPrice,
      categoryLabel: 'Internet + Streaming',
      customNote: `Aplikasi include: ${activePlan.apps.join(', ')}`,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-slate-50/70 py-10 lg:py-16 border-b border-slate-200/80">
      {/* Background Texture & Ambient Light */}
      <div className="absolute inset-0 bg-fiber-pattern pointer-events-none opacity-70" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Direct, Trustworthy Messaging (col-span-12 lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Authentic Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-red-200/90 rounded-full text-xs font-semibold text-slate-800 shadow-2xs mb-5 self-start">
              <span className="w-2 h-2 rounded-full bg-[#E0040B]"></span>
              <span>Layanan Pemasangan Resmi IndiHome by Telkomsel</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-slate-950 leading-[1.14] mb-4">
              Internet Rumah Cepat &amp; Stabil,{' '}
              <span className="text-[#E0040B] inline-block">Bebas Ribet</span>
            </h1>

            {/* Natural, clear subheadline */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              Daftar pasang baru tanpa perlu antre di kantor. Dapatkan promo <strong className="text-slate-900 font-bold">Upspeed Drastis hingga 300 Mbps</strong>, modem WiFi dual-band gratis sewa, dan teknisi resmi yang siap datang langsung ke alamat rumah Anda.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <a
                id="hero-cta-whatsapp"
                href={mainWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-98 transition-all min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Konsultasi &amp; Pasang via WA</span>
              </a>

              <button
                id="hero-cta-cek-area"
                onClick={() => navigateTo('cek-area')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 px-5 py-3.5 rounded-xl font-bold text-sm shadow-2xs active:scale-98 transition-all cursor-pointer min-h-[48px]"
              >
                <MapPin className="w-4 h-4 text-[#E0040B]" />
                <span>Cek Jangkauan Area</span>
              </button>
            </div>

            {/* Dedicated Human Sales Representative Card */}
            <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 max-w-xl mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E0040B] font-black text-base flex items-center justify-center">
                    {activeSales.name.charAt(0)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Sales Pendamping Resmi:</div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{activeSales.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-500 hidden sm:block">
                <div>Proses Cepat</div>
                <div className="font-semibold text-slate-700">Tanpa Pungutan di Muka</div>
              </div>
            </div>

            {/* Area coverage note */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#E0040B] shrink-0" />
              <span>
                Cakupan: <strong>Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi &amp; Soreang</strong>
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Flagship Showcase (col-span-12 lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              
              {/* Showcase Top Bar: Plan Switcher */}
              <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                    Rekomendasi Paket Terfavorit
                  </div>
                  <div className="text-sm font-bold text-white">
                    Pilih Kecepatan Sesuai Kebutuhan Rumah
                  </div>
                </div>

                {/* Switcher Pills */}
                <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                  {(['200', '300', '500'] as const).map((planId) => {
                    const plan = HERO_PLANS[planId];
                    const isSelected = selectedPlanId === planId;
                    return (
                      <button
                        key={planId}
                        type="button"
                        onClick={() => setSelectedPlanId(planId)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E0040B] text-white shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {plan.speed.replace(' Mbps', 'M')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Showcase Body Content */}
              <div className="p-6 sm:p-7 space-y-6">
                
                {/* Speed & Price Overview */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-red-50 text-[#E0040B] border border-red-100 mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{activePlan.promoDuration}</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                        {activePlan.speed}
                      </span>
                      <span className="text-xs text-slate-400 font-medium line-through">
                        Normal: {activePlan.normalSpeed}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {activePlan.desc}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="text-[11px] text-slate-400">Tarif Langganan:</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#E0040B]">
                      {activePlan.price}
                      <span className="text-xs font-normal text-slate-500"> /bln</span>
                    </div>
                    <div className="text-[10px] text-slate-400 italic">Belum termasuk PPN 11%</div>
                  </div>
                </div>

                {/* Included Benefits Feature List */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Fasilitas &amp; Keunggulan Paket Ini:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Wifi className="w-4 h-4 text-[#E0040B] shrink-0" />
                      <span>Modem WiFi Dual-Band</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{activePlan.devices}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Pasca-bayar Resmi</span>
                    </div>
                  </div>

                  {/* Dedicated Streaming Apps Banner with Real Logos */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-50/40 via-amber-50/30 to-slate-50 border border-red-100 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                      <Tv className="w-3.5 h-3.5 text-[#E0040B]" />
                      <span>Langganan Streaming Termasuk:</span>
                    </div>
                    <StreamingLogosList apps={activePlan.apps} size="sm" />
                  </div>
                </div>

                {/* Action Button & Package Link */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOrderActivePlan}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#E0040B] hover:bg-[#b90006] text-white font-bold text-sm shadow-md shadow-red-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ajukan Pasang Paket {activePlan.speed}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={() => navigateTo('paket')}
                      className="hover:text-[#E0040B] underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Bandingkan seluruh paket di katalog ↓
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo('cara-pasang')}
                      className="hover:text-[#E0040B] underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Pelajari alur pemasangan →
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

