import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CoverageCheck } from '../components/CoverageCheck';
import { useAppNavigation } from '../navigation';
import {
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Radio,
  FileCheck,
} from 'lucide-react';
import { GENERAL_REGIONS } from '../data/coverage';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';

export const CekAreaPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { activeSales } = useSales();

  const generalWilayahList = [
    { name: 'Bandung', desc: 'Mencakup seluruh area Kota & Kabupaten Bandung' },
    { name: 'Cimahi', desc: 'Cimahi Tengah, Cimahi Utara, Cimahi Selatan' },
    { name: 'Padalarang', desc: 'Padalarang, Batujajar, Ngamprah, dan sekitarnya' },
    { name: 'Cianjur', desc: 'Cianjur Kota, Ciranjang, Cipanas, Pacet, dll' },
    { name: 'Lembang', desc: 'Area Lembang & sekitarnya' },
    { name: 'Cisarua', desc: 'Area Cisarua Bandung Barat & sekitarnya' },
    { name: 'Sukabumi', desc: 'Wilayah Kota & Kabupaten Sukabumi' },
    { name: 'Soreang', desc: 'Soreang, Katapang, Banjaran, dan sekitarnya' },
  ];

  return (
    <div className="space-y-0">
      {/* Subpage Header */}
      <PageHeader
        currentPageTitle="Cek Area"
        badge="Ketersediaan Jaringan Fiber Optik"
        title="Cek Coverage Area WiFi"
        highlightedText="Jawa Barat"
        description="Pengecekan jangkauan kabel fiber dan slot ODP aktif untuk 8 wilayah: Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, dan Soreang. Pilih wilayah dan ketikkan nama daerah Anda."
      />

      {/* Interactive Coverage Checking Form */}
      <CoverageCheck />

      {/* Explanation of 8 General Regions */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E0040B] rounded-full text-[10px] font-bold uppercase mb-3 border border-red-100">
              <MapPin className="w-3.5 h-3.5" />
              8 Wilayah Layanan Resmi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Daftar Wilayah Operasional Kami
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Jika lokasi tempat tinggal Anda berada di dalam salah satu dari 8 wilayah di bawah ini, sales kami siap memeriksa ketersediaan tiang ODP fiber terdekat untuk rumah Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {generalWilayahList.map((item) => (
              <div
                key={item.name}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-red-200 hover:bg-red-50/20 transition-all"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-[#E0040B] flex items-center justify-center font-bold mb-3">
                    <Radio className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Jaringan Fiber Aktif</span>
                </div>
              </div>
            ))}
          </div>

          {/* Why Direct Check with Sales */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">
                  Mengapa Pengecekan Dilakukan via WhatsApp?
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Ketersediaan Port ODP Bersifat Real-Time &amp; Dinamis
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kapasitas 1 tiang ODP (Optical Distribution Point) umumnya terdiri dari 8 hingga 16 port. Data ketersediaan slot berubah setiap saat seiring pemasangan baru. Dengan mengirimkan nama daerah/jalan ke Sales via WhatsApp, tim kami langsung mengecek database sistem pusat Telkomsel secara akurat agar Anda tidak kecewa saat teknisi datang ke rumah.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={getWhatsAppUrl({
                    salesPhoneNumber: activeSales.phone,
                    salesName: activeSales.name,
                    intent: 'coverage',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Chat Sales Langsung</span>
                </a>
                <button
                  onClick={() => navigateTo('paket')}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Lihat Pilihan Paket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
