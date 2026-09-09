import React from 'react';
import { Hero } from '../components/Hero';
import { Packages } from '../components/Packages';
import { useAppNavigation } from '../navigation';
import {
  Sparkles,
  Clock,
  MessageSquareQuote,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  MapPin,
  Radio,
} from 'lucide-react';
import { WHATSAPP_CONFIG, getWhatsAppUrl } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';

export const HomePage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { activeSales } = useSales();

  const salesDisplayName = activeSales.name ? activeSales.name.split('(')[0].trim() : 'Sales Resmi';
  const directWaMessage = [
    `Halo Kak ${salesDisplayName} (Sales Resmi IndiHome),`,
    `Saya tertarik untuk pasang WiFi IndiHome. Apakah boleh saya tanya lebih lanjut?`,
  ].join('\n');

  const exploreLinks = [
    {
      page: 'paket' as const,
      title: 'Pilihan Paket Internet',
      desc: 'Kecepatan hingga 500 Mbps dengan promo upspeed drastis, Telkomsel One & hiburan lengkap.',
      icon: Zap,
      badge: 'Mulai 240rb/bln',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100',
    },
    {
      page: 'cek-area' as const,
      title: 'Cek Coverage Area',
      desc: 'Pengecekan jangkauan ODP untuk 8 wilayah: Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, Soreang.',
      icon: MapPin,
      badge: '8 Wilayah',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      page: 'keunggulan' as const,
      title: 'Keunggulan Layanan',
      desc: 'Ketahui 6 alasan utama pasang WiFi lewat sales resmi kami: jalur resmi, modem dual-band, dan tanpa antre.',
      icon: Sparkles,
      badge: '6 Nilai Lebih',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      page: 'cara-pasang' as const,
      title: 'Alur & Cara Pasang',
      desc: 'Setelah upload data, bebas pilih jadwal kedatangan teknisi resmi dalam rentang 3x24 jam kerja.',
      icon: Clock,
      badge: 'Rentang 3x24 Jam',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      page: 'testimoni' as const,
      title: 'Testimoni Pelanggan',
      desc: 'Ulasan asli dari keluarga & pebisnis di Bandung, Cimahi, Sukabumi, dan sekitarnya.',
      icon: MessageSquareQuote,
      badge: 'Rating 5.0 / 5',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      page: 'faq' as const,
      title: 'Tanya Jawab (FAQ)',
      desc: 'Jawaban lengkap seputar syarat KTP, sistem pembayaran bulan depan, garansi perangkat, dan FUP kuota.',
      icon: HelpCircle,
      badge: 'Solusi Cepat',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
      border: 'border-slate-200',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section with SaaS Split Layout */}
      <Hero />

      {/* 2. Cek Jangkauan Area (Clean & Mobile-Friendly Action Banner) */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-red-50/40 via-white to-slate-50/80 rounded-2xl p-4 sm:p-5 border border-red-100/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-11 h-11 rounded-xl bg-red-100/70 text-[#E0040B] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-950 leading-tight">
                  Cek Jangkauan WiFi di Alamat Anda
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tersedia untuk Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi &amp; Soreang
                </p>
              </div>
            </div>

            <button
              id="btn-goto-coverage-page"
              onClick={() => navigateTo('cek-area')}
              className="w-full sm:w-auto bg-[#E0040B] hover:bg-[#b90006] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <MapPin className="w-4 h-4" />
              <span>Cek Area Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Packages Pricing & Selection */}
      <Packages />

      {/* 4. Multi-Page Hub Teaser: Explore dedicated pages */}
      <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/80 relative">
        <div className="absolute inset-0 bg-fiber-pattern pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E0040B]" />
              <span>Panduan &amp; Informasi Pemasangan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Ketahui Lebih Lanjut Sebelum Memasang
            </h2>
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
              Pelajari alur pendaftaran, jaminan resmi dari Telkomsel, serta ulasan pelanggan asli di Bandung Raya &amp; sekitarnya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exploreLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className="group text-left p-6 rounded-2xl bg-white hover:bg-white border border-slate-200 hover:border-red-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center font-bold`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-950 mb-2 group-hover:text-[#E0040B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E0040B]">
                    <span>Buka Informasi</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Direct Registration Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sales Resmi Siap Membantu</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Mau Pasang Hari Ini? Tanya Slot ODP Sekarang
              </h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                Dapatkan layanan pemasangan resmi cepat dan modem WiFi dual-band untuk area Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, dan Soreang.
              </p>
            </div>
            <a
              href={getWhatsAppUrl({
                salesPhoneNumber: activeSales.phone,
                salesName: activeSales.name,
                customMessage: directWaMessage,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-98 shrink-0"
            >
              Chat Sales via WhatsApp
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
