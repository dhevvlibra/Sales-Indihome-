import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  Headphones,
  Award,
  Wallet,
  Sparkles,
} from 'lucide-react';

export const Keunggulan: React.FC = () => {
  const advantages = [
    {
      icon: Clock,
      title: 'Tanpa Antre di Plaza Telkom / GraPARI',
      desc: 'Cukup kirim data lewat WhatsApp dari sofa rumah Anda. Tidak perlu buang waktu dan bensin mengantre di kantor layanan.',
      color: 'text-[#E0040B]',
      bgColor: 'bg-red-50',
    },
    {
      icon: Zap,
      title: 'Jadwal Pasang Fleksibel (3x24 Jam)',
      desc: 'Setelah upload data diverifikasi, Anda bebas memilih jadwal pemasangan teknisi yang paling cocok dalam rentang 3x24 jam kerja.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: ShieldCheck,
      title: '100% Jalur & Teknisi Resmi Telkom',
      desc: 'Pemasangan ditangani langsung oleh teknisi berseragam dan bersepatu safety standar Telkom Indonesia dengan garansi instalasi rapi.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Wallet,
      title: 'Pendaftaran Resmi & Transparan',
      desc: 'Keamanan transaksi 100% terjamin. Tidak ada titip uang tunai liar ke sales atau teknisi. Semua informasi tagihan resmi terhubung langsung ke sistem Telkomsel.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Award,
      title: 'Optimalisasi Slot ODP Tiang Terdekat',
      desc: 'Kami bantu cari box kabel optik terdekat dengan redaman sinyal terbaik agar internet Anda stabil tanpa drop.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Headphones,
      title: 'Layanan Pendampingan Sales Ramah',
      desc: 'Butuh bantuan konsultasi pemilihan paket atau pengecekan progress? Sales rep siap mendampingi setiap hari dari pukul 07.00 - 22.00 WIB.',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <section id="keunggulan" className="py-16 md:py-24 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#E0040B] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-[#E0040B]" />
            <span>Kenapa Harus Pasang Melalui Sales Kami?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Keunggulan Layanan Pemasangan Mandiri Resmi
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            Dapatkan pengalaman pasang WiFi baru yang jauh lebih mudah, cepat, dan transparan untuk keluarga Anda di Jawa Barat.
          </p>
        </div>

        {/* 6 Advantages Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const IconComponent = adv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl ${adv.bgColor} ${adv.color} flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
