import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAppNavigation } from '../navigation';
import {
  Wifi,
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';

export const KeunggulanPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { activeSales } = useSales();

  const advantages = [
    {
      icon: Wifi,
      title: '100% Kabel Fiber Optik Murni',
      desc: 'Transmisi data berbasis cahaya tanpa terpengaruh cuaca hujan lebat atau angin kencang di dataran tinggi Bandung dan sekitarnya. Ping latency rendah dan stabil untuk streaming 4K & game kompetitif.',
      badge: 'Jaringan Stabil',
      color: 'text-[#E0040B]',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
    },
    {
      icon: Sparkles,
      title: 'Registrasi Resmi & Terpercaya',
      desc: 'Daftar melalui sales resmi kami dengan prosedur verifikasi terpercaya Telkomsel tanpa ada biaya siluman atau perantara calo.',
      badge: 'Layanan Resmi',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      icon: Zap,
      title: 'Peminjaman Modem WiFi Dual-Band',
      desc: 'Dilengkapi modem Optical Network Terminal (ONT) canggih berteknologi 2.4 GHz dan 5 GHz untuk jangkauan sinyal yang lebih luas dan minim interferensi antar perangkat.',
      badge: 'Hardware Terbaru',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      icon: CreditCard,
      title: 'Bayar Bulan Depan (Tanpa Uang Muka / DP)',
      desc: 'Anda tidak perlu membayar sepeser pun uang tunai di muka. Tagihan perdana baru akan diterbitkan resmi oleh Telkomsel pada bulan berikutnya melalui aplikasi resmi atau mobile banking.',
      badge: '100% Aman & Terpercaya',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
    {
      icon: Clock,
      title: 'Pilih Jadwal Pasang Fleksibel (3x24 Jam)',
      desc: 'Setelah berkas Anda di-upload dan lolos verifikasi sistem, Anda bebas menentukan jadwal kedatangan teknisi dalam rentang waktu 3x24 jam kerja.',
      badge: 'Jadwal Fleksibel',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
    },
    {
      icon: ShieldCheck,
      title: 'Sales Resmi Bersertifikat Siap Dampingi',
      desc: 'Anda dipandu dari awal hingga internet aktif. Jika ada kendala kabel, ODP penuh, atau kendala registrasi, sales rep kami akan aktif mengurus solusinya untuk Anda.',
      badge: 'Full Pendampingan',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
    },
  ];

  const comparisonData = [
    {
      aspect: 'Konsultasi & Rekomendasi Paket',
      sales: 'Didampingi langsung sesuai jumlah perangkat & budget',
      others: 'Harus cari info sendiri atau diarahkan ke paket mahal',
    },
    {
      aspect: 'Pengecekan Slot ODP Terdekat',
      sales: 'Cek langsung ke sistem ODP radius 100-300 meter',
      others: 'Sering digantung tanpa kepastian ketersediaan slot',
    },
    {
      aspect: 'Kemudahan Pendaftaran',
      sales: 'Cukup kirim KTP & share loc via WhatsApp tanpa antre',
      others: 'Harus datang dan menunggu nomor antrean di kantor fisik',
    },
    {
      aspect: 'Keamanan Pembayaran Tagihan',
      sales: 'Tanpa DP tunai; bayar lewat MyTelkomsel / ATM resmi',
      others: 'Rawan oknum calo meminta uang tunai di muka',
    },
    {
      aspect: 'Kecepatan Proses Pemasangan',
      sales: 'Bebas pilih jadwal teknisi dalam rentang 3x24 jam kerja',
      others: 'Menunggu berhari-hari tanpa kepastian jadwal',
    },
    {
      aspect: 'Layanan Pasca Pasang',
      sales: 'Sales tetap bisa dihubungi jika butuh bantuan lanjutan',
      others: 'Selesai transaksi nomor tidak bisa dihubungi lagi',
    },
  ];

  return (
    <div>
      {/* Subpage Header */}
      <PageHeader
        currentPageTitle="Keunggulan"
        badge="Jaminan Kualitas & Keamanan"
        title="Mengapa Harus Pasang Lewat"
        highlightedText="Sales Resmi Kami?"
        description="Nikmati kemudahan pendaftaran WiFi IndiHome by Telkomsel tanpa antre di kantor cabang, dengan pelayanan cepat dan keleluasaan memilih jadwal pasang dalam rentang 3x24 jam untuk area Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, dan Soreang."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* 6 Advantages Cards Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E0040B] rounded-full text-[10px] font-bold uppercase mb-3 border border-red-100">
              <Sparkles className="w-3 h-3 text-[#E0040B]" />
              Fasilitas Utama Pelanggan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              6 Keuntungan Nyata yang Anda Dapatkan
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Komitmen kami memberikan layanan internet terbaik tanpa drama birokrasi dan tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={adv.title}
                  className={`p-6 sm:p-7 rounded-3xl bg-white border ${adv.borderColor} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-2xl ${adv.bgColor} ${adv.color} flex items-center justify-center font-bold`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {adv.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {adv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Sales vs Others Comparison Table */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase mb-3 border border-slate-200">
              <ShieldCheck className="w-3 h-3 text-[#E0040B]" />
              Perbandingan Layanan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Daftar Lewat Sales Resmi vs Jalur Lainnya
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Lihat perbedaan nyata antara didampingi sales resmi berlisensi dibandingkan calo tidak resmi.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0F172A] text-white">
                    <th className="py-4 px-6 font-bold uppercase text-[11px] tracking-wider w-1/3">
                      Aspek Pelayanan
                    </th>
                    <th className="py-4 px-6 font-bold uppercase text-[11px] tracking-wider bg-[#E0040B] text-white w-1/3">
                      Melalui Sales Kami (Resmi)
                    </th>
                    <th className="py-4 px-6 font-bold uppercase text-[11px] tracking-wider text-slate-400 w-1/3">
                      Daftar Sendiri / Calo Luar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {item.aspect}
                      </td>
                      <td className="py-4 px-6 text-slate-800 bg-red-50/40 font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item.sales}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{item.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Call To Action Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sales Konsultan Resmi: {activeSales.name}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Siap Menikmati WiFi Cepat Tanpa Ribet?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Hubungi sales kami sekarang via WhatsApp untuk mengecek ketersediaan tiang ODP di sekitar tempat tinggal Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigateTo('home', 'paket')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 text-center"
            >
              Lihat Pilihan Paket
            </button>
            <a
              href={getWhatsAppUrl({
                salesPhoneNumber: activeSales.phone,
                salesName: activeSales.name,
                intent: 'general',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Daftar via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
