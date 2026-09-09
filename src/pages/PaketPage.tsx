import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Packages } from '../components/Packages';
import { useAppNavigation } from '../navigation';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';

export const PaketPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();

  const packageFaqs = [
    {
      q: 'Apakah harga paket sudah termasuk sewa modem WiFi?',
      a: 'Ya, seluruh paket IndiHome by Telkomsel sudah dilengkapi peminjaman unit Optical Network Terminal (ONT) Modem Dual-Band canggih tanpa biaya sewa bulanan tambahan.',
    },
    {
      q: 'Bagaimana ketentuan biaya pemasangan?',
      a: 'Rincian biaya pasang dan skema paket yang Anda pilih akan dijelaskan secara lengkap dan transparan oleh sales resmi kami saat konfirmasi pendaftaran sebelum proses pasang dimulai.',
    },
    {
      q: 'Kapan tagihan pertama harus dibayarkan?',
      a: 'Tagihan resmi baru akan muncul di bulan berikutnya (pasca-bayar) melalui saluran resmi Telkomsel (Virtual Account BCA/Mandiri/BRI/BNI, MyTelkomsel, atau Indomaret/Alfamart). Tidak ada pembayaran tunai di muka kepada sales atau teknisi.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Subpage Header */}
      <PageHeader
        currentPageTitle="Paket Internet"
        badge="Daftar Tarif Resmi & Promo Berjalan"
        title="Pilihan Paket WiFi Internet"
        highlightedText="IndiHome by Telkomsel"
        description="Pilihan kecepatan internet fiber optik stabil tanpa batas kuota dengan pelayanan pasang resmi untuk area Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, dan Soreang."
      />

      {/* Main Packages Display */}
      <Packages />

      {/* Fast Next-Steps Bridge (Cek Area & Cara Pasang) */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Action Card 1: Cek Area Dulu */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white flex flex-col justify-between shadow-lg">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-3 border border-red-500/30">
                  <MapPin className="w-3.5 h-3.5" />
                  Jaringan Fiber
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Cek Area Lokasi Anda
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  Cek ketersediaan tiang ODP fiber terdekat untuk wilayah Bandung, Cimahi, dan sekitarnya sebelum mendaftar.
                </p>
              </div>

              <button
                onClick={() => navigateTo('cek-area')}
                className="inline-flex items-center justify-center gap-2 bg-[#E0040B] hover:bg-[#b90006] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all shadow-md cursor-pointer self-start"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Cek Area</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action Card 2: Konsultasi Langsung via WA */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Konsultasi Langsung
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  Butuh Rekomendasi Paket Sesuai Kebutuhan?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Chat langsung dengan {WHATSAPP_CONFIG.salesRepName}. Kami bantu sesuaikan jumlah perangkat dan aktivitas (WFH, gaming, streaming) agar hemat dan tepat guna.
                </p>
              </div>

              <a
                href={getWhatsAppUrl({ intent: 'consultation' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer self-start"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Quick FAQ about Packages */}
          <div className="mt-14 max-w-3xl mx-auto">
            <h4 className="text-lg font-extrabold text-slate-900 text-center mb-6">
              Pertanyaan Umum Seputar Paket WiFi
            </h4>
            <div className="space-y-3">
              {packageFaqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <strong className="text-slate-900 block text-sm mb-1.5">
                    {faq.q}
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
