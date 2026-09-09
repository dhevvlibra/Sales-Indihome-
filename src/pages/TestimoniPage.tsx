import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAppNavigation } from '../navigation';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import {
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ThumbsUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

// Helper to get clean initials skipping common honorifics
const getCustomerInitials = (name: string): string => {
  const clean = name.replace(/^(Bpk\.|Ibu|Kang|Teh|Hj\.)\s*/i, '').trim();
  const words = clean.split(' ').filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).replace(/\*/g, '').toUpperCase() || 'PL';
  return (words[0][0] + words[1][0]).toUpperCase();
};

export const TestimoniPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const [selectedCity, setSelectedCity] = useState<string>('Semua');

  const cities = ['Semua', 'Bandung', 'Cimahi', 'Padalarang', 'Cianjur', 'Lembang', 'Cisarua', 'Sukabumi', 'Soreang'];

  const filteredTestimonials =
    selectedCity === 'Semua'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.city === selectedCity);

  return (
    <div>
      {/* Subpage Header */}
      <PageHeader
        currentPageTitle="Testimoni"
        badge="Kepuasan Pelanggan Nyata"
        title="Ulasan Pemasangan Warga"
        highlightedText="Jawa Barat"
        description="Lihat cerita asli dari pelanggan perumahan, kost, dan pelaku usaha di Bandung, Cimahi, Sukabumi, dan wilayah sekitarnya yang sudah menikmati koneksi WiFi stabil tanpa drama."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Rating Overview Scorecard */}
        <div className="mb-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400" />
              ))}
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">4.9 / 5.0</div>
            <p className="text-xs text-slate-500 mt-1">Skor Kepuasan Pelanggan</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">3x24 Jam</div>
            <p className="text-xs text-slate-500 mt-1">Bebas Pilih Jadwal Pasang</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">100%</div>
            <p className="text-xs text-slate-500 mt-1">Teknisi Resmi Telkom</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-full bg-red-100 text-[#E0040B] flex items-center justify-center mx-auto mb-2 font-bold">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">0 Rupiah</div>
            <p className="text-xs text-slate-500 mt-1">Biaya Bayar di Muka (DP)</p>
          </div>
        </div>

        {/* Filter by City Tabs */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {city === 'Semua' ? 'Semua Wilayah' : `Wilayah ${city}`}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privasi Terjaga • Sebagian karakter nama pelanggan disamarkan</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div className="absolute top-6 right-6 text-slate-200 pointer-events-none">
                <Quote className="w-7 h-7 rotate-180" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-3 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {getCustomerInitials(t.name)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-[#E0040B]" />
                    <span>{t.location}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Paket: <span className="text-slate-600 font-semibold">{t.packageChosen}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Sudah Banyak Keluarga Menikmati Internet Stabil
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sekarang Giliran Rumah Anda Terhubung
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Hubungi sales kami untuk informasi pasang baru dan rekomendasi paket paling hemat untuk kebutuhan Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigateTo('paket')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 text-center"
            >
              Lihat Pilihan Paket
            </button>
            <a
              href={getWhatsAppUrl({ intent: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Daftar Sekarang via WA</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
