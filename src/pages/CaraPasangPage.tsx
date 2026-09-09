import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAppNavigation } from '../navigation';
import {
  Clock,
  MessageCircle,
  FileCheck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Check,
  Smartphone,
  Send,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';

export const CaraPasangPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { activeSales } = useSales();

  const requirements = [
    {
      title: 'Foto e-KTP Pemohon',
      desc: 'Foto KTP asli yang masih berlaku, jelas dan tidak buram untuk registrasi sistem Telkom.',
      icon: FileCheck,
    },
    {
      title: 'Share Location Rumah',
      desc: 'Pin lokasi akurat via WhatsApp agar sales bisa mengecek tiang ODP fiber terdekat.',
      icon: MapPin,
    },
    {
      title: 'Alamat Lengkap & Patokan',
      desc: 'Nama jalan/gang, RT/RW, Kelurahan, Kecamatan, dan ciri khas rumah agar teknisi mudah sampai.',
      icon: AlertCircle,
    },
    {
      title: 'Nomor HP & Email Aktif',
      desc: 'Digunakan untuk konfirmasi kedatangan teknisi dan pengiriman tagihan resmi MyTelkomsel.',
      icon: Smartphone,
    },
  ];

  const steps = [
    {
      num: 1,
      time: '5 - 10 Menit',
      title: 'Konsultasi Kebutuhan & Cek Titik ODP',
      desc: 'Hubungi Sales kami via WhatsApp. Kirimkan alamat dan titik share location. Sales akan langsung mengecek ketersediaan port fiber optik (ODP) dalam radius aman dari rumah Anda.',
      action: 'Sales mengecek kapasitas jaringan tiang terdekat',
      badge: 'Langkah Pertama',
    },
    {
      num: 2,
      time: '10 Menit',
      title: 'Registrasi & Upload Data Berkas',
      desc: 'Tentukan pilihan paket (Internet Streaming, Telkomsel One, Game, atau Movie). Cukup upload foto KTP dan nomor telepon/WhatsApp aktif. Sales memproses pendaftaran ke sistem pusat Telkomsel secara instan.',
      action: 'ID Pelanggan (Track Order) terbit & lolos verifikasi',
      badge: 'Bebas Antre',
    },
    {
      num: 3,
      time: 'Rentang 3x24 Jam Kerja',
      title: 'Pilih Jadwal Pemasangan Fleksibel',
      desc: 'Setelah registrasi dan upload data berhasil diverifikasi, Anda dapat leluasa memilih jadwal kedatangan teknisi sesuai waktu luang Anda dalam rentang waktu 3x24 jam kerja.',
      action: 'Jadwal pemasangan dikonfirmasi via WhatsApp/Telepon',
      badge: 'Jadwal Fleksibel',
    },
    {
      num: 4,
      time: 'Selesai di Hari Pilihan Anda',
      title: 'Teknisi Pasang Modem & Internet Langsung Aktif',
      desc: 'Teknisi resmi Telkomsel datang tepat waktu sesuai jadwal yang Anda tentukan, menarik kabel fiber dari tiang ODP, memasang modem WiFi dual-band, serta memandu uji kecepatan.',
      action: 'Internet aktif & tagihan resmi dibayar bulan depan',
      badge: 'Siap Pakai',
    },
  ];

  const tips = [
    'Pilih titik peletakan modem di area terbuka di tengah rumah untuk pancaran sinyal merata ke seluruh ruangan.',
    'Hindari meletakkan modem di balik dinding tebal atau di dalam lemari tertutup rapat.',
    'Lakukan uji kecepatan (speedtest) bersama teknisi sebelum menandatangani berita acara serah terima.',
    'Ingat: Jangan berikan uang tunai di muka kepada teknisi karena tagihan dibayar bulan depan secara resmi.',
  ];

  return (
    <div>
      {/* Subpage Header */}
      <PageHeader
        currentPageTitle="Cara Pasang"
        badge="Proses Pemasangan Terjadwal"
        title="Alur Praktis Pemasangan"
        highlightedText="Jadwal Fleksibel 3x24 Jam"
        description="Pahami alur registrasi dari rumah tanpa perlu repot datang ke kantor Plaza Telkom. Setelah registrasi dan upload data, Anda bebas memilih jadwal pemasangan dalam rentang 3x24 jam kerja."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Step 1: Requirements Checklist */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E0040B] rounded-full text-[10px] font-bold uppercase mb-3 border border-red-100">
              <FileCheck className="w-3 h-3" />
              Syarat &amp; Dokumen
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Syarat Pendaftaran Sangat Sederhana
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Siapkan 4 hal berikut dari smartphone Anda sebelum mengirimkan pesan ke sales kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, idx) => {
              const IconC = req.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E0040B] flex items-center justify-center font-bold mb-4">
                      <IconC className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {req.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                    <Check className="w-4 h-4" />
                    <span>Cukup foto via WA</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: 4-Step Installation Timeline */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase mb-3 border border-slate-200">
              <Clock className="w-3 h-3 text-[#E0040B]" />
              Timeline Pemasangan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              4 Langkah Mudah dari Chat Sampai Internet Nyala
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Setelah registrasi &amp; upload data lolos verifikasi, Anda bebas memilih jadwal pemasangan teknisi dalam rentang 3x24 jam kerja.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-xl shadow-md">
                    {st.num}
                  </div>
                  <div className="md:hidden">
                    <span className="text-[10px] uppercase font-bold text-[#E0040B] bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                      {st.time}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="hidden md:flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {st.badge}
                    </span>
                    <span className="text-xs font-bold text-[#E0040B] bg-red-50 px-2.5 py-1 rounded-full border border-red-100 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {st.time}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Hasil: {st.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Box */}
        <div className="mb-20 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Tips Penting Saat Teknisi Melakukan Pemasangan
              </h4>
              <p className="text-xs text-slate-500">
                Hal sederhana agar jangkauan WiFi rumah Anda maksimal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {tips.map((tip, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              Layanan Pemasangan Resmi Bandung Raya
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Kirim Lokasi Anda untuk Cek ODP Hari Ini
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Sales kami online pukul 07:00 - 22:00 WIB untuk membantu pengecekan slot dan penjadwalan teknisi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigateTo('cek-area')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 text-center"
            >
              Cek Area di Web
            </button>
            <a
              href={getWhatsAppUrl({
                salesPhoneNumber: activeSales.phone,
                salesName: activeSales.name,
                intent: 'coverage',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Share Loc via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
